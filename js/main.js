var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0, mouseXprev, mouseYprev;

var mouseButton = -1;

var r = 5, phi = 0, theta = Math.PI/2;
var rRate = 1, thetaRate = -3, phiRate = 3;
// clamp theta to these values so that phi rotation works
// if theta is at an extreme value
var thetaLL = .01, thetaUL = Math.PI - .01;
// theta hat and phi hat (in cartesian coordinates)
var phiH = new THREE.Vector3(0,0,0), thetaH = new THREE.Vector3(0,0,0);
var origin = new THREE.Vector3(0,0,0);
var offset = new THREE.Vector3(0,0,0);

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 100);
  camera.position.set(r,0,0);
  camera.lookAt(origin);

  scene = new THREE.Scene();

  /* LIGHTS */
  var dirLight = new THREE.DirectionalLight(0xffffff, .3);
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
  loadProject("46", scene);

  /* RENDER */
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.addEventListener('mousemove', onMousemove, false);
  document.body.addEventListener('mousedown', onMouseDown, false);
  document.body.addEventListener('mouseup', onMouseUp, false);
  document.body.addEventListener('mousewheel', onMousewheel, false);
  document.body.addEventListener('DOMMouseScroll', onMousewheel, false); //Firefox
  window.addEventListener('resize', onWindowResize, false);
}

function onMousemove (e) {
  mouseXprev = mouseX;
  mouseYprev = mouseY;
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  if (mouseButton==0) {
    theta += thetaRate * (mouseY-mouseYprev);
    if (theta < thetaLL) theta = thetaLL;
    if (theta > thetaUL) theta = thetaUL;
    phi += phiRate * (mouseX-mouseXprev);
  }

  if (mouseButton==1) {
    var sintheta = Math.sin(theta);
    var costheta = Math.cos(theta);
    var cosphi = Math.cos(phi);
    var sinphi = Math.sin(phi);
    thetaH.set(costheta*cosphi, costheta*sinphi, -1*sintheta);
    phiH.set(-1*sinphi, cosphi, 0);
    offset.add(thetaH.multiplyScalar(mouseX-mouseXprev)).add(phiH.multiplyScalar(mouseY-mouseYprev));
    console.log(offset);
    /* Maybe use camera -> origin vector and project along axes? */
  }
}

function onMouseDown(e) { mouseButton = e.button; }
function onMouseUp(e) { mouseButton = -1; }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMousewheel(e) {
  var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):(e.detail));
  r += (d>0)?rRate:(-1*rRate);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x = r * Math.cos(phi) * Math.sin(theta);
  camera.position.z = r * Math.sin(phi) * Math.sin(theta);
  camera.position.y = r * Math.cos(theta);
  camera.position += origin;
  camera.lookAt(origin);
  renderer.render(scene, camera);
}
