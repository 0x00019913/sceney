/* params in config that require special handling;
   can iterate over all other params and set them automatically */
var specialParams = {
  model: ["name", "format", "material", "position", "offset", "rotation", "scale"],
  geolight: ["type", "params", "material", "position", "offset", "rotation", "scale"],
  material: ["type", "color", "specular", "map", "normalMap", "bumpMap", "aoMap"]
};

var config = {};
config.projects = {}
var project = {};
var model = {};
var geo = {};
var light = {};
var material = {}, material1 = {};
var uniforms = {};

// PROJECT FOO
project = {
  name: "FOO",
  geometry: [],
  lights: []
};
//config.projects["FOO"] = project;
geo = {
  type: THREE.PlaneGeometry,
  params: [10,5],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x999999,
    specular: 0x555555,
    shininess: 0
  },
  receiveShadow: true
};
project.geometry.push(geo);
geo = {
  type: THREE.SphereGeometry,
  params: [.1,32,24],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x222222,
    specular: 0x555555,
    shininess: 0
  },
  position: [-4,-2,0.2],
  castShadow: true
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff,2,100,2],
  position: [-5,-2.5,2],
  castShadow: true
};
project.lights.push(light);

// PROJECT 7
project = {
  name: "7",
  altName: "Some Kind of Sphinx",
  models: [],
  lights: [],
  setup: {
    camera: {
      type: FreeCam,
      r: 10
    }
  }
};
//config.projects['7'] = project;
model = {
  name: "7_29k_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0xd2d690,
    specular: 0xffffff,
    shininess: 50,
    shading: THREE.SmoothShading,
    normalMap: "7_29k_nm.png",
    flipY: false
  },
  receiveShadow: true
};
project.models.push(model);
material = {
  type: THREE.MeshPhongMaterial,
  color: 0xd2d690,
  specular: 0xffffff,
  shininess: 50,
  shading: THREE.SmoothShading
};
model = {
  name: "horns_js.json",
  material: material,
  receiveShadow: true
};
project.models.push(model);
model = {
  name: "spine_js.json",
  material: material,
  receiveShadow: true
};
project.models.push(model);
light = {
  type: THREE.PointLight,
  params: [0xffffff,2,100,2],
  position: [0,5,-5],
  castShadow: true
};
project.lights.push(light);
light = {
  type: THREE.PointLight,
  params: [0xffffff,2,100,2],
  position: [0,5,5],
  castShadow: true
};
project.lights.push(light);

// PROJECT 46
project = {
  name: "46",
  altName: "The Antelope Skull (WIP)",
  models: [],
  geometry: [],
  lights: [],
  rotation: [-Math.PI/2, 0, 0],
  setup: {
    camera: {
      type: FreeCam,
      r: 30,
      theta: Math.PI/4,
      phi: Math.PI/4,
      thetaUL: Math.PI/2
    }
  }
};
config.projects['46'] = project;
model = {
  name: "antelope_38k_js.json",
  material: {
    normalMap: "antelope_nm.bmp",
    color: 0xffffff,
    specular: 0x666666,
    shininess: 5
  },
  castShadow: true,
  receiveShadow: true,
  position: [0,0,.5],
  scale: [10,10,10]
};
project.models.push(model);
geo = {
  type: THREE.BoxGeometry,
  params: [200,200,200],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0xffffff,
    specular: 0x0,
    shininess: 0,
    side: THREE.BackSide
  },
  receiveShadow: true,
  position: [0,100,0]
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 1, 100, 2],
  position: [0,20,0]
};
project.lights.push(light);

