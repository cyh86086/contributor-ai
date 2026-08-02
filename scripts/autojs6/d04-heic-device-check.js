"ui";
/* GENERATED: non-production AutoJs6 D04_HEIC device-verification support only. */
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
  var FORMAT_CHECK_CASES = Object.freeze([D01_FORMAT_CHECK_CASE, D02_FORMAT_CHECK_CASE, D03_FORMAT_CHECK_CASE, D04_FORMAT_CHECK_CASE, D05_FORMAT_CHECK_CASE, D06_RESOLVER_MIME_CHECK_CASE, D07_MIME_FALLBACK_CHECK_CASE, D08_PERMISSION_GRANTED_CHECK_CASE, D13_EXACT_PORTABLE_LIMIT_CHECK_CASE, D14_PORTABLE_SIZE_OVERFLOW_CHECK_CASE]);
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
  var PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var CONTENT_URI = /^content:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  var SAFE_CASE_ID = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE = /^image\/[\+\x2D\.0-9a-z]+$/;
  function normalizeFormatCheckErrorCode(value) {
    var code = safelyReadProperty(value, "code");
    if (PUBLIC_ERROR_CODES.has(code)) {
      return code;
    }
    var errorCode = safelyReadProperty(value, "errorCode");
    return PUBLIC_ERROR_CODES.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function runFormatCheck(formatCase, dependencies) {
    return __async(this, null, _regenerator().m(function _callee5() {
      var showInstructions, pickSingleImage2, executeOffUiThread2, prepareSelectedImage2, reportMetadata, record, sourceUri, execution, _t7;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            validateFormatCase(formatCase);
            validateDependencies(dependencies);
            showInstructions = dependencies.showInstructions, pickSingleImage2 = dependencies.pickSingleImage, executeOffUiThread2 = dependencies.executeOffUiThread, prepareSelectedImage2 = dependencies.prepareSelectedImage, reportMetadata = dependencies.reportMetadata;
            _context5.p = 1;
            _context5.n = 2;
            return showInstructions({
              title: formatCase.title,
              instructionText: formatCase.instructionText
            });
          case 2:
            _context5.n = 3;
            return pickSingleImage2({
              pickerMimeType: formatCase.pickerMimeType,
              requestCode: formatCase.requestCode
            });
          case 3:
            sourceUri = _context5.v;
            if (!(typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri))) {
              _context5.n = 4;
              break;
            }
            record = failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, true);
            _context5.n = 6;
            break;
          case 4:
            _context5.n = 5;
            return executeOffUiThread2(function () {
              return prepareSelectedImage2(sourceUri, formatCase.testCaseId);
            });
          case 5:
            execution = _context5.v;
            record = normalizeExecution(formatCase, execution);
          case 6:
            _context5.n = 8;
            break;
          case 7:
            _context5.p = 7;
            _t7 = _context5.v;
            record = failure(formatCase.testCaseId, normalizeFormatCheckErrorCode(_t7), false);
          case 8:
            reportMetadata(record);
            return _context5.a(2, record);
        }
      }, _callee5, null, [[1, 7]]);
    }));
  }
  function normalizeExecution(formatCase, execution) {
    var uiResponsive = safelyReadProperty(execution, "uiResponsive");
    if (uiResponsive !== true) {
      return failure(formatCase.testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, false);
    }
    var result = safelyReadProperty(execution, "value");
    var status = safelyReadProperty(result, "status");
    var mimeType = safelyReadProperty(result, "mimeType");
    var sizeBytes = safelyReadProperty(result, "sizeBytes");
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
  function failure(testCaseId, errorCode, uiResponsive) {
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      uiResponsive: uiResponsive === true
    });
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
  function validateFormatCase(formatCase) {
    if (!formatCase || typeof formatCase.testCaseId !== "string" || !SAFE_CASE_ID.test(formatCase.testCaseId) || typeof formatCase.pickerMimeType !== "string" || !SAFE_MIME_TYPE.test(formatCase.pickerMimeType) || typeof formatCase.expectedMimeType !== "string" || !SAFE_MIME_TYPE.test(formatCase.expectedMimeType) || !Number.isSafeInteger(formatCase.requestCode) || formatCase.requestCode <= 0 || typeof formatCase.title !== "string" || formatCase.title.length === 0 || typeof formatCase.instructionText !== "string" || formatCase.instructionText.length === 0) {
      throw new TypeError("formatCase must be a valid static case definition");
    }
  }
  function validateDependencies(dependencies) {
    var required = ["showInstructions", "pickSingleImage", "executeOffUiThread", "prepareSelectedImage", "reportMetadata"];
    for (var _i = 0, _required = required; _i < _required.length; _i++) {
      var name = _required[_i];
      if (typeof (dependencies == null ? void 0 : dependencies[name]) !== "function") {
        throw new TypeError("".concat(name, " must be a function"));
      }
    }
  }
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
    validateDependencies2({
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
        return __async(this, null, _regenerator().m(function _callee6() {
          var stream, source, _t8;
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
                stream = openSourceStream({
                  source: source,
                  resolver: resolver,
                  openFileReadOnly: openFileReadOnly
                });
                return _context6.a(2, stream != null);
              case 2:
                _context6.p = 2;
                _t8 = _context6.v;
                return _context6.a(2, false);
              case 3:
                _context6.p = 3;
                closeQuietly(stream, safeLogger);
                return _context6.f(3);
              case 4:
                return _context6.a(2);
            }
          }, _callee6, null, [[0, 2, 3, 4]]);
        }));
      },
      read: function read(sourceUri) {
        return __async(this, null, _regenerator().m(function _callee7() {
          var _a2, stream, source, mimeType, readBuffer, readResult, bytes, _t9;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                _context7.p = 0;
                _context7.n = 1;
                return resolveSource({
                  sourceUri: sourceUri,
                  parseUri: parseUri,
                  isFileUriApproved: isFileUriApproved,
                  requireFileOpener: openFileReadOnly
                });
              case 1:
                source = _context7.v;
                mimeType = source.scheme === CONTENT_SCHEME ? getContentMimeType(resolver, source.parsedUri, javaBridge) : void 0;
                stream = openSourceStream({
                  source: source,
                  resolver: resolver,
                  openFileReadOnly: openFileReadOnly
                });
                if (!(stream == null)) {
                  _context7.n = 2;
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
                return _context7.a(2, {
                  bytes: bytes,
                  mimeType: mimeType
                });
              case 3:
                _context7.p = 3;
                _t9 = _context7.v;
                if (!(_t9 instanceof ClassifiedImageReaderError)) {
                  _context7.n = 4;
                  break;
                }
                throw _t9;
              case 4:
                throw classifyReaderFailure(_t9, javaBridge.classifyError);
              case 5:
                _context7.p = 5;
                closeQuietly(stream, safeLogger);
                return _context7.f(5);
              case 6:
                return _context7.a(2);
            }
          }, _callee7, null, [[0, 3, 5, 6]]);
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
  function validateDependencies2(_ref3) {
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
      return _regenerator().m(function _callee8() {
        var scheme, _t0, _t1, _t10;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              scheme = getSourceScheme(sourceUri);
              if (!(scheme === FILE_SCHEME)) {
                _context8.n = 5;
                break;
              }
              _t1 = typeof isFileUriApproved !== "function";
              if (_t1) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return evaluateFilePolicy(isFileUriApproved, sourceUri);
            case 1:
              _t1 = !_context8.v;
            case 2:
              _t0 = _t1;
              if (_t0) {
                _context8.n = 3;
                break;
              }
              _t0 = typeof requireFileOpener !== "function";
            case 3:
              if (!_t0) {
                _context8.n = 4;
                break;
              }
              throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
            case 4:
              return _context8.a(2, {
                scheme: scheme,
                sourceUri: sourceUri
              });
            case 5:
              _context8.p = 5;
              return _context8.a(2, {
                scheme: scheme,
                sourceUri: sourceUri,
                parsedUri: parseUri(sourceUri)
              });
            case 6:
              _context8.p = 6;
              _t10 = _context8.v;
              throw readerFailure(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
            case 7:
              return _context8.a(2);
          }
        }, _callee8, null, [[5, 6]]);
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
    return __async(this, null, _regenerator().m(function _callee9() {
      var _t11, _t12;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.p = 0;
            _context9.n = 1;
            return isFileUriApproved(sourceUri);
          case 1:
            _t11 = _context9.v;
            return _context9.a(2, _t11 === true);
          case 2:
            _context9.p = 2;
            _t12 = _context9.v;
            return _context9.a(2, false);
        }
      }, _callee9, null, [[0, 2]]);
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
  var PUBLIC_ERROR_CODES2 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID2 = /^[\x2D0-9A-Z_]{1,40}$/;
  function runImageReaderDeviceCheck(_0) {
    return __async(this, arguments, function (_ref7) {
      var testCaseId = _ref7.testCaseId,
        sourceUri = _ref7.sourceUri,
        maxSizeBytes = _ref7.maxSizeBytes,
        readerSafetyLimitBytes = _ref7.readerSafetyLimitBytes,
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
      return _regenerator().m(function _callee0() {
        var record, reader, result, _t13;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              validateHarnessInputs({
                testCaseId: testCaseId,
                reportMetadata: reportMetadata
              });
              _context0.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: contentResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context0.n = 2;
              return prepareImageInput({
                sourceUri: sourceUri,
                maxSizeBytes: maxSizeBytes,
                reader: reader,
                isFileUriApproved: isFileUriApproved
              });
            case 2:
              result = _context0.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "PASS",
                mimeType: result.mimeType,
                sizeBytes: result.sizeBytes
              });
              _context0.n = 4;
              break;
            case 3:
              _context0.p = 3;
              _t13 = _context0.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "FAIL",
                errorCode: PUBLIC_ERROR_CODES2.has(_t13 == null ? void 0 : _t13.code) ? _t13.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
              });
            case 4:
              reportMetadata(record);
              return _context0.a(2, record);
          }
        }, _callee0, null, [[1, 3]]);
      })();
    });
  }
  function validateHarnessInputs(_ref8) {
    var testCaseId = _ref8.testCaseId,
      reportMetadata = _ref8.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID2.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES3 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runExactPortableLimitDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee1() {
      var _b, expectedSizeBytes, maxSizeBytes, readerSafetyLimitBytes, _b$reportMetadata, reportMetadata, readerOptions, candidate, record;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, maxSizeBytes = _b.maxSizeBytes, readerSafetyLimitBytes = _b.readerSafetyLimitBytes, _b$reportMetadata = _b.reportMetadata, reportMetadata = _b$reportMetadata === void 0 ? function () {} : _b$reportMetadata, readerOptions = __objRest(_b, ["expectedSizeBytes", "maxSizeBytes", "readerSafetyLimitBytes", "reportMetadata"]);
            validateLimits({
              expectedSizeBytes: expectedSizeBytes,
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: reportMetadata
            });
            _context1.n = 1;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: function reportMetadata() {}
            }));
          case 1:
            candidate = _context1.v;
            record = normalizeRecord({
              candidate: candidate,
              expectedSizeBytes: expectedSizeBytes,
              testCaseId: readerOptions.testCaseId
            });
            reportMetadata(record);
            return _context1.a(2, record);
        }
      }, _callee1);
    }));
  }
  function normalizeRecord(_ref9) {
    var candidate = _ref9.candidate,
      expectedSizeBytes = _ref9.expectedSizeBytes,
      testCaseId = _ref9.testCaseId;
    var status = safelyReadProperty2(candidate, "status");
    var mimeType = safelyReadProperty2(candidate, "mimeType");
    var sizeBytes = safelyReadProperty2(candidate, "sizeBytes");
    if (status === "PASS" && typeof mimeType === "string" && sizeBytes === expectedSizeBytes) {
      return Object.freeze({
        testCaseId: testCaseId,
        status: "PASS",
        mimeType: mimeType,
        sizeBytes: sizeBytes
      });
    }
    var errorCode = safelyReadProperty2(candidate, "errorCode");
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: status === "FAIL" && PUBLIC_ERROR_CODES3.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
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
  function validateLimits(_ref0) {
    var expectedSizeBytes = _ref0.expectedSizeBytes,
      maxSizeBytes = _ref0.maxSizeBytes,
      readerSafetyLimitBytes = _ref0.readerSafetyLimitBytes,
      reportMetadata = _ref0.reportMetadata;
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
  var SAFE_CASE_ID3 = /^[\x2D0-9A-Z_]{1,40}$/;
  function runMimeFallbackDeviceCheck(_0) {
    return __async(this, arguments, function (_ref1) {
      var testCaseId = _ref1.testCaseId,
        sourceUri = _ref1.sourceUri,
        maxSizeBytes = _ref1.maxSizeBytes,
        readerSafetyLimitBytes = _ref1.readerSafetyLimitBytes,
        context = _ref1.context,
        contentResolver = _ref1.contentResolver,
        parseUri = _ref1.parseUri,
        javaBridge = _ref1.javaBridge,
        _ref1$isFileUriApprov = _ref1.isFileUriApproved,
        isFileUriApproved = _ref1$isFileUriApprov === void 0 ? function () {
          return false;
        } : _ref1$isFileUriApprov,
        openFileReadOnly = _ref1.openFileReadOnly,
        _ref1$reportMetadata = _ref1.reportMetadata,
        reportMetadata = _ref1$reportMetadata === void 0 ? function () {} : _ref1$reportMetadata;
      return _regenerator().m(function _callee11() {
        var record, _a, reader, evidenceReader, result, _t14;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              validateHarnessInputs2({
                testCaseId: testCaseId,
                reportMetadata: reportMetadata
              });
              _context11.p = 1;
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
                  return __async(this, null, _regenerator().m(function _callee10() {
                    var result2;
                    return _regenerator().w(function (_context10) {
                      while (1) switch (_context10.n) {
                        case 0:
                          _context10.n = 1;
                          return reader.read(value);
                        case 1:
                          result2 = _context10.v;
                          return _context10.a(2, Object.freeze({
                            bytes: result2.bytes,
                            mimeType: void 0
                          }));
                      }
                    }, _callee10);
                  }));
                }
              });
              _context11.n = 2;
              return prepareImageInput({
                sourceUri: sourceUri,
                maxSizeBytes: maxSizeBytes,
                reader: evidenceReader,
                isFileUriApproved: isFileUriApproved
              });
            case 2:
              result = _context11.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "PASS",
                mimeType: result.mimeType,
                sizeBytes: result.sizeBytes
              });
              _context11.n = 4;
              break;
            case 3:
              _context11.p = 3;
              _t14 = _context11.v;
              record = Object.freeze({
                testCaseId: testCaseId,
                status: "FAIL",
                errorCode: PUBLIC_ERROR_CODES4.has(_t14 == null ? void 0 : _t14.code) ? _t14.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
              });
            case 4:
              reportMetadata(record);
              return _context11.a(2, record);
          }
        }, _callee11, null, [[1, 3]]);
      })();
    });
  }
  function validateHarnessInputs2(_ref10) {
    var testCaseId = _ref10.testCaseId,
      reportMetadata = _ref10.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID3.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var PUBLIC_ERROR_CODES5 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  function runPortableSizeOverflowDeviceCheck(_a) {
    return __async(this, null, _regenerator().m(function _callee12() {
      var _b, expectedSizeBytes, maxSizeBytes, readerSafetyLimitBytes, _b$reportMetadata2, reportMetadata, readerOptions, candidate, record;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            _b = _a, expectedSizeBytes = _b.expectedSizeBytes, maxSizeBytes = _b.maxSizeBytes, readerSafetyLimitBytes = _b.readerSafetyLimitBytes, _b$reportMetadata2 = _b.reportMetadata, reportMetadata = _b$reportMetadata2 === void 0 ? function () {} : _b$reportMetadata2, readerOptions = __objRest(_b, ["expectedSizeBytes", "maxSizeBytes", "readerSafetyLimitBytes", "reportMetadata"]);
            validateLimits2({
              expectedSizeBytes: expectedSizeBytes,
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: reportMetadata
            });
            _context12.n = 1;
            return runImageReaderDeviceCheck(__spreadProps(__spreadValues({}, readerOptions), {
              maxSizeBytes: maxSizeBytes,
              readerSafetyLimitBytes: readerSafetyLimitBytes,
              reportMetadata: function reportMetadata() {}
            }));
          case 1:
            candidate = _context12.v;
            record = normalizeRecord2({
              candidate: candidate,
              testCaseId: readerOptions.testCaseId
            });
            reportMetadata(record);
            return _context12.a(2, record);
        }
      }, _callee12);
    }));
  }
  function normalizeRecord2(_ref11) {
    var candidate = _ref11.candidate,
      testCaseId = _ref11.testCaseId;
    var status = safelyReadProperty3(candidate, "status");
    var errorCode = safelyReadProperty3(candidate, "errorCode");
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: status === "FAIL" && PUBLIC_ERROR_CODES5.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
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
  function validateLimits2(_ref12) {
    var expectedSizeBytes = _ref12.expectedSizeBytes,
      maxSizeBytes = _ref12.maxSizeBytes,
      readerSafetyLimitBytes = _ref12.readerSafetyLimitBytes,
      reportMetadata = _ref12.reportMetadata;
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
  var PUBLIC_ERROR_CODES6 = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var SAFE_CASE_ID4 = /^[\x2D0-9A-Z_]{1,40}$/;
  var SAFE_MIME_TYPE2 = /^image\/[\+\x2D\.0-9a-z]+$/;
  function runResolverMimeDeviceCheck(_0) {
    return __async(this, arguments, function (_ref13) {
      var testCaseId = _ref13.testCaseId,
        sourceUri = _ref13.sourceUri,
        expectedMimeType = _ref13.expectedMimeType,
        maxSizeBytes = _ref13.maxSizeBytes,
        readerSafetyLimitBytes = _ref13.readerSafetyLimitBytes,
        context = _ref13.context,
        contentResolver = _ref13.contentResolver,
        parseUri = _ref13.parseUri,
        javaBridge = _ref13.javaBridge,
        _ref13$isFileUriAppro = _ref13.isFileUriApproved,
        isFileUriApproved = _ref13$isFileUriAppro === void 0 ? function () {
          return false;
        } : _ref13$isFileUriAppro,
        openFileReadOnly = _ref13.openFileReadOnly,
        _ref13$reportMetadata = _ref13.reportMetadata,
        reportMetadata = _ref13$reportMetadata === void 0 ? function () {} : _ref13$reportMetadata;
      return _regenerator().m(function _callee13() {
        var record, reader, result, _t15, _t16;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              validateInputs({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                maxSizeBytes: maxSizeBytes,
                reportMetadata: reportMetadata
              });
              _context13.p = 1;
              reader = createAutoJs6AndroidImageReader({
                context: context,
                contentResolver: contentResolver,
                parseUri: parseUri,
                javaBridge: javaBridge,
                isFileUriApproved: isFileUriApproved,
                openFileReadOnly: openFileReadOnly,
                readerSafetyLimitBytes: readerSafetyLimitBytes
              });
              _context13.n = 2;
              return reader.canAccess(sourceUri);
            case 2:
              _t15 = _context13.v;
              if (!(_t15 !== true)) {
                _context13.n = 3;
                break;
              }
              record = failure2(testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
              _context13.n = 5;
              break;
            case 3:
              _context13.n = 4;
              return reader.read(sourceUri);
            case 4:
              result = _context13.v;
              record = normalizeReaderResult({
                testCaseId: testCaseId,
                expectedMimeType: expectedMimeType,
                maxSizeBytes: maxSizeBytes,
                result: result
              });
            case 5:
              _context13.n = 7;
              break;
            case 6:
              _context13.p = 6;
              _t16 = _context13.v;
              record = failure2(testCaseId, normalizeErrorCode(_t16));
            case 7:
              reportMetadata(record);
              return _context13.a(2, record);
          }
        }, _callee13, null, [[1, 6]]);
      })();
    });
  }
  function normalizeReaderResult(_ref14) {
    var testCaseId = _ref14.testCaseId,
      expectedMimeType = _ref14.expectedMimeType,
      maxSizeBytes = _ref14.maxSizeBytes,
      result = _ref14.result;
    var bytes = safelyReadProperty4(result, "bytes");
    var reportedMimeType = safelyReadProperty4(result, "mimeType");
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
  function normalizeErrorCode(error) {
    var code = safelyReadProperty4(error, "code");
    if (PUBLIC_ERROR_CODES6.has(code)) {
      return code;
    }
    var classification = safelyReadProperty4(error, "classification");
    if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
      return IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED;
    }
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function failure2(testCaseId, errorCode) {
    return Object.freeze({
      testCaseId: testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES6.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED
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
  function validateInputs(_ref15) {
    var testCaseId = _ref15.testCaseId,
      expectedMimeType = _ref15.expectedMimeType,
      maxSizeBytes = _ref15.maxSizeBytes,
      reportMetadata = _ref15.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID4.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof expectedMimeType !== "string" || !SAFE_MIME_TYPE2.test(expectedMimeType) || normalizeMimeType(expectedMimeType) !== expectedMimeType) {
      throw new TypeError("expectedMimeType must be a normalized image MIME");
    }
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
    if (typeof reportMetadata !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var MAX_SIZE_BYTES = 10 * 1024 * 1024;
  var READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
  var UI_HEARTBEAT_TIMEOUT_MILLIS = 1e3;
  var CHECK_TIMEOUT_MILLIS = 2e4;
  function runAutoJs6FormatCheck(formatCase, injectedRuntime) {
    var runtime = injectedRuntime != null ? injectedRuntime : (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object" ? globalThis : Function("return this")();
    return runFormatCheck(formatCase, {
      showInstructions: function showInstructions(_ref16) {
        var title = _ref16.title,
          instructionText = _ref16.instructionText;
        return runtime.dialogs.alert(title, instructionText);
      },
      pickSingleImage: function pickSingleImage(_ref17) {
        var pickerMimeType = _ref17.pickerMimeType,
          requestCode = _ref17.requestCode;
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
  function _pickSingleImage(runtime, pickerMimeType, requestCode) {
    return new Promise(function (resolve) {
      var settled = false;
      var _listener = function listener(receivedRequestCode, resultCode, data) {
        if (receivedRequestCode !== requestCode || settled) {
          return;
        }
        settled = true;
        removeActivityResultListener(runtime, _listener);
        if (resultCode !== runtime.android.app.Activity.RESULT_OK || data == null || typeof data.getData !== "function") {
          resolve(null);
          return;
        }
        var uri = data.getData();
        resolve(uri == null ? null : String(uri.toString()));
      };
      runtime.ui.emitter.on("activity_result", _listener);
      try {
        var intent = new runtime.android.content.Intent(runtime.android.content.Intent.ACTION_GET_CONTENT);
        intent.setType(pickerMimeType);
        intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
        runtime.activity.startActivityForResult(intent, requestCode);
      } catch (e) {
        settled = true;
        removeActivityResultListener(runtime, _listener);
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
  void runAutoJs6FormatCheck(D04_FORMAT_CHECK_CASE);
})();
