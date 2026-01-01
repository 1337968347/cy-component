attribute vec3 position;

uniform sampler2D occlusionmap;
uniform sampler2D heightmap;

varying vec3 surfaceNormal;
varying float occlusion;

varying mat3 tbn;
varying vec2 uv;

/// import "transform.glsl"

void main() {
    vec4 heightPixel = texture2D(heightmap, vec2(position.x, position.z));
    occlusion = max(texture2D(occlusionmap, vec2(position.x, position.z)).b, 0.2);
    vec3 position = vec3(position.x, heightPixel.a, position.z);
    surfaceNormal = normalize(heightPixel.rbg - 0.5);

    // dot(position.xz, vec2(1.0, 0.0)) 是在x-z平面里， 点在x轴上投影的坐标
    uv = vec2(position.z, dot(position.xz, vec2(1.0, 0.0)) * 0.5 + 0.5) * vec2(50.0);
    // 切线
    vec3 surfaceTangent = normalize(cross(surfaceNormal, vec3(0.0, 1.0, 0.0)));
    // 副法线
    vec3 surfaceBinormal = normalize(cross(surfaceNormal, surfaceTangent));
    tbn = mat3(surfaceTangent, surfaceBinormal, surfaceNormal);
    transform(position);
}