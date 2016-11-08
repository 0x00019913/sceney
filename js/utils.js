function loadProject(name, scene) {
  var project = config.projects[name];
  if (!project) return;

  var model;
  var materials = [];
  var dir = "models/"+project.name+"/";

  var loader = new THREE.JSONLoader();
  var textureLoader = new THREE.TextureLoader();

  /* add all models in project */
  for (var i=0; i<project.models.length; i++) {
    model = project.models[i];
    loadModel(model, project, loader, textureLoader, dir);
  }

  doSetup(project.setup);
}

function loadModel(model, project, loader, textureLoader, dir) {
  var material = new THREE.MeshPhongMaterial ({
    color: 0xffffff,
    specular: 0x222222,
    shininess: 35
  });
  if (model.color) {
    material.color = new THREE.Color(model.color);
  }
  if (model.normalmap) {
    material.normalMap = textureLoader.load(dir+model.normalmap,
      function(t) {t.flipY=!model.flipped;});
  }
  if (model.shading) {
    material.shading = model.shading;
  }

  loader.load(dir+model.name,
  function (geometry) {
    geometry.computeVertexNormals();
    var mesh = new THREE.Mesh(geometry,material);
    console.log(project);
    if (project.rotation) {
      mesh.rotation.x += project.rotation[0];
      mesh.rotation.y += project.rotation[1];
      mesh.rotation.z += project.rotation[2];
    }
    if (project.offset) {
      mesh.position.x += project.offset[0];
      mesh.position.y += project.offset[1];
      mesh.position.z += project.offset[2];
    }
    scene.add(mesh);
  },
  function (ret) {
    var percent = 100 * ret.loaded / ret.total;
    console.log(Math.round(percent, 2) + "% downloaded: " + model.name);
  });
}

function doSetup(setup) {
  if (setup.r) r = setup.r;
}
