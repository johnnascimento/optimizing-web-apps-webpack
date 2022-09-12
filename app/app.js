"use strict";

import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

console.log('bola 7');

angular.module("solitaire", ["klondike", "ngDraggable"]);
