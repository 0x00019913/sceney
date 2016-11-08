var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0, mouseXprev, mouseYprev, dX, dY;

var mouseButton = -1;

var cam = initCam(CylCam); // init settings for camera behavior

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 100);
  positionCamera(cam, camera);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0);

  /* LIGHTS */
  var dirLight = new THREE.DirectionalLight(0xffffff, .2);
  dirLight.position.set(0,0,10);
  scene.add(dirLight);
  var hemiLight = new THREE.HemisphereLight(0x999999, 0x000000, .1);
  hemiLight.position.set(0,20,0);
  scene.add(hemiLight);

  var cubeGeometry = new THREE.BoxGeometry(.1,.1,.1);
  var cubeLight = new THREE.PointLight(0xffffff, 2, 100, 1);
  var cubeMat = new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    emissiveIntensity: 2,
    color: 0x666666
  });
  cubeLight.add(new THREE.Mesh(cubeGeometry, cubeMat));
  cubeLight.position.set(0,25,-5);
  cubeLight.castShadow = true;
  scene.add(cubeLight);

  /* GEOMETRY */
  var groundGeometry = new THREE.PlaneGeometry(50,50);
  var groundMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0x999999,
    metalness: 1,
    bumpScale: 0.0005
  });
  var ground = new THREE.Mesh (groundGeometry, groundMaterial);
  //ground.receiveShadow = true;
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -4.4;
  //scene.add(ground);

  loadProject("13", scene);

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
    handleLMB(cam, dX, dY);
  }

  if (mouseButton==1) { // MMB
    handleMMB(cam, dX, dY);
  }
}

function onMousewheel(e) {
  var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):(e.detail));
  handleWheel(cam, d);
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
  positionCamera(cam, camera);
  renderer.render(scene, camera);
}
