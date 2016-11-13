0x0 Project

https://0x00019913.github.io/0x00019913/

Over the past year I generated a few dozen 3D models, mostly sculpted, some traditional. I'd like to put some of them up for viewing here. This is, of course, fairly nontrivial on my part because the vast majority of models requires retopo and normal maps and such, so some results may turn out badly while yours truly is learning.

The goal is that this project will have a selection screen and possibly a basic physics engine that lets the visitor walk around if it helps in viewing the set of models shown. Everything's being written completely from scratch (except Three.js, of course).

Thus far:
- Created free and cylindrical camera controls. Eventually allow user to toggle between the two.
- The config.js file lists all projects and their models in a slightly cumbersome but centralized and arguably maintainable way. utils.js gets and then loads resources based on the config object.
- Satisfactory progress on project 13. Maybe even done.
- Project 46 looks meh. Quite possibly won't finish.
- Project 7 is next. Either that or the antelope skull from project 46.
- Perhaps music? SunVox seems like a good candidate.
- If not running this off some different machine, files can be locally loaded via server.js. Start it up in terminal ("nodejs server.js", assuming Node.JS is set up and you've installed Express via npm), then go to localhost:3000/index.html. Simply loading index.html doesn't work locally because something to do with security and not loading resources via the FILE protocol.
