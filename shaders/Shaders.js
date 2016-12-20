/* access shader text through the Shaders object */

var test_vert = " \
varying vec3 vWorldPos; \
varying vec3 vSunPos; \
uniform vec3 sunPos; \
void main() { \
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz; \
  vSunPos = sunPos; \
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); \
}";
var test_frag = " \
varying vec3 vWorldPos; \
varying vec3 vSunPos; \
void main() { \
  float dist = 1.0 - length((vWorldPos-vec3(0,2000.0,0))/4000.0); \
  gl_FragColor = vec4(vec3(dist),1.0);\
}";

var sun_vert = " \
uniform vec3 sunPos; \
uniform float turbidity; \
uniform float mieCoefficient; \
\
varying vec3 vWorldPos; \
varying vec3 vSunDir; \
varying float vSunfade; \
varying vec3 vBetaM; \
varying float vSunE; \
\
const vec3 up = vec3(0.0, 1.0, 0.0); \
\
const float e = 2.71828182845904523536028747135266249775724709369995957; \
const float pi = 3.141592653589793238462643383279502884197169; \
\
const float v = 4.0; \
const vec3 K = vec3(0.686, 0.678, 0.666); \
\
const vec3 lambda = vec3(60E-9, 550E-9, 850E-9); \
\
void main() { \
  vec4 worldPos = modelMatrix * vec4(position, 1.0); \
  vWorldPos = worldPos.xyz; \
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); \
  \
  vSunDir = normalize(sunPos); \
  \
  float sunTheta = acos(dot(vSunDir, up)); \
  vSunE = 1000.0 * max(0.0, 1.0 - pow(e, -(sunTheta/49.5))); \
  vSunfade = clamp(exp(sunPos.y / length(sunPos)), -1.0, 1.0); \
  \
  float c = (0.2 * turbidity) * 10E-18; \
  vBetaM = (0.434 * c * pi * pow((2.0 * pi) / lambda, vec3(v-2.0)) * K) * mieCoefficient; \
}";
var sun_frag = " \
\
varying vec3 vWorldPos; \
varying vec3 vSunDir; \
varying float vSunfade; \
varying vec3 vBetaM; \
varying float vSunE; \
\
uniform float luminance; \
uniform float g; \
\
const float pi = 3.141592653589793238462643383279502884197169; \
\
const float mieZenithLength = 1.25e3; \
const vec3 up = vec3(0.0, 1.0, 0.0); \
\
const float A = 0.15; \
const float B = 0.50; \
const float C = 0.10; \
const float D = 0.20; \
const float E = 0.02; \
const float F = 0.30; \
\
void main() { \
  float thetaZ = acos(max(0.0, dot(up, normalize(vWorldPos)))); \
  float sM = mieZenithLength / (cos(thetaZ) + 0.15 * pow(1.63860237 - thetaZ, -1.253)); \
  \
  vec3 Fex = exp(-vBetaM * sM); \
  \
  float cosTheta = dot(normalize(vWorldPos), vSunDir); \
  \
  float mPhase = (1.0 / (4.0*pi)) * (1.0-pow(g, 2.0)) / pow(1.0 - 2.0*g*cosTheta + pow(g, 2.0), 1.5); \
  vec3 betaMTheta = vBetaM * mPhase; \
  \
  vec3 Lin = pow(vSunE * mPhase * (1.0 - Fex),vec3(1.5)); \
  \
  vec3 x = (log2(2.0/pow(luminance,4.0))) * Lin * 0.04; \
  vec3 color = ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F; \
  \
  vec3 retColor = pow(color, vec3(1.0/(1.2+(1.2*vSunfade)))); \
  gl_FragColor.rgb = retColor + 0.1; \
  gl_FragColor.a = 1.0; \
}";

var Shaders = {
  test: {
    vertexShader: test_vert,
    fragmentShader: test_frag,
    uniforms: {
      sunPos: new THREE.Vector3(0,4500*Math.sin(Math.PI/6),4500*Math.cos(Math.PI/6))
    }
  },
  sun: {
    vertexShader: sun_vert,
    fragmentShader: sun_frag,
    uniforms: {
      sunPos: { value: new THREE.Vector3(0,20000*Math.sin(Math.PI/8),-20000*Math.cos(Math.PI/8)) },
      turbidity: { value: 10 },
      mieCoefficient: { value: 0.13 },
      luminance: { value: 1.1 },
      g: { value: 0.965 }
    }
  }
};
