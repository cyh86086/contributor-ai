"ui";
/* GENERATED: non-production AutoJs6 D05_HEIF device-verification support only. */
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function __defNormalProp(obj, key, value) {
    return key in obj ? __defProp(obj, key, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: value
    }) : obj[key] = value;
  };
  var __spreadValues = function __spreadValues(a, b) {
    for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) {
      var _iterator = _createForOfIteratorHelper(__getOwnPropSymbols(b)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var prop = _step.value;
          if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return a;
  };
  var __spreadProps = function __spreadProps(a, b) {
    return __defProps(a, __getOwnPropDescs(b));
  };
  var __objRest = function __objRest(source, exclude) {
    var target = {};
    for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) {
      var _iterator2 = _createForOfIteratorHelper(__getOwnPropSymbols(source)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var prop = _step2.value;
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return target;
  };
  var __async = function __async(__this, __arguments, generator) {
    return new Promise(function (resolve, reject) {
      var fulfilled = function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = function step(x) {
        return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  function defineCase(definition) {
    return Object.freeze(definition);
  }
  var D01_FORMAT_CHECK_CASE = defineCase({
    testCaseId: "D01_JPEG",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    requestCode: 6101,
    title: "D01 JPEG \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002",
    sourceEntryPath: "autojs6/source/d01-jpeg-device-check.entry.js",
    generatedPath: "autojs6/d01-jpeg-device-check.js"
  });
  var D02_FORMAT_CHECK_CASE = defineCase({
    testCaseId: "D02_PNG",
    pickerMimeType: "image/png",
    expectedMimeType: "image/png",
    requestCode: 6102,
    title: "D02 PNG \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 PNG \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002",
    sourceEntryPath: "autojs6/source/d02-png-device-check.entry.js",
    generatedPath: "autojs6/d02-png-device-check.js"
  });
  var D03_FORMAT_CHECK_CASE = defineCase({
    testCaseId: "D03_WEBP",
    pickerMimeType: "image/webp",
    expectedMimeType: "image/webp",
    requestCode: 6103,
    title: "D03 WebP \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 WebP \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002",
    sourceEntryPath: "autojs6/source/d03-webp-device-check.entry.js",
    generatedPath: "autojs6/d03-webp-device-check.js"
  });
  var D04_FORMAT_CHECK_CASE = defineCase({
    testCaseId: "D04_HEIC",
    pickerMimeType: "image/heic",
    expectedMimeType: "image/heic",
    requestCode: 6104,
    title: "D04 HEIC \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 HEIC \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002",
    sourceEntryPath: "autojs6/source/d04-heic-device-check.entry.js",
    generatedPath: "autojs6/d04-heic-device-check.js"
  });
  var D05_FORMAT_CHECK_CASE = defineCase({
    testCaseId: "D05_HEIF",
    pickerMimeType: "image/heif",
    expectedMimeType: "image/heif",
    requestCode: 6105,
    title: "D05 HEIF \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u652F\u63F4 HEIF \u6642\uFF0C\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 HEIF \u5716\u7247\u3002\u82E5\u5E73\u53F0\u6216\u9078\u5716\u5668\u4E0D\u652F\u63F4\uFF0C\u8ACB\u4FDD\u7559\u6E05\u7406\u5F8C\u7684 FAIL \u4E26\u505C\u6B62\uFF1B\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002",
    sourceEntryPath: "autojs6/source/d05-heif-device-check.entry.js",
    generatedPath: "autojs6/d05-heif-device-check.js"
  });
  var D06_RESOLVER_MIME_CHECK_CASE = defineCase({
    testCaseId: "D06_RESOLVER_MIME",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    requestCode: 6106,
    verificationMode: "resolver-mime",
    title: "D06 ContentResolver MIME \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG \u5716\u7247\u3002\u6B64\u6848\u4F8B\u53EA\u63A5\u53D7 Android ContentResolver \u76F4\u63A5\u56DE\u50B3\u7684 MIME\uFF0C\u4E0D\u4F7F\u7528\u4F4D\u5143\u7D44\u7C3D\u7AE0 fallback\u3002",
    sourceEntryPath: "autojs6/source/d06-resolver-mime-device-check.entry.js",
    generatedPath: "autojs6/d06-resolver-mime-device-check.js"
  });
  var D07_MIME_FALLBACK_CHECK_CASE = defineCase({
    testCaseId: "D07_MIME_FALLBACK",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    requestCode: 6107,
    verificationMode: "mime-fallback",
    title: "D07 MIME \u7C3D\u7AE0 fallback \u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u4FDD\u7559 production reader \u7684\u539F\u59CB bytes\uFF0C\u4F46\u523B\u610F\u79FB\u9664 reader MIME\uFF0C\u78BA\u8A8D\u65E2\u6709 portable core \u80FD\u4F9D JPEG \u4F4D\u5143\u7D44\u7C3D\u7AE0 fallback\u3002",
    sourceEntryPath: "autojs6/source/d07-mime-fallback-device-check.entry.js",
    generatedPath: "autojs6/d07-mime-fallback-device-check.js"
  });
  var D08_PERMISSION_GRANTED_CHECK_CASE = defineCase({
    testCaseId: "D08_PERMISSION_GRANTED",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    requestCode: 6108,
    title: "D08 \u6709\u6548\u6B0A\u9650\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u91CD\u65B0\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG\u3002\u9078\u53D6\u5F8C\u8173\u672C\u6703\u5728\u8A72\u6B21\u81E8\u6642 grant \u4ECD\u6709\u6548\u6642\u7ACB\u5373\u4F7F\u7528\u65E2\u6709 production reader \u8B80\u53D6\uFF0C\u4E26\u53EA\u8F38\u51FA sanitized success metadata\u3002",
    sourceEntryPath: "autojs6/source/d08-permission-granted-device-check.entry.js",
    generatedPath: "autojs6/d08-permission-granted-device-check.js"
  });
  var D13_EXACT_PORTABLE_LIMIT_CHECK_CASE = defineCase({
    testCaseId: "D13_EXACT_PORTABLE_LIMIT",
    fixtureId: "AT_PORTABLE_LIMIT",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6113,
    verificationMode: "exact-portable-limit",
    title: "D13 portable size \u4E0A\u9650\u7B49\u503C\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 AT_PORTABLE_LIMIT\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u53EA\u63A5\u53D7 production reader \u56DE\u5831\u5927\u5C0F\u7CBE\u78BA\u7B49\u65BC maxSizeBytes\uFF0C\u4E26\u53EA\u8F38\u51FA sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d13-exact-portable-limit-device-check.entry.js",
    generatedPath: "autojs6/d13-exact-portable-limit-device-check.js"
  });
  var D14_PORTABLE_SIZE_OVERFLOW_CHECK_CASE = defineCase({
    testCaseId: "D14_PORTABLE_SIZE_OVERFLOW",
    fixtureId: "OVER_PORTABLE",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6405,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6114,
    verificationMode: "portable-size-overflow",
    title: "D14 portable size \u8D85\u9650\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 OVER_PORTABLE\u3001\u4E14\u5DF2\u91CD\u65B0\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u4EE5 6,405 bytes portable \u4E0A\u9650\u8207\u8F03\u9AD8 reader ceiling \u57F7\u884C\uFF0C\u53EA\u63A5\u53D7 sanitized IMAGE_TOO_LARGE \u7D50\u679C\uFF0C\u4E0D\u5F97\u6539\u5BEB\u70BA PASS\u3002",
    sourceEntryPath: "autojs6/source/d14-portable-size-overflow-device-check.entry.js",
    generatedPath: "autojs6/d14-portable-size-overflow-device-check.js"
  });
  var D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE = defineCase({
    testCaseId: "D15_READER_SAFETY_CEILING_OVERFLOW",
    fixtureId: "OVER_READER_CEILING",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 6405,
    requestCode: 6115,
    verificationMode: "reader-safety-ceiling-overflow",
    title: "D15 reader safety ceiling \u8D85\u9650\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 OVER_READER_CEILING\u3001\u4E14\u5DF2\u91CD\u65B0\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u4EE5 6,405 bytes reader ceiling \u8207 6,406 bytes portable \u4E0A\u9650\u57F7\u884C\uFF1B\u9810\u671F public result \u662F IMAGE_READ_FAILED\uFF0C\u4E0D\u5F97\u6539\u5BEB\u70BA PASS\uFF0C\u4E14\u5176\u4ED6\u7D50\u679C\u5FC5\u9808\u539F\u6A23\u4FDD\u7559\u3002",
    sourceEntryPath: "autojs6/source/d15-reader-safety-ceiling-overflow-device-check.entry.js",
    generatedPath: "autojs6/d15-reader-safety-ceiling-overflow-device-check.js"
  });
  var D16_REPEATED_READS_CHECK_CASE = defineCase({
    testCaseId: "D16_REPEATED_READS",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6116,
    verificationMode: "repeated-reads",
    title: "D16 JPEG \u91CD\u8907\u8B80\u53D6\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u53EA\u9078\u53D6\u4E00\u6B21\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u8173\u672C\u6703\u5728\u540C\u4E00 fresh temporary grant \u4E0B\u57F7\u884C\u6070\u597D 10 \u6B21\u5B8C\u6574 production reader \u8207 portable core \u8DEF\u5F91\uFF1B\u4E0D\u5F97\u91CD\u65B0\u9078\u5716\uFF0C\u4E14\u53EA\u8F38\u51FA\u4E00\u7B46 sanitized aggregate metadata\u3002",
    sourceEntryPath: "autojs6/source/d16-repeated-reads-device-check.entry.js",
    generatedPath: "autojs6/d16-repeated-reads-device-check.js"
  });
  var D17_MULTI_IMAGE_SEQUENTIAL_CHECK_CASE = defineCase({
    testCaseId: "D17_MULTI_IMAGE_SEQUENTIAL",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/*",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6117,
    verificationMode: "multi-image-sequential",
    requestedImages: 3,
    title: "D17 \u591A\u5F35\u5716\u7247\u4F9D\u5E8F\u8B80\u53D6\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u53D6\u6070\u597D 3 \u5F35\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u9078\u5716\u5668\u5FC5\u9808\u555F\u7528\u591A\u9078\u6A21\u5F0F\u3002\u8173\u672C\u6703\u5728\u540C\u4E00 fresh temporary grant \u4E0B\u4F9D\u5E8F\u8655\u7406\u6BCF\u5F35 URI\uFF0C\u4E26\u53EA\u8F38\u51FA\u4E00\u7B46 sanitized aggregate metadata\u3002",
    sourceEntryPath: "autojs6/source/d17-multi-image-sequential-device-check.entry.js",
    generatedPath: "autojs6/d17-multi-image-sequential-device-check.js"
  });
  var D18_STREAM_CLEANUP_SUCCESS_CHECK_CASE = defineCase({
    testCaseId: "D18_STREAM_CLEANUP_SUCCESS",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6118,
    verificationMode: "stream-cleanup-success",
    title: "D18 \u6210\u529F\u8B80\u53D6\u5F8C stream \u6E05\u7406\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B instrument stream close \u884C\u70BA\uFF0C\u78BA\u8A8D\u6210\u529F\u8B80\u53D6\u5F8C\u6070\u597D\u4E00\u6B21 close\uFF0C\u4E26\u8F38\u51FA\u542B closeCount \u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d18-stream-cleanup-success-device-check.entry.js",
    generatedPath: "autojs6/d18-stream-cleanup-success-device-check.js"
  });
  var D19_CLEANUP_AFTER_FAILURE_CHECK_CASE = defineCase({
    testCaseId: "D19_CLEANUP_AFTER_FAILURE",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    failureAfterBytes: 3203,
    requestCode: 6119,
    verificationMode: "cleanup-after-failure",
    title: "D19 \u8B80\u53D6\u5931\u6557\u5F8C stream \u6E05\u7406\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u5728\u8B80\u53D6\u4E2D\u9014\u6CE8\u5165\u53D7\u63A7\u5931\u6557\uFF0C\u78BA\u8A8D\u5931\u6557\u5F8C stream \u4ECD\u88AB\u6B63\u78BA\u6E05\u7406\uFF0C\u4E26\u8F38\u51FA\u542B closeCount \u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d19-cleanup-after-failure-device-check.entry.js",
    generatedPath: "autojs6/d19-cleanup-after-failure-device-check.js"
  });
  var D20_MEMORY_BEHAVIOR_CHECK_CASE = defineCase({
    testCaseId: "D20_MEMORY_BEHAVIOR",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6120,
    verificationMode: "memory-behavior",
    title: "D20 \u91CD\u8907\u8B80\u53D6\u8A18\u61B6\u9AD4\u884C\u70BA\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u57F7\u884C 10 \u6B21\u5B8C\u6574\u8B80\u53D6\uFF0C\u76E3\u63A7\u7C97\u7C92\u5EA6 heap \u8A18\u61B6\u9AD4\u8B8A\u5316\uFF0C\u78BA\u8A8D\u7121\u4E0D\u5B89\u5168\u6301\u7E8C\u6210\u9577\uFF0C\u4E26\u8F38\u51FA\u542B\u8A18\u61B6\u9AD4\u6307\u6A19\u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d20-memory-behavior-device-check.entry.js",
    generatedPath: "autojs6/d20-memory-behavior-device-check.js"
  });
  var D21_UI_RESPONSIVENESS_CHECK_CASE = defineCase({
    testCaseId: "D21_UI_RESPONSIVENESS",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6121,
    verificationMode: "ui-responsiveness",
    title: "D21 UI \u56DE\u61C9\u6027\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u57F7\u884C 10 \u6B21\u5B8C\u6574\u8B80\u53D6\uFF0C\u6BCF\u6B21\u8B80\u53D6\u9593\u5411 UI thread \u767C\u9001 heartbeat\uFF0C\u78BA\u8A8D UI \u7121\u963B\u585E\uFF0C\u4E26\u8F38\u51FA\u542B heartbeatCount \u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d21-ui-responsiveness-device-check.entry.js",
    generatedPath: "autojs6/d21-ui-responsiveness-device-check.js"
  });
  var D22_NO_PERSISTENCE_CHECK_CASE = defineCase({
    testCaseId: "D22_NO_PERSISTENCE",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6122,
    verificationMode: "no-persistence",
    directExecution: true,
    title: "D22 \u7121\u5F71\u50CF\u6301\u4E45\u5316\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u57F7\u884C\u6210\u529F\u8207\u5931\u6557\u5169\u7A2E\u8DEF\u5F91\uFF0C\u6AA2\u67E5\u8F38\u51FA\u4E2D\u662F\u5426\u542B\u6709 Base64\u3001bytes \u6216 URI\uFF0C\u78BA\u8A8D\u7121\u5F71\u50CF\u8CC7\u6599\u6301\u4E45\u5316\uFF0C\u4E26\u8F38\u51FA\u542B successOutputClean \u8207 failureOutputClean \u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d22-no-persistence-device-check.entry.js",
    generatedPath: "autojs6/d22-no-persistence-device-check.js"
  });
  var D23_SENSITIVE_LOGGING_CHECK_CASE = defineCase({
    testCaseId: "D23_SENSITIVE_LOGGING",
    fixtureId: "JPEG_REPEAT_VALID",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6123,
    verificationMode: "sensitive-logging",
    directExecution: true,
    title: "D23 \u7121\u654F\u611F\u65E5\u8A8C\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 JPEG_REPEAT_VALID\u3001\u4E14\u5DF2\u7368\u7ACB\u78BA\u8A8D\u70BA 6,406 bytes \u7684\u975E\u654F\u611F JPEG\u3002\u6B64 evidence-only \u6848\u4F8B\u57F7\u884C\u6210\u529F\u8207\u5931\u6557\u5169\u7A2E\u8DEF\u5F91\uFF0C\u6355\u7372\u4E26\u6AA2\u67E5 console \u65E5\u8A8C\u4E2D\u662F\u5426\u542B\u6709\u6A94\u6848\u8DEF\u5F91\u3001URIs\u3001Base64\u3001byte arrays \u6216 exception stack traces\uFF0C\u78BA\u8A8D\u7121\u654F\u611F\u8CC7\u6599\u6F0F\uFF0C\u4E26\u8F38\u51FA\u542B successLogsClean \u8207 failureLogsClean \u7684 sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d23-sensitive-logging-device-check.entry.js",
    generatedPath: "autojs6/d23-sensitive-logging-device-check.js"
  });
  var D24_EMPTY_IMAGE_CHECK_CASE = defineCase({
    testCaseId: "D24_EMPTY_IMAGE",
    fixtureId: "EMPTY_CONTROLLED",
    pickerMimeType: "image/*",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 0,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6124,
    verificationMode: "empty-image",
    directExecution: true,
    title: "D24 \u7A7A\u6A94\u6848\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 EMPTY_CONTROLLED \u7684 0-byte \u6A94\u6848\uFF08\u82E5\u9078\u5716\u5668\u5141\u8A31\uFF09\u3002\u6B64 evidence-only \u6848\u4F8B\u9810\u671F production reader \u56DE\u50B3 EMPTY_IMAGE \u932F\u8AA4\u78BC\uFF0C\u4E26\u8F38\u51FA sanitized metadata\u3002\u82E5\u9078\u5716\u5668\u4E0D\u5141\u8A31\u9078\u64C7\u7A7A\u6A94\u6848\uFF0C\u6B64\u6848\u4F8B\u4FDD\u7559\u70BA controlled-fake offline contract\u3002",
    sourceEntryPath: "autojs6/source/d24-empty-image-device-check.entry.js",
    generatedPath: "autojs6/d24-empty-image-device-check.js"
  });
  var D25_UNSUPPORTED_MIME_TYPE_CHECK_CASE = defineCase({
    testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
    fixtureId: "UNSUPPORTED_CONTROLLED",
    pickerMimeType: "*/*",
    expectedMimeType: "*/*",
    expectedSizeBytes: 0,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6125,
    verificationMode: "unsupported-mime-type",
    directExecution: true,
    title: "D25 \u4E0D\u652F\u63F4\u7684 MIME \u985E\u578B\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u8ACB\u5728 Android \u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u79C1\u4E0B\u5C0D\u61C9 UNSUPPORTED_CONTROLLED \u7684\u975E\u5716\u7247\u6A94\u6848\uFF08\u5982 .txt\uFF0C\u82E5\u9078\u5716\u5668\u5141\u8A31\uFF09\u3002\u6B64 evidence-only \u6848\u4F8B\u9810\u671F production reader \u56DE\u50B3 UNSUPPORTED_MIME_TYPE \u932F\u8AA4\u78BC\uFF0C\u4E26\u8F38\u51FA sanitized metadata\u3002\u82E5\u9078\u5716\u5668\u4E0D\u5141\u8A31\u9078\u64C7\u975E\u5716\u7247\u6A94\u6848\uFF0C\u6B64\u6848\u4F8B\u4FDD\u7559\u70BA controlled-fake offline contract\u3002",
    sourceEntryPath: "autojs6/source/d25-unsupported-mime-type-device-check.entry.js",
    generatedPath: "autojs6/d25-unsupported-mime-type-device-check.js"
  });
  var D26_CONTROLLED_ENCODING_FAILURE_CHECK_CASE = defineCase({
    testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
    fixtureId: "ENCODING_FAILURE_CONTROLLED",
    pickerMimeType: "image/jpeg",
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: 6406,
    maxSizeBytes: 6406,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    requestCode: 6126,
    verificationMode: "controlled-encoding-failure",
    directExecution: true,
    title: "D26 \u53D7\u63A7\u7DE8\u78BC\u5931\u6557\u88DD\u7F6E\u9A57\u8B49",
    instructionText: "\u6B64 evidence-only \u6848\u4F8B\u6A21\u64EC\u6709\u6548\u8B80\u53D6\u5F8C\u7684\u53D7\u63A7\u7DE8\u78BC\u5931\u6557\u3002\u9810\u671F production reader \u56DE\u50B3 ENCODING_FAILED \u932F\u8AA4\u78BC\uFF0C\u4E26\u8F38\u51FA sanitized metadata\u3002",
    sourceEntryPath: "autojs6/source/d26-controlled-encoding-failure-device-check.entry.js",
    generatedPath: "autojs6/d26-controlled-encoding-failure-device-check.js"
  });
  var FORMAT_CHECK_CASES = Object.freeze([D01_FORMAT_CHECK_CASE, D02_FORMAT_CHECK_CASE, D03_FORMAT_CHECK_CASE, D04_FORMAT_CHECK_CASE, D05_FORMAT_CHECK_CASE, D06_RESOLVER_MIME_CHECK_CASE, D07_MIME_FALLBACK_CHECK_CASE, D08_PERMISSION_GRANTED_CHECK_CASE, D13_EXACT_PORTABLE_LIMIT_CHECK_CASE, D14_PORTABLE_SIZE_OVERFLOW_CHECK_CASE, D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE, D16_REPEATED_READS_CHECK_CASE, D17_MULTI_IMAGE_SEQUENTIAL_CHECK_CASE, D18_STREAM_CLEANUP_SUCCESS_CHECK_CASE, D19_CLEANUP_AFTER_FAILURE_CHECK_CASE, D20_MEMORY_BEHAVIOR_CHECK_CASE, D21_UI_RESPONSIVENESS_CHECK_CASE, D22_NO_PERSISTENCE_CHECK_CASE, D23_SENSITIVE_LOGGING_CHECK_CASE, D24_EMPTY_IMAGE_CHECK_CASE, D25_UNSUPPORTED_MIME_TYPE_CHECK_CASE, D26_CONTROLLED_ENCODING_FAILURE_CHECK_CASE]);
  var D02_D05_FORMAT_CHECK_CASES = Object.freeze([D02_FORMAT_CHECK_CASE, D03_FORMAT_CHECK_CASE, D04_FORMAT_CHECK_CASE, D05_FORMAT_CHECK_CASE]);
  var IMAGE_INPUT_ERROR_CODES = Object.freeze({
    UNSUPPORTED_MIME_TYPE: "UNSUPPORTED_MIME_TYPE",
    EMPTY_IMAGE: "EMPTY_IMAGE",
    IMAGE_TOO_LARGE: "IMAGE_TOO_LARGE",
    IMAGE_READ_FAILED: "IMAGE_READ_FAILED",
    ENCODING_FAILED: "ENCODING_FAILED",
    URI_ACCESS_DENIED: "URI_ACCESS_DENIED"
  });
  var IMAGE_READER_ERROR_CLASSIFICATIONS = Object.freeze({
    URI_ACCESS_DENIED: "URI_ACCESS_DENIED",
    IMAGE_READ_FAILED: "IMAGE_READ_FAILED"
  });
  var ALLOWED_READER_ERROR_CLASSIFICATIONS = new Set(Object.values(IMAGE_READER_ERROR_CLASSIFICATIONS));
  var ERROR_MESSAGES = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE, "The image MIME type is not supported."), IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE, "The image is empty."), IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE, "The image exceeds the configured size limit."), IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, "The image could not be read."), IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED, "The image could not be encoded."), IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, "The image URI is not accessible."));
  var SUPPORTED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
  var HEIC_BRANDS = new Set(["heic", "heix", "hevc", "hevx"]);
  var HEIF_BRANDS = new Set(["heif", "heim", "heis", "mif1", "msf1"]);
  var BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var ImageInputError = function (_Error) {
    "use strict";

    function ImageInputError(code) {
      var _this;
      _classCallCheck(this, ImageInputError);
      _this = _callSuper(this, ImageInputError, [ERROR_MESSAGES[code]]);
      _this.name = "ImageInputError";
      _this.code = code;
      return _this;
    }
    _inherits(ImageInputError, _Error);
    return _createClass(ImageInputError);
  }(_wrapNativeSuper(Error));
  var ClassifiedImageReaderError = function (_Error2) {
    "use strict";

    function ClassifiedImageReaderError(classification) {
      var _this2;
      _classCallCheck(this, ClassifiedImageReaderError);
      _this2 = _callSuper(this, ClassifiedImageReaderError, ["Classified image reader failure."]);
      _this2.name = "ClassifiedImageReaderError";
      Object.defineProperty(_this2, "classification", {
        configurable: false,
        enumerable: true,
        value: ALLOWED_READER_ERROR_CLASSIFICATIONS.has(classification) ? classification : null,
        writable: false
      });
      return _this2;
    }
    _inherits(ClassifiedImageReaderError, _Error2);
    return _createClass(ClassifiedImageReaderError);
  }(_wrapNativeSuper(Error));
  function prepareImageInput(_0) {
    return __async(this, arguments, function (_ref) {
      var sourceUri = _ref.sourceUri,
        maxSizeBytes = _ref.maxSizeBytes,
        reader = _ref.reader,
        _ref$isFileUriApprove = _ref.isFileUriApproved,
        isFileUriApproved = _ref$isFileUriApprove === void 0 ? function () {
          return false;
        } : _ref$isFileUriApprove,
        _ref$encodeBase = _ref.encodeBase64,
        encodeBase64 = _ref$encodeBase === void 0 ? encodeBytesToBase64 : _ref$encodeBase;
      return _regenerator().m(function _callee() {
        var scheme, readResult, bytes, reportedMimeType, mimeType, imageBase64, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              scheme = validateSourceUri(sourceUri);
              validateMaxSize(maxSizeBytes);
              validateReader(reader);
              _t = scheme === "file";
              if (!_t) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return checkFileApproval(isFileUriApproved, sourceUri);
            case 1:
              _t = !_context.v;
            case 2:
              if (!_t) {
                _context.n = 3;
                break;
              }
              throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
            case 3:
              _context.n = 4;
              return checkRuntimeAccess(reader, sourceUri);
            case 4:
              _context.n = 5;
              return readImage(reader, sourceUri);
            case 5:
              readResult = _context.v;
              bytes = normalizeBytes(readResult == null ? void 0 : readResult.bytes);
              if (!(bytes.byteLength === 0)) {
                _context.n = 6;
                break;
              }
              throw imageInputError(IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE);
            case 6:
              if (!(bytes.byteLength > maxSizeBytes)) {
                _context.n = 7;
                break;
              }
              throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE);
            case 7:
              reportedMimeType = normalizeMimeType(readResult == null ? void 0 : readResult.mimeType);
              mimeType = SUPPORTED_MIME_TYPES.has(reportedMimeType) ? reportedMimeType : detectImageMimeType(bytes);
              if (mimeType) {
                _context.n = 8;
                break;
              }
              throw imageInputError(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE);
            case 8:
              imageBase64 = encodeImage(bytes, encodeBase64);
              return _context.a(2, {
                sourceUri: sourceUri,
                mimeType: mimeType,
                sizeBytes: bytes.byteLength,
                imageBase64: imageBase64
              });
          }
        }, _callee);
      })();
    });
  }
  function normalizeMimeType(value) {
    if (typeof value !== "string") {
      return "";
    }
    return value.split(";", 1)[0].trim().toLowerCase();
  }
  function detectImageMimeType(value) {
    var bytes = normalizeBytes(value);
    if (matches(bytes, [255, 216, 255])) {
      return "image/jpeg";
    }
    if (matches(bytes, [137, 80, 78, 71, 13, 10, 26, 10])) {
      return "image/png";
    }
    if (readAscii(bytes, 0, 4) === "RIFF" && readAscii(bytes, 8, 12) === "WEBP") {
      return "image/webp";
    }
    return detectIsoBaseMediaType(bytes);
  }
  function encodeBytesToBase64(value) {
    var bytes = normalizeBytes(value);
    var result = "";
    for (var index = 0; index < bytes.byteLength; index += 3) {
      var first = bytes[index];
      var hasSecond = index + 1 < bytes.byteLength;
      var hasThird = index + 2 < bytes.byteLength;
      var second = hasSecond ? bytes[index + 1] : 0;
      var third = hasThird ? bytes[index + 2] : 0;
      var combined = first << 16 | second << 8 | third;
      result += BASE64_ALPHABET[combined >> 18 & 63];
      result += BASE64_ALPHABET[combined >> 12 & 63];
      result += hasSecond ? BASE64_ALPHABET[combined >> 6 & 63] : "=";
      result += hasThird ? BASE64_ALPHABET[combined & 63] : "=";
    }
    return result;
  }
  function validateSourceUri(sourceUri) {
    if (typeof sourceUri !== "string") {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
    }
    if (/^content:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/.test(sourceUri)) {
      return "content";
    }
    if (/^file:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/.test(sourceUri)) {
      return "file";
    }
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
  }
  function validateMaxSize(maxSizeBytes) {
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
  }
  function validateReader(reader) {
    if (!reader || typeof reader.canAccess !== "function" || typeof reader.read !== "function") {
      throw new TypeError("reader must provide canAccess() and read()");
    }
  }
  function checkFileApproval(isFileUriApproved, sourceUri) {
    return __async(this, null, _regenerator().m(function _callee2() {
      var _t2, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(typeof isFileUriApproved !== "function")) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, false);
          case 1:
            _context2.p = 1;
            _context2.n = 2;
            return isFileUriApproved(sourceUri);
          case 2:
            _t2 = _context2.v;
            return _context2.a(2, _t2 === true);
          case 3:
            _context2.p = 3;
            _t3 = _context2.v;
            return _context2.a(2, false);
        }
      }, _callee2, null, [[1, 3]]);
    }));
  }
  function checkRuntimeAccess(reader, sourceUri) {
    return __async(this, null, _regenerator().m(function _callee3() {
      var _t4, _t5;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return reader.canAccess(sourceUri);
          case 1:
            _t4 = _context3.v;
            if (!(_t4 !== true)) {
              _context3.n = 2;
              break;
            }
            throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
          case 2:
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t5 = _context3.v;
            throw imageInputError(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 3]]);
    }));
  }
  function readImage(reader, sourceUri) {
    return __async(this, null, _regenerator().m(function _callee4() {
      var code, _t6;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return reader.read(sourceUri);
          case 1:
            return _context4.a(2, _context4.v);
          case 2:
            _context4.p = 2;
            _t6 = _context4.v;
            code = _t6 instanceof ClassifiedImageReaderError && _t6.classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
            throw imageInputError(code);
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }));
  }
  function normalizeBytes(value) {
    if (value instanceof Uint8Array) {
      return value;
    }
    if (value instanceof ArrayBuffer) {
      return new Uint8Array(value);
    }
    throw imageInputError(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
  }
  function encodeImage(bytes, encodeBase64) {
    if (typeof encodeBase64 !== "function") {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED);
    }
    try {
      var result = encodeBase64(bytes);
      if (typeof result !== "string" || result.length === 0 || result.startsWith("data:")) {
        throw new TypeError("Invalid Base64 result");
      }
      return result;
    } catch (e) {
      throw imageInputError(IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED);
    }
  }
  function detectIsoBaseMediaType(bytes) {
    if (bytes.byteLength < 12 || readAscii(bytes, 4, 8) !== "ftyp") {
      return "";
    }
    var declaredSize = readUint32(bytes, 0);
    var boxEnd = declaredSize >= 12 && declaredSize <= bytes.byteLength ? declaredSize : bytes.byteLength;
    var brands = [readAscii(bytes, 8, 12)];
    for (var offset = 16; offset + 4 <= boxEnd; offset += 4) {
      brands.push(readAscii(bytes, offset, offset + 4));
    }
    if (brands.some(function (brand) {
      return HEIC_BRANDS.has(brand);
    })) {
      return "image/heic";
    }
    if (brands.some(function (brand) {
      return HEIF_BRANDS.has(brand);
    })) {
      return "image/heif";
    }
    return "";
  }
  function matches(bytes, signature) {
    if (bytes.byteLength < signature.length) {
      return false;
    }
    return signature.every(function (byte, index) {
      return bytes[index] === byte;
    });
  }
  function readAscii(bytes, start, end) {
    if (start < 0 || end > bytes.byteLength || start >= end) {
      return "";
    }
    var result = "";
    for (var index = start; index < end; index += 1) {
      result += String.fromCharCode(bytes[index]);
    }
    return result;
  }
  function readUint32(bytes, offset) {
    return bytes[offset] * 16777216 + bytes[offset + 1] * 65536 + bytes[offset + 2] * 256 + bytes[offset + 3];
  }
  function imageInputError(code) {
    return new ImageInputError(code);
  }
  var VISION_PROVIDER_ERROR_CODES = Object.freeze({
    PROVIDER_RESPONSE_INVALID: "PROVIDER_RESPONSE_INVALID",
    PROVIDER_REQUEST_FAILED: "PROVIDER_REQUEST_FAILED",
    PROVIDER_AUTH_FAILED: "PROVIDER_AUTH_FAILED",
    PROVIDER_RATE_LIMITED: "PROVIDER_RATE_LIMITED",
    PROVIDER_UNAVAILABLE: "PROVIDER_UNAVAILABLE",
    IMAGE_TOO_LARGE_FOR_PROVIDER: "IMAGE_TOO_LARGE_FOR_PROVIDER"
  });
  var ERROR_MESSAGES2 = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID, "The provider response does not match the required contract."), VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED, "The provider request failed."), VISION_PROVIDER_ERROR_CODES.PROVIDER_AUTH_FAILED, "The provider authentication failed."), VISION_PROVIDER_ERROR_CODES.PROVIDER_RATE_LIMITED, "The provider rate limit was exceeded."), VISION_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE, "The provider service is unavailable."), VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER, "The image exceeds the provider maximum size limit."));
  var HTTP_ADAPTER_ERROR_CODES = Object.freeze({
    HTTP_REQUEST_FAILED: "HTTP_REQUEST_FAILED",
    HTTP_TIMEOUT: "HTTP_TIMEOUT",
    HTTP_INVALID_URL: "HTTP_INVALID_URL",
    HTTP_INVALID_METHOD: "HTTP_INVALID_METHOD",
    HTTP_SERVER_ERROR: "HTTP_SERVER_ERROR",
    HTTP_CLIENT_ERROR: "HTTP_CLIENT_ERROR",
    HTTP_AUTH_FAILED: "HTTP_AUTH_FAILED",
    HTTP_FORBIDDEN: "HTTP_FORBIDDEN",
    HTTP_RATE_LIMITED: "HTTP_RATE_LIMITED"
  });
  var ERROR_MESSAGES3 = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED, "The HTTP request failed."), HTTP_ADAPTER_ERROR_CODES.HTTP_TIMEOUT, "The HTTP request timed out."), HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL, "The URL is invalid or not HTTPS."), HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD, "The HTTP method is not supported."), HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR, "The server returned an error."), HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR, "The request was invalid."), HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED, "Authentication failed."), HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN, "Access is forbidden."), HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED, "Rate limit exceeded."));
  var DEFAULT_CHUNK_SIZE_BYTES = 64 * 1024;
  var DEFAULT_MAX_ZERO_LENGTH_READS = 3;
  var CONTENT_SCHEME = "content";
  var FILE_SCHEME = "file";
  function createAutoJs6AndroidImageReader(_ref2) {
    var context = _ref2.context,
      contentResolver = _ref2.contentResolver,
      parseUri = _ref2.parseUri,
      javaBridge = _ref2.javaBridge,
      _ref2$isFileUriApprov = _ref2.isFileUriApproved,
      isFileUriApproved = _ref2$isFileUriApprov === void 0 ? function () {
        return false;
      } : _ref2$isFileUriApprov,
      openFileReadOnly = _ref2.openFileReadOnly,
      readerSafetyLimitBytes = _ref2.readerSafetyLimitBytes,
      _ref2$chunkSizeBytes = _ref2.chunkSizeBytes,
      chunkSizeBytes = _ref2$chunkSizeBytes === void 0 ? DEFAULT_CHUNK_SIZE_BYTES : _ref2$chunkSizeBytes,
      _ref2$maxZeroLengthRe = _ref2.maxZeroLengthReads,
      maxZeroLengthReads = _ref2$maxZeroLengthRe === void 0 ? DEFAULT_MAX_ZERO_LENGTH_READS : _ref2$maxZeroLengthRe,
      _ref2$logger = _ref2.logger,
      logger = _ref2$logger === void 0 ? createNoopLogger() : _ref2$logger;
    var resolver = resolveContentResolver(context, contentResolver);
    validateDependencies({
      resolver: resolver,
      parseUri: parseUri,
      javaBridge: javaBridge,
      readerSafetyLimitBytes: readerSafetyLimitBytes,
      chunkSizeBytes: chunkSizeBytes,
      maxZeroLengthReads: maxZeroLengthReads
    });
    var safeLogger = normalizeLogger(logger);
    return Object.freeze({
      canAccess: function canAccess(sourceUri) {
        return __async(this, null, _regenerator().m(function _callee5() {
          var stream, source, _t7;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                _context5.p = 0;
                _context5.n = 1;
                return resolveSource({
                  sourceUri: sourceUri,
                  parseUri: parseUri,
                  isFileUriApproved: isFileUriApproved,
                  requireFileOpener: openFileReadOnly
                });
              case 1:
                source = _context5.v;
                stream = openSourceStream({
                  source: source,
                  resolver: resolver,
                  openFileReadOnly: openFileReadOnly
                });
                return _context5.a(2, stream != null);
              case 2:
                _context5.p = 2;
                _t7 = _context5.v;
                return _context5.a(2, false);
              case 3:
                _context5.p = 3;
                closeQuietly(stream, safeLogger);
                return _context5.f(3);
              case 4:
                return _context5.a(2);
            }
          }, _callee5, null, [[0, 2, 3, 4]]);
        }));
      },
      read: function read(sourceUri) {
        return __async(this, null, _regenerator().m(function _callee6() {
          var _a2, stream, source, mimeType, readBuffer, readResult, bytes, _t8;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _context6.p = 0;
                _context6.n = 1;
                return resolveSource({
                  sourceUri: sourceUri,
                  parseUri: parseUri,
                  isFileUriApproved: isFileUriApproved,
                  requireFileOpener: openFileReadOnly
                });
              case 1:
                source = _context6.v;
                mimeType = source.scheme === CONTENT_SCHEME ? getContentMimeType(resolver, source.parsedUri, javaBridge) : void 0;
                stream = openSourceStream({
                  source: source,
                  resolver: resolver,
                  openFileReadOnly: openFileReadOnly
                });
                if (!(stream == null)) {
                  _context6.n = 2;
                  break;
                }
                throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
              case 2:
                readBuffer = javaBridge.createByteArray(chunkSizeBytes);
                readResult = readCompleteStream({
                  stream: stream,
                  readBuffer: readBuffer,
                  toUint8Array: (_a2 = javaBridge.toUint8Array) != null ? _a2 : javaSignedBytesToUint8Array,
                  readerSafetyLimitBytes: readerSafetyLimitBytes,
                  maxZeroLengthReads: maxZeroLengthReads
                });
                bytes = combineChunks(readResult.chunks, readResult.sizeBytes);
                return _context6.a(2, {
                  bytes: bytes,
                  mimeType: mimeType
                });
              case 3:
                _context6.p = 3;
                _t8 = _context6.v;
                if (!(_t8 instanceof ClassifiedImageReaderError)) {
                  _context6.n = 4;
                  break;
                }
                throw _t8;
              case 4:
                throw classifyReaderFailure(_t8, javaBridge.classifyError);
              case 5:
                _context6.p = 5;
                closeQuietly(stream, safeLogger);
                return _context6.f(5);
              case 6:
                return _context6.a(2);
            }
          }, _callee6, null, [[0, 3, 5, 6]]);
        }));
      }
    });
  }
  function javaSignedBytesToUint8Array(javaBytes, count) {
    if (javaBytes == null || !Number.isSafeInteger(count) || count < 0 || count > javaBytes.length) {
      throw new TypeError("Invalid Java byte conversion input");
    }
    var result = new Uint8Array(count);
    for (var index = 0; index < count; index += 1) {
      var value = Number(javaBytes[index]);
      if (!Number.isInteger(value) || value < -128 || value > 255) {
        throw new TypeError("Invalid Java byte value");
      }
      result[index] = value & 255;
    }
    return result;
  }
  function resolveContentResolver(context, contentResolver) {
    if (contentResolver) {
      return contentResolver;
    }
    if (context && typeof context.getContentResolver === "function") {
      return context.getContentResolver();
    }
    return null;
  }
  function validateDependencies(_ref3) {
    var resolver = _ref3.resolver,
      parseUri = _ref3.parseUri,
      javaBridge = _ref3.javaBridge,
      readerSafetyLimitBytes = _ref3.readerSafetyLimitBytes,
      chunkSizeBytes = _ref3.chunkSizeBytes,
      maxZeroLengthReads = _ref3.maxZeroLengthReads;
    if (!resolver || typeof resolver.openInputStream !== "function" || typeof resolver.getType !== "function") {
      throw new TypeError("A ContentResolver-compatible dependency is required");
    }
    if (typeof parseUri !== "function") {
      throw new TypeError("parseUri must be a function");
    }
    if (!javaBridge || typeof javaBridge.createByteArray !== "function" || typeof javaBridge.classifyError !== "function") {
      throw new TypeError("javaBridge must provide createByteArray() and classifyError()");
    }
    validatePositiveSafeInteger(readerSafetyLimitBytes, "readerSafetyLimitBytes");
    validatePositiveSafeInteger(chunkSizeBytes, "chunkSizeBytes");
    validatePositiveSafeInteger(maxZeroLengthReads, "maxZeroLengthReads");
  }
  function validatePositiveSafeInteger(value, name) {
    if (!Number.isSafeInteger(value) || value <= 0) {
      throw new TypeError("".concat(name, " must be a positive safe integer"));
    }
  }
  function resolveSource(_0) {
    return __async(this, arguments, function (_ref4) {
      var sourceUri = _ref4.sourceUri,
        parseUri = _ref4.parseUri,
        isFileUriApproved = _ref4.isFileUriApproved,
        requireFileOpener = _ref4.requireFileOpener;
      return _regenerator().m(function _callee7() {
        var scheme, _t9, _t0, _t1;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              scheme = getSourceScheme(sourceUri);
              if (!(scheme === FILE_SCHEME)) {
                _context7.n = 5;
                break;
              }
              _t0 = typeof isFileUriApproved !== "function";
              if (_t0) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return evaluateFilePolicy(isFileUriApproved, sourceUri);
            case 1:
              _t0 = !_context7.v;
            case 2:
              _t9 = _t0;
              if (_t9) {
                _context7.n = 3;
                break;
              }
              _t9 = typeof requireFileOpener !== "function";
            case 3:
              if (!_t9) {
                _context7.n = 4;
                break;
              }
              throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
            case 4:
              return _context7.a(2, {
                scheme: scheme,
                sourceUri: sourceUri
              });
            case 5:
              _context7.p = 5;
              return _context7.a(2, {
                scheme: scheme,
                sourceUri: sourceUri,
                parsedUri: parseUri(sourceUri)
              });
            case 6:
              _context7.p = 6;
              _t1 = _context7.v;
              throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
            case 7:
              return _context7.a(2);
          }
        }, _callee7, null, [[5, 6]]);
      })();
    });
  }
  function getSourceScheme(sourceUri) {
    if (typeof sourceUri !== "string") {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
    }
    if (/^content:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/.test(sourceUri)) {
      return CONTENT_SCHEME;
    }
    if (/^file:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/.test(sourceUri)) {
      return FILE_SCHEME;
    }
    throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
  }
  function evaluateFilePolicy(isFileUriApproved, sourceUri) {
    return __async(this, null, _regenerator().m(function _callee8() {
      var _t10, _t11;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            _context8.p = 0;
            _context8.n = 1;
            return isFileUriApproved(sourceUri);
          case 1:
            _t10 = _context8.v;
            return _context8.a(2, _t10 === true);
          case 2:
            _context8.p = 2;
            _t11 = _context8.v;
            return _context8.a(2, false);
        }
      }, _callee8, null, [[0, 2]]);
    }));
  }
  function openSourceStream(_ref5) {
    var source = _ref5.source,
      resolver = _ref5.resolver,
      openFileReadOnly = _ref5.openFileReadOnly;
    return source.scheme === CONTENT_SCHEME ? resolver.openInputStream(source.parsedUri) : openFileReadOnly(source.sourceUri);
  }
  function getContentMimeType(resolver, parsedUri, javaBridge) {
    try {
      return resolver.getType(parsedUri);
    } catch (error) {
      var classification = safeClassifyError(javaBridge.classifyError, error);
      if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
      }
      return void 0;
    }
  }
  function readCompleteStream(_ref6) {
    var stream = _ref6.stream,
      readBuffer = _ref6.readBuffer,
      toUint8Array = _ref6.toUint8Array,
      readerSafetyLimitBytes = _ref6.readerSafetyLimitBytes,
      maxZeroLengthReads = _ref6.maxZeroLengthReads;
    if (!stream || typeof stream.read !== "function") {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }
    if (typeof toUint8Array !== "function") {
      throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
    }
    var chunks = [];
    var sizeBytes = 0;
    var zeroLengthReads = 0;
    while (true) {
      var count = stream.read(readBuffer);
      if (count === -1) {
        break;
      }
      if (!Number.isSafeInteger(count) || count < -1) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
      }
      if (count === 0) {
        zeroLengthReads += 1;
        if (zeroLengthReads >= maxZeroLengthReads) {
          throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
        }
        continue;
      }
      zeroLengthReads = 0;
      if (sizeBytes + count > readerSafetyLimitBytes) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
      }
      var converted = void 0;
      try {
        converted = toUint8Array(readBuffer, count);
      } catch (e) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
      }
      if (!(converted instanceof Uint8Array) || converted.byteLength !== count) {
        throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
      }
      chunks.push(new Uint8Array(converted));
      sizeBytes += count;
    }
    return {
      chunks: chunks,
      sizeBytes: sizeBytes
    };
  }
  function combineChunks(chunks, sizeBytes) {
    var result = new Uint8Array(sizeBytes);
    var offset = 0;
    var _iterator3 = _createForOfIteratorHelper(chunks),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var chunk = _step3.value;
        result.set(chunk, offset);
        offset += chunk.byteLength;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return result;
  }
  function classifyReaderFailure(error, classifyError2) {
    var classification = safeClassifyError(classifyError2, error);
    return readerFailure(classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED ? IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED : IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
  }
  function safeClassifyError(classifyError2, error) {
    try {
      return classifyError2(error);
    } catch (e) {
      return IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED;
    }
  }
  function readerFailure(classification) {
    return new ClassifiedImageReaderError(classification);
  }
  function closeQuietly(stream, logger) {
    if (!stream || typeof stream.close !== "function") {
      return;
    }
    try {
      stream.close();
    } catch (e) {
      try {
        logger.warn("AutoJs6 image reader cleanup failed.");
      } catch (e2) {}
    }
  }
  function normalizeLogger(logger) {
    return logger && typeof logger.warn === "function" ? logger : createNoopLogger();
  }
  function createNoopLogger() {
    return Object.freeze({
      warn: function warn() {}
    });
  }
  var PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE = /^image\/[\+\x2D\.0-9a-z]+$/;
  function runCleanupAfterFailureDeviceCheck(_0) {
    return __async(this, arguments, function (_ref7) {
      var testCaseId = _ref7.testCaseId,
        sourceUri = _ref7.sourceUri,
        expectedMimeType = _ref7.expectedMimeType,
        expectedSizeBytes = _ref7.expectedSizeBytes,
        maxSizeBytes = _ref7.maxSizeBytes,
        readerSafetyLimitBytes = _ref7.readerSafetyLimitBytes,
        failureAfterBytes = _ref7.failureAfterBytes,
        context = _ref7.context,
        contentResolver = _ref7.contentResolver,
        parseUri = _ref7.parseUri,
        javaBridge = _ref7.javaBridge,
        _ref7$isFileUriApprov = _ref7.isFileUriApproved,
        isFileUriApproved = _ref7$isFileUriApprov === void 0 ? function () {
          return false;
        } : _ref7$isFileUriApprov,
        openFileReadOnly = _ref7.openFileReadOnly,
        _ref7$reportMetadata = _ref7.reportMetadata,
        reportMetadata = _ref7$reportMetadata === void 0 ? function () {} : _ref7$reportMetadata;
      return _regenerator().m(function _callee9() {
        var closeCount, instrumentedResolver, record, reader, _t12;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              validateInputs({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                expectedSizeBytes: expectedSizeBytes,
                maxSizeBytes: maxSizeBytes,
                failureAfterBytes: failureAfterBytes,
                reportMetadata: reportMetadata
              });
              closeCount = 0;
              instrumentedResolver = createInstrumentedResolver(contentResolver, function () {
                closeCount += 1;
              }, failureAfterBytes);
              _context9.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: instrumentedResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context9.n = 2;
              return reader.read(sourceUri);
            case 2:
              record = normalizeUnexpectedSuccess({
                testCaseId: testCaseId,
                closeCount: closeCount
              });
              _context9.n = 4;
              break;
            case 3:
              _context9.p = 3;
              _t12 = _context9.v;
              record = normalizeFailure({
                testCaseId: testCaseId,
                error: _t12,
                closeCount: closeCount
              });
            case 4:
              reportMetadata(record);
              return _context9.a(2, record);
          }
        }, _callee9, null, [[1, 3]]);
      })();
    });
  }
  function createInstrumentedResolver(resolver, onClose, failureAfterBytes) {
    var totalBytesRead = 0;
    return {
      openInputStream: function openInputStream(uri) {
        var stream = resolver.openInputStream(uri);
        if (stream == null) {
          return null;
        }
        return {
          read: function read(buffer) {
            var count = stream.read(buffer);
            if (count > 0) {
              totalBytesRead += count;
              if (totalBytesRead > failureAfterBytes) {
                throw new Error("D19 controlled mid-read failure");
              }
            }
            return count;
          },
          close: function close() {
            onClose();
            stream.close();
          }
        };
      },
      getType: function getType(uri) {
        return resolver.getType(uri);
      }
    };
  }
  function normalizeFailure(_ref8) {
    var testCaseId = _ref8.testCaseId,
      error = _ref8.error,
      closeCount = _ref8.closeCount;
    var errorCode = normalizeErrorCode(error);
    if (closeCount !== 1) {
      return Object.freeze({
        testCaseId: testCaseId,
        status: "FAIL",
        errorCode: "CLEANUP_FAILED",
        closeCount: closeCount
      });
    }
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: errorCode,
      closeCount: closeCount
    });
  }
  function normalizeUnexpectedSuccess(_ref9) {
    var testCaseId = _ref9.testCaseId,
      closeCount = _ref9.closeCount;
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      failureReason: "UNEXPECTED_SUCCESS",
      closeCount: closeCount
    });
  }
  function normalizeErrorCode(error) {
    var code = safelyReadProperty(error, "code");
    if (PUBLIC_ERROR_CODES.has(code)) {
      return code;
    }
    var classification = safelyReadProperty(error, "classification");
    if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
      return IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED;
    }
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function safelyReadProperty(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateInputs(_ref0) {
    var testCaseId = _ref0.testCaseId,
      expectedMimeType = _ref0.expectedMimeType,
      expectedSizeBytes = _ref0.expectedSizeBytes,
      maxSizeBytes = _ref0.maxSizeBytes,
      failureAfterBytes = _ref0.failureAfterBytes,
      reportMetadata = _ref0.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof expectedMimeType !== "string" || !SAFE_MIME_TYPE.test(expectedMimeType)) {
      throw new TypeError("expectedMimeType must be a normalized image MIME");
    }
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
      throw new TypeError("expectedSizeBytes must be a positive safe integer");
    }
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
    if (!Number.isSafeInteger(failureAfterBytes) || failureAfterBytes <= 0) {
      throw new TypeError("failureAfterBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  function runEmptyImageDeviceCheck(_0) {
    return __async(this, arguments, function (_ref1) {
      var _ref1$expectedErrorCo = _ref1.expectedErrorCode,
        expectedErrorCode = _ref1$expectedErrorCo === void 0 ? "EMPTY_IMAGE" : _ref1$expectedErrorCo,
        _ref1$reportMetadata = _ref1.reportMetadata,
        reportMetadata = _ref1$reportMetadata === void 0 ? function () {} : _ref1$reportMetadata,
        prepareSelectedImage2 = _ref1.prepareSelectedImage;
      return _regenerator().m(function _callee0() {
        var record, result, status, errorCode, uiResponsive, _t13;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              if (!(typeof prepareSelectedImage2 !== "function")) {
                _context0.n = 1;
                break;
              }
              throw new TypeError("prepareSelectedImage must be a function");
            case 1:
              _context0.p = 1;
              _context0.n = 2;
              return prepareSelectedImage2();
            case 2:
              result = _context0.v;
              status = safelyReadProperty2(result, "status");
              errorCode = safelyReadProperty2(result, "errorCode");
              uiResponsive = safelyReadProperty2(result, "uiResponsive");
              if (status === "FAIL" && errorCode === expectedErrorCode) {
                record = Object.freeze({
                  testCaseId: "D24_EMPTY_IMAGE",
                  status: "FAIL",
                  errorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              } else {
                record = Object.freeze({
                  testCaseId: "D24_EMPTY_IMAGE",
                  status: "FAIL",
                  errorCode: "UNEXPECTED_RESULT",
                  expectedErrorCode: expectedErrorCode,
                  actualStatus: status,
                  actualErrorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              }
              _context0.n = 4;
              break;
            case 3:
              _context0.p = 3;
              _t13 = _context0.v;
              record = Object.freeze({
                testCaseId: "D24_EMPTY_IMAGE",
                status: "FAIL",
                errorCode: "HARNESS_EXCEPTION",
                uiResponsive: true
              });
            case 4:
              reportMetadata(record);
              return _context0.a(2, record);
          }
        }, _callee0, null, [[1, 3]]);
      })();
    });
  }
  function safelyReadProperty2(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  var PUBLIC_ERROR_CODES2 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID2 = /^[\x2D0-9A-Z_]{1,40}$/;
  function runImageReaderDeviceCheck(_0) {
    return __async(this, arguments, function (_ref10) {
      var testCaseId = _ref10.testCaseId,
        sourceUri = _ref10.sourceUri,
        maxSizeBytes = _ref10.maxSizeBytes,
        readerSafetyLimitBytes = _ref10.readerSafetyLimitBytes,
        context = _ref10.context,
        contentResolver = _ref10.contentResolver,
        parseUri = _ref10.parseUri,
        javaBridge = _ref10.javaBridge,
        _ref10$isFileUriAppro = _ref10.isFileUriApproved,
        isFileUriApproved = _ref10$isFileUriAppro === void 0 ? function () {
          return false;
        } : _ref10$isFileUriAppro,
        openFileReadOnly = _ref10.openFileReadOnly,
        _ref10$reportMetadata = _ref10.reportMetadata,
        reportMetadata = _ref10$reportMetadata === void 0 ? function () {} : _ref10$reportMetadata;
      return _regenerator().m(function _callee1() {
        var record, reader, result, _t14;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              validateHarnessInputs({
                testCaseId: testCaseId,
                reportMetadata: reportMetadata
              });
              _context1.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: contentResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context1.n = 2;
              return prepareImageInput({
                sourceUri: sourceUri,
                maxSizeBytes: maxSizeBytes,
                reader: reader,
                isFileUriApproved: isFileUriApproved
              });
            case 2:
              result = _context1.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "PASS",
                mimeType: result.mimeType,
                sizeBytes: result.sizeBytes
              });
              _context1.n = 4;
              break;
            case 3:
              _context1.p = 3;
              _t14 = _context1.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "FAIL",
                errorCode: PUBLIC_ERROR_CODES2.has(_t14 == null ? void 0 : _t14.code) ? _t14.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
              });
            case 4:
              reportMetadata(record);
              return _context1.a(2, record);
          }
        }, _callee1, null, [[1, 3]]);
      })();
    });
  }
  function validateHarnessInputs(_ref11) {
    var testCaseId = _ref11.testCaseId,
      reportMetadata = _ref11.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID2.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES3 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runExactPortableLimitDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee10() {
      var _b, expectedSizeBytes, maxSizeBytes, readerSafetyLimitBytes, _b$reportMetadata, reportMetadata, readerOptions, candidate, record;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, maxSizeBytes = _b.maxSizeBytes, readerSafetyLimitBytes = _b.readerSafetyLimitBytes, _b$reportMetadata = _b.reportMetadata, reportMetadata = _b$reportMetadata === void 0 ? function () {} : _b$reportMetadata, readerOptions = __objRest(_b, ["expectedSizeBytes", "maxSizeBytes", "readerSafetyLimitBytes", "reportMetadata"]);
            validateLimits({
              expectedSizeBytes: expectedSizeBytes,
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: reportMetadata
            });
            _context10.n = 1;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: function reportMetadata() {}
            }));
          case 1:
            candidate = _context10.v;
            record = normalizeRecord({
              candidate: candidate,
              expectedSizeBytes: expectedSizeBytes,
              testCaseId: readerOptions.testCaseId
            });
            reportMetadata(record);
            return _context10.a(2, record);
        }
      }, _callee10);
    }));
  }
  function normalizeRecord(_ref12) {
    var candidate = _ref12.candidate,
      expectedSizeBytes = _ref12.expectedSizeBytes,
      testCaseId = _ref12.testCaseId;
    var status = safelyReadProperty3(candidate, "status");
    var mimeType = safelyReadProperty3(candidate, "mimeType");
    var sizeBytes = safelyReadProperty3(candidate, "sizeBytes");
    if (status === "PASS" && typeof mimeType === "string" && sizeBytes === expectedSizeBytes) {
      return Object.freeze({
        testCaseId: testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes
      });
    }
    var errorCode = safelyReadProperty3(candidate, "errorCode");
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: status === "FAIL" && PUBLIC_ERROR_CODES3.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
    });
  }
  function safelyReadProperty3(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateLimits(_ref13) {
    var expectedSizeBytes = _ref13.expectedSizeBytes,
      maxSizeBytes = _ref13.maxSizeBytes,
      readerSafetyLimitBytes = _ref13.readerSafetyLimitBytes,
      reportMetadata = _ref13.reportMetadata;
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0 || maxSizeBytes !== expectedSizeBytes) {
      throw new TypeError("D13 expectedSizeBytes and maxSizeBytes must be the same positive safe integer");
    }
    if (!Number.isSafeInteger(readerSafetyLimitBytes) || readerSafetyLimitBytes < maxSizeBytes) {
      throw new TypeError("D13 readerSafetyLimitBytes must not be lower than maxSizeBytes");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES4 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var CONTENT_URI = /^content:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  var SAFE_CASE_ID3 = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE2 = /^(?:image\/(?:[\+\x2D\.0-9a-z]+|\*)|\*\/\*)$/;
  function normalizeFormatCheckErrorCode(value) {
    var code = safelyReadProperty4(value, "code");
    if (PUBLIC_ERROR_CODES4.has(code)) {
      return code;
    }
    var errorCode = safelyReadProperty4(value, "errorCode");
    return PUBLIC_ERROR_CODES4.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function runFormatCheck(formatCase, dependencies) {
    return __async(this, null, _regenerator().m(function _callee11() {
      var showInstructions, pickSingleImage2, executeOffUiThread2, prepareSelectedImage2, reportMetadata, record, sourceUri, execution, _execution, _t15;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            validateFormatCase(formatCase);
            validateDependencies2(dependencies);
            showInstructions = dependencies.showInstructions, pickSingleImage2 = dependencies.pickSingleImage, executeOffUiThread2 = dependencies.executeOffUiThread, prepareSelectedImage2 = dependencies.prepareSelectedImage, reportMetadata = dependencies.reportMetadata;
            _context11.p = 1;
            _context11.n = 2;
            return showInstructions({
              title: formatCase.title,
              instructionText: formatCase.instructionText
            });
          case 2:
            _context11.n = 3;
            return pickSingleImage2({
              pickerMimeType: formatCase.pickerMimeType,
              requestCode: formatCase.requestCode
            });
          case 3:
            sourceUri = _context11.v;
            if (!(typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri))) {
              _context11.n = 4;
              break;
            }
            record = failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, true);
            _context11.n = 8;
            break;
          case 4:
            if (!(formatCase.directExecution === true)) {
              _context11.n = 6;
              break;
            }
            _context11.n = 5;
            return prepareSelectedImage2(sourceUri, formatCase.testCaseId);
          case 5:
            execution = _context11.v;
            record = normalizeExecution(formatCase, execution);
            _context11.n = 8;
            break;
          case 6:
            _context11.n = 7;
            return executeOffUiThread2(function () {
              return prepareSelectedImage2(sourceUri, formatCase.testCaseId);
            });
          case 7:
            _execution = _context11.v;
            record = normalizeExecution(formatCase, _execution);
          case 8:
            _context11.n = 10;
            break;
          case 9:
            _context11.p = 9;
            _t15 = _context11.v;
            record = failure(formatCase.testCaseId, normalizeFormatCheckErrorCode(_t15), false);
          case 10:
            reportMetadata(record);
            return _context11.a(2, record);
        }
      }, _callee11, null, [[1, 9]]);
    }));
  }
  function normalizeExecution(formatCase, execution) {
    if (formatCase.verificationMode === "repeated-reads") {
      return normalizeRepeatedReadsExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "stream-cleanup-success") {
      return normalizeStreamCleanupSuccessExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "cleanup-after-failure") {
      return normalizeCleanupAfterFailureExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "memory-behavior") {
      return normalizeMemoryBehaviorExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "ui-responsiveness") {
      return normalizeUiResponsivenessExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "no-persistence") {
      return normalizeNoPersistenceExecution(formatCase, execution);
    }
    if (formatCase.verificationMode === "sensitive-logging") {
      return normalizeSensitiveLoggingExecution(formatCase, execution);
    }
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    if (uiResponsive !== true) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, false);
    }
    var result = safelyReadProperty4(execution, "value");
    var status = safelyReadProperty4(result, "status");
    var mimeType = safelyReadProperty4(result, "mimeType");
    var sizeBytes = safelyReadProperty4(result, "sizeBytes");
    if (status === "PASS" && mimeType === formatCase.expectedMimeType && Number.isSafeInteger(sizeBytes) && sizeBytes > 0) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        uiResponsive: uiResponsive
      });
    }
    return failure(formatCase.testCaseId, status === "FAIL" ? normalizeFormatCheckErrorCode(result) : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function normalizeStreamCleanupSuccessExecution(formatCase, execution) {
    var _a;
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    if (uiResponsive !== true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        errorCode: IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
        closeCount: (_a = safelyReadProperty4(result, "closeCount")) != null ? _a : 0,
        uiResponsive: false
      });
    }
    var status = safelyReadProperty4(result, "status");
    var closeCount = safelyReadProperty4(result, "closeCount");
    if (status === "PASS") {
      var mimeType = safelyReadProperty4(result, "mimeType");
      var sizeBytes = safelyReadProperty4(result, "sizeBytes");
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        closeCount: closeCount,
        uiResponsive: true
      });
    }
    var errorCode = safelyReadProperty4(result, "errorCode");
    var failureReason = safelyReadProperty4(result, "failureReason");
    if (failureReason === "SIZE_MISMATCH") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        mimeType: safelyReadProperty4(result, "mimeType"),
        sizeBytes: safelyReadProperty4(result, "sizeBytes"),
        closeCount: closeCount,
        failureReason: failureReason,
        uiResponsive: true
      });
    }
    if (errorCode === "CLEANUP_FAILED") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        mimeType: safelyReadProperty4(result, "mimeType"),
        sizeBytes: safelyReadProperty4(result, "sizeBytes"),
        closeCount: closeCount,
        errorCode: errorCode,
        uiResponsive: true
      });
    }
    return failure(formatCase.testCaseId, status === "FAIL" && PUBLIC_ERROR_CODES4.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function normalizeCleanupAfterFailureExecution(formatCase, execution) {
    var _a;
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    if (uiResponsive !== true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        errorCode: IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
        closeCount: (_a = safelyReadProperty4(result, "closeCount")) != null ? _a : 0,
        uiResponsive: false
      });
    }
    var status = safelyReadProperty4(result, "status");
    var errorCode = safelyReadProperty4(result, "errorCode");
    var closeCount = safelyReadProperty4(result, "closeCount");
    var failureReason = safelyReadProperty4(result, "failureReason");
    if (failureReason === "UNEXPECTED_SUCCESS") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        failureReason: failureReason,
        closeCount: closeCount,
        uiResponsive: true
      });
    }
    if (errorCode === "CLEANUP_FAILED") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        errorCode: errorCode,
        closeCount: closeCount,
        uiResponsive: true
      });
    }
    if (status === "FAIL" && PUBLIC_ERROR_CODES4.has(errorCode) && Number.isSafeInteger(closeCount) && closeCount === 1) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        errorCode: errorCode,
        closeCount: closeCount,
        uiResponsive: true
      });
    }
    return failure(formatCase.testCaseId, status === "FAIL" && PUBLIC_ERROR_CODES4.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function normalizeRepeatedReadsExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    var requestedIterations = safelyReadProperty4(result, "requestedIterations");
    var attemptedIterations = safelyReadProperty4(result, "attemptedIterations");
    var successfulIterations = safelyReadProperty4(result, "successfulIterations");
    var allMetadataEqual = safelyReadProperty4(result, "allMetadataEqual");
    var validCounters = requestedIterations === 10 && Number.isSafeInteger(attemptedIterations) && attemptedIterations >= 1 && attemptedIterations <= requestedIterations && Number.isSafeInteger(successfulIterations) && successfulIterations >= 0 && successfulIterations <= attemptedIterations && typeof allMetadataEqual === "boolean";
    if (!validCounters) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, uiResponsive === true);
    }
    var common = {
      testCaseId: formatCase.testCaseId,
      requestedIterations: requestedIterations,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations
    };
    if (uiResponsive !== true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: false,
        failureReason: "UI_NOT_RESPONSIVE"
      }));
    }
    var status = safelyReadProperty4(result, "status");
    var mimeType = safelyReadProperty4(result, "mimeType");
    var sizeBytes = safelyReadProperty4(result, "sizeBytes");
    if (status === "PASS" && attemptedIterations === requestedIterations && successfulIterations === requestedIterations && mimeType === formatCase.expectedMimeType && sizeBytes === formatCase.expectedSizeBytes && allMetadataEqual === true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true
      }));
    }
    var failureReason = safelyReadProperty4(result, "failureReason");
    if (status === "FAIL" && failureReason === "PUBLIC_ERROR") {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true,
        failureReason: failureReason,
        errorCode: normalizeFormatCheckErrorCode(result)
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      uiResponsive: true,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizeMemoryBehaviorExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    var requestedIterations = safelyReadProperty4(result, "requestedIterations");
    var attemptedIterations = safelyReadProperty4(result, "attemptedIterations");
    var successfulIterations = safelyReadProperty4(result, "successfulIterations");
    var allMetadataEqual = safelyReadProperty4(result, "allMetadataEqual");
    var validCounters = requestedIterations === 10 && Number.isSafeInteger(attemptedIterations) && attemptedIterations >= 1 && attemptedIterations <= requestedIterations && Number.isSafeInteger(successfulIterations) && successfulIterations >= 0 && successfulIterations <= attemptedIterations && typeof allMetadataEqual === "boolean";
    if (!validCounters) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, uiResponsive === true);
    }
    var memoryBefore = safelyReadProperty4(result, "memoryBefore");
    var memoryAfterEach = safelyReadProperty4(result, "memoryAfterEach");
    var memoryAfterStabilization = safelyReadProperty4(result, "memoryAfterStabilization");
    var peakMemory = safelyReadProperty4(result, "peakMemory");
    var memoryGrowth = safelyReadProperty4(result, "memoryGrowth");
    var validMemoryMetrics = Number.isSafeInteger(memoryBefore) && memoryBefore > 0 && Array.isArray(memoryAfterEach) && memoryAfterEach.length === requestedIterations && memoryAfterEach.every(function (m) {
      return Number.isSafeInteger(m) && m > 0;
    }) && Number.isSafeInteger(memoryAfterStabilization) && memoryAfterStabilization > 0 && Number.isSafeInteger(peakMemory) && peakMemory > 0 && Number.isSafeInteger(memoryGrowth);
    if (!validMemoryMetrics) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, uiResponsive === true);
    }
    var common = {
      testCaseId: formatCase.testCaseId,
      requestedIterations: requestedIterations,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations,
      memoryBefore: memoryBefore,
      memoryAfterEach: Object.freeze(_toConsumableArray(memoryAfterEach)),
      memoryAfterStabilization: memoryAfterStabilization,
      peakMemory: peakMemory,
      memoryGrowth: memoryGrowth
    };
    if (uiResponsive !== true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: false,
        failureReason: "UI_NOT_RESPONSIVE"
      }));
    }
    var status = safelyReadProperty4(result, "status");
    var mimeType = safelyReadProperty4(result, "mimeType");
    var sizeBytes = safelyReadProperty4(result, "sizeBytes");
    if (status === "PASS" && attemptedIterations === requestedIterations && successfulIterations === requestedIterations && mimeType === formatCase.expectedMimeType && sizeBytes === formatCase.expectedSizeBytes && allMetadataEqual === true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true
      }));
    }
    var failureReason = safelyReadProperty4(result, "failureReason");
    if (status === "FAIL" && failureReason === "PUBLIC_ERROR") {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true,
        failureReason: failureReason,
        errorCode: normalizeFormatCheckErrorCode(result)
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      uiResponsive: true,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizeUiResponsivenessExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    var requestedIterations = safelyReadProperty4(result, "requestedIterations");
    var attemptedIterations = safelyReadProperty4(result, "attemptedIterations");
    var successfulIterations = safelyReadProperty4(result, "successfulIterations");
    var allMetadataEqual = safelyReadProperty4(result, "allMetadataEqual");
    var heartbeatCount = safelyReadProperty4(result, "heartbeatCount");
    var validCounters = requestedIterations === 10 && Number.isSafeInteger(attemptedIterations) && attemptedIterations >= 1 && attemptedIterations <= requestedIterations && Number.isSafeInteger(successfulIterations) && successfulIterations >= 0 && successfulIterations <= attemptedIterations && typeof allMetadataEqual === "boolean" && Number.isSafeInteger(heartbeatCount) && heartbeatCount >= 0 && heartbeatCount <= requestedIterations - 1;
    if (!validCounters) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, uiResponsive === true);
    }
    var common = {
      testCaseId: formatCase.testCaseId,
      requestedIterations: requestedIterations,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations,
      heartbeatCount: heartbeatCount
    };
    if (uiResponsive !== true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: false,
        failureReason: "UI_NOT_RESPONSIVE"
      }));
    }
    var status = safelyReadProperty4(result, "status");
    var mimeType = safelyReadProperty4(result, "mimeType");
    var sizeBytes = safelyReadProperty4(result, "sizeBytes");
    if (status === "PASS" && attemptedIterations === requestedIterations && successfulIterations === requestedIterations && mimeType === formatCase.expectedMimeType && sizeBytes === formatCase.expectedSizeBytes && allMetadataEqual === true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true
      }));
    }
    var failureReason = safelyReadProperty4(result, "failureReason");
    if (status === "FAIL" && failureReason === "PUBLIC_ERROR") {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true,
        failureReason: failureReason,
        errorCode: normalizeFormatCheckErrorCode(result)
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      uiResponsive: true,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizeNoPersistenceExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var result = safelyReadProperty4(execution, "value");
    if (uiResponsive !== true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        failureReason: "UI_NOT_RESPONSIVE",
        uiResponsive: false
      });
    }
    var status = safelyReadProperty4(result, "status");
    var failureReason = safelyReadProperty4(result, "failureReason");
    var successOutputClean = safelyReadProperty4(result, "successOutputClean");
    var failureOutputClean = safelyReadProperty4(result, "failureOutputClean");
    if (failureReason === "PERSISTENCE_VIOLATION") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        failureReason: failureReason,
        successOutputClean: successOutputClean,
        failureOutputClean: failureOutputClean,
        uiResponsive: true
      });
    }
    var mimeType = safelyReadProperty4(result, "mimeType");
    var sizeBytes = safelyReadProperty4(result, "sizeBytes");
    if (status === "PASS" && mimeType === formatCase.expectedMimeType && sizeBytes === formatCase.expectedSizeBytes && successOutputClean === true && failureOutputClean === true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        successOutputClean: successOutputClean,
        failureOutputClean: failureOutputClean,
        uiResponsive: true
      });
    }
    return failure(formatCase.testCaseId, status === "FAIL" && PUBLIC_ERROR_CODES4.has(failureReason) ? failureReason : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function normalizeSensitiveLoggingExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty4(execution, "uiResponsive");
    var status = safelyReadProperty4(execution, "status");
    var failureReason = safelyReadProperty4(execution, "failureReason");
    var successLogsClean = safelyReadProperty4(execution, "successLogsClean");
    var failureLogsClean = safelyReadProperty4(execution, "failureLogsClean");
    var mimeType = safelyReadProperty4(execution, "mimeType");
    var sizeBytes = safelyReadProperty4(execution, "sizeBytes");
    if (uiResponsive !== true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        failureReason: "UI_NOT_RESPONSIVE",
        uiResponsive: false
      });
    }
    if (failureReason === "SENSITIVE_LOG_VIOLATION") {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "FAIL",
        failureReason: failureReason,
        successLogsClean: successLogsClean,
        failureLogsClean: failureLogsClean,
        uiResponsive: true
      });
    }
    if (status === "PASS" && mimeType === formatCase.expectedMimeType && sizeBytes === formatCase.expectedSizeBytes && successLogsClean === true && failureLogsClean === true) {
      return Object.freeze({
        testCaseId: formatCase.testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        successLogsClean: successLogsClean,
        failureLogsClean: failureLogsClean,
        uiResponsive: true
      });
    }
    return failure(formatCase.testCaseId, status === "FAIL" && PUBLIC_ERROR_CODES4.has(failureReason) ? failureReason : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function failure(testCaseId, errorCode, uiResponsive) {
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES4.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      uiResponsive: uiResponsive === true
    });
  }
  function safelyReadProperty4(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateFormatCase(formatCase) {
    if (!formatCase || typeof formatCase.testCaseId !== "string" || !SAFE_CASE_ID3.test(formatCase.testCaseId) || typeof formatCase.pickerMimeType !== "string" || !SAFE_MIME_TYPE2.test(formatCase.pickerMimeType) || typeof formatCase.expectedMimeType !== "string" || !SAFE_MIME_TYPE2.test(formatCase.expectedMimeType) || !Number.isSafeInteger(formatCase.requestCode) || formatCase.requestCode <= 0 || typeof formatCase.title !== "string" || formatCase.title.length === 0 || typeof formatCase.instructionText !== "string" || formatCase.instructionText.length === 0) {
      throw new TypeError("formatCase must be a valid static case definition");
    }
  }
  function validateDependencies2(dependencies) {
    var required = ["showInstructions", "pickSingleImage", "executeOffUiThread", "prepareSelectedImage", "reportMetadata"];
    for (var _i = 0, _required = required; _i < _required.length; _i++) {
      var name = _required[_i];
      if (typeof (dependencies == null ? void 0 : dependencies[name]) !== "function") {
        throw new TypeError("".concat(name, " must be a function"));
      }
    }
  }
  var REQUESTED_ITERATIONS = 10;
  var REQUIRED_MIME_TYPE = "image/jpeg";
  var STABILIZATION_INTERVAL_MS = 500;
  var PUBLIC_ERROR_CODES5 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runMemoryBehaviorDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee12() {
      var _b, expectedSizeBytes, _b$reportMetadata2, reportMetadata, readerOptions, memoryBefore, peakMemory, attemptedIterations, successfulIterations, firstMimeType, firstSizeBytes, publicErrorCode, metadataMismatch, memoryAfterEach, iteration, result, currentMemory, matchesRequiredMetadata, matchesFirstIteration, memoryAfterStabilization, memoryGrowth, allMetadataEqual, record;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, _b$reportMetadata2 = _b.reportMetadata, reportMetadata = _b$reportMetadata2 === void 0 ? function () {} : _b$reportMetadata2, readerOptions = __objRest(_b, ["expectedSizeBytes", "reportMetadata"]);
            validateInputs2({
              expectedSizeBytes: expectedSizeBytes,
              reportMetadata: reportMetadata
            });
            memoryBefore = getUsedHeapBytes();
            peakMemory = memoryBefore;
            attemptedIterations = 0;
            successfulIterations = 0;
            metadataMismatch = false;
            memoryAfterEach = [];
            iteration = 1;
          case 1:
            if (!(iteration <= REQUESTED_ITERATIONS)) {
              _context12.n = 6;
              break;
            }
            attemptedIterations += 1;
            _context12.n = 2;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              reportMetadata: function reportMetadata() {}
            }));
          case 2:
            result = _context12.v;
            currentMemory = getUsedHeapBytes();
            memoryAfterEach.push(currentMemory);
            if (currentMemory > peakMemory) {
              peakMemory = currentMemory;
            }
            if (!(result.status === "FAIL")) {
              _context12.n = 3;
              break;
            }
            publicErrorCode = normalizePublicErrorCode(result.errorCode);
            return _context12.a(3, 6);
          case 3:
            matchesRequiredMetadata = result.status === "PASS" && result.mimeType === REQUIRED_MIME_TYPE && result.sizeBytes === expectedSizeBytes;
            matchesFirstIteration = iteration === 1 || result.mimeType === firstMimeType && result.sizeBytes === firstSizeBytes;
            if (!(!matchesRequiredMetadata || !matchesFirstIteration)) {
              _context12.n = 4;
              break;
            }
            metadataMismatch = true;
            return _context12.a(3, 6);
          case 4:
            if (iteration === 1) {
              firstMimeType = result.mimeType;
              firstSizeBytes = result.sizeBytes;
            }
            successfulIterations += 1;
          case 5:
            iteration += 1;
            _context12.n = 1;
            break;
          case 6:
            _context12.n = 7;
            return new Promise(function (resolve) {
              return setTimeout(resolve, STABILIZATION_INTERVAL_MS);
            });
          case 7:
            memoryAfterStabilization = getUsedHeapBytes();
            if (memoryAfterStabilization > peakMemory) {
              peakMemory = memoryAfterStabilization;
            }
            memoryGrowth = memoryAfterStabilization - memoryBefore;
            allMetadataEqual = successfulIterations === REQUESTED_ITERATIONS && publicErrorCode === void 0 && metadataMismatch === false;
            record = createLoopRecord({
              testCaseId: readerOptions.testCaseId,
              attemptedIterations: attemptedIterations,
              successfulIterations: successfulIterations,
              allMetadataEqual: allMetadataEqual,
              publicErrorCode: publicErrorCode,
              metadataMismatch: metadataMismatch,
              mimeType: firstMimeType,
              sizeBytes: firstSizeBytes,
              memoryBefore: memoryBefore,
              memoryAfterEach: memoryAfterEach,
              memoryAfterStabilization: memoryAfterStabilization,
              peakMemory: peakMemory,
              memoryGrowth: memoryGrowth
            });
            reportMetadata(record);
            return _context12.a(2, record);
        }
      }, _callee12);
    }));
  }
  function getUsedHeapBytes() {
    var runtime = java.lang.Runtime.getRuntime();
    return runtime.totalMemory() - runtime.freeMemory();
  }
  function createLoopRecord(_ref14) {
    var testCaseId = _ref14.testCaseId,
      attemptedIterations = _ref14.attemptedIterations,
      successfulIterations = _ref14.successfulIterations,
      allMetadataEqual = _ref14.allMetadataEqual,
      publicErrorCode = _ref14.publicErrorCode,
      metadataMismatch = _ref14.metadataMismatch,
      mimeType = _ref14.mimeType,
      sizeBytes = _ref14.sizeBytes,
      memoryBefore = _ref14.memoryBefore,
      memoryAfterEach = _ref14.memoryAfterEach,
      memoryAfterStabilization = _ref14.memoryAfterStabilization,
      peakMemory = _ref14.peakMemory,
      memoryGrowth = _ref14.memoryGrowth;
    var common = {
      testCaseId: testCaseId,
      requestedIterations: REQUESTED_ITERATIONS,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations,
      memoryBefore: memoryBefore,
      memoryAfterEach: Object.freeze(_toConsumableArray(memoryAfterEach)),
      memoryAfterStabilization: memoryAfterStabilization,
      peakMemory: peakMemory,
      memoryGrowth: memoryGrowth
    };
    if (successfulIterations === REQUESTED_ITERATIONS && publicErrorCode === void 0 && metadataMismatch === false) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual
      }));
    }
    if (publicErrorCode !== void 0) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        failureReason: "PUBLIC_ERROR",
        errorCode: publicErrorCode
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizePublicErrorCode(errorCode) {
    return PUBLIC_ERROR_CODES5.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateInputs2(_ref15) {
    var expectedSizeBytes = _ref15.expectedSizeBytes,
      reportMetadata = _ref15.reportMetadata;
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
      throw new TypeError("expectedSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES6 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID4 = /^[\x2D0-9A-Z_]{1,40}$/;
  function runMimeFallbackDeviceCheck(_0) {
    return __async(this, arguments, function (_ref16) {
      var testCaseId = _ref16.testCaseId,
        sourceUri = _ref16.sourceUri,
        maxSizeBytes = _ref16.maxSizeBytes,
        readerSafetyLimitBytes = _ref16.readerSafetyLimitBytes,
        context = _ref16.context,
        contentResolver = _ref16.contentResolver,
        parseUri = _ref16.parseUri,
        javaBridge = _ref16.javaBridge,
        _ref16$isFileUriAppro = _ref16.isFileUriApproved,
        isFileUriApproved = _ref16$isFileUriAppro === void 0 ? function () {
          return false;
        } : _ref16$isFileUriAppro,
        openFileReadOnly = _ref16.openFileReadOnly,
        _ref16$reportMetadata = _ref16.reportMetadata,
        reportMetadata = _ref16$reportMetadata === void 0 ? function () {} : _ref16$reportMetadata;
      return _regenerator().m(function _callee14() {
        var record, _a, reader, evidenceReader, result, _t16;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              validateHarnessInputs2({
                testCaseId: testCaseId,
                reportMetadata: reportMetadata
              });
              _context14.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: contentResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              evidenceReader = Object.freeze({
                canAccess: function canAccess(value) {
                  return reader.canAccess(value);
                },
                read: function read(value) {
                  return __async(this, null, _regenerator().m(function _callee13() {
                    var result2;
                    return _regenerator().w(function (_context13) {
                      while (1) switch (_context13.n) {
                        case 0:
                          _context13.n = 1;
                          return reader.read(value);
                        case 1:
                          result2 = _context13.v;
                          return _context13.a(2, Object.freeze({
                            bytes: result2.bytes,
                            mimeType: void 0
                          }));
                      }
                    }, _callee13);
                  }));
                }
              });
              _context14.n = 2;
              return prepareImageInput({
                sourceUri: sourceUri,
                maxSizeBytes: maxSizeBytes,
                reader: evidenceReader,
                isFileUriApproved: isFileUriApproved
              });
            case 2:
              result = _context14.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "PASS",
                mimeType: result.mimeType,
                sizeBytes: result.sizeBytes
              });
              _context14.n = 4;
              break;
            case 3:
              _context14.p = 3;
              _t16 = _context14.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "FAIL",
                errorCode: PUBLIC_ERROR_CODES6.has(_t16 == null ? void 0 : _t16.code) ? _t16.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
              });
            case 4:
              reportMetadata(record);
              return _context14.a(2, record);
          }
        }, _callee14, null, [[1, 3]]);
      })();
    });
  }
  function validateHarnessInputs2(_ref17) {
    var testCaseId = _ref17.testCaseId,
      reportMetadata = _ref17.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID4.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES7 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runMultiImageSequentialDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee15() {
      var _b, sourceUris, expectedImages, _b$reportMetadata3, reportMetadata, readerOptions, images, attemptedImages, successfulImages, publicErrorCode, metadataMismatch, uiResponsive, index, sourceUri, result, expected, matchesExpected, record;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            _b = _a, sourceUris = _b.sourceUris, expectedImages = _b.expectedImages, _b$reportMetadata3 = _b.reportMetadata, reportMetadata = _b$reportMetadata3 === void 0 ? function () {} : _b$reportMetadata3, readerOptions = __objRest(_b, ["sourceUris", "expectedImages", "reportMetadata"]);
            validateInputs3({
              sourceUris: sourceUris,
              expectedImages: expectedImages,
              reportMetadata: reportMetadata
            });
            images = [];
            attemptedImages = 0;
            successfulImages = 0;
            metadataMismatch = false;
            uiResponsive = true;
            index = 0;
          case 1:
            if (!(index < sourceUris.length)) {
              _context15.n = 6;
              break;
            }
            attemptedImages += 1;
            sourceUri = sourceUris[index];
            _context15.n = 2;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              sourceUri: sourceUri,
              reportMetadata: function reportMetadata() {}
            }));
          case 2:
            result = _context15.v;
            if (!(result.status === "FAIL")) {
              _context15.n = 3;
              break;
            }
            publicErrorCode = normalizePublicErrorCode2(result.errorCode);
            images.push({
              mimeType: void 0,
              sizeBytes: void 0,
              status: "FAIL",
              errorCode: publicErrorCode
            });
            return _context15.a(3, 6);
          case 3:
            expected = expectedImages[index];
            matchesExpected = result.mimeType === expected.mimeType && result.sizeBytes === expected.sizeBytes;
            if (matchesExpected) {
              _context15.n = 4;
              break;
            }
            metadataMismatch = true;
            images.push({
              mimeType: result.mimeType,
              sizeBytes: result.sizeBytes,
              status: "FAIL"
            });
            return _context15.a(3, 6);
          case 4:
            images.push({
              mimeType: result.mimeType,
              sizeBytes: result.sizeBytes,
              status: "PASS"
            });
            successfulImages += 1;
          case 5:
            index += 1;
            _context15.n = 1;
            break;
          case 6:
            record = createAggregateRecord({
              testCaseId: readerOptions.testCaseId,
              requestedImages: sourceUris.length,
              attemptedImages: attemptedImages,
              successfulImages: successfulImages,
              images: images,
              publicErrorCode: publicErrorCode,
              metadataMismatch: metadataMismatch,
              uiResponsive: uiResponsive
            });
            reportMetadata(record);
            return _context15.a(2, record);
        }
      }, _callee15);
    }));
  }
  function createAggregateRecord(_ref18) {
    var testCaseId = _ref18.testCaseId,
      requestedImages = _ref18.requestedImages,
      attemptedImages = _ref18.attemptedImages,
      successfulImages = _ref18.successfulImages,
      images = _ref18.images,
      publicErrorCode = _ref18.publicErrorCode,
      metadataMismatch = _ref18.metadataMismatch,
      uiResponsive = _ref18.uiResponsive;
    var common = {
      testCaseId: testCaseId,
      requestedImages: requestedImages,
      attemptedImages: attemptedImages,
      successfulImages: successfulImages
    };
    if (uiResponsive !== true) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        images: images,
        uiResponsive: false,
        failureReason: "UI_NOT_RESPONSIVE"
      }));
    }
    if (attemptedImages === requestedImages && successfulImages === requestedImages && publicErrorCode === void 0 && metadataMismatch === false) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        images: images,
        uiResponsive: true
      }));
    }
    if (publicErrorCode !== void 0) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        images: images,
        uiResponsive: true,
        failureReason: "PUBLIC_ERROR",
        errorCode: publicErrorCode
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      images: images,
      uiResponsive: true,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizePublicErrorCode2(errorCode) {
    if (PUBLIC_ERROR_CODES7.has(errorCode)) {
      return errorCode;
    }
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateInputs3(_ref19) {
    var sourceUris = _ref19.sourceUris,
      expectedImages = _ref19.expectedImages,
      reportMetadata = _ref19.reportMetadata;
    if (!Array.isArray(sourceUris) || sourceUris.length === 0) {
      throw new TypeError("sourceUris must be a non-empty array");
    }
    if (!Array.isArray(expectedImages)) {
      throw new TypeError("expectedImages must be an array");
    }
    if (expectedImages.length !== sourceUris.length) {
      throw new TypeError("expectedImages length must match sourceUris length");
    }
    var _iterator4 = _createForOfIteratorHelper(expectedImages),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var expected = _step4.value;
        if (!expected || typeof expected.mimeType !== "string" || !Number.isSafeInteger(expected.sizeBytes) || expected.sizeBytes <= 0) {
          throw new TypeError("each expectedImage must have mimeType and positive sizeBytes");
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var BASE64_PATTERN = /[\+\/-9A-Za-z]{20,}={0,2}/;
  var CONTENT_URI_PATTERN = /content:\/\/(?:[\0-\x08\x0E-\x1F!#-&\(-\|~-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  var BYTE_ARRAY_PATTERN = /\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[0-9]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*){5,}[0-9]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\]/;
  function runNoPersistenceDeviceCheck(_0) {
    return __async(this, arguments, function (_ref20) {
      var expectedSizeBytes = _ref20.expectedSizeBytes,
        _ref20$reportMetadata = _ref20.reportMetadata,
        reportMetadata = _ref20$reportMetadata === void 0 ? function () {} : _ref20$reportMetadata,
        prepareSelectedImage2 = _ref20.prepareSelectedImage,
        _ref20$invalidUri = _ref20.invalidUri,
        invalidUri = _ref20$invalidUri === void 0 ? "content://invalid/uri" : _ref20$invalidUri;
      return _regenerator().m(function _callee16() {
        var _a, _b, successOutputClean, successStatus, successMimeType, successSizeBytes, successRecord, failureOutputClean, failureRecord, uiResponsive, record2, _record, record, _t17, _t18;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              if (!(!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0)) {
                _context16.n = 1;
                break;
              }
              throw new TypeError("expectedSizeBytes must be a positive safe integer");
            case 1:
              if (!(typeof prepareSelectedImage2 !== "function")) {
                _context16.n = 2;
                break;
              }
              throw new TypeError("prepareSelectedImage must be a function");
            case 2:
              successOutputClean = false;
              _context16.p = 3;
              _context16.n = 4;
              return prepareSelectedImage2();
            case 4:
              successRecord = _context16.v;
              successOutputClean = inspectOutputForPersistence(successRecord);
              successStatus = safelyReadProperty5(successRecord, "status");
              successMimeType = safelyReadProperty5(successRecord, "mimeType");
              successSizeBytes = safelyReadProperty5(successRecord, "sizeBytes");
              _context16.n = 6;
              break;
            case 5:
              _context16.p = 5;
              _t17 = _context16.v;
              successOutputClean = true;
            case 6:
              if (typeof java !== "undefined" && ((_b = (_a = java == null ? void 0 : java.lang) == null ? void 0 : _a.System) == null ? void 0 : _b.gc)) {
                java.lang.System.gc();
              }
              failureOutputClean = false;
              _context16.p = 7;
              _context16.n = 8;
              return prepareSelectedImage2(invalidUri);
            case 8:
              failureRecord = _context16.v;
              failureOutputClean = inspectOutputForPersistence(failureRecord);
              _context16.n = 10;
              break;
            case 9:
              _context16.p = 9;
              _t18 = _context16.v;
              failureOutputClean = true;
            case 10:
              uiResponsive = true;
              if (!(!successOutputClean || !failureOutputClean)) {
                _context16.n = 11;
                break;
              }
              record2 = Object.freeze({
                testCaseId: "D22_NO_PERSISTENCE",
                status: "FAIL",
                failureReason: "PERSISTENCE_VIOLATION",
                successOutputClean: successOutputClean,
                failureOutputClean: failureOutputClean,
                uiResponsive: uiResponsive
              });
              reportMetadata(record2);
              return _context16.a(2, record2);
            case 11:
              if (!(successStatus === "PASS" && successMimeType === "image/jpeg" && successSizeBytes === expectedSizeBytes)) {
                _context16.n = 12;
                break;
              }
              _record = Object.freeze({
                testCaseId: "D22_NO_PERSISTENCE",
                status: "PASS",
                mimeType: successMimeType,
                sizeBytes: successSizeBytes,
                uiResponsive: uiResponsive,
                successOutputClean: successOutputClean,
                failureOutputClean: failureOutputClean
              });
              reportMetadata(_record);
              return _context16.a(2, _record);
            case 12:
              record = Object.freeze({
                testCaseId: "D22_NO_PERSISTENCE",
                status: "FAIL",
                failureReason: "METADATA_MISMATCH",
                uiResponsive: uiResponsive,
                successOutputClean: successOutputClean,
                failureOutputClean: failureOutputClean
              });
              reportMetadata(record);
              return _context16.a(2, record);
          }
        }, _callee16, null, [[7, 9], [3, 5]]);
      })();
    });
  }
  function inspectOutputForPersistence(record) {
    if (record == null) {
      return true;
    }
    var serialized = JSON.stringify(record);
    if (BASE64_PATTERN.test(serialized)) {
      return false;
    }
    if (CONTENT_URI_PATTERN.test(serialized)) {
      return false;
    }
    if (BYTE_ARRAY_PATTERN.test(serialized)) {
      return false;
    }
    if (serialized.includes("imageBase64")) {
      return false;
    }
    if (serialized.includes("sourceUri")) {
      return false;
    }
    return true;
  }
  function safelyReadProperty5(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  var PUBLIC_ERROR_CODES8 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runPortableSizeOverflowDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee17() {
      var _b, expectedSizeBytes, maxSizeBytes, readerSafetyLimitBytes, _b$reportMetadata4, reportMetadata, readerOptions, candidate, record;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, maxSizeBytes = _b.maxSizeBytes, readerSafetyLimitBytes = _b.readerSafetyLimitBytes, _b$reportMetadata4 = _b.reportMetadata, reportMetadata = _b$reportMetadata4 === void 0 ? function () {} : _b$reportMetadata4, readerOptions = __objRest(_b, ["expectedSizeBytes", "maxSizeBytes", "readerSafetyLimitBytes", "reportMetadata"]);
            validateLimits2({
              expectedSizeBytes: expectedSizeBytes,
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: reportMetadata
            });
            _context17.n = 1;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: function reportMetadata() {}
            }));
          case 1:
            candidate = _context17.v;
            record = normalizeRecord2({
              candidate: candidate,
              testCaseId: readerOptions.testCaseId
            });
            reportMetadata(record);
            return _context17.a(2, record);
        }
      }, _callee17);
    }));
  }
  function normalizeRecord2(_ref21) {
    var candidate = _ref21.candidate,
      testCaseId = _ref21.testCaseId;
    var status = safelyReadProperty6(candidate, "status");
    var errorCode = safelyReadProperty6(candidate, "errorCode");
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: status === "FAIL" && PUBLIC_ERROR_CODES8.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
    });
  }
  function safelyReadProperty6(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateLimits2(_ref22) {
    var expectedSizeBytes = _ref22.expectedSizeBytes,
      maxSizeBytes = _ref22.maxSizeBytes,
      readerSafetyLimitBytes = _ref22.readerSafetyLimitBytes,
      reportMetadata = _ref22.reportMetadata;
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0 || !Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= maxSizeBytes) {
      throw new TypeError("D14 expectedSizeBytes must be a positive safe integer greater than maxSizeBytes");
    }
    if (!Number.isSafeInteger(readerSafetyLimitBytes) || readerSafetyLimitBytes <= expectedSizeBytes) {
      throw new TypeError("D14 readerSafetyLimitBytes must be greater than expectedSizeBytes");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  function runReaderSafetyCeilingOverflowDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee18() {
      var _b, expectedSizeBytes, maxSizeBytes, readerSafetyLimitBytes, _b$reportMetadata5, reportMetadata, readerOptions, record;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, maxSizeBytes = _b.maxSizeBytes, readerSafetyLimitBytes = _b.readerSafetyLimitBytes, _b$reportMetadata5 = _b.reportMetadata, reportMetadata = _b$reportMetadata5 === void 0 ? function () {} : _b$reportMetadata5, readerOptions = __objRest(_b, ["expectedSizeBytes", "maxSizeBytes", "readerSafetyLimitBytes", "reportMetadata"]);
            validateLimits3({
              expectedSizeBytes: expectedSizeBytes,
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: reportMetadata
            });
            _context18.n = 1;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: function reportMetadata() {}
            }));
          case 1:
            record = _context18.v;
            reportMetadata(record);
            return _context18.a(2, record);
        }
      }, _callee18);
    }));
  }
  function validateLimits3(_ref23) {
    var expectedSizeBytes = _ref23.expectedSizeBytes,
      maxSizeBytes = _ref23.maxSizeBytes,
      readerSafetyLimitBytes = _ref23.readerSafetyLimitBytes,
      reportMetadata = _ref23.reportMetadata;
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0 || !Number.isSafeInteger(maxSizeBytes) || maxSizeBytes < expectedSizeBytes) {
      throw new TypeError("D15 maxSizeBytes must be a positive safe integer at or above expectedSizeBytes");
    }
    if (!Number.isSafeInteger(readerSafetyLimitBytes) || readerSafetyLimitBytes <= 0 || readerSafetyLimitBytes >= expectedSizeBytes) {
      throw new TypeError("D15 readerSafetyLimitBytes must be a positive safe integer below expectedSizeBytes");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var REQUESTED_ITERATIONS2 = 10;
  var REQUIRED_MIME_TYPE2 = "image/jpeg";
  var PUBLIC_ERROR_CODES9 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runRepeatedReadsDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee19() {
      var _b, expectedSizeBytes, _b$reportMetadata6, reportMetadata, readerOptions, attemptedIterations, successfulIterations, firstMimeType, firstSizeBytes, publicErrorCode, metadataMismatch, iteration, result, matchesRequiredMetadata, matchesFirstIteration, allMetadataEqual, record;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, _b$reportMetadata6 = _b.reportMetadata, reportMetadata = _b$reportMetadata6 === void 0 ? function () {} : _b$reportMetadata6, readerOptions = __objRest(_b, ["expectedSizeBytes", "reportMetadata"]);
            validateInputs4({
              expectedSizeBytes: expectedSizeBytes,
              reportMetadata: reportMetadata
            });
            attemptedIterations = 0;
            successfulIterations = 0;
            metadataMismatch = false;
            iteration = 1;
          case 1:
            if (!(iteration <= REQUESTED_ITERATIONS2)) {
              _context19.n = 6;
              break;
            }
            attemptedIterations += 1;
            _context19.n = 2;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              reportMetadata: function reportMetadata() {}
            }));
          case 2:
            result = _context19.v;
            if (!(result.status === "FAIL")) {
              _context19.n = 3;
              break;
            }
            publicErrorCode = normalizePublicErrorCode3(result.errorCode);
            return _context19.a(3, 6);
          case 3:
            matchesRequiredMetadata = result.status === "PASS" && result.mimeType === REQUIRED_MIME_TYPE2 && result.sizeBytes === expectedSizeBytes;
            matchesFirstIteration = iteration === 1 || result.mimeType === firstMimeType && result.sizeBytes === firstSizeBytes;
            if (!(!matchesRequiredMetadata || !matchesFirstIteration)) {
              _context19.n = 4;
              break;
            }
            metadataMismatch = true;
            return _context19.a(3, 6);
          case 4:
            if (iteration === 1) {
              firstMimeType = result.mimeType;
              firstSizeBytes = result.sizeBytes;
            }
            successfulIterations += 1;
          case 5:
            iteration += 1;
            _context19.n = 1;
            break;
          case 6:
            allMetadataEqual = successfulIterations === REQUESTED_ITERATIONS2 && publicErrorCode === void 0 && metadataMismatch === false;
            record = createLoopRecord2({
              testCaseId: readerOptions.testCaseId,
              attemptedIterations: attemptedIterations,
              successfulIterations: successfulIterations,
              allMetadataEqual: allMetadataEqual,
              publicErrorCode: publicErrorCode,
              metadataMismatch: metadataMismatch,
              mimeType: firstMimeType,
              sizeBytes: firstSizeBytes
            });
            reportMetadata(record);
            return _context19.a(2, record);
        }
      }, _callee19);
    }));
  }
  function createLoopRecord2(_ref24) {
    var testCaseId = _ref24.testCaseId,
      attemptedIterations = _ref24.attemptedIterations,
      successfulIterations = _ref24.successfulIterations,
      allMetadataEqual = _ref24.allMetadataEqual,
      publicErrorCode = _ref24.publicErrorCode,
      metadataMismatch = _ref24.metadataMismatch,
      mimeType = _ref24.mimeType,
      sizeBytes = _ref24.sizeBytes;
    var common = {
      testCaseId: testCaseId,
      requestedIterations: REQUESTED_ITERATIONS2,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations
    };
    if (successfulIterations === REQUESTED_ITERATIONS2 && publicErrorCode === void 0 && metadataMismatch === false) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual
      }));
    }
    if (publicErrorCode !== void 0) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        failureReason: "PUBLIC_ERROR",
        errorCode: publicErrorCode
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizePublicErrorCode3(errorCode) {
    return PUBLIC_ERROR_CODES9.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateInputs4(_ref25) {
    var expectedSizeBytes = _ref25.expectedSizeBytes,
      reportMetadata = _ref25.reportMetadata;
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
      throw new TypeError("expectedSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES10 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID5 = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE3 = /^image\/[\+\x2D\.0-9a-z]+$/;
  function runResolverMimeDeviceCheck(_0) {
    return __async(this, arguments, function (_ref26) {
      var testCaseId = _ref26.testCaseId,
        sourceUri = _ref26.sourceUri,
        expectedMimeType = _ref26.expectedMimeType,
        maxSizeBytes = _ref26.maxSizeBytes,
        readerSafetyLimitBytes = _ref26.readerSafetyLimitBytes,
        context = _ref26.context,
        contentResolver = _ref26.contentResolver,
        parseUri = _ref26.parseUri,
        javaBridge = _ref26.javaBridge,
        _ref26$isFileUriAppro = _ref26.isFileUriApproved,
        isFileUriApproved = _ref26$isFileUriAppro === void 0 ? function () {
          return false;
        } : _ref26$isFileUriAppro,
        openFileReadOnly = _ref26.openFileReadOnly,
        _ref26$reportMetadata = _ref26.reportMetadata,
        reportMetadata = _ref26$reportMetadata === void 0 ? function () {} : _ref26$reportMetadata;
      return _regenerator().m(function _callee20() {
        var record, reader, result, _t19, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              validateInputs5({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                maxSizeBytes: maxSizeBytes,
                reportMetadata: reportMetadata
              });
              _context20.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: contentResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context20.n = 2;
              return reader.canAccess(sourceUri);
            case 2:
              _t19 = _context20.v;
              if (!(_t19 !== true)) {
                _context20.n = 3;
                break;
              }
              record = failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
              _context20.n = 5;
              break;
            case 3:
              _context20.n = 4;
              return reader.read(sourceUri);
            case 4:
              result = _context20.v;
              record = normalizeReaderResult({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                maxSizeBytes: maxSizeBytes,
                result: result
              });
            case 5:
              _context20.n = 7;
              break;
            case 6:
              _context20.p = 6;
              _t20 = _context20.v;
              record = failure2(testCaseId, normalizeErrorCode2(_t20));
            case 7:
              reportMetadata(record);
              return _context20.a(2, record);
          }
        }, _callee20, null, [[1, 6]]);
      })();
    });
  }
  function normalizeReaderResult(_ref27) {
    var testCaseId = _ref27.testCaseId,
      expectedMimeType = _ref27.expectedMimeType,
      maxSizeBytes = _ref27.maxSizeBytes,
      result = _ref27.result;
    var bytes = safelyReadProperty7(result, "bytes");
    var reportedMimeType = safelyReadProperty7(result, "mimeType");
    if (!(bytes instanceof Uint8Array)) {
      return failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
    }
    if (bytes.byteLength === 0) {
      return failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE);
    }
    if (bytes.byteLength > maxSizeBytes) {
      return failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE);
    }
    var mimeType = normalizeMimeType(reportedMimeType);
    if (mimeType !== expectedMimeType) {
      return failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE);
    }
    return Object.freeze({
      testCaseId: testCaseId,
      status: "PASS",
      mimeType: mimeType,
      sizeBytes: bytes.byteLength
    });
  }
  function normalizeErrorCode2(error) {
    var code = safelyReadProperty7(error, "code");
    if (PUBLIC_ERROR_CODES10.has(code)) {
      return code;
    }
    var classification = safelyReadProperty7(error, "classification");
    if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
      return IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED;
    }
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function failure2(testCaseId, errorCode) {
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES10.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
    });
  }
  function safelyReadProperty7(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateInputs5(_ref28) {
    var testCaseId = _ref28.testCaseId,
      expectedMimeType = _ref28.expectedMimeType,
      maxSizeBytes = _ref28.maxSizeBytes,
      reportMetadata = _ref28.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID5.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof expectedMimeType !== "string" || !SAFE_MIME_TYPE3.test(expectedMimeType) || normalizeMimeType(expectedMimeType) !== expectedMimeType) {
      throw new TypeError("expectedMimeType must be a normalized image MIME");
    }
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var FILE_PATH_PATTERN = /\/(?:sdcard|storage\/emulated\/0)\/(?:[\0-\x08\x0E-\x1F!#-&\(-\|~-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  var CONTENT_URI_PATTERN2 = /content:\/\/(?:[\0-\x08\x0E-\x1F!#-&\(-\|~-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  var BASE64_PATTERN2 = /[\+\/-9A-Za-z]{20,}={0,2}/;
  var BYTE_ARRAY_PATTERN2 = /\[[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:[0-9]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*){5,}[0-9]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\]/;
  var STACK_TRACE_PATTERN = /(?:at[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+|JavaException:|Error:[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/;
  function runSensitiveLoggingDeviceCheck(_0) {
    return __async(this, arguments, function (_ref29) {
      var expectedSizeBytes = _ref29.expectedSizeBytes,
        _ref29$expectedMimeTy = _ref29.expectedMimeType,
        expectedMimeType = _ref29$expectedMimeTy === void 0 ? "image/jpeg" : _ref29$expectedMimeTy,
        _ref29$reportMetadata = _ref29.reportMetadata,
        reportMetadata = _ref29$reportMetadata === void 0 ? function () {} : _ref29$reportMetadata,
        prepareSelectedImage2 = _ref29.prepareSelectedImage,
        _ref29$invalidUri = _ref29.invalidUri,
        invalidUri = _ref29$invalidUri === void 0 ? "content://invalid/uri" : _ref29$invalidUri;
      return _regenerator().m(function _callee21() {
        var _a, _b, successLogsClean, capturedLogs, originalInfo, originalWarn, originalError, failureLogsClean, _capturedLogs, _originalInfo, _originalWarn, _originalError, _failureRecord, uiResponsive, record2, record, _t21, _t22;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              if (!(!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0)) {
                _context21.n = 1;
                break;
              }
              throw new TypeError("expectedSizeBytes must be a positive safe integer");
            case 1:
              if (!(typeof prepareSelectedImage2 !== "function")) {
                _context21.n = 2;
                break;
              }
              throw new TypeError("prepareSelectedImage must be a function");
            case 2:
              successLogsClean = false;
              _context21.p = 3;
              capturedLogs = [];
              originalInfo = console.info;
              originalWarn = console.warn;
              originalError = console.error;
              console.info = function () {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                capturedLogs.push(["info", args.map(String).join(" ")]);
                originalInfo.apply(console, args);
              };
              console.warn = function () {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }
                capturedLogs.push(["warn", args.map(String).join(" ")]);
                originalWarn.apply(console, args);
              };
              console.error = function () {
                for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }
                capturedLogs.push(["error", args.map(String).join(" ")]);
                originalError.apply(console, args);
              };
              _context21.n = 4;
              return prepareSelectedImage2();
            case 4:
              console.info = originalInfo;
              console.warn = originalWarn;
              console.error = originalError;
              successLogsClean = inspectLogsForSensitiveData(capturedLogs);
              _context21.n = 6;
              break;
            case 5:
              _context21.p = 5;
              _t21 = _context21.v;
              successLogsClean = true;
            case 6:
              if (typeof java !== "undefined" && ((_b = (_a = java == null ? void 0 : java.lang) == null ? void 0 : _a.System) == null ? void 0 : _b.gc)) {
                java.lang.System.gc();
              }
              failureLogsClean = false;
              _context21.p = 7;
              _capturedLogs = [];
              _originalInfo = console.info;
              _originalWarn = console.warn;
              _originalError = console.error;
              console.info = function () {
                for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  args[_key4] = arguments[_key4];
                }
                _capturedLogs.push(["info", args.map(String).join(" ")]);
                _originalInfo.apply(console, args);
              };
              console.warn = function () {
                for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                  args[_key5] = arguments[_key5];
                }
                _capturedLogs.push(["warn", args.map(String).join(" ")]);
                _originalWarn.apply(console, args);
              };
              console.error = function () {
                for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                  args[_key6] = arguments[_key6];
                }
                _capturedLogs.push(["error", args.map(String).join(" ")]);
                _originalError.apply(console, args);
              };
              _context21.n = 8;
              return prepareSelectedImage2(invalidUri);
            case 8:
              _failureRecord = _context21.v;
              console.info = _originalInfo;
              console.warn = _originalWarn;
              console.error = _originalError;
              failureLogsClean = inspectLogsForSensitiveData(_capturedLogs);
              _context21.n = 10;
              break;
            case 9:
              _context21.p = 9;
              _t22 = _context21.v;
              failureLogsClean = true;
            case 10:
              uiResponsive = true;
              if (!(successLogsClean && failureLogsClean)) {
                _context21.n = 11;
                break;
              }
              record2 = Object.freeze({
                testCaseId: "D23_SENSITIVE_LOGGING",
                status: "PASS",
                mimeType: expectedMimeType,
                sizeBytes: expectedSizeBytes,
                uiResponsive: uiResponsive,
                successLogsClean: successLogsClean,
                failureLogsClean: failureLogsClean
              });
              reportMetadata(record2);
              return _context21.a(2, record2);
            case 11:
              record = Object.freeze({
                testCaseId: "D23_SENSITIVE_LOGGING",
                status: "FAIL",
                failureReason: "SENSITIVE_LOG_VIOLATION",
                uiResponsive: uiResponsive,
                successLogsClean: successLogsClean,
                failureLogsClean: failureLogsClean
              });
              reportMetadata(record);
              return _context21.a(2, record);
          }
        }, _callee21, null, [[7, 9], [3, 5]]);
      })();
    });
  }
  function inspectLogsForSensitiveData(logs) {
    var _iterator5 = _createForOfIteratorHelper(logs),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
          message = _step5$value[1];
        if (FILE_PATH_PATTERN.test(message)) {
          return false;
        }
        if (CONTENT_URI_PATTERN2.test(message)) {
          return false;
        }
        if (BASE64_PATTERN2.test(message)) {
          return false;
        }
        if (BYTE_ARRAY_PATTERN2.test(message)) {
          return false;
        }
        if (STACK_TRACE_PATTERN.test(message)) {
          return false;
        }
        if (message.includes("sourceUri") || message.includes("imageBase64")) {
          return false;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return true;
  }
  function runUnsupportedMimeTypeDeviceCheck(_0) {
    return __async(this, arguments, function (_ref30) {
      var _ref30$expectedErrorC = _ref30.expectedErrorCode,
        expectedErrorCode = _ref30$expectedErrorC === void 0 ? "UNSUPPORTED_MIME_TYPE" : _ref30$expectedErrorC,
        _ref30$reportMetadata = _ref30.reportMetadata,
        reportMetadata = _ref30$reportMetadata === void 0 ? function () {} : _ref30$reportMetadata,
        prepareSelectedImage2 = _ref30.prepareSelectedImage;
      return _regenerator().m(function _callee22() {
        var record, result, status, errorCode, uiResponsive, _t23;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              if (!(typeof prepareSelectedImage2 !== "function")) {
                _context22.n = 1;
                break;
              }
              throw new TypeError("prepareSelectedImage must be a function");
            case 1:
              _context22.p = 1;
              _context22.n = 2;
              return prepareSelectedImage2();
            case 2:
              result = _context22.v;
              status = safelyReadProperty8(result, "status");
              errorCode = safelyReadProperty8(result, "errorCode");
              uiResponsive = safelyReadProperty8(result, "uiResponsive");
              if (status === "FAIL" && errorCode === expectedErrorCode) {
                record = Object.freeze({
                  testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
                  status: "FAIL",
                  errorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              } else {
                record = Object.freeze({
                  testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
                  status: "FAIL",
                  errorCode: "UNEXPECTED_RESULT",
                  expectedErrorCode: expectedErrorCode,
                  actualStatus: status,
                  actualErrorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              }
              _context22.n = 4;
              break;
            case 3:
              _context22.p = 3;
              _t23 = _context22.v;
              record = Object.freeze({
                testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
                status: "FAIL",
                errorCode: "HARNESS_EXCEPTION",
                uiResponsive: true
              });
            case 4:
              reportMetadata(record);
              return _context22.a(2, record);
          }
        }, _callee22, null, [[1, 3]]);
      })();
    });
  }
  function safelyReadProperty8(value, propertyName) {
    if (value === null || value === void 0 || _typeof(value) !== "object") {
      return void 0;
    }
    return value[propertyName];
  }
  function runControlledEncodingFailureDeviceCheck(_0) {
    return __async(this, arguments, function (_ref31) {
      var _ref31$expectedErrorC = _ref31.expectedErrorCode,
        expectedErrorCode = _ref31$expectedErrorC === void 0 ? "ENCODING_FAILED" : _ref31$expectedErrorC,
        _ref31$reportMetadata = _ref31.reportMetadata,
        reportMetadata = _ref31$reportMetadata === void 0 ? function () {} : _ref31$reportMetadata,
        prepareSelectedImage2 = _ref31.prepareSelectedImage;
      return _regenerator().m(function _callee23() {
        var record, result, status, errorCode, uiResponsive, _t24;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              if (!(typeof prepareSelectedImage2 !== "function")) {
                _context23.n = 1;
                break;
              }
              throw new TypeError("prepareSelectedImage must be a function");
            case 1:
              _context23.p = 1;
              _context23.n = 2;
              return prepareSelectedImage2();
            case 2:
              result = _context23.v;
              status = safelyReadProperty9(result, "status");
              errorCode = safelyReadProperty9(result, "errorCode");
              uiResponsive = safelyReadProperty9(result, "uiResponsive");
              if (status === "FAIL" && errorCode === expectedErrorCode) {
                record = Object.freeze({
                  testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
                  status: "FAIL",
                  errorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              } else {
                record = Object.freeze({
                  testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
                  status: "FAIL",
                  errorCode: "UNEXPECTED_RESULT",
                  expectedErrorCode: expectedErrorCode,
                  actualStatus: status,
                  actualErrorCode: errorCode,
                  uiResponsive: uiResponsive != null ? uiResponsive : true
                });
              }
              _context23.n = 4;
              break;
            case 3:
              _context23.p = 3;
              _t24 = _context23.v;
              record = Object.freeze({
                testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
                status: "FAIL",
                errorCode: "HARNESS_EXCEPTION",
                uiResponsive: true
              });
            case 4:
              reportMetadata(record);
              return _context23.a(2, record);
          }
        }, _callee23, null, [[1, 3]]);
      })();
    });
  }
  function safelyReadProperty9(value, propertyName) {
    if (value === null || value === void 0 || _typeof(value) !== "object") {
      return void 0;
    }
    return value[propertyName];
  }
  var PUBLIC_ERROR_CODES11 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID6 = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE4 = /^image\/[\+\x2D\.0-9a-z]+$/;
  function runStreamCleanupSuccessDeviceCheck(_0) {
    return __async(this, arguments, function (_ref32) {
      var testCaseId = _ref32.testCaseId,
        sourceUri = _ref32.sourceUri,
        expectedMimeType = _ref32.expectedMimeType,
        expectedSizeBytes = _ref32.expectedSizeBytes,
        maxSizeBytes = _ref32.maxSizeBytes,
        readerSafetyLimitBytes = _ref32.readerSafetyLimitBytes,
        context = _ref32.context,
        contentResolver = _ref32.contentResolver,
        parseUri = _ref32.parseUri,
        javaBridge = _ref32.javaBridge,
        _ref32$isFileUriAppro = _ref32.isFileUriApproved,
        isFileUriApproved = _ref32$isFileUriAppro === void 0 ? function () {
          return false;
        } : _ref32$isFileUriAppro,
        openFileReadOnly = _ref32.openFileReadOnly,
        _ref32$reportMetadata = _ref32.reportMetadata,
        reportMetadata = _ref32$reportMetadata === void 0 ? function () {} : _ref32$reportMetadata;
      return _regenerator().m(function _callee24() {
        var closeCount, instrumentedResolver, record, reader, result, _t25, _t26;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              validateInputs6({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                expectedSizeBytes: expectedSizeBytes,
                maxSizeBytes: maxSizeBytes,
                reportMetadata: reportMetadata
              });
              closeCount = 0;
              instrumentedResolver = createInstrumentedResolver2(contentResolver, function () {
                closeCount += 1;
              });
              _context24.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: instrumentedResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context24.n = 2;
              return reader.canAccess(sourceUri);
            case 2:
              _t25 = _context24.v;
              if (!(_t25 !== true)) {
                _context24.n = 3;
                break;
              }
              record = failureWithCloseCount(testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, closeCount);
              _context24.n = 5;
              break;
            case 3:
              _context24.n = 4;
              return reader.read(sourceUri);
            case 4:
              result = _context24.v;
              record = normalizeReaderResult2({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                expectedSizeBytes: expectedSizeBytes,
                maxSizeBytes: maxSizeBytes,
                result: result,
                closeCount: closeCount
              });
            case 5:
              _context24.n = 7;
              break;
            case 6:
              _context24.p = 6;
              _t26 = _context24.v;
              record = failureWithCloseCount(testCaseId, normalizeErrorCode3(_t26), closeCount);
            case 7:
              reportMetadata(record);
              return _context24.a(2, record);
          }
        }, _callee24, null, [[1, 6]]);
      })();
    });
  }
  function createInstrumentedResolver2(resolver, onClose) {
    return {
      openInputStream: function openInputStream(uri) {
        var stream = resolver.openInputStream(uri);
        if (stream == null) {
          return null;
        }
        return {
          read: function read(buffer) {
            return stream.read(buffer);
          },
          close: function close() {
            onClose();
            stream.close();
          }
        };
      },
      getType: function getType(uri) {
        return resolver.getType(uri);
      }
    };
  }
  function normalizeReaderResult2(_ref33) {
    var testCaseId = _ref33.testCaseId,
      expectedMimeType = _ref33.expectedMimeType,
      expectedSizeBytes = _ref33.expectedSizeBytes,
      maxSizeBytes = _ref33.maxSizeBytes,
      result = _ref33.result,
      closeCount = _ref33.closeCount;
    var bytes = safelyReadProperty10(result, "bytes");
    var reportedMimeType = safelyReadProperty10(result, "mimeType");
    if (!(bytes instanceof Uint8Array)) {
      return failureWithCloseCount(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, closeCount);
    }
    if (bytes.byteLength === 0) {
      return failureWithCloseCount(testCaseId, IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE, closeCount);
    }
    if (bytes.byteLength > maxSizeBytes) {
      return failureWithCloseCount(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE, closeCount);
    }
    var mimeType = normalizeMimeType(reportedMimeType);
    if (mimeType !== expectedMimeType) {
      return failureWithCloseCount(testCaseId, IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE, closeCount);
    }
    if (bytes.byteLength !== expectedSizeBytes) {
      return Object.freeze({
        testCaseId: testCaseId,
        status: "FAIL",
        mimeType: mimeType,
        sizeBytes: bytes.byteLength,
        closeCount: closeCount,
        failureReason: "SIZE_MISMATCH"
      });
    }
    if (closeCount !== 2) {
      return Object.freeze({
        testCaseId: testCaseId,
        status: "FAIL",
        mimeType: mimeType,
        sizeBytes: bytes.byteLength,
        closeCount: closeCount,
        errorCode: "CLEANUP_FAILED"
      });
    }
    return Object.freeze({
      testCaseId: testCaseId,
      status: "PASS",
      mimeType: mimeType,
      sizeBytes: bytes.byteLength,
      closeCount: closeCount
    });
  }
  function normalizeErrorCode3(error) {
    var code = safelyReadProperty10(error, "code");
    if (PUBLIC_ERROR_CODES11.has(code)) {
      return code;
    }
    var classification = safelyReadProperty10(error, "classification");
    if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
      return IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED;
    }
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function failureWithCloseCount(testCaseId, errorCode, closeCount) {
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES11.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      closeCount: closeCount
    });
  }
  function safelyReadProperty10(value, propertyName) {
    if (value === null || _typeof(value) !== "object" && typeof value !== "function") {
      return void 0;
    }
    try {
      return value[propertyName];
    } catch (e) {
      return void 0;
    }
  }
  function validateInputs6(_ref34) {
    var testCaseId = _ref34.testCaseId,
      expectedMimeType = _ref34.expectedMimeType,
      expectedSizeBytes = _ref34.expectedSizeBytes,
      maxSizeBytes = _ref34.maxSizeBytes,
      reportMetadata = _ref34.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID6.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof expectedMimeType !== "string" || !SAFE_MIME_TYPE4.test(expectedMimeType) || normalizeMimeType(expectedMimeType) !== expectedMimeType) {
      throw new TypeError("expectedMimeType must be a normalized image MIME");
    }
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
      throw new TypeError("expectedSizeBytes must be a positive safe integer");
    }
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var REQUESTED_ITERATIONS3 = 10;
  var REQUIRED_MIME_TYPE3 = "image/jpeg";
  var PUBLIC_ERROR_CODES12 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runUiResponsivenessDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee25() {
      var _b, expectedSizeBytes, _b$reportMetadata7, reportMetadata, _b$uiHeartbeat, uiHeartbeat, readerOptions, attemptedIterations, successfulIterations, firstMimeType, firstSizeBytes, publicErrorCode, metadataMismatch, heartbeatCount, uiBlocked, iteration, result, heartbeatOk, matchesRequiredMetadata, matchesFirstIteration, allMetadataEqual, record;
      return _regenerator().w(function (_context25) {
        while (1) switch (_context25.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, _b$reportMetadata7 = _b.reportMetadata, reportMetadata = _b$reportMetadata7 === void 0 ? function () {} : _b$reportMetadata7, _b$uiHeartbeat = _b.uiHeartbeat, uiHeartbeat = _b$uiHeartbeat === void 0 ? function () {
              return Promise.resolve(true);
            } : _b$uiHeartbeat, readerOptions = __objRest(_b, ["expectedSizeBytes", "reportMetadata", "uiHeartbeat"]);
            validateInputs7({
              expectedSizeBytes: expectedSizeBytes,
              reportMetadata: reportMetadata,
              uiHeartbeat: uiHeartbeat
            });
            attemptedIterations = 0;
            successfulIterations = 0;
            metadataMismatch = false;
            heartbeatCount = 0;
            uiBlocked = false;
            iteration = 1;
          case 1:
            if (!(iteration <= REQUESTED_ITERATIONS3)) {
              _context25.n = 8;
              break;
            }
            attemptedIterations += 1;
            _context25.n = 2;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              reportMetadata: function reportMetadata() {}
            }));
          case 2:
            result = _context25.v;
            if (!(iteration < REQUESTED_ITERATIONS3)) {
              _context25.n = 4;
              break;
            }
            _context25.n = 3;
            return uiHeartbeat();
          case 3:
            heartbeatOk = _context25.v;
            if (heartbeatOk) {
              heartbeatCount += 1;
            } else {
              uiBlocked = true;
            }
          case 4:
            if (!(result.status === "FAIL")) {
              _context25.n = 5;
              break;
            }
            publicErrorCode = normalizePublicErrorCode4(result.errorCode);
            return _context25.a(3, 8);
          case 5:
            matchesRequiredMetadata = result.status === "PASS" && result.mimeType === REQUIRED_MIME_TYPE3 && result.sizeBytes === expectedSizeBytes;
            matchesFirstIteration = iteration === 1 || result.mimeType === firstMimeType && result.sizeBytes === firstSizeBytes;
            if (!(!matchesRequiredMetadata || !matchesFirstIteration)) {
              _context25.n = 6;
              break;
            }
            metadataMismatch = true;
            return _context25.a(3, 8);
          case 6:
            if (iteration === 1) {
              firstMimeType = result.mimeType;
              firstSizeBytes = result.sizeBytes;
            }
            successfulIterations += 1;
          case 7:
            iteration += 1;
            _context25.n = 1;
            break;
          case 8:
            allMetadataEqual = successfulIterations === REQUESTED_ITERATIONS3 && publicErrorCode === void 0 && metadataMismatch === false;
            record = createLoopRecord3({
              testCaseId: readerOptions.testCaseId,
              attemptedIterations: attemptedIterations,
              successfulIterations: successfulIterations,
              allMetadataEqual: allMetadataEqual,
              publicErrorCode: publicErrorCode,
              metadataMismatch: metadataMismatch,
              mimeType: firstMimeType,
              sizeBytes: firstSizeBytes,
              heartbeatCount: heartbeatCount,
              uiBlocked: uiBlocked
            });
            reportMetadata(record);
            return _context25.a(2, record);
        }
      }, _callee25);
    }));
  }
  function createLoopRecord3(_ref35) {
    var testCaseId = _ref35.testCaseId,
      attemptedIterations = _ref35.attemptedIterations,
      successfulIterations = _ref35.successfulIterations,
      allMetadataEqual = _ref35.allMetadataEqual,
      publicErrorCode = _ref35.publicErrorCode,
      metadataMismatch = _ref35.metadataMismatch,
      mimeType = _ref35.mimeType,
      sizeBytes = _ref35.sizeBytes,
      heartbeatCount = _ref35.heartbeatCount,
      uiBlocked = _ref35.uiBlocked;
    var common = {
      testCaseId: testCaseId,
      requestedIterations: REQUESTED_ITERATIONS3,
      attemptedIterations: attemptedIterations,
      successfulIterations: successfulIterations,
      heartbeatCount: heartbeatCount
    };
    if (uiBlocked) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: false,
        failureReason: "UI_NOT_RESPONSIVE"
      }));
    }
    if (successfulIterations === REQUESTED_ITERATIONS3 && publicErrorCode === void 0 && metadataMismatch === false) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes,
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true
      }));
    }
    if (publicErrorCode !== void 0) {
      return Object.freeze(__spreadProps(__spreadValues({}, common), {
        status: "FAIL",
        allMetadataEqual: allMetadataEqual,
        uiResponsive: true,
        failureReason: "PUBLIC_ERROR",
        errorCode: publicErrorCode
      }));
    }
    return Object.freeze(__spreadProps(__spreadValues({}, common), {
      status: "FAIL",
      allMetadataEqual: allMetadataEqual,
      uiResponsive: true,
      failureReason: "METADATA_MISMATCH"
    }));
  }
  function normalizePublicErrorCode4(errorCode) {
    return PUBLIC_ERROR_CODES12.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateInputs7(_ref36) {
    var expectedSizeBytes = _ref36.expectedSizeBytes,
      reportMetadata = _ref36.reportMetadata,
      uiHeartbeat = _ref36.uiHeartbeat;
    if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
      throw new TypeError("expectedSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
    if (typeof uiHeartbeat !== "function") {
      throw new TypeError("uiHeartbeat must be a function");
    }
  }
  var MAX_SIZE_BYTES = 10 * 1024 * 1024;
  var READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
  var UI_HEARTBEAT_TIMEOUT_MILLIS = 3e3;
  var CHECK_TIMEOUT_MILLIS = 2e4;
  function runAutoJs6FormatCheck(formatCase, injectedRuntime) {
    var runtime = injectedRuntime != null ? injectedRuntime : (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object" ? globalThis : Function("return this")();
    if (formatCase.verificationMode === "multi-image-sequential") {
      return runAutoJs6MultiImageCheck(formatCase, runtime);
    }
    return runFormatCheck(formatCase, {
      showInstructions: function showInstructions(_ref37) {
        var title = _ref37.title,
          instructionText = _ref37.instructionText;
        return runtime.dialogs.alert(title, instructionText);
      },
      pickSingleImage: function pickSingleImage(_ref38) {
        var pickerMimeType = _ref38.pickerMimeType,
          requestCode = _ref38.requestCode;
        return _pickSingleImage(runtime, pickerMimeType, requestCode);
      },
      executeOffUiThread: function executeOffUiThread(task) {
        return _executeOffUiThread(runtime, task);
      },
      prepareSelectedImage: function prepareSelectedImage(sourceUri, testCaseId) {
        return _prepareSelectedImage(runtime, sourceUri, testCaseId, formatCase);
      },
      reportMetadata: function reportMetadata(record) {
        runtime.console.clear();
        runtime.console.show();
        runtime.console.info(JSON.stringify(record));
      }
    });
  }
  function runAutoJs6MultiImageCheck(formatCase, runtime) {
    return __async(this, null, _regenerator().m(function _callee26() {
      var sourceUris, reportMetadata, record, expectedImages, context, contentResolver, parseUri, javaBridge;
      return _regenerator().w(function (_context26) {
        while (1) switch (_context26.n) {
          case 0:
            _context26.n = 1;
            return runtime.dialogs.alert(formatCase.title, formatCase.instructionText);
          case 1:
            _context26.n = 2;
            return pickMultipleImages(runtime, formatCase.pickerMimeType, formatCase.requestCode);
          case 2:
            sourceUris = _context26.v;
            reportMetadata = function reportMetadata(record) {
              runtime.console.clear();
              runtime.console.show();
              runtime.console.info(JSON.stringify(record));
            };
            if (!(!Array.isArray(sourceUris) || sourceUris.length === 0)) {
              _context26.n = 3;
              break;
            }
            record = Object.freeze({
              testCaseId: formatCase.testCaseId,
              requestedImages: formatCase.requestedImages,
              attemptedImages: 0,
              successfulImages: 0,
              status: "FAIL",
              images: [],
              uiResponsive: true,
              failureReason: "NO_IMAGES_SELECTED"
            });
            reportMetadata(record);
            return _context26.a(2, record);
          case 3:
            expectedImages = sourceUris.map(function () {
              return {
                mimeType: formatCase.expectedMimeType,
                sizeBytes: formatCase.expectedSizeBytes
              };
            });
            context = runtime.context;
            contentResolver = context.getContentResolver();
            parseUri = function parseUri(value) {
              return runtime.android.net.Uri.parse(value);
            };
            javaBridge = {
              createByteArray: function createByteArray(size) {
                return runtime.util.java.array("byte", size);
              },
              classifyError: function classifyError(error) {
                return _classifyError(runtime, error);
              }
            };
            return _context26.a(2, runMultiImageSequentialDeviceCheck({
              sourceUris: sourceUris,
              expectedImages: expectedImages,
              testCaseId: formatCase.testCaseId,
              maxSizeBytes: formatCase.maxSizeBytes,
              readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
              context: context,
              contentResolver: contentResolver,
              parseUri: parseUri,
              javaBridge: javaBridge,
              isFileUriApproved: function isFileUriApproved() {
                return false;
              },
              reportMetadata: reportMetadata
            }));
        }
      }, _callee26);
    }));
  }
  function pickMultipleImages(runtime, pickerMimeType, requestCode) {
    return new Promise(function (resolve) {
      var settled = false;
      var _listener = function listener(receivedRequestCode, resultCode, data) {
        if (receivedRequestCode !== requestCode || settled) {
          return;
        }
        settled = true;
        removeActivityResultListener(runtime, _listener);
        if (resultCode !== runtime.android.app.Activity.RESULT_OK || data == null || typeof data.getClipData !== "function") {
          resolve([]);
          return;
        }
        var clipData = data.getClipData();
        if (clipData == null || typeof clipData.getItemCount !== "function") {
          resolve([]);
          return;
        }
        var uris = [];
        var count = clipData.getItemCount();
        for (var i = 0; i < count; i += 1) {
          var item = clipData.getItemAt(i);
          if (item != null && typeof item.getUri === "function") {
            var uri = item.getUri();
            if (uri != null) {
              uris.push(String(uri.toString()));
            }
          }
        }
        resolve(uris);
      };
      runtime.ui.emitter.on("activity_result", _listener);
      try {
        var intent = new runtime.android.content.Intent(runtime.android.content.Intent.ACTION_GET_CONTENT);
        intent.setType(pickerMimeType);
        intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
        intent.putExtra(runtime.android.content.Intent.EXTRA_ALLOW_MULTIPLE, true);
        runtime.activity.startActivityForResult(intent, requestCode);
      } catch (e) {
        settled = true;
        removeActivityResultListener(runtime, _listener);
        resolve([]);
      }
    });
  }
  function _pickSingleImage(runtime, pickerMimeType, requestCode) {
    return new Promise(function (resolve) {
      var settled = false;
      var _listener2 = function listener(receivedRequestCode, resultCode, data) {
        if (receivedRequestCode !== requestCode || settled) {
          return;
        }
        settled = true;
        removeActivityResultListener(runtime, _listener2);
        if (resultCode !== runtime.android.app.Activity.RESULT_OK || data == null || typeof data.getData !== "function") {
          resolve(null);
          return;
        }
        var uri = data.getData();
        resolve(uri == null ? null : String(uri.toString()));
      };
      runtime.ui.emitter.on("activity_result", _listener2);
      try {
        var intent = new runtime.android.content.Intent(runtime.android.content.Intent.ACTION_GET_CONTENT);
        intent.setType(pickerMimeType);
        intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
        runtime.activity.startActivityForResult(intent, requestCode);
      } catch (e) {
        settled = true;
        removeActivityResultListener(runtime, _listener2);
        resolve(null);
      }
    });
  }
  function removeActivityResultListener(runtime, listener) {
    if (typeof runtime.ui.emitter.removeListener === "function") {
      runtime.ui.emitter.removeListener("activity_result", listener);
    }
  }
  function _executeOffUiThread(runtime, task) {
    return new Promise(function (resolve) {
      var completed = new runtime.java.util.concurrent.atomic.AtomicBoolean(false);
      var heartbeat = new runtime.java.util.concurrent.atomic.AtomicBoolean(false);
      var worker = null;
      var finish = function finish(execution) {
        if (completed.compareAndSet(false, true)) {
          resolve(execution);
        }
      };
      runtime.ui.post(function () {
        if (completed.compareAndSet(false, true)) {
          if (worker != null && typeof worker.interrupt === "function") {
            worker.interrupt();
          }
          resolve({
            uiResponsive: false
          });
        }
      }, CHECK_TIMEOUT_MILLIS);
      try {
        worker = runtime.threads.start(function () {
          if (runtime.ui.isUiThread()) {
            runtime.ui.post(function () {
              return finish({
                uiResponsive: false
              });
            });
            return;
          }
          runtime.ui.post(function () {
            return heartbeat.set(true);
          });
          var deadline = Date.now() + UI_HEARTBEAT_TIMEOUT_MILLIS;
          while (!heartbeat.get() && Date.now() < deadline) {
            runtime.java.lang.Thread.sleep(10);
          }
          if (!heartbeat.get()) {
            runtime.ui.post(function () {
              return finish({
                uiResponsive: false
              });
            });
            return;
          }
          Promise.resolve().then(task).then(function (value) {
            runtime.ui.post(function () {
              return finish({
                value: value,
                uiResponsive: true
              });
            });
          }).catch(function (error) {
            var errorCode = normalizeFormatCheckErrorCode(error);
            runtime.ui.post(function () {
              return finish({
                value: {
                  status: "FAIL",
                  errorCode: errorCode
                },
                uiResponsive: true
              });
            });
          });
        });
      } catch (e) {
        finish({
          uiResponsive: false
        });
      }
    });
  }
  function _prepareSelectedImage(runtime, sourceUri, testCaseId, formatCase) {
    var context = runtime.context;
    var contentResolver = context.getContentResolver();
    var parseUri = function parseUri(value) {
      return runtime.android.net.Uri.parse(value);
    };
    var javaBridge = {
      createByteArray: function createByteArray(size) {
        return runtime.util.java.array("byte", size);
      },
      classifyError: function classifyError(error) {
        return _classifyError(runtime, error);
      }
    };
    if (formatCase.verificationMode === "repeated-reads") {
      return runRepeatedReadsDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "reader-safety-ceiling-overflow") {
      return runReaderSafetyCeilingOverflowDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "exact-portable-limit") {
      return runExactPortableLimitDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "portable-size-overflow") {
      return runPortableSizeOverflowDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "mime-fallback") {
      return runMimeFallbackDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        maxSizeBytes: MAX_SIZE_BYTES,
        readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "resolver-mime") {
      return runResolverMimeDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedMimeType: formatCase.expectedMimeType,
        maxSizeBytes: MAX_SIZE_BYTES,
        readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "stream-cleanup-success") {
      return runStreamCleanupSuccessDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedMimeType: formatCase.expectedMimeType,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "cleanup-after-failure") {
      return runCleanupAfterFailureDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedMimeType: formatCase.expectedMimeType,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        failureAfterBytes: formatCase.failureAfterBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "memory-behavior") {
      return runMemoryBehaviorDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {}
      });
    }
    if (formatCase.verificationMode === "ui-responsiveness") {
      return runUiResponsivenessDeviceCheck({
        testCaseId: testCaseId,
        sourceUri: sourceUri,
        expectedSizeBytes: formatCase.expectedSizeBytes,
        maxSizeBytes: formatCase.maxSizeBytes,
        readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
        context: context,
        contentResolver: contentResolver,
        parseUri: parseUri,
        javaBridge: javaBridge,
        isFileUriApproved: function isFileUriApproved() {
          return false;
        },
        reportMetadata: function reportMetadata() {},
        uiHeartbeat: function uiHeartbeat() {
          return new Promise(function (resolve) {
            try {
              var handler = new runtime.android.os.Handler(runtime.android.os.Looper.getMainLooper());
              var completed = new runtime.java.util.concurrent.atomic.AtomicBoolean(false);
              var responded = false;
              handler.post(function () {
                responded = true;
                completed.set(true);
              });
              var deadline = Date.now() + 100;
              while (!completed.get() && Date.now() < deadline) {
                runtime.java.lang.Thread.sleep(5);
              }
              resolve(responded);
            } catch (e) {
              resolve(false);
            }
          });
        }
      });
    }
    if (formatCase.verificationMode === "no-persistence") {
      return runNoPersistenceDeviceCheck({
        expectedSizeBytes: formatCase.expectedSizeBytes,
        reportMetadata: function reportMetadata() {},
        prepareSelectedImage: function prepareSelectedImage(invalidUri) {
          return _prepareSelectedImage(runtime, invalidUri != null ? invalidUri : sourceUri, testCaseId, formatCase);
        }
      });
    }
    if (formatCase.verificationMode === "sensitive-logging") {
      return runSensitiveLoggingDeviceCheck({
        expectedSizeBytes: formatCase.expectedSizeBytes,
        expectedMimeType: formatCase.expectedMimeType,
        reportMetadata: function reportMetadata() {},
        prepareSelectedImage: function prepareSelectedImage(invalidUri) {
          return runImageReaderDeviceCheck({
            testCaseId: testCaseId,
            sourceUri: invalidUri != null ? invalidUri : sourceUri,
            maxSizeBytes: MAX_SIZE_BYTES,
            readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
            context: context,
            contentResolver: contentResolver,
            parseUri: parseUri,
            javaBridge: javaBridge,
            isFileUriApproved: function isFileUriApproved() {
              return false;
            },
            reportMetadata: function reportMetadata() {}
          });
        }
      });
    }
    if (formatCase.verificationMode === "empty-image") {
      return runEmptyImageDeviceCheck({
        expectedErrorCode: "EMPTY_IMAGE",
        reportMetadata: function reportMetadata() {},
        prepareSelectedImage: function prepareSelectedImage() {
          return runImageReaderDeviceCheck({
            testCaseId: testCaseId,
            sourceUri: sourceUri,
            maxSizeBytes: MAX_SIZE_BYTES,
            readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
            context: context,
            contentResolver: contentResolver,
            parseUri: parseUri,
            javaBridge: javaBridge,
            isFileUriApproved: function isFileUriApproved() {
              return false;
            },
            reportMetadata: function reportMetadata() {}
          });
        }
      });
    }
    if (formatCase.verificationMode === "unsupported-mime-type") {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: function reportMetadata() {},
        prepareSelectedImage: function prepareSelectedImage() {
          return runImageReaderDeviceCheck({
            testCaseId: testCaseId,
            sourceUri: sourceUri,
            maxSizeBytes: MAX_SIZE_BYTES,
            readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
            context: context,
            contentResolver: contentResolver,
            parseUri: parseUri,
            javaBridge: javaBridge,
            isFileUriApproved: function isFileUriApproved() {
              return false;
            },
            reportMetadata: function reportMetadata() {}
          });
        }
      });
    }
    if (formatCase.verificationMode === "controlled-encoding-failure") {
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
        reportMetadata: function reportMetadata() {},
        prepareSelectedImage: function prepareSelectedImage() {
          return runImageReaderDeviceCheck({
            testCaseId: testCaseId,
            sourceUri: sourceUri,
            maxSizeBytes: MAX_SIZE_BYTES,
            readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
            context: context,
            contentResolver: contentResolver,
            parseUri: parseUri,
            javaBridge: javaBridge,
            isFileUriApproved: function isFileUriApproved() {
              return false;
            },
            reportMetadata: function reportMetadata() {}
          });
        }
      });
    }
    return runImageReaderDeviceCheck({
      testCaseId: testCaseId,
      sourceUri: sourceUri,
      maxSizeBytes: MAX_SIZE_BYTES,
      readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
      context: context,
      contentResolver: contentResolver,
      parseUri: parseUri,
      javaBridge: javaBridge,
      isFileUriApproved: function isFileUriApproved() {
        return false;
      },
      reportMetadata: function reportMetadata() {}
    });
  }
  function _classifyError(runtime, error) {
    var _a;
    try {
      var candidate = (_a = error == null ? void 0 : error.javaException) != null ? _a : error;
      return candidate instanceof runtime.java.lang.SecurityException ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    } catch (e) {
      return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    }
  }
  void runAutoJs6FormatCheck(D05_FORMAT_CHECK_CASE);
})();
