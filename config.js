var config = {};
config.projects = {}
var project = {};
var model = {};
var geo = {};
var light = {};
var material = {}, material1 = {};

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
  models: []
};
config.projects['7'] = project;
model = {
  name: "7_34k_js.json",
  material: {
    normalMap: "7_34k_nm_2048.png",
    flipY: false
  }
};
project.models.push(model);

// PROJECT 46
project = {
  name: "46",
  altName: "The Antelope Skull",
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
      r: 20,
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
