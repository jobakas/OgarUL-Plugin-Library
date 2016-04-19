'use strict';   // dont touch
const fs = require('fs');
var auth = require('./auth.js');
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Auth"; // Name of plugin REQUIRED
this.author = "andrews54757"; // author REQUIRED
this.description = 'An auth plugin'; // Desciprtion
this.compatVersion = '16.5.4'; // compatable with
this.version = '1.2.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "auth"; // plugin add-on command names
this.addToHelp[0] = "auth       : Auth plugin command"; // help command add-on (adds this string to the help command)
this.command[0] = require('./command.js'); // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
requirelogin: 0,
plugin: 1,
allowregister: 1,
kicktime: 20,
recordint: 100,
reservename: 0,
hidelogin: 0,
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  auth.init(this, gameServer);
  gameServer.onregister = function(player) {
    return;
    
  };
  gameServer.extraregpar = [];
  gameServer.afterauth = function(player) {
    
    
  };
  gameServer.beforespawn[0] = function(player) {
    
   return auth.beforespawn(player,gameServer);
  };
  gameServer.beforeq[0] = function(player) {
    return auth.beforeq(plaer, gameServer);
    
  };
  gameServer.beforeeject[0] = function(player) {return auth.beforeeject(player,gameServer);};
  gameServer.beforesplit[0] = function(player) {return auth.beforesplit(player,gameServer);};
  try {
  gameServer.account = JSON.parse(fs.readFileSync('accounts.json'));
  } catch (e) {
    fs.writeFileSync('accounts.json', '[]');
    gameServer.account = [];
  }
  gameServer.auon = this.config.plugin;
  console.log("[Auth] Auth loaded. Accounts located in accounts.json")
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {
  if (gameServer.auon == 1 && this.config.recordint > 0) {
if (!this.up) this.up = 0;
if (this.up < this.config.recordint) {
  this.up ++;
  
} else {
  this.up = 0;
  fs.writeFile('accounts.json',JSON.stringify(gameServer.account, null, 2), (err) => {
  if (err) throw err;
});
}
}

  // called every second
};


module.exports = this; // dont touch
