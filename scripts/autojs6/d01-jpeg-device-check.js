"ui";
/* GENERATED: non-production AutoJs6 D01 device-verification support only. */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
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
  var D01_TEST_CASE_ID = "D01_JPEG";
  var PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  var CONTENT_URI = /^content:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/;
  function runD01OneClick(_0) {
    return __async(this, arguments, function (_ref2) {
      var showInstructions2 = _ref2.showInstructions,
        pickSingleJpeg2 = _ref2.pickSingleJpeg,
        executeOffUiThread2 = _ref2.executeOffUiThread,
        prepareSelectedImage2 = _ref2.prepareSelectedImage,
        reportMetadata2 = _ref2.reportMetadata;
      return _regenerator().m(function _callee5() {
        var record, sourceUri, execution, _t7;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              validateDependencies({
                showInstructions: showInstructions2,
                pickSingleJpeg: pickSingleJpeg2,
                executeOffUiThread: executeOffUiThread2,
                prepareSelectedImage: prepareSelectedImage2,
                reportMetadata: reportMetadata2
              });
              _context5.p = 1;
              _context5.n = 2;
              return showInstructions2();
            case 2:
              _context5.n = 3;
              return pickSingleJpeg2();
            case 3:
              sourceUri = _context5.v;
              if (!(typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri))) {
                _context5.n = 4;
                break;
              }
              record = failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, true);
              _context5.n = 6;
              break;
            case 4:
              _context5.n = 5;
              return executeOffUiThread2(function () {
                return prepareSelectedImage2(sourceUri);
              });
            case 5:
              execution = _context5.v;
              record = normalizeExecution(execution);
            case 6:
              _context5.n = 8;
              break;
            case 7:
              _context5.p = 7;
              _t7 = _context5.v;
              record = failure(publicCode(_t7), false);
            case 8:
              reportMetadata2(record);
              return _context5.a(2, record);
          }
        }, _callee5, null, [[1, 7]]);
      })();
    });
  }
  function normalizeExecution(execution) {
    if (!execution || execution.uiResponsive !== true) {
      return failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, false);
    }
    var result = execution.value;
    if ((result == null ? void 0 : result.status) === "PASS" && result.mimeType === "image/jpeg" && Number.isSafeInteger(result.sizeBytes) && result.sizeBytes > 0) {
      return Object.freeze({
        testCaseId: D01_TEST_CASE_ID,
        status: "PASS",
        mimeType: "image/jpeg",
        sizeBytes: result.sizeBytes,
        uiResponsive: true
      });
    }
    return failure((result == null ? void 0 : result.status) === "FAIL" ? publicCode(result) : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, true);
  }
  function failure(errorCode, uiResponsive) {
    return Object.freeze({
      testCaseId: D01_TEST_CASE_ID,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES.has(errorCode) ? errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      uiResponsive: uiResponsive === true
    });
  }
  function publicCode(value) {
    return PUBLIC_ERROR_CODES.has(value == null ? void 0 : value.code) ? value.code : PUBLIC_ERROR_CODES.has(value == null ? void 0 : value.errorCode) ? value.errorCode : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function validateDependencies(dependencies) {
    for (var _i = 0, _Object$entries = Object.entries(dependencies); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        name = _Object$entries$_i[0],
        dependency = _Object$entries$_i[1];
      if (typeof dependency !== "function") {
        throw new TypeError("".concat(name, " must be a function"));
      }
    }
  }
  var DEFAULT_CHUNK_SIZE_BYTES = 64 * 1024;
  var DEFAULT_MAX_ZERO_LENGTH_READS = 3;
  var CONTENT_SCHEME = "content";
  var FILE_SCHEME = "file";
  function createAutoJs6AndroidImageReader(_ref3) {
    var context = _ref3.context,
      contentResolver = _ref3.contentResolver,
      parseUri = _ref3.parseUri,
      javaBridge = _ref3.javaBridge,
      _ref3$isFileUriApprov = _ref3.isFileUriApproved,
      isFileUriApproved = _ref3$isFileUriApprov === void 0 ? function () {
        return false;
      } : _ref3$isFileUriApprov,
      openFileReadOnly = _ref3.openFileReadOnly,
      readerSafetyLimitBytes = _ref3.readerSafetyLimitBytes,
      _ref3$chunkSizeBytes = _ref3.chunkSizeBytes,
      chunkSizeBytes = _ref3$chunkSizeBytes === void 0 ? DEFAULT_CHUNK_SIZE_BYTES : _ref3$chunkSizeBytes,
      _ref3$maxZeroLengthRe = _ref3.maxZeroLengthReads,
      maxZeroLengthReads = _ref3$maxZeroLengthRe === void 0 ? DEFAULT_MAX_ZERO_LENGTH_READS : _ref3$maxZeroLengthRe,
      _ref3$logger = _ref3.logger,
      logger = _ref3$logger === void 0 ? createNoopLogger() : _ref3$logger;
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
  function validateDependencies2(_ref4) {
    var resolver = _ref4.resolver,
      parseUri = _ref4.parseUri,
      javaBridge = _ref4.javaBridge,
      readerSafetyLimitBytes = _ref4.readerSafetyLimitBytes,
      chunkSizeBytes = _ref4.chunkSizeBytes,
      maxZeroLengthReads = _ref4.maxZeroLengthReads;
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
    return __async(this, arguments, function (_ref5) {
      var sourceUri = _ref5.sourceUri,
        parseUri = _ref5.parseUri,
        isFileUriApproved = _ref5.isFileUriApproved,
        requireFileOpener = _ref5.requireFileOpener;
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
  function openSourceStream(_ref6) {
    var source = _ref6.source,
      resolver = _ref6.resolver,
      openFileReadOnly = _ref6.openFileReadOnly;
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
  function readCompleteStream(_ref7) {
    var stream = _ref7.stream,
      readBuffer = _ref7.readBuffer,
      toUint8Array = _ref7.toUint8Array,
      readerSafetyLimitBytes = _ref7.readerSafetyLimitBytes,
      maxZeroLengthReads = _ref7.maxZeroLengthReads;
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
    var _iterator = _createForOfIteratorHelper(chunks),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var chunk = _step.value;
        result.set(chunk, offset);
        offset += chunk.byteLength;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
  var SAFE_CASE_ID = /^[\x2D0-9A-Z_]{1,40}$/;
  function runImageReaderDeviceCheck(_0) {
    return __async(this, arguments, function (_ref8) {
      var testCaseId = _ref8.testCaseId,
        sourceUri = _ref8.sourceUri,
        maxSizeBytes = _ref8.maxSizeBytes,
        readerSafetyLimitBytes = _ref8.readerSafetyLimitBytes,
        context = _ref8.context,
        contentResolver = _ref8.contentResolver,
        parseUri = _ref8.parseUri,
        javaBridge = _ref8.javaBridge,
        _ref8$isFileUriApprov = _ref8.isFileUriApproved,
        isFileUriApproved = _ref8$isFileUriApprov === void 0 ? function () {
          return false;
        } : _ref8$isFileUriApprov,
        openFileReadOnly = _ref8.openFileReadOnly,
        _ref8$reportMetadata = _ref8.reportMetadata,
        reportMetadata2 = _ref8$reportMetadata === void 0 ? function () {} : _ref8$reportMetadata;
      return _regenerator().m(function _callee0() {
        var record, reader, result, _t13;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              validateHarnessInputs({
                testCaseId: testCaseId,
                reportMetadata: reportMetadata2
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
              reportMetadata2(record);
              return _context0.a(2, record);
          }
        }, _callee0, null, [[1, 3]]);
      })();
    });
  }
  function validateHarnessInputs(_ref9) {
    var testCaseId = _ref9.testCaseId,
      reportMetadata2 = _ref9.reportMetadata;
    if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
      throw new TypeError("testCaseId must be an opaque uppercase case ID");
    }
    if (typeof reportMetadata2 !== "function") {
      throw new TypeError("reportMetadata must be a function");
    }
  }
  var MAX_SIZE_BYTES = 10 * 1024 * 1024;
  var READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
  var PICK_REQUEST_CODE = 6101;
  var UI_HEARTBEAT_TIMEOUT_MILLIS = 1e3;
  var CHECK_TIMEOUT_MILLIS = 2e4;
  var runtime = (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object" ? globalThis : Function("return this")();
  void runD01OneClick({
    showInstructions: showInstructions,
    pickSingleJpeg: pickSingleJpeg,
    executeOffUiThread: executeOffUiThread,
    prepareSelectedImage: prepareSelectedImage,
    reportMetadata: reportMetadata
  });
  function showInstructions() {
    return runtime.dialogs.alert("D01 JPEG \u88DD\u7F6E\u9A57\u8B49", "\u8ACB\u5728\u7CFB\u7D71\u9078\u5716\u5668\u4E2D\u9078\u64C7\u4E00\u5F35\u4E0D\u542B\u500B\u8CC7\u3001\u4E14\u5C0F\u65BC 10 MiB \u7684 JPEG \u5716\u7247\u3002\u7A0B\u5F0F\u53EA\u6703\u986F\u793A MIME\u3001\u5927\u5C0F\u8207\u4ECB\u9762\u56DE\u61C9\u72C0\u614B\u3002");
  }
  function pickSingleJpeg() {
    return new Promise(function (resolve) {
      var settled = false;
      var _listener = function listener(requestCode, resultCode, data) {
        if (requestCode !== PICK_REQUEST_CODE || settled) {
          return;
        }
        settled = true;
        removeActivityResultListener(_listener);
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
        intent.setType("image/jpeg");
        intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
        runtime.activity.startActivityForResult(intent, PICK_REQUEST_CODE);
      } catch (e) {
        settled = true;
        removeActivityResultListener(_listener);
        resolve(null);
      }
    });
  }
  function removeActivityResultListener(listener) {
    if (typeof runtime.ui.emitter.removeListener === "function") {
      runtime.ui.emitter.removeListener("activity_result", listener);
    }
  }
  function executeOffUiThread(task) {
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
            var errorCode = publicErrorCode(error);
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
  function prepareSelectedImage(sourceUri) {
    var context = runtime.context;
    var contentResolver = context.getContentResolver();
    return runImageReaderDeviceCheck({
      testCaseId: D01_TEST_CASE_ID,
      sourceUri: sourceUri,
      maxSizeBytes: MAX_SIZE_BYTES,
      readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
      context: context,
      contentResolver: contentResolver,
      parseUri: function parseUri(value) {
        return runtime.android.net.Uri.parse(value);
      },
      javaBridge: {
        createByteArray: function createByteArray(size) {
          return runtime.util.java.array("byte", size);
        },
        classifyError: classifyError
      },
      isFileUriApproved: function isFileUriApproved() {
        return false;
      },
      reportMetadata: function reportMetadata() {}
    });
  }
  function classifyError(error) {
    var _a;
    try {
      var candidate = (_a = error == null ? void 0 : error.javaException) != null ? _a : error;
      return candidate instanceof runtime.java.lang.SecurityException ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    } catch (e) {
      return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
    }
  }
  function publicErrorCode(error) {
    return Object.values(IMAGE_INPUT_ERROR_CODES).includes(error == null ? void 0 : error.code) ? error.code : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
  function reportMetadata(record) {
    runtime.console.clear();
    runtime.console.show();
    runtime.console.info(JSON.stringify(record));
  }
})();
