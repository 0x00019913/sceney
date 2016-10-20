var container;
var camera, scene, renderer;
var mouseX, mouseY;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.getElementById('container');
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 100);
    camera.position.set(0,1,5);

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0,1,5);
    scene.add(directionalLight);

    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    }
    
    var texture = new THREE.Texture();

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function (xhr) {
    };

    var imgloader = new THREE.ImageLoader(manager);
    imgloader.load('models/7/7_texture.png', function (image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    
    var loader = new THREE.OBJLoader(manager);
    loader.load('models/7/7_29k.OBJ', function (obj) {
        obj.traverse( function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });
        obj.position.y = 0;
        scene.add(obj);
    }, onProgress, onError);
      
    cubeMat = new THREE.MeshStandardMaterial( {
        roughness: 0.7,
        color: 0xffffff,
        bumpScale: 0.002,
        metalness: 0.2
    });
    var cubeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
    var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMat);
    cubeMesh.position.set(-0.5, 0.25, 1);
    scene.add(cubeMesh);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMousemove, false);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMousemove (event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY / windowHalfY) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}
