precision highp float;

uniform mat4 shadowMat4;


void main() {

    vec3 eyeNormal = normalize(eye - worldPosition);
    vec3 sun = color + sunLight(surfaceNormal, eyeNormal, 205.0, 0.3, 0.7);
    gl_FragColor = vec4(sun, 1.0);
}
