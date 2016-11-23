var buttonMenuPairs = {
  'top-button-info': 'info',
  'top-button-menu': 'menu'
};

setupUI();

function setupUI() {
  /* Set up menu items */
  var menu = document.getElementById('menu');
  for (var projectName in config.projects) {
    var el = document.createElement('p');
    el.className = "menuItem";

    var altName = config.projects[projectName].altName;
    el.innerHTML = projectName;
    if (altName) el.innerHTML += ", " + altName;

    el.onclick = function () {
      clearScene();
    }

    menu.appendChild(el);
  }

  for (var buttonName in buttonMenuPairs) {
    addMenuTransition(buttonName);
  }
  addMenuTransition('button-logo');
}

function addMenuTransition(buttonID) {
  document.getElementById(buttonID).onclick = function() {
    /* collapse all other menus */
    if (buttonID in buttonMenuPairs) {
      collapseMenusExcept(buttonID);
    }
    else {
      collapseMenusExcept();
      return;
    }
    /* behavior for the current button */
    var el = document.getElementById(buttonMenuPairs[buttonID]);
    if (el.className=="active") {
      el.className = "inactive";
    }
    else {
      el.className = "active";
    }
  };
}
 function collapseMenusExcept(exclude) {
   /* collapse all menus except the one to exclude */
   for (var bID in buttonMenuPairs) {
     if (bID!=exclude) {
       document.getElementById(buttonMenuPairs[bID]).className = "inactive";
     }
   }
 }
