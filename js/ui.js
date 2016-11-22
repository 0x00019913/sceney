setupUI();

function setupUI() {
  var menu = document.getElementById('menu');
  for (var projectName in config.projects) {
    var el = document.createElement('p');
    var altName = config.projects[projectName].altName;
    el.innerHTML = projectName;
    if (altName) el.innerHTML += ", " + altName;
    el.className = "menuItem";
    menu.appendChild(el);
  }
}

document.getElementById("intro").onclick = function () {

};
