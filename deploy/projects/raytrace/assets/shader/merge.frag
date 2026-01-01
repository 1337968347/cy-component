precision highp float;

varying vec2 screenPosition;
uniform sampler2D texture;
uniform sampler2D oneTimeTexture;
uniform float textureWeight;

void main() {
    vec3 oneTimeColor = texture2D(oneTimeTexture, screenPosition).xyz;
    vec3 prevColor = texture2D(texture, screenPosition).xyz;
    gl_FragColor = vec4(mix(oneTimeColor, prevColor, textureWeight), 1.0);
}