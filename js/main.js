var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0, mouseXprev, mouseYprev, dX, dY;

var mouseButton = -1;

var projectName = "13";

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
  scene.add(hemiLight);

  var cubeGeometry = new THREE.BoxGeometry(.1,.1,.1);
  var cubeLight = new THREE.PointLight(0xffffff, 10, 100, 2);
  var cubeLight2 = new THREE.PointLight(0xffffff, 2, 100, 2);
  /*var cubeMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 2,
    color: 0x666666
  });
  cubeLight.add(new THREE.Mesh(cubeGeometry, cubeMat));
  cubeLight2.add(new THREE.Mesh(cubeGeometry, cubeMat));*/
  cubeLight.position.set(0,25,-5);
  cubeLight2.position.set(0,5,10);
  cubeLight.castShadow = true;
  cubeLight2.castShadow = true;
  scene.add(cubeLight);
  scene.add(cubeLight2);

  /* GEOMETRY */
  var envGeometry = new THREE.BoxGeometry(200,200,200);
  var envMaterial = new THREE.MeshPhongMaterial({
    color: 0x111111,
    specular: 0x0,
    shininess: 0,
    side: THREE.BackSide
  });
  var env = new THREE.Mesh(envGeometry, envMaterial);
  env.position.y = 80;
  scene.add(env);

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
