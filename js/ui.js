var buttonMenuPairs = {
  'top-button-info': 'info',
  'top-button-scenes': 'scenes'
};

setupUI();

function setupUI() {
  /* Set up menu items */
  var menu = document.getElementById('scenes');
  for (var projectName in config.projects) {
    var el = document.createElement('p');
    el.className = "menu-item";

    var altName = config.projects[projectName].altName;
    el.innerHTML = projectName;
    if (altName) el.innerHTML += ", " + altName;

    el.onclick = switchSceneOnclick(projectName);

    menu.appendChild(el);
  }

  for (var buttonName in buttonMenuPairs) {
    addMenuTransition(buttonName);
  }
  addMenuTransition('top-button-logo');
}

function addMenuTransition(buttonID) {
  if (buttonID in buttonMenuPairs) {
    document.getElementById(buttonID).onclick = function() {
      /* collapse all other menus */
      collapseMenusExcept(buttonID);
      /* behavior for the current button */
      var menu = document.getElementById(buttonMenuPairs[buttonID]);
      if (menu.className=="menu-active") {
        menu.className = "menu-inactive";
        deactivateButton(buttonID);
      }
      else {
        menu.className = "menu-active";
        activateButton(buttonID);
      }
    };
  }
  else {
    document.getElementById(buttonID).onclick = collapseMenusExcept;
  }
}

function collapseMenusExcept(exclude) {
  /* collapse all menus except the one to exclude */
  for (var bID in buttonMenuPairs) {
    if (bID!=exclude) {
     document.getElementById(buttonMenuPairs[bID]).className = "menu-inactive";
     deactivateButton(bID);
    }
  }
}

function activateButton(bID) {
  document.getElementById(bID).className += " button-active";
}

function deactivateButton(bID) {
  var button = document.getElementById(bID);
  button.className = button.className.replace( /(?:^|\s)button-active(?!\S)/g , '' );
}

function switchSceneOnclick(name) {
  return function () {
    clearScene();
    loadProject(name);
    positionCamera(camera);
  }
}
