/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  Button
} = wp.components;
registerBlockType('mytheme/image-hotspots', {
  title: 'Image Hotspots',
  icon: 'location-alt',
  category: 'media',
  attributes: {
    imageUrl: {
      type: 'string',
      default: ''
    },
    imageWidth: {
      type: 'number',
      default: 100
    },
    hotspots: {
      type: 'array',
      default: []
    }
  },
  edit: function (props) {
    const {
      attributes: {
        imageUrl,
        imageWidth,
        hotspots
      },
      setAttributes
    } = props;
    function addHotspot() {
      const newHotspots = [...hotspots, {
        x: 50,
        y: 50,
        link: '',
        customClass: '',
        title: '',
        titleSpan: '',
        subtitle: '',
        color: '#000000',
        showDot: false,
        showDivider: false
      }];
      setAttributes({
        hotspots: newHotspots
      });
    }
    function updateHotspot(index, field, value) {
      const newHotspots = hotspots.map((h, i) => i === index ? {
        ...h,
        [field]: value
      } : h);
      setAttributes({
        hotspots: newHotspots
      });
    }
    function removeHotspot(index) {
      const newHotspots = hotspots.filter((_, i) => i !== index);
      setAttributes({
        hotspots: newHotspots
      });
    }
    return wp.element.createElement("div", null,
    // Sidebar
    wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "Hotspot Settings",
      initialOpen: true
    }, wp.element.createElement(Button, {
      isPrimary: true,
      onClick: addHotspot,
      style: {
        marginBottom: '10px'
      }
    }, "Add Hotspot"), wp.element.createElement("label", null, "Image width (%)"), wp.element.createElement("input", {
      type: "range",
      min: "10",
      max: "100",
      step: "1",
      value: imageWidth,
      onChange: e => setAttributes({
        imageWidth: parseInt(e.target.value, 10)
      }),
      style: {
        width: '100%',
        marginBottom: '16px'
      }
    }), hotspots.map((hotspot, index) => wp.element.createElement("div", {
      key: index,
      style: {
        marginBottom: '16px'
      }
    }, wp.element.createElement("strong", null, `Hotspot ${index + 1}`), wp.element.createElement("label", null, "Link"), wp.element.createElement("input", {
      type: "text",
      value: hotspot.link,
      onChange: e => updateHotspot(index, 'link', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      }
    }), wp.element.createElement("label", null, "Custom Class"), wp.element.createElement("input", {
      type: "text",
      value: hotspot.customClass || '',
      onChange: e => updateHotspot(index, 'customClass', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      }
    }), wp.element.createElement("label", null, "Title"), wp.element.createElement("input", {
      type: "text",
      value: hotspot.title || '',
      onChange: e => updateHotspot(index, 'title', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      }
    }), wp.element.createElement("label", null, "Title Span"), wp.element.createElement("input", {
      type: "text",
      value: hotspot.titleSpan || '',
      onChange: e => updateHotspot(index, 'titleSpan', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      },
      placeholder: "Optional span content inside title"
    }), wp.element.createElement("label", null, "Subtitle"), wp.element.createElement("input", {
      type: "text",
      value: hotspot.subtitle || '',
      onChange: e => updateHotspot(index, 'subtitle', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      }
    }), wp.element.createElement("label", null, "Color"), wp.element.createElement("input", {
      type: "color",
      value: hotspot.color || '#000000',
      onChange: e => updateHotspot(index, 'color', e.target.value),
      style: {
        width: '100%',
        marginBottom: '8px'
      }
    }), wp.element.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }
    }, wp.element.createElement("input", {
      type: "checkbox",
      checked: hotspot.showDot || false,
      onChange: e => updateHotspot(index, 'showDot', e.target.checked),
      style: {
        marginRight: '8px'
      }
    }), "Show Dot"), wp.element.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }
    }, wp.element.createElement("input", {
      type: "checkbox",
      checked: hotspot.showDivider || false,
      onChange: e => updateHotspot(index, 'showDivider', e.target.checked),
      style: {
        marginRight: '8px'
      }
    }), "Show Divider"), wp.element.createElement("label", null, "X Position"), wp.element.createElement("input", {
      type: "range",
      min: "0",
      max: "100",
      value: hotspot.x,
      onChange: e => updateHotspot(index, 'x', parseFloat(e.target.value)),
      style: {
        width: '100%'
      }
    }), wp.element.createElement("label", null, "Y Position"), wp.element.createElement("input", {
      type: "range",
      min: "0",
      max: "100",
      value: hotspot.y,
      onChange: e => updateHotspot(index, 'y', parseFloat(e.target.value)),
      style: {
        width: '100%'
      }
    }), wp.element.createElement(Button, {
      isDestructive: true,
      onClick: () => removeHotspot(index),
      style: {
        marginTop: '8px'
      }
    }, 'Remove'))))),
    // Image + Hotspots
    wp.element.createElement("div", {
      className: "hotspot-wrapper",
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    }, imageUrl ? wp.element.createElement("div", null, wp.element.createElement("img", {
      src: imageUrl,
      style: {
        width: `${imageWidth}%`,
        marginBottom: '10px'
      }
    }), wp.element.createElement(MediaUpload, {
      onSelect: media => setAttributes({
        imageUrl: media.url
      }),
      type: "image",
      render: ({
        open
      }) => wp.element.createElement(Button, {
        onClick: open,
        isSecondary: true
      }, "Replace Image")
    })) : wp.element.createElement(MediaUpload, {
      onSelect: media => setAttributes({
        imageUrl: media.url
      }),
      type: "image",
      render: ({
        open
      }) => wp.element.createElement(Button, {
        onClick: open
      }, "Select Image")
    }), hotspots.map((hotspot, index) => wp.element.createElement("div", {
      key: index,
      className: `hotspot ${hotspot.customClass || ''}`,
      style: {
        position: 'absolute',
        top: `${hotspot.y}%`,
        left: `${hotspot.x}%`,
        transform: 'translate(-50%, -50%)',
        '--hotspot-color': hotspot.color || '#000000'
      }
    }, [hotspot.showDot && wp.element.createElement('div', {
      key: 'dot',
      className: 'dot'
    }), wp.element.createElement('div', {
      key: 'tooltip-wrapper',
      className: 'tooltip-wrapper'
    }, [hotspot.showDivider && wp.element.createElement('div', {
      key: 'divider',
      className: 'divider'
    }), wp.element.createElement('div', {
      key: 'inner',
      className: 'inner'
    }, [hotspot.subtitle && wp.element.createElement('div', {
      key: 'subtitle',
      className: 'hotspot subtitle'
    }, hotspot.subtitle), hotspot.title && wp.element.createElement('div', {
      key: 'title',
      className: 'hotspot-title'
    }, [hotspot.title, hotspot.titleSpan && wp.element.createElement('span', {
      key: 'span'
    }, hotspot.titleSpan)])])])]))));
  },
  save: function (props) {
    const {
      attributes: {
        imageUrl,
        hotspots
      }
    } = props;
    return wp.element.createElement("div", {
      className: "hotspot-wrapper",
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    }, imageUrl && wp.element.createElement("img", {
      src: imageUrl,
      style: {
        width: `${props.attributes.imageWidth || 100}%`
      }
    }), hotspots.map((hotspot, index) => {
      const hotspotContent = [hotspot.showDot && wp.element.createElement('div', {
        key: 'dot',
        className: 'dot'
      }), wp.element.createElement('div', {
        key: 'tooltip-wrapper',
        className: 'tooltip-wrapper'
      }, [hotspot.showDivider && wp.element.createElement('div', {
        key: 'divider',
        className: 'divider'
      }), wp.element.createElement('div', {
        key: 'inner',
        className: 'inner'
      }, [hotspot.subtitle && wp.element.createElement('div', {
        key: 'subtitle',
        className: 'hotspot-subtitle'
      }, hotspot.subtitle), hotspot.title && wp.element.createElement('div', {
        key: 'title',
        className: 'hotspot-title'
      }, [hotspot.title, hotspot.titleSpan && wp.element.createElement('span', {
        key: 'span'
      }, hotspot.titleSpan)])])])];
      const hotspotProps = {
        key: index,
        className: `hotspot ${hotspot.customClass || ''}`,
        style: {
          position: 'absolute',
          top: `${hotspot.y}%`,
          left: `${hotspot.x}%`,
          transform: 'translate(-50%, -50%)',
          '--hotspot-color': hotspot.color || '#000000'
        }
      };
      return hotspot.link ? wp.element.createElement("a", {
        ...hotspotProps,
        href: hotspot.link,
        style: {
          ...hotspotProps.style,
          textDecoration: 'none'
        }
      }, hotspotContent) : wp.element.createElement("div", hotspotProps, hotspotContent);
    }));
  }
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkimage_hotspots_block"] = globalThis["webpackChunkimage_hotspots_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map