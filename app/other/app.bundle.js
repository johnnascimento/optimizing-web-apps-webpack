/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/klondike/board.js":
/*!*******************************!*\
  !*** ./app/klondike/board.js ***!
  \*******************************/
/***/ (() => {

(function () {
  "use strict";

  angular.module("klondike.board", ["ngRoute", "klondike.game"])
    .config(["$routeProvider", function ($routeProvider) {
      $routeProvider
        .when("/board", {
          templateUrl: "klondike/board.html",
          controller: "KlondikeController"
        })
        .otherwise({redirectTo: "/board"});
    }])
    .controller("KlondikeController", ["$scope", "klondikeGame", "scoring", function KlondikeController($scope, klondikeGame, scoring) {
      klondikeGame.newGame();
      $scope.game = klondikeGame;
      $scope.scoring = scoring;
    }])
    .directive("sNoPile", function () {
      return {
        restrict: "E",
        template: "<div class=\"no-pile\"></div>"
      };
    })
    .directive("sTableau", function () {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/tableau.html"
      };
    })
    .directive("sFoundation", function () {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/foundation.html"
      };
    })
    .directive("sCard", function () {
      return {
        restrict: "A",
        templateUrl: "cards/card.html",
        scope: {
          card: "="
        }
      };
    })
    .directive("sRemainder", function () {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/remainder.html"
      };
    })
    .directive("sWaste", function () {
      return {
        restrict: "E",
        templateUrl: "klondike/piles/waste.html"
      };
    });
})();


/***/ }),

/***/ "./app/klondike/game.js":
/*!******************************!*\
  !*** ./app/klondike/game.js ***!
  \******************************/
/***/ (() => {

(function () {
  "use strict";

  angular.module("klondike.game", [])
    .service("klondikeGame", ["scoring", KlondikeGame]);

  function KlondikeGame(scoring) {
    this.newGame = function newGame() {
      var cards = new Deck().shuffled();
      this.newGameFromDeck(cards);
    };

    this.newGameFromDeck = function (cards) {
      scoring.newGame();
      turnAllCardsDown(cards);
      this.tableaus = dealTableaus(cards);
      this.foundations = buildFoundations();
      this.remainder = dealRemainder(cards);
    };

    function turnAllCardsDown(cards) {
      cards.forEach(function (card) {
        card.turnDown();
      });
    }

    function dealTableaus(cards) {
      var tableaus = [
        new TableauPile(cards.slice(0, 1), scoring),
        new TableauPile(cards.slice(1, 3), scoring),
        new TableauPile(cards.slice(3, 6), scoring),
        new TableauPile(cards.slice(6, 10), scoring),
        new TableauPile(cards.slice(10, 15), scoring),
        new TableauPile(cards.slice(15, 21), scoring),
        new TableauPile(cards.slice(21, 28), scoring)
      ];
      tableaus.forEach(function (tableau) {
        tableau.turnTopCardUp();
      });
      return tableaus;
    }

    function buildFoundations() {
      return _.range(1, 5)
        .map(function () {
          return new FoundationPile([], scoring);
        });
    }

    function dealRemainder(cards) {
      return new RemainderPile(cards.slice(28), scoring);
    }
  }

  KlondikeGame.prototype.tryMoveTopCardToAnyFoundation = function (sourcePile) {
    if (sourcePile.isEmpty()) {
      return;
    }
    var foundationThatWillAccept = _.find(this.foundations, function (foundation) {
      return foundation.willAcceptCard(sourcePile.topCard());
    });
    if (foundationThatWillAccept) {
      foundationThatWillAccept.moveCardsFrom(sourcePile);
    }
  };

})();


/***/ }),

/***/ "./app/klondike/klondike.js":
/*!**********************************!*\
  !*** ./app/klondike/klondike.js ***!
  \**********************************/
/***/ (() => {

angular.module("klondike", [
  "klondike.game",
  "klondike.board",
  "klondike.scoring"
]);


/***/ }),

/***/ "./app/klondike/scoring.js":
/*!*********************************!*\
  !*** ./app/klondike/scoring.js ***!
  \*********************************/
