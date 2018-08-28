//https://bawv12.github.io/scratch/joystick.js
(function(ext) {

  var DEADZONE = 0;

  var buttons = [
    ["left top", 4],
    ["left bottom", 6],
    ["right top", 5],
    ["right bottom", 7],
    ["left stick", 10],
    ["right stick", 11],
    ["A", 0],
    ["B", 1],
    ["X", 2],
    ["Y", 3],
    ["select", 8],
    ["start", 9],
    ["up", 12],
    ["down", 13],
    ["left", 14],
    ["right", 15],
  ];

  var buttonMenu = [];
  var buttonNames = {};
  buttons.forEach(function(d) {
    var name = d[0],
        index = d[1];
    buttonMenu.push(name);
    buttonNames[name] = index;
  });

  ext.gamepadSupport = (!!navigator.getGamepads ||
                        !!navigator.gamepads);
  ext.gamepad = null;

  ext.stickDirection = {left: 90, right: 90};

  ext.tick = function() {
    ext.gamepad = (navigator.getGamepads &&
                   navigator.getGamepads()[0]);
    window.requestAnimationFrame(ext.tick);
  };
  if (ext.gamepadSupport) window.requestAnimationFrame(ext.tick);

  ext._shutdown = function() {};

  ext._getStatus = function() {
    if (!ext.gamepadSupport) return {
      status: 1,
      msg: "Please use a recent version of Google Chrome",
    };

    if (!ext.gamepad) return {
      status: 1,
      msg: "Please plug in a gamepad and press any button",
    };

    return {
      status: 2,
      msg: "Good to go!",
    };
  };

  ext.installed = function() {
    return true;
  }

  ext.getButton = function(name) {
    var index = buttonNames[name];
    var button = ext.gamepad.buttons[index];
    return button.pressed;
  };

  ext.getStick = function(what) {
    var deflect;

    switch (what) {
      case "X": 
	deflect= ext.gamepad.axes[0];
	return deflect;
      case "Y": 
	deflect= -100*ext.gamepad.axes[1];
	return deflect;
      case "Throttle": 
	deflect= -100*ext.gamepad.axes[2];
	return deflect;
      case "Rudder": 
	deflect= 100*ext.gamepad.axes[3];
	return deflect;
      case "Pan": 
	deflect= 100*ext.gamepad.axes[4];
	return deflect;
      case "POV X": 
	deflect= 100*ext.gamepad.axes[5];
	return deflect;
      case "POV Y": 
	deflect= -100*ext.gamepad.axes[6];
	return deflect;
    }

  };

  var descriptor = {
    blocks: [
      ["b", "Joystick Extension installed?", "installed"],
      ["b", "button %m.button pressed?", "getButton", "X"],
      ["r", "Axis %m.axisValue", "getStick", "X"],
    ],
    menus: {
      button: buttonMenu,
      axisValue: ["X", "Y","Throttle","Rudder","Pan","POV X","POV Y"],
    },
  };

  ScratchExtensions.register("Joystick", descriptor, ext);

})({});
