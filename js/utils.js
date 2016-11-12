function loadProject(name, scene) {
  var project = config.projects[name];
  if (!project) return;

  var model, geo, light;
  var dir = "models/"+project.name+"/";

  var loader = new THREE.JSONLoader();
  var textureLoader = new THREE.TextureLoader();

  /* add all models in project */
  if (project.models) {
    for (var i=0; i<project.models.length; i++) {
      model = project.models[i];
      loadModel(model, project, loader, textureLoader, dir, scene);
    }
  }

  /* generate all geometry for project */
  if (project.geometry) {
    for (var i=0; i<project.geometry.length; i++) {
      geo = project.geometry[i];
      loadGeo(geo, project, textureLoader, dir, scene);
    }
  }

  /* make the lights for project */
  if (project.lights) {
    for (var i=0; i<project.lights.length; i++) {
      light = project.lights[i];
      loadLight(light, project, scene);
    }
  }

  doSetup(project.setup);
}

function loadModel(model, project, loader, textureLoader, dir, scene) {
  var material = newMaterial(model.material, textureLoader, dir);

  loader.load(dir+model.name,
  function (geometry) {
    geometry.computeVertexNormals();
    var mesh = newMesh(geometry, project, model, material);
    scene.add(mesh);
  },
  function (ret) {
    var percent = 100 * ret.loaded / ret.total;
    console.log(Math.round(percent, 2) + "% downloaded: " + model.name);
  });
}

function loadGeo(geo, project, textureLoader, dir, scene) {
  var geometry = newWithParams(geo.type, geo.params);

  var material = newMaterial(geo.material);

  var mesh = newMesh(geometry, project, geo, material);
  scene.add(mesh);
}

function loadLight(lt, project, scene) {
  var light = newWithParams(lt.type, lt.params);
  applyGenericProperties(light, project, lt);

  scene.add(light);
}

function newWithParams(cls, params) {
  // this function creates an instance of cls with parameter array
  var newParams;
  if (params) {
    // don't mutate original param array
    newParams = params.slice(0);
    // turns [a,b,c] into [0,a,b,c]; need this to construct object
    newParams.unshift(0);
  }
  else newParams = [0];
  // magic
  return new ( cls.bind.apply(cls, newParams) )();
}

function newMaterial(mat, textureLoader, dir) {
  var material;

  // if material not specified in config, return default material
  if (!mat) return new THREE.MeshPhongMaterial ({});

  // if type not specified, default material is Phong
  if (mat.type) material = newWithParams(mat.type);
  else material = new THREE.MeshPhongMaterial({});

  if ("color" in mat) material.color = new THREE.Color(mat.color);
  if ("specular" in mat) material.specular = new THREE.Color(mat.specular);
  if ("shininess" in mat) material.shininess = mat.shininess;
  if ("normalMap" in mat) {
    material.normalMap = textureLoader.load(dir+mat.normalMap,
      function(t) { if ("flipY" in mat) t.flipY = mat.flipY; });
  }
  if ("normalScale" in mat) material.normalScale = mat.normalScale;
  if ("shading" in mat) material.shading = mat.shading;
  if ("side" in mat) material.side = mat.side;

  return material;
}

function newMesh(geometry, project, params, material) {
  var mesh = new THREE.Mesh(geometry,material);

  applyGenericProperties(mesh, project, params);

  return mesh;
}

function applyGenericProperties(obj, project, params) {
  // incrementing
  if (project.offset) obj.position.add(new THREE.Vector3().fromArray(project.offset));
  if (project.scale) obj.scale.multiply(new THREE.Vector3().fromArray(project.scale));
  if (params.offset) obj.position.add(new THREE.Vector3().fromArray(params.offset));
  if (params.scale) obj.scale.multiply(new THREE.Vector3().fromArray(params.scale));
  // setting
  if (params.rotation) obj.rotation.set.apply(obj.rotation, params.rotation);
  else if (project.rotation) obj.rotation.set.apply(obj.rotation, project.rotation);
  if (params.position) obj.position.set.apply(obj.position, params.position);
  else if (project.position) obj.position.set.apply(obj.position, project.position);

  if ("castShadow" in params) obj.castShadow = params.castShadow;
  if ("receiveShadow" in params) obj.receiveShadow = params.receiveShadow;
}

function doSetup(setup) {
  if (!setup) return;
  if (setup.camera) {
    initCam(setup.camera);
  }
}
