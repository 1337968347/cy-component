attribute vec3 position;
attribute vec3 vNormal;

varying vec3 surfaceNormal;

/// import "transform.glsl"

void main() {
    transform(position);
    surfaceNormal = normalize((modelTransform * vec4(vNormal, 0.0)).xyz);
}