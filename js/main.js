var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0, mouseXprev, mouseYprev, dX, dY;

var mouseButton = -1;

var projectName = "39";

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 1024);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0);

  /* LIGHTS */
  var dirLight = new THREE.DirectionalLight(0xffffff, .2);
  dirLight.position.set(0,0,15);
  //scene.add(dirLight);
  var hemiLight = new THREE.HemisphereLight(0x999999, 0x000000, .1);
  hemiLight.position.set(0,20,0);
  //scene.add(hemiLight);

  var box = new THREE.BoxGeometry(.1,.1,.1);
  var boxlight = new THREE.PointLight(0xffffff, 6, 100, 2);
  var boxmat = new THREE.MeshStandardMaterial({
    emissive: 0xff0000,
    emissiveIntensity: 1,
    color: 0x000000
  });
  boxlight.add(new THREE.Mesh(box, boxmat));
  boxlight.castShadow = true;
  boxlight.position.set(0,0,50);
  //scene.add(boxlight);

  /* GEOMETRY */
  loadProject(projectName, scene);
  positionCamera(camera);

  /* RENDER */
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
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

  if (mouseButton==0) { // LMB
    handleLMB(dX, dY);
  }

  if (mouseButton==1) { // MMB
    handleMMB(dX, dY);
  }
}

function onMousewheel(e) {
  var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):(e.detail));
  handleWheel(d);
}

function onMouseDown(e) { mouseButton = e.button; }
function onMouseUp(e) { mouseButton = -1; }
function onMouseEnter(e) { mouseButton = -1; }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  positionCamera(camera);
  renderer.render(scene, camera);
}
