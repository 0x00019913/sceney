var container;
var camera, scene, renderer;
var mouseX, mouseY;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 2000);
    camera.position.z = 5;

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

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
        obj.position.y = -95;
        scene.add(obj);
    }, onProgress, onError);

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
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
