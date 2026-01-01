precision highp float;

varying vec3 surfaceNormal;

varying vec3 worldPosition;
uniform vec3 color;
uniform vec3 eye;

/// import "sun.glsl"

void main() {

    vec3 eyeNormal = normalize(eye - worldPosition);
    vec3 sun = color + sunLight(surfaceNormal, eyeNormal, 205.0, 0.3, 0.7);
    gl_FragColor = vec4(sun, 1.0);
}
