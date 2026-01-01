precision highp float;

varying vec2 screenPosition;
uniform sampler2D texture;
uniform sampler2D bloom;

void main() {
  vec4 bloomColor = texture2D(bloom, screenPosition) * 0.5;
  // chromatic abbreviation
  vec4 color1 = texture2D(texture, screenPosition) + bloomColor;
  vec4 color2 = texture2D(texture, screenPosition - vec2(0.0, 0.002)) + bloomColor;
  vec4 color = color1 * vec4(1.0, 0.5, 0.5, 1.0) + color2 * vec4(0.0, 0.5, 0.5, 1.0);

  gl_FragColor = color;

}