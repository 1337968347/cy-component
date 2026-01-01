precision highp float;

uniform float clip;
uniform vec3 eye;
uniform sampler2D snowTexture;
uniform vec3 groundColor;
uniform vec3 snowColor;

varying float occlusion;
varying vec3 worldPosition;
varying vec3 surfaceNormal;
varying vec2 uv;
varying mat3 tbn;

/// import "sun.glsl"

vec3 lightHemisphere(const vec3 surfaceNormal) {
  float costheta = dot(surfaceNormal, vec3(0.0, 1.0, 0.0));
  float a = max(costheta, 0.0);

  if(a > 0.3) {
    return mix(groundColor, snowColor, a);
  }
  return groundColor;
}

void main() {
  if(worldPosition.y > clip) {
    discard;
  }
  vec4 sample = texture2D(snowTexture, uv);
  vec3 normal = normalize(normalize(sample.rgb - 0.5) * tbn + surfaceNormal);
  vec3 eyeNormal = normalize(eye - worldPosition);
  vec3 color = lightHemisphere(normal) + sunLight(normal, eyeNormal, 100.0, 5.0, 0.5);

  float depth = length(worldPosition - eye);
  gl_FragColor = vec4(color * occlusion, depth);
}