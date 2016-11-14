var config = {};
config.projects = {}
var project = {};
var model = {};
var geo = {};
var light = {};
var material = {};

// PROJECT 7
project = {
  name: "7",
  models: []
};
model = {
  name: "7_34k_js.json",
  material: {
    normalMap: "7_34k_nm_2048.png",
    flipY: false
  }
};
project.models.push(model);
config.projects['7'] = project;

// PROJECT ANTELOPE
project = {
  name: "ANTELOPE",
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
config.projects['ANTELOPE'] = project;

// PROJECT 13
project = {
  name: "13",
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
  offset: [-75,45,-30],
  scale: [15,15,15]
};
project.models.push(model);
model = {
  name: "col6_js.json",
  material: material,
  offset: [-40,50,-70],
  scale: [15,15,15]
};
project.models.push(model);
model = {
  name: "col4_js.json",
  material: material,
  offset: [0,50,-85],
  scale: [15,15,15]
};
project.models.push(model);
model = {
  name: "col2_js.json",
  material: material,
  offset: [47,52,-57],
  scale: [15,15,15]
};
project.models.push(model);
model = {
  name: "col4_js.json",
  material: material,
  offset: [75,45,0],
  scale: [15,15,15]
};
project.models.push(model);
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
config.projects['13'] = project;

// PROJECT 39
project = {
  name: "39",
  models: [],
  geometry: [],
  lights: [],
  rotation: [Math.PI/2,0,Math.PI],
  setup: {
    camera: {
      type: FreeCam,
      r: 45,
    }
  }
};
model = {
  name: "mosquito_357k.OBJ",
  format: "OBJ",
  material: {
    type: THREE.MeshPhongMaterial,
    color: 0x191919,
    specular: 0xffffff,
    shininess: 100
  },
  castShadow: true,
  receiveShadow: true,
  offset: [0,2.5,6.5]
};
project.models.push(model);
geo = {
  type: THREE.BoxGeometry,
  params: [100,100,100],
  material: {
    //type: THREE.MeshPhongMaterial,
    type: THREE.MeshStandardMaterial,
    //normalMap: "mandala_normals.bmp",
    //aoMap: "mandala_occlusion.bmp",
    bumpMap: "mandala_heights.bmp",
    color: 0x555555,
    metalness: 10,
    //specular: 0x0,
    //shininess: 100,
    side: THREE.BackSide,
    needsUpdate: true
  },
  receiveShadow: true,
  position: [0,0,50]
};
project.geometry.push(geo);
light = {
  type: THREE.PointLight,
  params: [0xffffff, 6, 100, 2],
  position: [0,0,50],
  castShadow: true
};
project.lights.push(light);
config.projects['39'] = project;

// PROJECT 46
project = {
  name: "46",
  models: [],
  offset: [0, 2.5, 1]
};
model = {
  name: "hearth_bot_low_js.json",
  material: {
    normalMap: "hearth_bot_1024_normals.bmp"
  }
};
project.models.push(model);
model = {
  name: "column_bot_js.json",
  material: {
    shading: THREE.FlatShading
  }
};
project.models.push(model);
model = {
  name: "column_bot_ornament_low_new_js.json",
  material: {
    normalMap: "column_bot_ornament_normals_512.bmp"
  }
};
project.models.push(model);
model = {
  name: "hearth_top_base_js.json"
};
project.models.push(model);
model = {
  name: "mural_low_js.json",
  material: {
    normalMap: "mural_normal_512.bmp",
    flipY: false
  }
};
project.models.push(model);
model = {
  name: "mural_border_base_js.json",
  material: {
    shading: THREE.FlatShading
  }
};
project.models.push(model);
model = {
  name: "column_top_js.json",
  material: {
    shading: THREE.FlatShading
  }
};
project.models.push(model);
model = {
  name: "plaque_js.json",
  material: {
    shading: THREE.FlatShading
  }
};
project.models.push(model);
model = {
  name: "skulls_js.json",
  material: {
    normalMap: "skull_normals.bmp"
  }
};
project.models.push(model);

config.projects['46'] = project;
