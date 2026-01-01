precision highp float;

varying float depth;
varying vec3 worldPosition;
// 地平线
uniform vec3 horizonColor;
// 天空颜色
uniform vec3 skyColor;
// 太阳颜色
uniform vec3 sunColor;
uniform vec3 sunDirection;

void main() {
    vec3 direction = normalize(worldPosition);
    float a = abs(dot(direction, vec3(0, 1, 0)));
    // 天空的颜色
    vec3 skyColor = mix(horizonColor, skyColor, a);
    // 太阳方向跟当前顶点方向的夹角
    float sunTheta = max(dot(direction, sunDirection), 0.0);
    // 太阳
    vec3 sun = max(sunTheta - 0.9985, 0.0) * sunColor * 1000.0;
    // 光晕 光晕可以用太阳的颜色 减去天空的颜色
    vec3 sunAtmosphere = max(sunColor - skyColor, vec3(0.0)) * max(sunTheta - 0.997, 0.0) * 40.0;
    sunAtmosphere = sunAtmosphere * sunAtmosphere * 50.0 * vec3(2.0, 1.5, 0.4);
    gl_FragColor = vec4(skyColor + sun + sunAtmosphere, depth);
}