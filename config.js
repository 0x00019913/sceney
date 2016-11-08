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
  normalmap: "7_34k_nm_2048.png",
  flipped: true /* results in flipY = false */
};
project.models.push(model);
config.projects['7'] = project;

// PROJECT 13
project = {
  name: "13",
  models: [],
  offset: [0,9,0],
  setup: {
    r: 17
  }
};
model = {
  name: "13_low_js.json",
  normalmap: "13_nm.BMP",
  flipped: true
};
project.models.push(model);
model = {
  name: "eye_js.json",
  color: 0xff0000
};
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
  normalmap: "hearth_bot_1024_normals.bmp"
};
project.models.push(model);
model = {
  name: "column_bot_js.json",
  shading: THREE.FlatShading
}
project.models.push(model);
model = {
  name: "column_bot_ornament_low_new_js.json",
  normalmap: "column_bot_ornament_normals_512.bmp"
}
project.models.push(model);
model = {
  name: "hearth_top_base_js.json"
}
project.models.push(model);
model = {
  name: "mural_low_js.json",
  normalmap: "mural_normal_512.bmp",
  flipped: true
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
  normalmap: "skull_normals.bmp"
}
project.models.push(model);
config.projects['46'] = project;
