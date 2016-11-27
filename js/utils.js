function loadProject(name) {
  console.log("Project name: ",name);
  var project = config.projects[name];
  if (!project) return;

  var model, geo, light;
  var dir = "models/"+project.name+"/";

  var loaders = {}, loader;
  var textureLoader = new THREE.TextureLoader();

  /* add all models in project */
  if (project.models) {
    for (var i=0; i<project.models.length; i++) {
      model = project.models[i];
      loadModel(model, project, loaders, textureLoader, dir, scene);
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

function getLoader(model, loaders) {
  var loader;
  var format = model.format;
  if (!format) {
    format = "JSON"; // default format is JSON
    model.format = format; // set missing format in config to default
  }

  // return loader if it exists
  if (format in loaders) return loaders[format];

  // make loader if doesn't exist
  if (format=="JSON") loader = new THREE.JSONLoader();
  if (format=="OBJ") loader = new THREE.OBJLoader();

  // cache for future use and return
  loaders[format] = loader;
  return loader;
}

function loadModel(model, project, loaders, textureLoader, dir, scene) {
  var material = newMaterial(model.material, textureLoader, dir);
  var loader = getLoader(model, loaders);

  addLoadingElement(model.name);

  loader.load(dir+model.name,
  function (obj) {
    if (model.format=="JSON") {
      obj.mergeVertices();
      obj.computeVertexNormals();
      var mesh = new THREE.Mesh(obj, material);
      applyGenericProperties(mesh, project, model);
      scene.add(mesh);
    }
    if (model.format=="OBJ") {
      obj.traverse (function(child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          applyGenericProperties(child, project, model);
        }
      });
      scene.add(obj);
    }
  },
  function (ret) {
    var percent = 100 * ret.loaded / ret.total;
    console.log(Math.round(percent, 2) + "% downloaded: " + model.name);
  });
}

function loadGeo(geo, project, textureLoader, dir, scene) {
  var geometry = newWithParams(geo.type, geo.params);

  var material = newMaterial(geo.material, textureLoader, dir);

  var mesh = new THREE.Mesh(geometry, material);
  applyGenericProperties(mesh, project, geo);
  scene.add(mesh);
}

function loadLight(lt, project, scene) {
  var light = newWithParams(lt.type, lt.params);
  applyGenericProperties(light, project, lt);
  if ("shadowMapWidth" in lt) light.shadow.mapSize.width=lt.shadowMapWidth;
  if ("shadowMapHeight" in lt) light.shadow.mapSize.height=lt.shadowMapHeight;
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
  var material, faceMaterials;

  // if material not specified in config, return default material
  if (!mat) return new THREE.MeshPhongMaterial ({});

  // if type not specified, default material is Phong
  if (mat.type) {
    if (mat.type==THREE.MeshFaceMaterial) {
      // if MeshFaceMaterial, make new materials for each face and return
      var faceMaterials = [];
      for (var i=0; i<mat.materials.length; i++) {
        faceMaterials.push(newMaterial(mat.materials[i], textureLoader, dir));
      }
      return new THREE.MeshFaceMaterial(faceMaterials);
    }
    else {
      material = newWithParams(mat.type);
    }
  }
  else material = new THREE.MeshPhongMaterial({});

  if ("color" in mat) material.color = new THREE.Color(mat.color);
  if ("specular" in mat) material.specular = new THREE.Color(mat.specular);
  if ("shininess" in mat) material.shininess = mat.shininess;
  if ("normalMap" in mat) {
    material.normalMap = textureLoader.load(dir+mat.normalMap,
      function(t) { if ("flipY" in mat) t.flipY = mat.flipY; });
  }
  if ("bumpMap" in mat) {
    material.bumpMap = textureLoader.load(dir+mat.bumpMap,
      function(t) { if ("flipY" in mat) t.flipY = mat.flipY; },
      function (ret) {
        var percent = 100 * ret.loaded / ret.total;
        console.log(Math.round(percent, 2) + "% downloaded: " + mat.bumpMap);
      });
  }
  if ("aoMap" in mat) {
    material.aoMap = textureLoader.load(dir+mat.aoMap,
      function(t) { if ("flipY" in mat) t.flipY = mat.flipY; });
  }
  if ("normalScale" in mat) material.normalScale = mat.normalScale;
  if ("shading" in mat) material.shading = mat.shading;
  if ("side" in mat) material.side = mat.side;
  if ("needsUpdate" in mat) material.needsUpdate = mat.needsUpdate;

  return material;
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
  if (!setup) {
    initCam(null);
    return;
  }
  initCam(setup.camera);
}

function clearScene() {
  for (var i=scene.children.length-1; i>=0; i--) {
    scene.remove(scene.children[i]);
  }
}

function addLoadingElement(name) {
    var overlay = document.getElementById('loading-overlay');

    var el = document.createElement('div');
    el.className = "loadingElement";

    var elementName = document.createElement('div');
    elementName.className = "elementName";
    elementName.innerHTML = name.toUpperCase();

    var progressBar = document.createElement('div');
    progressBar.className = "progressBar";
    progressBar.id = name + "progress";

    el.appendChild(elementName);
    el.appendChild(progressBar);

    overlay.appendChild(el);
}
