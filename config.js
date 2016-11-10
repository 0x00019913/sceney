var config = {};
config.projects = {}
var project = {};
var model = {};

// PROJECT 7
project = {
  name: "7",
  models: []
};
model = {
  name: "7_34k_js.json",
  normalMap: "7_34k_nm_2048.png",
  flipY: true /* results in flipY = false */
};
project.models.push(model);
config.projects['7'] = project;

// PROJECT ANTELOPE
project = {
  name: "ANTELOPE",
  models: [],
  rotation: [-Math.PI/2, 0, 0]
};
model = {
  name: "antelope_38k_js.json",
  normalMap: "antelope_nm.bmp",
  color: 0x999999,
  specular: 0xff0000,
  shininess: 30
};
project.models.push(model);
config.projects['ANTELOPE'] = project;

// PROJECT 13
project = {
  name: "13",
  models: [],
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
  normalMap: "13_nm.BMP",
  normalScale: new THREE.Vector2(2,2),
  flipY: true,
  color: 0x111111,
  specular: 0x222121,
  shininess: 50
};
project.models.push(model);
model = {
  name: "eye_js.json",
  color: 0x330011,
  specular: 0xdd0000,
  shininess: 100
};
project.models.push(model);
model = {
  name: "rock_js.json",
  normalMap: "rock_nm.BMP",
  normalScale: new THREE.Vector2(4,4),
  flipY: true,
  color: 0x222222,
  specular: 0x0,
  shininess: 30
}
project.models.push(model);
model = {
  name: "col6_js.json",
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading,
  offset: [-30,50,-70],
  scale: [15,15,15]
}
project.models.push(model);
model = {
  name: "col2_js.json",
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading,
  offset: [40,52,-55],
  scale: [15,15,15]
}
project.models.push(model);
model = {
  name: "col4_js.json",
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading,
  offset: [5,50,-85],
  scale: [15,15,15]
}
project.models.push(model);
model = {
  name: "col2_js.json",
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading,
  offset: [-75,45,-30],
  scale: [15,15,15]
}
project.models.push(model);
model = {
  name: "col4_js.json",
  color: 0x222222,
  specular: 0x0,
  shininess: 30,
  shading: THREE.FlatShading,
  offset: [75,45,0],
  scale: [15,15,15]
}
project.models.push(model);
config.projects['13'] = project;

// PROJECT 46
project = {
  name: "46",
  models: [],
  offset: [0, 2.5, 1]
};
model = {
  name: "hearth_bot_low_js.json",
  normalMap: "hearth_bot_1024_normals.bmp"
};
project.models.push(model);
model = {
  name: "column_bot_js.json",
  shading: THREE.FlatShading
}
project.models.push(model);
model = {
  name: "column_bot_ornament_low_new_js.json",
  normalMap: "column_bot_ornament_normals_512.bmp"
}
project.models.push(model);
model = {
  name: "hearth_top_base_js.json"
}
project.models.push(model);
model = {
  name: "mural_low_js.json",
  normalMap: "mural_normal_512.bmp",
  flipY: true
}
project.models.push(model);
model = {
  name: "mural_border_base_js.json",
  shading: THREE.FlatShading
}
project.models.push(model);
model = {
  name: "column_top_js.json",
  shading: THREE.FlatShading
}
project.models.push(model);
model = {
  name: "plaque_js.json",
  shading: THREE.FlatShading
}
project.models.push(model);
model = {
  name: "skulls_js.json",
  normalMap: "skull_normals.bmp"
}
project.models.push(model);

config.projects['46'] = project;
