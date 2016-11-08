var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0, mouseXprev, mouseYprev, dX, dY;

var mouseButton = -1;

var r = 3, phi = Math.PI/2, theta = Math.PI/2;
var rRate = 1, thetaRate = -3, phiRate = 3;
var xPanRate = 2.5, yPanRate = 2.5;
// clamp theta to these values so that phi rotation works
// if theta is at an extreme value; clamp r to prevent
// zooming in past 0
var thetaLL = .01, thetaUL = Math.PI - .01, rLL = .01;
var origin = new THREE.Vector3(0,-0.10,0);

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 100);
  camera.position.set(r,0,0);
  camera.lookAt(origin);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0);

  /* LIGHTS */
  var dirLight = new THREE.DirectionalLight(0xffffff, .5);
  dirLight.position.set(0,0,10);
  scene.add(dirLight);
  var hemiLight = new THREE.HemisphereLight(0x999999, 0x000000, .4);
  hemiLight.position.set(0,20,0);
  scene.add(hemiLight);

  var barGeometry = new THREE.BoxGeometry(.1,.1,.1);
  var barLight = new THREE.PointLight(0xffee88, .5, 100, 1);
  var barMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 2,
    color: 0x666666
  });
  barLight.add(new THREE.Mesh(barGeometry, barMat));
  barLight.position.set(0,5,0);
  barLight.castShadow = true;
  //scene.add(barLight);

  /* GEOMETRY */
  var groundGeometry = new THREE.PlaneGeometry(15,15);
  var groundMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005
  });
  var ground = new THREE.Mesh (groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -1.2;
  //scene.add(ground);
  loadProject("13", scene);

  /* RENDER */
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.addEventListener('mousemove', onMousemove, false);
  document.body.addEventListener('mousedown', onMouseDown, false);
  document.body.addEventListener('mouseup', onMouseUp, false);
  document.body.addEventListener('mouseenter', onMouseEnter, false);
  document.body.addEventListener('mousewheel', onMousewheel, false);
  document.body.addEventListener('DOMMouseScroll', onMousewheel, false); //Firefox
  window.addEventListener('resize', onWindowResize, false);
}

function onMousemove (e) {
  mouseXprev = mouseX;
  mouseYprev = mouseY;
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  dX = mouseX-mouseXprev;
  dY = mouseY-mouseYprev;

  if (mouseButton==0) { // rotating camera
    theta += thetaRate * dY;
    if (theta < thetaLL) theta = thetaLL;
    if (theta > thetaUL) theta = thetaUL;
    phi += phiRate * dX;
  }

  if (mouseButton==1) { // panning
    // Not obvious:
    // default plane (theta=phi=0) is Y up, Z right, so put displacement
    // vector in that plane, rotate around Z to adjust for theta,
    // then rotate around Y to adjust for phi
    var displacement = new THREE.Vector3(0, dY*yPanRate, dX*xPanRate);
    displacement.applyAxisAngle(new THREE.Vector3(0,0,-1),Math.PI/2-theta);
    displacement.applyAxisAngle(new THREE.Vector3(0,1,0),phi);
    displacement.x *= -1; // minus is necessary for some reason
    origin.add(displacement);
  }
}

function onMouseDown(e) { mouseButton = e.button; }
function onMouseUp(e) { mouseButton = -1; }
function onMouseEnter(e) { mouseButton = -1; }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMousewheel(e) {
  var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):(e.detail));
  r += (d>0)?rRate:(-1*rRate);
  if (r<rLL) r = rLL;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x = r * Math.cos(phi) * Math.sin(theta) + origin.x;
  camera.position.z = r * Math.sin(phi) * Math.sin(theta) + origin.z;
  camera.position.y = r * Math.cos(theta) + origin.y;
  camera.lookAt(origin);
  renderer.render(scene, camera);
}