/***/ (() => {

function Scoring() {
  "use strict";

  this.score = 0;

  this.newGame = function () {
    this.score = 0;
  };
  this.tableauCardTurnedUp = function () {
    this.score += 5;
  };
  this.dropped = function (source, destionation) {
    this.score += scoreForMoving(source, destionation) || 0;
  };
  this.wasteRecycled = function () {
    this.score = Math.max(this.score - 100, 0);
  };

  function scoreForMoving(source, destionation) {
    if (destionation.name === "TableauPile") {
      if (source.name === "FoundationPile") {
        return -15;
      }
      return 5;
    }
    if (destionation.name === "FoundationPile") {
      if (source.name === "TableauPile" || source.name === "WastePile") {
        return 10;
      }
    }
  }
}

if (false) {}

angular.module("klondike.scoring", []).service("scoring", [Scoring]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _klondike_scoring_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./klondike/scoring.js */ "./app/klondike/scoring.js");
/* harmony import */ var _klondike_scoring_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_klondike_scoring_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _klondike_klondike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./klondike/klondike.js */ "./app/klondike/klondike.js");
/* harmony import */ var _klondike_klondike_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_klondike_klondike_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _klondike_board_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./klondike/board.js */ "./app/klondike/board.js");
/* harmony import */ var _klondike_board_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_klondike_board_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _klondike_game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./klondike/game.js */ "./app/klondike/game.js");
/* harmony import */ var _klondike_game_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_klondike_game_js__WEBPACK_IMPORTED_MODULE_3__);







console.log('bola 7');

