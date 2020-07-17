// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var debounce = function debounce(fn, wait) {
  var timeout;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      clearTimeout(timeout);
      fn.apply(_this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

var _default = debounce;
exports.default = _default;
},{}],"js/navMenu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.hideNavMenu = exports.showNavMenu = void 0;

var initHamburgerBtn = function initHamburgerBtn(hamburger, main, navigation) {
  var isActive = false;
  main.addEventListener('click', function (e) {
    if (e.target === hamburger || e.target.parentNode === hamburger) {
      isActive = true;
      showNavMenu(navigation, main);
      return;
    }

    if (isActive) {
      isActive = false;
      hideNavMenu(navigation, main);
    }
  });
};

var showNavMenu = function showNavMenu(navigation, main) {
  main.classList.add('transformed');
  navigation.classList.add('active');
};

exports.showNavMenu = showNavMenu;

var hideNavMenu = function hideNavMenu(navigation, main) {
  navigation.classList.remove('active');

  if (!navigation.classList.contains('active')) {
    console.log(navigation.classList);
    main.classList.add('not-transformed');
    var timer = setTimeout(function () {
      main.classList.remove('not-transformed');
      main.classList.remove('transformed');
      clearTimeout(timer);
    }, 420);
  }
};

exports.hideNavMenu = hideNavMenu;
var _default = initHamburgerBtn;
exports.default = _default;
},{}],"js/tabsHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _navMenu = require("./navMenu");

var tabs = function tabs(navigationItems, main) {
  var navigationContainer = navigationItems[0].parentNode.parentNode;
  var pointActiveClass = 'sidebar__point-active';
  var tabActiveClass = 'display-active';
  var points = document.querySelectorAll('.sidebar__point');
  var tabs = document.querySelectorAll('main > section');
  var currentTab = 0;

  var toggleTab = function toggleTab(idx) {
    navigationItems[idx].classList.add('active');
    points[idx].classList.toggle(pointActiveClass);
    tabs[idx].classList.toggle(tabActiveClass);
  };

  var switchTab = function switchTab(idx) {
    navigationItems[idx].classList.remove('active');
    points[idx].classList.toggle(pointActiveClass);
    tabs[idx].classList.add('section-fade-out');
    var timeout = setTimeout(function () {
      tabs[idx].classList.remove('section-fade-out');
      tabs[idx].classList.toggle(tabActiveClass);
      showCurrentTab();
      clearTimeout(timeout);
    }, 280);
  };

  var showCurrentTab = function showCurrentTab() {
    return toggleTab(currentTab);
  };

  showCurrentTab(); // add jumps to tabs

  points.forEach(function (el, i) {
    el.addEventListener('click', function () {
      switchTab(currentTab);
      currentTab = i;
    });
  }); // navigation menu

  navigationItems.forEach(function (el, i) {
    el.addEventListener('click', function () {
      (0, _navMenu.hideNavMenu)(navigationContainer, main);
      switchTab(currentTab);
      currentTab = i;
    });
  });

  var prevTab = function prevTab(currentTab) {
    return --currentTab < 0 ? tabs.length - 1 : currentTab;
  };

  var nextTab = function nextTab(currentTab) {
    return ++currentTab >= tabs.length ? 0 : currentTab;
  };

  var wheel = function wheel(e) {
    var _e$wheelDelta = e.wheelDelta,
        wheelDelta = _e$wheelDelta === void 0 ? 0 : _e$wheelDelta;

    if (wheelDelta > 0) {
      currentTab = prevTab(currentTab);
    } else if (wheelDelta < 0) {
      // down 
      currentTab = nextTab(currentTab);
    }
  };

  var lastY = -1;
  document.addEventListener('touchstart', function (e) {
    lastY = e.touches[0].clientY;
  });

  var touchmove = function touchmove(e) {
    var currentY = e.touches ? e.touches[0].clientY : null;

    if (currentY > lastY) {
      // up
      currentTab = prevTab(currentTab);
    } else if (currentY < lastY) {
      currentTab = nextTab(currentTab);
    }

    lastY = currentY;
  };

  return function (e) {
    if (navigationContainer.classList.contains('active')) {
      return;
    }

    switchTab(currentTab);

    if (e.type === 'wheel') {
      return wheel(e);
    } else if (e.type === 'touchmove') {
      return touchmove(e);
    }
  };
};

