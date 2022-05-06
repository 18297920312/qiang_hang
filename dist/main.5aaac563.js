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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $li;
var $lastLi = $siteList.find('.addButton');
var x = localStorage.getItem('x'); //从本地存储里面取出 x

var xObject = JSON.parse(x); //把字符串变成对象

var hashMap = xObject || [//如果 x 为空字符串，那么hashMap的值为数组
{
  logo: 'A',
  name: 'acfun.com',
  url: 'https://www.acfun.com'
}, {
  logo: 'B',
  name: 'bilibili.com',
  url: 'https://www.bilibili.com'
}];

var simplify = function simplify(name) {
  // 简化字符
  // console.log(url);
  return name.replace("https://", "").replace("htttp://", "").replace("www.", "");
};

var render = function render() {
  // 页面渲染 
  $siteList.find('li:not(.addButton)').remove();
  hashMap.forEach(function (node, index) {
    $li = $("\n        <li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(node.name, "</div>\n                <div class=\"close\">\n                            <svg class=\"icon\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-close\"></use>\n                            </svg>\n                </div>\n            </div>\n        </li>\n        ")).insertBefore($lastLi);
    $li.on('click', '.close', function (e) {
      // 点击叉叉关闭按钮
      console.log('被点击了');
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
    $li.on('click', function () {
      // 点击打开链接
      window.open(node.url);
    });
  }); // let num = document.querySelectorAll('main li');
  // console.log(num.length);
  // if(num.length === 2){
  //     $siteList.attr('display','none');
  // }
};

render();
$('.addButton').on('click', function () {
  var link = window.prompt('请输入网址：');

  if (link === '') {
    // 防止用户输入字符为空
    return;
  } else if (link.indexOf('http') !== 0) {
    // 规范网址
    link = 'https://' + link;
  }

  var upCase = simplify(link);
  upCase = upCase[0].toUpperCase();
  hashMap.push({
    logo: upCase,
    name: simplify(link),
    url: link
  });
  render();
  console.log(hashMap);
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); // 将对象保存为字符串

  localStorage.setItem('x', string); // 在本地存储里面保存一个x，他的值就是string
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.5aaac563.js.map