// PROJECT 13
project = {
  name: "13",
  altName: "The High Priestess",
  models: [],
  geometry: [],
  lights: [],
  offset: [0,8,0],
  setup: {
    camera: {
      type: CylCam,
      r: 30
    }
  }
};
config.projects['13'] = project;
model = {
  name: "13_low_js.json",
  material: {
    normalMap: "13_nm.BMP",
    normalScale: new THREE.Vector2(2,2),
    flipY: false,
    color: 0x111111,
    specular: 0x222121,
    shininess: 50
  }
};
project.models.push(model);
model = {
  name: "eye_js.json",
  material: {
    color: 0x330011,
    specular: 0xdd0000,
    shininess: 100
  }
};
project.models.push(model);
model = {
  name: "rock_js.json",
  material: {
    normalMap: "rock_nm.BMP",
    normalScale: new THREE.Vector2(4,4),
    flipY: false,
    color: 0x191919,
    specular: 0x0,
    shininess: 10
  }
};
project.models.push(model);
material = {
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading
};
model = {
  name: "col2_js.json",
  material: material,
  offset: [-115,45-200,-30],
  scale: [150,150,150]
};
project.models.push(model);
model = {
  name: "col6_js.json",
  material: material,
  offset: [-100,50-200,-90],
  scale: [150,150,150]
};
project.models.push(model);
model = {
  name: "col4_js.json",
  material: material,
  offset: [-40,50-200,-125],
  scale: [150,150,150]
};
project.models.push(model);
model = {
  name: "col2_js.json",
  material: material,
  offset: [47,52-200,-97],
  scale: [150,150,150]
};
project.models.push(model);
model = {
  name: "col4_js.json",
  material: material,
  offset: [65,45-200,-30],
  scale: [150,150,150]
};
project.models.push(model);
model = {
  name: "ground_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0xffffff,
    normalMap: "ground_nm.jpg",
    map: "ground_tex.jpg",
    flipY: true
  },
  scale: [5000,1,5000],
  offset: [0,-5000,0]
};
//project.models.push(model);
geo = {
  type: THREE.BoxGeometry,
  params: [200,200,200],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x111111,
    specular: 0x0,
    shininess: 0,
    side: THREE.BackSide
  },
  receiveShadow: false,
  position: [0,80,0]
};
//project.geometry.push(geo);
geo = {
  type: THREE.SphereGeometry,
  params: [20000, 32, 15],
  material: {
    type: THREE.ShaderMaterial,
    vertexShader: Shaders.sun.vertexShader,
    fragmentShader: Shaders.sun.fragmentShader,
    uniforms: Shaders.sun.uniforms,
    side: THREE.BackSide
  }
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 10, 100, 2],
  position: [0,25,-5],
  castShadow: true
};
project.lights.push(light);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 2, 100, 2],
  position: [0,5,10],
  castShadow: true
};
project.lights.push(light);
light = {
  type: THREE.HemisphereLight,
  params: [0x999999, 0x000000, 0.1],
  position: [0,20,0]
};
project.lights.push(light);
light = {
  type: THREE.DirectionalLight,
  params: [0x644e39, 5],
  position: [0,50,-500]
};
project.lights.push(light);

// PROJECT 14
project = {
  name: "14",
  altName: "The Tower",
  models: [],
  geometry: [],
  lights: [],
  geometry: [],
  setup: {
    camera: {
      type: FreeCam,
      r: 20,
      rLL: 15,
      rUL: 35,
      thetaLL: Math.PI/2-0.5,
      thetaUL: Math.PI/2,
      phi: Math.PI/2+0.3,
      phiLL: Math.PI/2-0.4,
      phiUL: Math.PI/2+1.0
    },
    scene: {
      background: 0x0
    }
  }
};
config.projects['14'] = project;
model = {
  name: "shroom_14k_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x090909,
    specular: 0x151515,
    shininess: 10,
    normalMap: "shroom2_nm.jpg",
    bumpMap: "shroom2_disp.jpg",
    bumpScale: 0.3,
    flipY: false,
    normalScale: new THREE.Vector2(1,1)
  },
  rotation: [0,Math.PI/2,0]
};
project.models.push(model);
model = {
  name: "planet_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x888888,
    specular: 0x0,
    shininess: 0,
    map: "planet_tex.jpg",
    normalMap: "planet_nm.jpg",
    flipY: false
  },
  rotation: [0,Math.PI/2,0]
};
//project.models.push(model);
model = {
  name: "eyes_low_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x050000,
    specular: 0xdd0000,
    shininess: 50
  },
  rotation: [0,Math.PI/2,0]
};
project.models.push(model);
light = {
  type: THREE.PointLight,
  params: [0x644e39, 30, 100, 1],
  position: [0,5,-50]
};
project.lights.push(light);
light = {
  type: THREE.DirectionalLight,
  params: [0xffffff, 2],
  position: [0,5,10]
}
project.lights.push(light);
uniforms = THREE.UniformsUtils.clone(Shaders.sun.uniforms);
uniforms.sunPos.value = new THREE.Vector3(0,6680,-18851);
uniforms.turbidity.value = 7;
uniforms.mieCoefficient.value = 1;
uniforms.g.value = 0.889;
uniforms.luminance.value = 0.3;
geo = {
  type: THREE.SphereGeometry,
  params: [20000, 32, 15],
  material: {
    type: THREE.ShaderMaterial,
    vertexShader: Shaders.sun.vertexShader,
    fragmentShader: Shaders.sun.fragmentShader,
    uniforms: uniforms,
    side: THREE.BackSide
  }
};
project.geometry.push(geo);

