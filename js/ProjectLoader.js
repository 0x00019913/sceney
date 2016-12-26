function ProjectLoader(scene) {
  this.scene = scene;
  this.loaders = {};
  this.textureLoader = new THREE.TextureLoader();
  this.project = {};
  this.path = "";
  /* these fields need special treatment and can't be filled directly (e.g.,
  have to convert a texture name into THREE.Texture with a loader) */
  this.specialParams = {
    model: ["name", "format", "material", "position", "offset", "rotation", "scale"],
    geolight: ["type", "params", "material", "position", "offset", "rotation", "scale"],
    material: ["type", "color", "specular", "map", "normalMap", "bumpMap", "aoMap", "shadowMapWidth", "shadowMapHeight"]
  };
}

ProjectLoader.prototype = {
  load: function (path, configName) {
    var req = new XMLHttpRequest();
    this.path = path + "/";

    if (!configName) configName = "config.json";
    var fullpath = this.path + configName;

    req.open('GET', fullpath, true),
    console.log(this);
    req.onreadystatechange = function() {
      // if JSON file loaded
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        loadProject(JSON.parse(req.responseText).project);
      }
    };
    req.send();
  },

  loadProject: function (project) {
    // parse out the project config as a JS object
    this.project = project;
    console.log("PROJECT: ", this.project); // DEBUG
    if (!this.project) {
      console.log("ProjectLoader: no project loaded from "+fullpath);
      return;
    }

    if (!this.project.name) {
      console.log("ProjectLoader: no name specified in project at "+fullpath);
      return;
    }

    console.log("Loading project: ",this.project.name);

    var model, geo, light;

    /* add all models in project */
    if (project.models) {
      for (var i=0; i<project.models.length; i++) {
        model = project.models[i];
        this.loadModel(model);
      }
    }

    /* generate all geometry for project */
    if (project.geometry) {
      for (var i=0; i<project.geometry.length; i++) {
        geo = project.geometry[i];
        this.loadGeo(geo);
      }
    }

    /* make the lights for project */
    if (project.lights) {
      for (var i=0; i<project.lights.length; i++) {
        light = project.lights[i];
        this.loadLight(light, project);
      }
    }

    //doSetup(project.setup);
  },

  loadModel: function (model) {
    console.log("LOADING MODEL ", model);
    var material = this.newMaterial(model.material);
    var loader = this.getLoader(model);

    //addLoadingElement(model.name);

    loader.load(this.path + model.name,
    function (obj) {
      if (model.format=="JSON") {
        obj.mergeVertices();
        obj.computeVertexNormals();
        var mesh = new THREE.Mesh(obj, material);
        applyGenericProperties(mesh, model);
        this.scene.add(mesh);
      }
      if (model.format=="OBJ") {
        obj.traverse (function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = material;
            applyGenericProperties(child, model);
          }
        });
        this.scene.add(obj);
      }
    },
    function (ret) {
      var percent = 100 * ret.loaded / ret.total;
      console.log(Math.round(percent, 2) + "% downloaded: " + model.name);
    });
  },

  loadGeo: function (geo) {
    console.log("LOADING GEO ", geo);
    var geometry = this.newWithParams(geo.type, geo.params);

    var material = this.newMaterial(geo.material);

    var mesh = new THREE.Mesh(geometry, material);
    this.applyGenericProperties(mesh, project, geo);
    this.fillSimpleValues(geo, geometry, "geolight");
    this.scene.add(mesh);
  },

  loadLight: function (lt) {
    var light = this.newWithParams(lt.type, lt.params);
    this.applyGenericProperties(light, lt);
    this.fillSimpleValues(lt, light, "geolight");
    this.scene.add(light);
  },

  newMaterial: function (mat) {
    var material, faceMaterials;

    // if material not specified in config, return default material
    if (!mat) return new THREE.MeshPhongMaterial ({});

    if (mat.type) {
      if (mat.type==THREE.MeshFaceMaterial) {
        // if MeshFaceMaterial, make new materials for each face and return
        var faceMaterials = [];
        for (var i=0; i<mat.materials.length; i++) {
          faceMaterials.push(this.newMaterial(mat.materials[i], textureLoader, dir));
        }
        return new THREE.MeshFaceMaterial(faceMaterials);
      }
      else {
        material = this.newWithParams(mat.type);
      }
    }
    // if type not specified, default material is Phong
    else material = new THREE.MeshPhongMaterial({});

    if ("color" in mat) material.color = new THREE.Color(mat.color);
    if ("specular" in mat) material.specular = new THREE.Color(mat.specular);
    if ("normalMap" in mat) {
      material.normalMap = this.textureLoader.load(this.path + mat.normalMap,
        function(t) { if ("flipY" in mat) t.flipY = mat.flipY; });
    }
    if ("map" in mat) {
      material.map = this.textureLoader.load(this.path + mat.map,
        function(t) { if ("flipY" in mat) t.flipY = mat.flipY; });
    }
    if ("bumpMap" in mat) {
      material.bumpMap = textureLoader.load(this.path + mat.bumpMap,
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
    this.fillSimpleValues(mat, material, "material");

    return material;
  },

  newWithParams: function (cls, params) {
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
};
