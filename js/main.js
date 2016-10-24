var container;
var camera, scene, renderer;
var mouseX, mouseY;

var radius = 5;
var radiusDelta = 1;
var origin = new THREE.Vector3(0,0,0);

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 100);
  camera.position.set(radius,0,0);
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
  scene.add(barLight);

  /* GEOMETRY */
  /*var loader = new THREE.OBJLoader();
  var textureLoader = new THREE.TextureLoader();
  var material = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    specular: 0x222222,
    shininess: 55,
    normalMap: textureLoader.load('models/test/test_cube_normals.png',function(t) {t.flipY=false;})
  });
  loader.load('models/test/test_cube.OBJ' ,function (object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
      child.position.set(0,-.1,0);
    });
    scene.add(object);
  });*/
  var loader = new THREE.JSONLoader();
  var textureLoader = new THREE.TextureLoader();

  var material = new THREE.MeshPhongMaterial ({
    color: 0xffffff,
    specular: 0x222222,
    shininess: 35,
    normalMap: textureLoader.load('models/7/7_34k_nm_2048.png', function(t) {t.flipY=false;})
  });
  loader.load('models/7/7_34k_js.json', function (geometry) {
    geometry.computeVertexNormals();
    scene.add(new THREE.Mesh(geometry, material));
  });

  /* RENDER */
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.body.addEventListener('mousemove', onDocumentMousemove, false);
  document.body.addEventListener('mousewheel', onMousewheel, false);
  document.body.addEventListener('DOMMouseScroll', onMousewheel, false); //Firefox
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMousewheel(e) {
  var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):(e.detail));
  radius += (d>0)?radiusDelta:(-1*radiusDelta);
}

function onDocumentMousemove (event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var phi = mouseX * Math.PI;
  var theta = (-1 * mouseY + 1) * Math.PI / 2;
  camera.position.x = radius * Math.cos(phi) * Math.sin(theta);
  camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
  camera.position.y = radius * Math.cos(theta);
  camera.lookAt(origin);
  renderer.render(scene, camera);
}
