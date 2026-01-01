attribute vec3 position;

varying vec4 projected;

/// import "transform.glsl"

void main() {
  transform(position);
  projected = gl_Position;
}