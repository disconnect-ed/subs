/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/inject.js":
/*!***********************!*\
  !*** ./src/inject.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ \"./src/utils/utils.js\");\n\r\n\r\ntry {\r\n    const service = Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__[\"detectService\"])()\r\n    console.log('Проверка')\r\n    if (service) {\r\n        console.log('Subs initialized')\r\n        window.addEventListener(\"subsVideoReady\", () => {\r\n            console.log(\"subsVideoReady\");\r\n\r\n\r\n            window.addEventListener(\"subsSubtitlesChanged\", (event) => {\r\n                console.log(\"subsSubtitlesChanged Doooooooone\");\r\n            });\r\n        });\r\n        service.init()\r\n    }\r\n} catch (e) {\r\n    console.log('unknown error: ', e)\r\n}\n\n//# sourceURL=webpack:///./src/inject.js?");

/***/ }),

/***/ "./src/services/youtube.js":
/*!*********************************!*\
  !*** ./src/services/youtube.js ***!
  \*********************************/
/*! exports provided: Youtube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Youtube\", function() { return Youtube; });\nclass Youtube {\r\n\r\n    init() {\r\n        this.injectScript()\r\n    }\r\n\r\n\r\n\r\n    injection() {\r\n        window.setInterval(() => {\r\n            const player = document.getElementById(\"movie_player\");\r\n            const subsToggleElement = document.querySelector(\".ytp-subtitles-button\");\r\n\r\n            if (player) {\r\n                if (!window.isLoaded) {\r\n                    window.isLoaded = true;\r\n                    window.dispatchEvent(new CustomEvent(\"subsVideoReady\"));\r\n                    if (subsToggleElement.getAttribute(\"aria-pressed\") === \"true\") {\r\n                        player.toggleSubtitles();\r\n                        player.toggleSubtitles();\r\n                    } else {\r\n                        window.dispatchEvent(new CustomEvent(\"subsSubtitlesChanged\", {detail: \"\"}));\r\n                    }\r\n                }\r\n            } else {\r\n                window.isLoaded = false;\r\n            }\r\n\r\n            if (subsToggleElement) {\r\n                if (window.subtitlesEnabled && subsToggleElement.getAttribute(\"aria-pressed\") === \"false\") {\r\n                    window.subtitlesEnabled = false;\r\n                    window.dispatchEvent(new CustomEvent(\"easysubsSubtitlesChanged\", {detail: \"\"}));\r\n                }\r\n            }\r\n        }, 500);\r\n        (open => {\r\n            XMLHttpRequest.prototype.open = function (method, url) {\r\n                console.log(888)\r\n                if (url.match(/^http/g) !== null) {\r\n                    const urlObject = new URL(url);\r\n                    if (urlObject.pathname === \"/api/timedtext\") {\r\n                        window.subtitlesEnabled = true;\r\n                        const lang = urlObject.searchParams.get(\"tlang\") || urlObject.searchParams.get(\"lang\")\r\n                        window.dispatchEvent(new CustomEvent(\"subs_data\", { detail: urlObject.href }));\r\n                        window.dispatchEvent(\r\n                            new CustomEvent(\"subsSubtitlesChanged\", { detail: lang })\r\n                        );\r\n                    }\r\n                }\r\n                open.call(this, method, url);\r\n            };\r\n        })(XMLHttpRequest.prototype.open);\r\n    };\r\n\r\n    injectScript() {\r\n        const sc = document.createElement(\"script\");\r\n        const scData = this.injection.toString().split('injection() {')[1].slice(0, -1)\r\n        sc.innerHTML = `(function() {${scData}})()`;\r\n        document.head.appendChild(sc);\r\n        document.head.removeChild(sc);\r\n    }\r\n\r\n\r\n}\n\n//# sourceURL=webpack:///./src/services/youtube.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: detectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detectService\", function() { return detectService; });\n/* harmony import */ var _services_youtube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/youtube */ \"./src/services/youtube.js\");\n\r\n\r\n\r\nconst detectService = () => {\r\n    const titleContent = document.querySelector('title').textContent\r\n    if (titleContent.includes(\"YouTube\") || window.location.host === \"www.youtube.com\") {\r\n        document.querySelector('html').id = \"youtube\"\r\n        return new _services_youtube__WEBPACK_IMPORTED_MODULE_0__[\"Youtube\"]\r\n    }\r\n    return null\r\n}\n\n//# sourceURL=webpack:///./src/utils/utils.js?");

/***/ })

/******/ });