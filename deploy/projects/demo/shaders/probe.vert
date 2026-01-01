varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec4 wPosition = modelViewMatrix * vec4(position, 1.0);
    vPosition = wPosition.xyz; // 将顶点位置传递给插值变量
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * wPosition;
}