angular.module("solitaire", ["klondike", "ngDraggable"]);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxvQkFBb0IscUJBQXFCO0FBQ3pDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7OztBQ3hERDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7O0FDbEVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLEtBQVUsRUFBRSxFQW9CZjs7QUFFRDs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFa0I7QUFDQztBQUNIO0FBQ0Q7O0FBRTVCOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29saXRhaXJlLy4vYXBwL2tsb25kaWtlL2JvYXJkLmpzIiwid2VicGFjazovL3NvbGl0YWlyZS8uL2FwcC9rbG9uZGlrZS9nYW1lLmpzIiwid2VicGFjazovL3NvbGl0YWlyZS8uL2FwcC9rbG9uZGlrZS9rbG9uZGlrZS5qcyIsIndlYnBhY2s6Ly9zb2xpdGFpcmUvLi9hcHAva2xvbmRpa2Uvc2NvcmluZy5qcyIsIndlYnBhY2s6Ly9zb2xpdGFpcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc29saXRhaXJlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3NvbGl0YWlyZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc29saXRhaXJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc29saXRhaXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc29saXRhaXJlLy4vYXBwL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcImtsb25kaWtlLmJvYXJkXCIsIFtcIm5nUm91dGVcIiwgXCJrbG9uZGlrZS5nYW1lXCJdKVxuICAgIC5jb25maWcoW1wiJHJvdXRlUHJvdmlkZXJcIiwgZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAud2hlbihcIi9ib2FyZFwiLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6IFwia2xvbmRpa2UvYm9hcmQuaHRtbFwiLFxuICAgICAgICAgIGNvbnRyb2xsZXI6IFwiS2xvbmRpa2VDb250cm9sbGVyXCJcbiAgICAgICAgfSlcbiAgICAgICAgLm90aGVyd2lzZSh7cmVkaXJlY3RUbzogXCIvYm9hcmRcIn0pO1xuICAgIH1dKVxuICAgIC5jb250cm9sbGVyKFwiS2xvbmRpa2VDb250cm9sbGVyXCIsIFtcIiRzY29wZVwiLCBcImtsb25kaWtlR2FtZVwiLCBcInNjb3JpbmdcIiwgZnVuY3Rpb24gS2xvbmRpa2VDb250cm9sbGVyKCRzY29wZSwga2xvbmRpa2VHYW1lLCBzY29yaW5nKSB7XG4gICAgICBrbG9uZGlrZUdhbWUubmV3R2FtZSgpO1xuICAgICAgJHNjb3BlLmdhbWUgPSBrbG9uZGlrZUdhbWU7XG4gICAgICAkc2NvcGUuc2NvcmluZyA9IHNjb3Jpbmc7XG4gICAgfV0pXG4gICAgLmRpcmVjdGl2ZShcInNOb1BpbGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPVxcXCJuby1waWxlXFxcIj48L2Rpdj5cIlxuICAgICAgfTtcbiAgICB9KVxuICAgIC5kaXJlY3RpdmUoXCJzVGFibGVhdVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcImtsb25kaWtlL3BpbGVzL3RhYmxlYXUuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZShcInNGb3VuZGF0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwia2xvbmRpa2UvcGlsZXMvZm91bmRhdGlvbi5odG1sXCJcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKFwic0NhcmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiQVwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJjYXJkcy9jYXJkLmh0bWxcIixcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICBjYXJkOiBcIj1cIlxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZShcInNSZW1haW5kZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJrbG9uZGlrZS9waWxlcy9yZW1haW5kZXIuaHRtbFwiXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZShcInNXYXN0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcImtsb25kaWtlL3BpbGVzL3dhc3RlLmh0bWxcIlxuICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcImtsb25kaWtlLmdhbWVcIiwgW10pXG4gICAgLnNlcnZpY2UoXCJrbG9uZGlrZUdhbWVcIiwgW1wic2NvcmluZ1wiLCBLbG9uZGlrZUdhbWVdKTtcblxuICBmdW5jdGlvbiBLbG9uZGlrZUdhbWUoc2NvcmluZykge1xuICAgIHRoaXMubmV3R2FtZSA9IGZ1bmN0aW9uIG5ld0dhbWUoKSB7XG4gICAgICB2YXIgY2FyZHMgPSBuZXcgRGVjaygpLnNodWZmbGVkKCk7XG4gICAgICB0aGlzLm5ld0dhbWVGcm9tRGVjayhjYXJkcyk7XG4gICAgfTtcblxuICAgIHRoaXMubmV3R2FtZUZyb21EZWNrID0gZnVuY3Rpb24gKGNhcmRzKSB7XG4gICAgICBzY29yaW5nLm5ld0dhbWUoKTtcbiAgICAgIHR1cm5BbGxDYXJkc0Rvd24oY2FyZHMpO1xuICAgICAgdGhpcy50YWJsZWF1cyA9IGRlYWxUYWJsZWF1cyhjYXJkcyk7XG4gICAgICB0aGlzLmZvdW5kYXRpb25zID0gYnVpbGRGb3VuZGF0aW9ucygpO1xuICAgICAgdGhpcy5yZW1haW5kZXIgPSBkZWFsUmVtYWluZGVyKGNhcmRzKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHVybkFsbENhcmRzRG93bihjYXJkcykge1xuICAgICAgY2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoY2FyZCkge1xuICAgICAgICBjYXJkLnR1cm5Eb3duKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWFsVGFibGVhdXMoY2FyZHMpIHtcbiAgICAgIHZhciB0YWJsZWF1cyA9IFtcbiAgICAgICAgbmV3IFRhYmxlYXVQaWxlKGNhcmRzLnNsaWNlKDAsIDEpLCBzY29yaW5nKSxcbiAgICAgICAgbmV3IFRhYmxlYXVQaWxlKGNhcmRzLnNsaWNlKDEsIDMpLCBzY29yaW5nKSxcbiAgICAgICAgbmV3IFRhYmxlYXVQaWxlKGNhcmRzLnNsaWNlKDMsIDYpLCBzY29yaW5nKSxcbiAgICAgICAgbmV3IFRhYmxlYXVQaWxlKGNhcmRzLnNsaWNlKDYsIDEwKSwgc2NvcmluZyksXG4gICAgICAgIG5ldyBUYWJsZWF1UGlsZShjYXJkcy5zbGljZSgxMCwgMTUpLCBzY29yaW5nKSxcbiAgICAgICAgbmV3IFRhYmxlYXVQaWxlKGNhcmRzLnNsaWNlKDE1LCAyMSksIHNjb3JpbmcpLFxuICAgICAgICBuZXcgVGFibGVhdVBpbGUoY2FyZHMuc2xpY2UoMjEsIDI4KSwgc2NvcmluZylcbiAgICAgIF07XG4gICAgICB0YWJsZWF1cy5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZWF1KSB7XG4gICAgICAgIHRhYmxlYXUudHVyblRvcENhcmRVcCgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGFibGVhdXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRGb3VuZGF0aW9ucygpIHtcbiAgICAgIHJldHVybiBfLnJhbmdlKDEsIDUpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgRm91bmRhdGlvblBpbGUoW10sIHNjb3JpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWFsUmVtYWluZGVyKGNhcmRzKSB7XG4gICAgICByZXR1cm4gbmV3IFJlbWFpbmRlclBpbGUoY2FyZHMuc2xpY2UoMjgpLCBzY29yaW5nKTtcbiAgICB9XG4gIH1cblxuICBLbG9uZGlrZUdhbWUucHJvdG90eXBlLnRyeU1vdmVUb3BDYXJkVG9BbnlGb3VuZGF0aW9uID0gZnVuY3Rpb24gKHNvdXJjZVBpbGUpIHtcbiAgICBpZiAoc291cmNlUGlsZS5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZvdW5kYXRpb25UaGF0V2lsbEFjY2VwdCA9IF8uZmluZCh0aGlzLmZvdW5kYXRpb25zLCBmdW5jdGlvbiAoZm91bmRhdGlvbikge1xuICAgICAgcmV0dXJuIGZvdW5kYXRpb24ud2lsbEFjY2VwdENhcmQoc291cmNlUGlsZS50b3BDYXJkKCkpO1xuICAgIH0pO1xuICAgIGlmIChmb3VuZGF0aW9uVGhhdFdpbGxBY2NlcHQpIHtcbiAgICAgIGZvdW5kYXRpb25UaGF0V2lsbEFjY2VwdC5tb3ZlQ2FyZHNGcm9tKHNvdXJjZVBpbGUpO1xuICAgIH1cbiAgfTtcblxufSkoKTtcbiIsImFuZ3VsYXIubW9kdWxlKFwia2xvbmRpa2VcIiwgW1xuICBcImtsb25kaWtlLmdhbWVcIixcbiAgXCJrbG9uZGlrZS5ib2FyZFwiLFxuICBcImtsb25kaWtlLnNjb3JpbmdcIlxuXSk7XG4iLCJmdW5jdGlvbiBTY29yaW5nKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB0aGlzLnNjb3JlID0gMDtcblxuICB0aGlzLm5ld0dhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gIH07XG4gIHRoaXMudGFibGVhdUNhcmRUdXJuZWRVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjb3JlICs9IDU7XG4gIH07XG4gIHRoaXMuZHJvcHBlZCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3Rpb25hdGlvbikge1xuICAgIHRoaXMuc2NvcmUgKz0gc2NvcmVGb3JNb3Zpbmcoc291cmNlLCBkZXN0aW9uYXRpb24pIHx8IDA7XG4gIH07XG4gIHRoaXMud2FzdGVSZWN5Y2xlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjb3JlID0gTWF0aC5tYXgodGhpcy5zY29yZSAtIDEwMCwgMCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gc2NvcmVGb3JNb3Zpbmcoc291cmNlLCBkZXN0aW9uYXRpb24pIHtcbiAgICBpZiAoZGVzdGlvbmF0aW9uLm5hbWUgPT09IFwiVGFibGVhdVBpbGVcIikge1xuICAgICAgaWYgKHNvdXJjZS5uYW1lID09PSBcIkZvdW5kYXRpb25QaWxlXCIpIHtcbiAgICAgICAgcmV0dXJuIC0xNTtcbiAgICAgIH1cbiAgICAgIHJldHVybiA1O1xuICAgIH1cbiAgICBpZiAoZGVzdGlvbmF0aW9uLm5hbWUgPT09IFwiRm91bmRhdGlvblBpbGVcIikge1xuICAgICAgaWYgKHNvdXJjZS5uYW1lID09PSBcIlRhYmxlYXVQaWxlXCIgfHwgc291cmNlLm5hbWUgPT09IFwiV2FzdGVQaWxlXCIpIHtcbiAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pZiAobW9kdWxlLmhvdCkge1xuICBjb25zb2xlLmxvZygnSG90IG1vZHVsZSB0ZXN0JywgbW9kdWxlKTtcblxuICBtb2R1bGUuaG90LmFjY2VwdChjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpKTtcblxuICBjb25zdCBkb2MgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpO1xuICBjb25zdCBpbmplY3RvciA9IGRvYy5pbmplY3RvcigpO1xuXG4gIGlmIChpbmplY3Rvcikge1xuICAgIGNvbnN0IGFjdHVhbFNlcnZpY2UgPSBpbmplY3Rvci5nZXQoJ3Njb3JpbmcnKTtcbiAgICBjb25zdCBuZXdTY29yaW5nU2VydmljZSA9IG5ldyBTY29yaW5nKCk7XG5cbiAgICAvLyBOb3RlOiBKdXN0IHJlcGxhY2VzIGZ1bmN0aW9uc1xuICAgIE9iamVjdC5rZXlzKGFjdHVhbFNlcnZpY2UpXG4gICAgICAuZmlsdGVyKGtleSA9PiB0eXBlb2YgYWN0dWFsU2VydmljZVtrZXldID09PSAnZnVuY3Rpb24nKVxuICAgICAgLmZvckVhY2goa2V5ID0+IGFjdHVhbFNlcnZpY2Vba2V5XSA9IG5ld1Njb3JpbmdTZXJ2aWNlW2tleV0pO1xuXG4gICAgZG9jLmZpbmQoJ2h0bWwnKS5zY29wZSgpLiRhcHBseSgpO1xuICAgIGNvbnNvbGUuaW5mbygnW3Njb3Jpbl0gSG90IFN3YXBwZWQhIScpO1xuICB9XG59XG5cbmFuZ3VsYXIubW9kdWxlKFwia2xvbmRpa2Uuc2NvcmluZ1wiLCBbXSkuc2VydmljZShcInNjb3JpbmdcIiwgW1Njb3JpbmddKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFwiLi9rbG9uZGlrZS9zY29yaW5nLmpzXCI7XG5pbXBvcnQgXCIuL2tsb25kaWtlL2tsb25kaWtlLmpzXCI7XG5pbXBvcnQgXCIuL2tsb25kaWtlL2JvYXJkLmpzXCI7XG5pbXBvcnQgXCIuL2tsb25kaWtlL2dhbWUuanNcIjtcblxuY29uc29sZS5sb2coJ2JvbGEgNycpO1xuXG5hbmd1bGFyLm1vZHVsZShcInNvbGl0YWlyZVwiLCBbXCJrbG9uZGlrZVwiLCBcIm5nRHJhZ2dhYmxlXCJdKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==