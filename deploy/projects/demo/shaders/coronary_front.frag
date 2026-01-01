uniform float constantAttenuation;
uniform float linearAttenuation;
uniform float quadraticAttenuation;
uniform vec3 sunPos;
uniform vec3 lightColor;
uniform mat4 plane;
uniform vec3 lineL;
uniform vec3 lineR;
uniform vec3 probePos;

uniform sampler2D textureMap;
uniform sampler2D normalMap;
varying vec3 vPosition;
varying vec2 vUv;
varying mat3 TBN;

const float Thickness = 0.15;

void main() {
    vec4 pos = plane * vec4(vPosition, 1.0);
    float len = distance(sunPos, vPosition);
    vec3 normal = normalize(TBN * texture2D(normalMap, vUv).xyz);
    vec3 textureColor = texture2D(textureMap, vUv).xyz;

    float attenuation = 1.0 / (constantAttenuation + linearAttenuation * len + quadraticAttenuation * len * len);
    vec3 light = normalize(sunPos - vPosition);

    vec3 reflectDirection = reflect(-light, normal);
    vec3 viewDirection = normalize(vec3(0.0, 0.0, 5.0) - vPosition);
    float specular = pow(max(dot(reflectDirection, viewDirection), 0.0), 15.0);

    float diffuse = max(dot(light, normal), 0.0);
    float alight = 0.25 + diffuse + specular;
    alight *= attenuation;

    /** 计算是否在朝向屏幕空间的扇形区域内 */
    vec3 OA = lineL - probePos;
    vec3 OB = lineR - probePos;
    vec3 OP = vPosition - probePos;
    /** 朝向屏幕空间 */
    OA = normalize(vec3(OA.x, OA.y, 0.0));
    OB = normalize(vec3(OB.x, OB.y, 0.0));
    OP = normalize(vec3(OP.x, OP.y, 0.0));
    vec3 n = cross(OB, OA);

    // /** 剖面是否朝向背面 */
    bool isFaceBack = n.z < 0.0;

    vec3 m1 = cross(OP, OA);
    vec3 m2 = cross(OB, OP);
    /** 是否是锐角内 */
    bool isAcuteInner = dot(m1, n) > 0.0 && dot(m2, n) > 0.0;
    bool isFrontDiscard = (pos.z >= 0.0);
    if(isFaceBack) {
        isFrontDiscard = (pos.z <= 0.0);
    }

    if(!isFrontDiscard) {
        discard;
    } else {
        // if(isAcuteInner) {
        //     discard;
        // }
        gl_FragColor = vec4(vec3(0.3) * lightColor * alight * 0.7, 0.5);
    }

    if(gl_FrontFacing == false) {
        gl_FragColor = vec4(0.784, 0.46, 0.47, 1.0);
    }
}