// PROJECT 28
project = {
  name: "28",
  altName: "Isaac Netero",
  models: [],
  geometry: [],
  lights: [],
  setup: {
    camera: {
      type: FreeCam,
      r: 6,
      rLL: 6,
      rUL: 6,
      phiLL: 3*Math.PI/8,
      phiUL: 5*Math.PI/8,
      thetaLL: 3*Math.PI/8,
      thetaUL: 5*Math.PI/8
    }
  }
};
config.projects['28'] = project;
model = {
  name: "28_13k_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x333333,
    specular: 0x222222,
    shininess: 25,
    bumpMap: "28_disp.jpg",
    bumpScale: .04,
    flipY: false
  },
  scale: [2,2,2],
  castShadow: true,
  receive: true
};
project.models.push(model);
model = {
  name: "eyes_634_js.json",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x0,
    specular: 0xffffff,
    shininess: 1000,
    shading: THREE.SmoothShading
  },
  scale: [2,2,2]
};
project.models.push(model);
model = {
  name: "mouth_bent.OBJ",
  format: "OBJ",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x0,
    specular: 0x0,
    shininess: 0
  },
  scale: [2,2,2]
};
project.models.push(model);
uniforms = THREE.UniformsUtils.clone(Shaders.sun.uniforms);
uniforms.sunPos.value = new THREE.Vector3(0,20000*Math.sin(Math.PI/12),-20000*Math.cos(Math.PI/12));
uniforms.turbidity.value = 20;
uniforms.mieCoefficient.value = 2;
uniforms.g.value = 0.997;
geo = {
  type: THREE.SphereGeometry,
  params: [20000, 32, 15],
  material: {
    type: THREE.ShaderMaterial,
    vertexShader: Shaders.sun.vertexShader,
    fragmentShader: Shaders.sun.fragmentShader,
    uniforms: uniforms,
    side: THREE.BackSide
  }
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0x999999,1,0,2],
  position: [-2,1,5]
};
project.lights.push(light);
light = {
  type: THREE.PointLight,
  params: [0x999999,1,0,2],
  position: [2,1,5]
};
project.lights.push(light);

// PROJECT 49
project = {
  name: "49",
  altName: "Razorback",
  models: [],
  geometry: [],
  lights: [],
  setup: {
    camera: {
      type: FreeCam,
      r: 2.2,
      rLL: 0.5,
      rUL: 7.5
    },
    scene: {
      background: 0xcccccc
    }
  }
};
config.projects['49'] = project;
material = {
  type: THREE.MeshPhongMaterial,
  color: 0x999999,
  specular: 0xffffff,
  shininess: 20,
  flipY: false,
  bumpScale: 0.01,
  map: "tex.jpg",
  bumpMap: "disp.jpg"
};
model = {
  name: "blade_low_js.json",
  material: material,
  rotation: [0,0,Math.PI],
  offset: [0.25,-0.1,0]
};
project.models.push(model);
model = {
  name: "handle_low_js.json",
  material: material,
  rotation: [0,0,Math.PI],
  offset: [0.25,-0.1,0]
};
project.models.push(model);
geo = {
  type: THREE.BoxGeometry,
  params: [8,8,8],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x444444,
    specular: 0x111111,
    shininess: 100,
    side: THREE.BackSide
  }
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0x999999,2,0,2],
  position: [0,1,1]
};
project.lights.push(light);
light = {
  type: THREE.PointLight,
  params: [0x999999,2,0,2],
  position: [0,1,-1]
};
project.lights.push(light);

// PROJECT 39
project = {
  name: "39",
  altName: "An Ornate Mosquito",
  models: [],
  geometry: [],
  lights: [],
  rotation: [3*Math.PI/2,Math.PI,0],
  setup: {
    camera: {
      type: FreeCam,
      r: 25,
      phiLL: 0,
      phiUL: Math.PI
    }
  }
};
config.projects['39'] = project;
model = {
  name: "mosquito_107k.OBJ",
  format: "OBJ",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x111111,
    specular: 0x222222,
    shininess: 70
  },
  offset: [0,3,0],
  castShadow: true,
  receiveShadow: true
};
project.models.push(model);
geo = {
  type: THREE.PlaneGeometry,
  params: [2000,2000],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x111111,
    specular: 0x111111,
    shininess: 30
  },
  rotation: [0,0,Math.PI/2],
  position: [0,0,-6.35]
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 4, 0, 2],
  position: [0,0,5],
  castShadow: true
};
project.lights.push(light);
light = {
  type: THREE.PointLight,
  params: [0xffffff,1,0,2],
  position: [0,0,50]
}
project.lights.push(light);

// SHADER TEST PROJECT
project = {
  name: "SHADERTEST",
  geometry: [],
  lights: []
};
//config.projects['SHADERTEST'] = project;
geo = {
  type: THREE.SphereGeometry,
  params: [20000, 32, 15],
  material: {
    type: THREE.ShaderMaterial,
    vertexShader: Shaders.sun.vertexShader,
    fragmentShader: Shaders.sun.fragmentShader,
    uniforms: Shaders.sun.uniforms,
    side: THREE.BackSide
  }
};
project.geometry.push(geo);
geo = {
  type: THREE.PlaneGeometry,
  params: [40000,40000],
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x030303,
    specular: 0x111111,
    shininess: 30
  },
  rotation: [-Math.PI/2,0,0],
  offset: [0,-50,0]
}
//project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 10, 0, 2],
  position: [0,40000*Math.sin(Math.PI/6), -40000*Math.cos(Math.PI/6)]
}
//project.lights.push(light);
