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
  var m = model.material;
  if (m.color) material.color = new THREE.Color(m.color);
  if (m.specular) material.specular = new THREE.Color(m.specular);
  if (m.shininess) material.shininess = m.shininess;
  if (m.normalMap) {
    material.normalMap = textureLoader.load(dir+m.normalMap,
      function(t) { if ("flipY" in m) t.flipY = m.flipY; });
  }
  if (m.normalScale) material.normalScale = m.normalScale;
  if (m.shading) material.shading = m.shading;

  loader.load(dir+model.name,
  function (geometry) {
    geometry.computeVertexNormals();
    var mesh = new THREE.Mesh(geometry,material);
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
    if (model.offset) {
      mesh.position.x += model.offset[0];
      mesh.position.y += model.offset[1];
      mesh.position.z += model.offset[2];
    }
    if (model.scale) {
      mesh.scale.x = model.scale[0];
      mesh.scale.y = model.scale[1];
      mesh.scale.z = model.scale[2];
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  },
  function (ret) {
    var percent = 100 * ret.loaded / ret.total;
    console.log(Math.round(percent, 2) + "% downloaded: " + model.name);
  });
}

function doSetup(setup) {
  if (setup.camera) {
    initCam(setup.camera);
  }
}