var _default = tabs;
exports.default = _default;
},{"./navMenu":"js/navMenu.js"}],"js/inputCheckboxes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var inputCheckboxesClick = function inputCheckboxesClick(e) {
  var target = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target;
  target.classList.toggle('active');
};

var _default = inputCheckboxesClick;
exports.default = _default;
},{}],"js/slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var initSlider = function initSlider(slider, items, prevBtn, nextBtn) {
  var prevClass = 'prev',
      nextClass = 'next',
      activeClass = 'active';
  var maxIdx = items.length - 1;
  var activeIdx = 1;
  var neighborSlides = {
    prevIdx: 0,
    nextIdx: 2
  };

  var minusSlide = function minusSlide(activeIdx) {
    return activeIdx == 0 ? maxIdx : activeIdx - 1;
  };

  var plusSlide = function plusSlide(activeIdx) {
    return activeIdx == maxIdx ? 0 : activeIdx + 1;
  };

  var displaySlides = function displaySlides(activeIdx, _ref) {
    var prevIdx = _ref.prevIdx,
        nextIdx = _ref.nextIdx;
    items[prevIdx].classList.add(prevClass);
    items[activeIdx].classList.add(activeClass);
    items[nextIdx].classList.add(nextClass);
  };

  var hideSlides = function hideSlides(activeIdx, _ref2) {
    var prevIdx = _ref2.prevIdx,
        nextIdx = _ref2.nextIdx;
    items[prevIdx].classList.remove(prevClass);
    items[activeIdx].classList.remove(activeClass);
    items[nextIdx].classList.remove(nextClass);
  };

  var getNeiborSlides = function getNeiborSlides(activeIdx) {
    return {
      prevIdx: minusSlide(activeIdx),
      nextIdx: plusSlide(activeIdx)
    };
  };

  var displaySlider = function displaySlider(activeIdx) {
    neighborSlides = getNeiborSlides(activeIdx);
    displaySlides(activeIdx, neighborSlides);
  };

  var buttonClickHandler = function buttonClickHandler(action) {
    return function (e) {
      // hide content
      slider.classList.add('fade-out');
      slider.classList.remove('fade-in'); // show content after fade animation is over

      var timeout = setTimeout(function () {
        // remove classes from previous elements
        hideSlides(activeIdx, neighborSlides); // set new selected item index

        activeIdx = action(activeIdx); // assign classesNames to new active items

        displaySlider(activeIdx); // show content, fadein animation

        slider.classList.remove('fade-out');
        slider.classList.add('fade-in'); // delete timeout

        clearTimeout(timeout);
      }, 400);
    };
  };

  prevBtn.addEventListener('click', buttonClickHandler(minusSlide));
  nextBtn.addEventListener('click', buttonClickHandler(plusSlide));
};

var _default = initSlider;
exports.default = _default;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _debounce = _interopRequireDefault(require("./debounce"));

var _tabsHandler = _interopRequireDefault(require("./tabsHandler"));

var _inputCheckboxes = _interopRequireDefault(require("./inputCheckboxes"));

var _slider = _interopRequireDefault(require("./slider"));

var _navMenu = _interopRequireDefault(require("./navMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigationItems = document.querySelectorAll('nav > a');
var main = document.querySelector('#main'); // init scrolling handler

var scroll = (0, _debounce.default)((0, _tabsHandler.default)(navigationItems, main), 300);
document.addEventListener('wheel', scroll);
document.addEventListener('touchmove', scroll); // add click listeners to form fields

document.querySelectorAll('.hire-us__buttons__item').forEach(function (el) {
  el.addEventListener('click', _inputCheckboxes.default);
}); // init slider

var slider = document.querySelector('.works__slider__items-container');
var sliderItems = document.querySelectorAll('.works__slider__item');
var sliderPrevBtn = document.querySelector('#slider-prev');
var sliderNextBtn = document.querySelector('#slider-next');
(0, _slider.default)(slider, sliderItems, sliderPrevBtn, sliderNextBtn); // init navigation menu handler 

var hamburger = document.querySelector('#hamburger-btn');
var navigation = document.querySelector('#navigation');
(0, _navMenu.default)(hamburger, main, navigation);
},{"./debounce":"js/debounce.js","./tabsHandler":"js/tabsHandler.js","./inputCheckboxes":"js/inputCheckboxes.js","./slider":"js/slider.js","./navMenu":"js/navMenu.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59695" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map