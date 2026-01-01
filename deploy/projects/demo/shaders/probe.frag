uniform vec3 sunPos;
uniform vec3 lightColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 light = normalize(sunPos - vPosition);
    float alight = max(dot(light, vNormal), 0.0);

    alight += 0.25;

    gl_FragColor = vec4(lightColor * alight, 1.0);

}