precision highp float;

#define MAX_OBJECTS 10
#define MAX_LIGHT 10
#define SPHERE 0
#define PLANE 1
#define MAX_RECURSION 4

uniform vec2 uResolution;
uniform float timeSinceStart;

uniform sampler2D objects;  //[type, null, null, null]
uniform sampler2D objectPositions; // [x, y, z, width]
uniform sampler2D objectMaterials; // [r, g, b, light]
uniform sampler2D objectMaterialsExtended; // [reflect, null, null, null]

uniform int numObjects;
uniform float objectTextureSize;

// 光线与球面相交
void iSphere(in vec2 ID, in vec3 origin, in vec3 direction, in vec4 sphere, inout float closestIntersection, inout vec2 closestID) {
    // p(x) = o + t*d; 光线
    // (p-c)(p-c) = r^2 球
    // (d^2) * t^2 + (2d(o-c)) * t + (o-c)^2 - r^2 = 0 光线跟球的交点 ---------------------
    // ax^2 + bx + c =0
    // d 是单位向量  a = d *d = 1
    float b = 2.0 * dot(origin - sphere.xyz, direction);
    float c = dot(origin - sphere.xyz, origin - sphere.xyz) - sphere.w * sphere.w;

    // 判别式
    float disc = b * b - 4.0 * c;
    if(disc <= 0.0)
        return;
    // p(x) = o + t*d; 光线的t
    float t = -(b + sqrt(disc)) / 2.0;

    if(t > 0.0 && t < closestIntersection) {
        closestIntersection = t;
        closestID = ID;
    }
}

// 光线跟平面相交
void iPlane(in vec2 ID, in vec3 origin, in vec3 direction, in vec3 normal, inout float closestIntersection, inout vec2 closestID) {
    // (p - p0) * n = 0 平面
    // p = o + td 光线
    // (o + td - p0) * n = 0  --> tdn = (p0 - o) n --> t = (p0 - 0)n / dn

    float t = (dot(-normal, normal) - dot(origin, normal)) / dot(direction, normal);

    if(t > 0.0 && t < closestIntersection) {
        closestIntersection = t;
        closestID = ID;
    }
}

// 求光线与场景中物体的最近交点
void intersect(in vec3 origin, in vec3 direction, inout float closestIntersection, inout vec2 closestID) {
    float it = 1.0 / objectTextureSize / 2.0;
    float ity = 1.0 / objectTextureSize / 2.0;

    float step = 1.0 / objectTextureSize;

    for(int i = 0; i < MAX_OBJECTS; i++) {
        if(i >= numObjects) {
            break;
        }

        int objectType = int(texture2D(objects, vec2(it, ity)).x * 256.0);

        if(objectType == SPHERE) {
            iSphere(vec2(it, ity), origin, direction, texture2D(objectPositions, vec2(it, ity)), closestIntersection, closestID);
        } else if(objectType == PLANE) {
            iPlane(vec2(it, ity), origin, direction, texture2D(objectPositions, vec2(it, ity)).xyz, closestIntersection, closestID);
        }

        it += step;

        if(it > 1.0) {
            ity += step;
            it = step / 2.0;
        }
    }

}

// 球面的法向量
vec3 nSphere(in vec3 position, in vec3 sphere) {
    return normalize(position - sphere);
}

// 平面的法向量
vec3 nPhone(in vec3 plane) {
    return normalize(plane);
}

// 获取法向量
vec3 normal(in vec3 position, in vec2 ID) {
    if(int(texture2D(objects, ID).x * 256.0) == SPHERE) {
        return nSphere(position, texture2D(objectPositions, ID).xyz);
    } else if(int(texture2D(objects, ID).x * 256.0) == PLANE) {
        return nPhone(texture2D(objectPositions, ID).xyz);
    }
    return vec3(0.0);
}

// 随机数
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

// 半球向量
vec3 getRandomNormalInHemisphere(float seed, vec3 normal) {
    float u = random(vec3(12.9898, 78.233, 151.7182), seed);
    float v = random(vec3(63.7264, 10.873, 623.6736), seed);
    float r = sqrt(u);
    float angle = 6.283185307179586 * v; 
    // compute basis from normal
    vec3 sdir, tdir;
    if(abs(normal.x) < .5) {
        sdir = cross(normal, vec3(1, 0, 0));
    } else {
        sdir = cross(normal, vec3(0, 1, 0));
    }
    tdir = cross(normal, sdir);

    return r * cos(angle) * sdir + r * sin(angle) * tdir + sqrt(1. - u) * normal;
}

vec3 cosineWeightedDirection(float seed, in vec3 norm) {
    return normalize(getRandomNormalInHemisphere(seed, norm));
}

// 计算像素的颜色
vec3 trace(in vec3 origin, in vec3 direction, in int bounce) {
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec4 material[MAX_RECURSION];
    vec4 materialsExtended[MAX_RECURSION];

    int recursion = 0;

    vec3 rayPoint = origin;
    vec3 rayDirection = direction;
    for(int i = 0; i < MAX_RECURSION; i++) {
        recursion = i;

        vec2 ID = vec2(-1.0, -1.0);
        float t = 1000.0;

		//相交
        intersect(rayPoint, rayDirection, t, ID);
        if(ID.x > -1.0) {
            rayPoint = rayPoint + t * rayDirection;
            vec3 norm = normal(rayPoint, ID);

            rayDirection = cosineWeightedDirection(timeSinceStart + float(bounce), norm);
            rayPoint = rayPoint + rayDirection * 0.000001;
            material[i] = texture2D(objectMaterials, ID);
            materialsExtended[i] = texture2D(objectMaterialsExtended, ID);
            materialsExtended[i].y = dot(norm, rayDirection);
        } else {
            material[i] = vec4(0.0, 0.0, 0.0, 0.0);
            materialsExtended[i] = vec4(0.0, 0.0, 0.0, 0.0);
            materialsExtended[i].y = 1.0;
            break;
        }
    }

    for(int i = MAX_RECURSION; i >= 0; i--) {
        if(i > recursion)
            continue;
        float reflect = materialsExtended[i].x;
        color *= material[i].xyz * reflect;
        color += materialsExtended[i].y * material[i].xyz * material[i].w;
    }
    return color;
}

// 计算颜色
vec3 makeCalculateColor(in vec3 origin, in vec3 direction) {
    vec3 accumulatedColor = vec3(0.0);
    for(int bounce = 0; bounce < 15; bounce++) {
        vec3 oneRayColor = trace(origin, direction, bounce);
        accumulatedColor += oneRayColor;
    }

    return accumulatedColor / 15.0;
}

void main() {
    gl_FragColor = vec4(0.0);

    vec3 origin = vec3(0, 0.0, 2.0);
    vec3 direction = normalize(vec3(gl_FragCoord.xy / uResolution - 0.5, -1.0));
    // 相交
    gl_FragColor = vec4(makeCalculateColor(origin, direction), 1.0);

}