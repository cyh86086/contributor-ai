"ui";
/* Contributor AI production entry point — Gemini provider. */
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  var DEFAULT_CHUNK_SIZE_BYTES = 64 * 1024;
  var DEFAULT_MAX_ZERO_LENGTH_READS = 3;
  var CONTENT_SCHEME = "content";
  var FILE_SCHEME = "file";
  function createAutoJs6AndroidImageReader(_ref2) {
    var context2 = _ref2.context,
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
    var resolver = resolveContentResolver(context2, contentResolver);
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
  function resolveContentResolver(context2, contentResolver) {
    if (contentResolver) {
      return contentResolver;
    }
    if (context2 && typeof context2.getContentResolver === "function") {
      return context2.getContentResolver();
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
  function classifyReaderFailure(error, classifyError) {
    var classification = safeClassifyError(classifyError, error);
    return readerFailure(classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED ? IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED : IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED);
  }
  function safeClassifyError(classifyError, error) {
    try {
      return classifyError(error);
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
  function createAutoJs6HttpCaller() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      httpClient = _ref7.httpClient,
      logger = _ref7.logger;
    validateHttpClient(httpClient);
    var safeLogger = normalizeLogger2(logger);
    return function httpCaller2() {
      return __async(this, arguments, function () {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          url = _ref8.url,
          method = _ref8.method,
          headers = _ref8.headers,
          body = _ref8.body,
          timeoutMs = _ref8.timeoutMs;
        return _regenerator().m(function _callee9() {
          var _a, options, response, status, responseBody, _t12;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                options = {
                  method: method != null ? method : "GET"
                };
                if (headers) {
                  options.headers = headers;
                }
                if (body !== void 0) {
                  options.body = body;
                }
                if (timeoutMs !== void 0) {
                  options.timeout = timeoutMs;
                }
                _context9.p = 1;
                response = httpClient.request(url, options);
                _context9.n = 3;
                break;
              case 2:
                _context9.p = 2;
                _t12 = _context9.v;
                safeLogger.warn("HTTP request failed.");
                throw new Error("The HTTP request failed.");
              case 3:
                if (!(!response || _typeof(response) !== "object")) {
                  _context9.n = 4;
                  break;
                }
                safeLogger.warn("HTTP response was invalid.");
                throw new Error("The HTTP response was invalid.");
              case 4:
                status = response.statusCode;
                if (Number.isSafeInteger(status)) {
                  _context9.n = 5;
                  break;
                }
                safeLogger.warn("HTTP response had no valid status.");
                throw new Error("The HTTP response had no valid status.");
              case 5:
                responseBody = "";
                if (typeof response.body === "function") {
                  try {
                    responseBody = response.body();
                  } catch (e) {
                    safeLogger.warn("HTTP response body extraction failed.");
                    responseBody = "";
                  }
                } else if (typeof response.body === "string") {
                  responseBody = response.body;
                }
                return _context9.a(2, {
                  status: status,
                  headers: (_a = response.headers) != null ? _a : {},
                  body: responseBody
                });
            }
          }, _callee9, null, [[1, 2]]);
        })();
      });
    };
  }
  function validateHttpClient(httpClient) {
    if (!httpClient || typeof httpClient.request !== "function") {
      throw new TypeError("httpClient must be an object with a request() method");
    }
  }
  function normalizeLogger2(logger) {
    if (logger && typeof logger.warn === "function") {
      return logger;
    }
    return {
      warn: function warn() {}
    };
  }
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
  var ERROR_MESSAGES2 = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED, "The HTTP request failed."), HTTP_ADAPTER_ERROR_CODES.HTTP_TIMEOUT, "The HTTP request timed out."), HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL, "The URL is invalid or not HTTPS."), HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD, "The HTTP method is not supported."), HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR, "The server returned an error."), HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR, "The request was invalid."), HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED, "Authentication failed."), HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN, "Access is forbidden."), HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED, "Rate limit exceeded."));
  var SUPPORTED_METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);
  var HttpAdapterError = function (_Error3) {
    "use strict";

    function HttpAdapterError(code) {
      var _this3;
      _classCallCheck(this, HttpAdapterError);
      _this3 = _callSuper(this, HttpAdapterError, [ERROR_MESSAGES2[code]]);
      _this3.name = "HttpAdapterError";
      _this3.code = code;
      return _this3;
    }
    _inherits(HttpAdapterError, _Error3);
    return _createClass(HttpAdapterError);
  }(_wrapNativeSuper(Error));
  function executeHttpRequest(_0) {
    return __async(this, arguments, function (_ref9) {
      var url = _ref9.url,
        method = _ref9.method,
        headers = _ref9.headers,
        body = _ref9.body,
        timeoutMs = _ref9.timeoutMs,
        httpCaller2 = _ref9.httpCaller;
      return _regenerator().m(function _callee0() {
        var rawResponse, _t13;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              validateUrl(url);
              validateMethod(method);
              validateHttpCaller(httpCaller2);
              validateTimeout(timeoutMs);
              _context0.p = 1;
              _context0.n = 2;
              return httpCaller2({
                url: url,
                method: method,
                headers: headers,
                body: body,
                timeoutMs: timeoutMs
              });
            case 2:
              rawResponse = _context0.v;
              _context0.n = 5;
              break;
            case 3:
              _context0.p = 3;
              _t13 = _context0.v;
              if (!(_t13 instanceof HttpAdapterError)) {
                _context0.n = 4;
                break;
              }
              throw _t13;
            case 4:
              throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
            case 5:
              return _context0.a(2, classifyHttpResponse(rawResponse));
          }
        }, _callee0, null, [[1, 3]]);
      })();
    });
  }
  function classifyHttpResponse(response) {
    if (!response || _typeof(response) !== "object") {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
    }
    var status = response.status,
      headers = response.headers,
      body = response.body;
    if (!Number.isSafeInteger(status) || status < 100 || status > 599) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_REQUEST_FAILED);
    }
    if (status === 401) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_AUTH_FAILED);
    }
    if (status === 403) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_FORBIDDEN);
    }
    if (status === 429) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_RATE_LIMITED);
    }
    if (status >= 500) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_SERVER_ERROR);
    }
    if (status >= 400) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_CLIENT_ERROR);
    }
    return {
      status: status,
      headers: headers != null ? headers : {},
      body: typeof body === "string" ? body : ""
    };
  }
  function validateUrl(url) {
    if (typeof url !== "string" || url.length === 0) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL);
    }
    if (!/^https:\/\/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/.test(url)) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_URL);
    }
  }
  function validateMethod(method) {
    if (typeof method !== "string" || !SUPPORTED_METHODS.has(method.toUpperCase())) {
      throw httpAdapterError(HTTP_ADAPTER_ERROR_CODES.HTTP_INVALID_METHOD);
    }
  }
  function validateHttpCaller(httpCaller2) {
    if (typeof httpCaller2 !== "function") {
      throw new TypeError("httpCaller must be a function");
    }
  }
  function validateTimeout(timeoutMs) {
    if (timeoutMs !== void 0) {
      if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
        throw new TypeError("timeoutMs must be a positive safe integer");
      }
    }
  }
  function httpAdapterError(code) {
    return new HttpAdapterError(code);
  }
  var ENGLISH_TEXT = /^[\x20-\x7E]+$/;
  var ENGLISH_KEYWORD = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  function validateVisionMetadata(value) {
    if (!value || _typeof(value) !== "object") {
      throw new TypeError("Vision metadata must be an object");
    }
    var description = value.description,
      keywords = value.keywords;
    if (typeof description !== "string" || description.length === 0 || description.length >= 2e3 || !ENGLISH_TEXT.test(description)) {
      throw new TypeError("Description must be non-empty English text under 2000 characters");
    }
    if (!Array.isArray(keywords) || keywords.length !== 7 || keywords.some(function (keyword) {
      return typeof keyword !== "string" || !ENGLISH_KEYWORD.test(keyword);
    })) {
      throw new TypeError("Keywords must contain exactly 7 English keywords");
    }
    return {
      description: description,
      keywords: _toConsumableArray(keywords)
    };
  }
  var VISION_PROVIDER_ERROR_CODES = Object.freeze({
    PROVIDER_RESPONSE_INVALID: "PROVIDER_RESPONSE_INVALID",
    PROVIDER_REQUEST_FAILED: "PROVIDER_REQUEST_FAILED",
    PROVIDER_AUTH_FAILED: "PROVIDER_AUTH_FAILED",
    PROVIDER_RATE_LIMITED: "PROVIDER_RATE_LIMITED",
    PROVIDER_UNAVAILABLE: "PROVIDER_UNAVAILABLE",
    IMAGE_TOO_LARGE_FOR_PROVIDER: "IMAGE_TOO_LARGE_FOR_PROVIDER"
  });
  var ERROR_MESSAGES3 = Object.freeze(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID, "The provider response does not match the required contract."), VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED, "The provider request failed."), VISION_PROVIDER_ERROR_CODES.PROVIDER_AUTH_FAILED, "The provider authentication failed."), VISION_PROVIDER_ERROR_CODES.PROVIDER_RATE_LIMITED, "The provider rate limit was exceeded."), VISION_PROVIDER_ERROR_CODES.PROVIDER_UNAVAILABLE, "The provider service is unavailable."), VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER, "The image exceeds the provider maximum size limit."));
  var VisionProviderError = function (_Error4) {
    "use strict";

    function VisionProviderError(code) {
      var _this4;
      _classCallCheck(this, VisionProviderError);
      _this4 = _callSuper(this, VisionProviderError, [ERROR_MESSAGES3[code]]);
      _this4.name = "VisionProviderError";
      _this4.code = code;
      return _this4;
    }
    _inherits(VisionProviderError, _Error4);
    return _createClass(VisionProviderError);
  }(_wrapNativeSuper(Error));
  function callVisionProvider(_0) {
    return __async(this, arguments, function (_ref0) {
      var imageBase64 = _ref0.imageBase64,
        mimeType = _ref0.mimeType,
        providerCaller2 = _ref0.providerCaller,
        maxImageBytes = _ref0.maxImageBytes;
      return _regenerator().m(function _callee1() {
        var rawResponse, normalized, _t14, _t15;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              validateImageBase64(imageBase64);
              validateMimeType(mimeType);
              validateProviderCaller(providerCaller2);
              validateMaxImageBytes(maxImageBytes);
              if (!(imageBase64.length * 0.75 > maxImageBytes)) {
                _context1.n = 1;
                break;
              }
              throw visionProviderError(VISION_PROVIDER_ERROR_CODES.IMAGE_TOO_LARGE_FOR_PROVIDER);
            case 1:
              _context1.p = 1;
              _context1.n = 2;
              return providerCaller2({
                imageBase64: imageBase64,
                mimeType: mimeType
              });
            case 2:
              rawResponse = _context1.v;
              _context1.n = 5;
              break;
            case 3:
              _context1.p = 3;
              _t14 = _context1.v;
              if (!(_t14 instanceof VisionProviderError)) {
                _context1.n = 4;
                break;
              }
              throw _t14;
            case 4:
              throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED);
            case 5:
              normalized = normalizeProviderResponse(rawResponse);
              _context1.p = 6;
              return _context1.a(2, validateVisionMetadata(normalized));
            case 7:
              _context1.p = 7;
              _t15 = _context1.v;
              throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID);
            case 8:
              return _context1.a(2);
          }
        }, _callee1, null, [[6, 7], [1, 3]]);
      })();
    });
  }
  function normalizeProviderResponse(value) {
    if (!value || _typeof(value) !== "object") {
      throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID);
    }
    var description = value.description,
      keywords = value.keywords;
    if (typeof description !== "string" || _typeof(keywords) !== "object") {
      throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_RESPONSE_INVALID);
    }
    return {
      description: description,
      keywords: keywords
    };
  }
  function validateImageBase64(imageBase64) {
    if (typeof imageBase64 !== "string" || imageBase64.length === 0 || imageBase64.startsWith("data:")) {
      throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED);
    }
  }
  function validateMimeType(mimeType) {
    if (typeof mimeType !== "string" || mimeType.length === 0) {
      throw visionProviderError(VISION_PROVIDER_ERROR_CODES.PROVIDER_REQUEST_FAILED);
    }
  }
  function validateProviderCaller(providerCaller2) {
    if (typeof providerCaller2 !== "function") {
      throw new TypeError("providerCaller must be a function");
    }
  }
  function validateMaxImageBytes(maxImageBytes) {
    if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
      throw new TypeError("maxImageBytes must be a positive safe integer");
    }
  }
  function visionProviderError(code) {
    return new VisionProviderError(code);
  }
  var DEFAULT_MODEL = "gemini-1.5-pro";
  var DEFAULT_BASE_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
  var PROMPT = ["Analyze this image for a microstock photo listing.", "Return a JSON object with exactly two fields:", '1. "description": an English description under 2000 characters', "   suitable for a microstock photo listing.", '2. "keywords": an array of exactly 7 English keywords.', "Return only the JSON object with no additional text."].join(" ");
  function createGeminiVisionCaller() {
    var _ref1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      httpCaller2 = _ref1.httpCaller,
      getApiKey = _ref1.getApiKey,
      _ref1$model = _ref1.model,
      model = _ref1$model === void 0 ? DEFAULT_MODEL : _ref1$model,
      _ref1$apiEndpoint = _ref1.apiEndpoint,
      apiEndpoint = _ref1$apiEndpoint === void 0 ? DEFAULT_BASE_ENDPOINT : _ref1$apiEndpoint;
    validateHttpCaller2(httpCaller2);
    validateGetApiKey(getApiKey);
    validateModel(model);
    validateEndpoint(apiEndpoint);
    return function providerCaller2(_0) {
      return __async(this, arguments, function (_ref10) {
        var imageBase64 = _ref10.imageBase64,
          mimeType = _ref10.mimeType;
        return _regenerator().m(function _callee10() {
          var apiKey, url, requestBody, httpResponse, _t16;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.p = _context10.n) {
              case 0:
                apiKey = retrieveApiKey(getApiKey);
                url = "".concat(apiEndpoint, "/").concat(model, ":generateContent?key=").concat(apiKey);
                requestBody = {
                  contents: [{
                    parts: [{
                      text: PROMPT
                    }, {
                      inline_data: {
                        mime_type: mimeType,
                        data: imageBase64
                      }
                    }]
                  }],
                  generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 1e3
                  }
                };
                _context10.p = 1;
                _context10.n = 2;
                return executeHttpRequest({
                  url: url,
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(requestBody),
                  httpCaller: httpCaller2
                });
              case 2:
                httpResponse = _context10.v;
                _context10.n = 5;
                break;
              case 3:
                _context10.p = 3;
                _t16 = _context10.v;
                if (!(_t16 instanceof VisionProviderError)) {
                  _context10.n = 4;
                  break;
                }
                throw _t16;
              case 4:
                throw mapHttpErrorToVisionError(_t16);
              case 5:
                return _context10.a(2, parseGeminiResponse(httpResponse.body));
            }
          }, _callee10, null, [[1, 3]]);
        })();
      });
    };
  }
  function parseGeminiResponse(body) {
    var parsed;
    try {
      parsed = JSON.parse(body);
    } catch (e) {
      throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
    }
    var text = extractText(parsed);
    if (typeof text !== "string" || text.length === 0) {
      throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
    }
    var metadata;
    try {
      metadata = JSON.parse(text);
    } catch (e) {
      throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
    }
    if (!metadata || _typeof(metadata) !== "object" || typeof metadata.description !== "string" || !Array.isArray(metadata.keywords)) {
      throw new VisionProviderError("PROVIDER_RESPONSE_INVALID");
    }
    return {
      description: metadata.description,
      keywords: metadata.keywords
    };
  }
  function extractText(response) {
    if (!response || !Array.isArray(response.candidates) || response.candidates.length === 0) {
      return void 0;
    }
    var firstCandidate = response.candidates[0];
    if (!firstCandidate || !firstCandidate.content || !Array.isArray(firstCandidate.content.parts) || firstCandidate.content.parts.length === 0) {
      return void 0;
    }
    var firstPart = firstCandidate.content.parts[0];
    if (!firstPart || typeof firstPart.text !== "string") {
      return void 0;
    }
    return firstPart.text;
  }
  function mapHttpErrorToVisionError(error) {
    if (error instanceof HttpAdapterError) {
      switch (error.code) {
        case "HTTP_AUTH_FAILED":
        case "HTTP_FORBIDDEN":
          return new VisionProviderError("PROVIDER_AUTH_FAILED");
        case "HTTP_RATE_LIMITED":
          return new VisionProviderError("PROVIDER_RATE_LIMITED");
        case "HTTP_SERVER_ERROR":
          return new VisionProviderError("PROVIDER_UNAVAILABLE");
        case "HTTP_REQUEST_FAILED":
          return new VisionProviderError("PROVIDER_REQUEST_FAILED");
        default:
          return new VisionProviderError("PROVIDER_REQUEST_FAILED");
      }
    }
    return new VisionProviderError("PROVIDER_REQUEST_FAILED");
  }
  function retrieveApiKey(getApiKey) {
    var key;
    try {
      key = getApiKey();
    } catch (e) {
      throw new VisionProviderError("PROVIDER_AUTH_FAILED");
    }
    if (typeof key !== "string" || key.length === 0) {
      throw new VisionProviderError("PROVIDER_AUTH_FAILED");
    }
    return key;
  }
  function validateHttpCaller2(httpCaller2) {
    if (typeof httpCaller2 !== "function") {
      throw new TypeError("httpCaller must be a function");
    }
  }
  function validateGetApiKey(getApiKey) {
    if (typeof getApiKey !== "function") {
      throw new TypeError("getApiKey must be a function");
    }
  }
  function validateModel(model) {
    if (typeof model !== "string" || model.length === 0) {
      throw new TypeError("model must be a non-empty string");
    }
  }
  function validateEndpoint(apiEndpoint) {
    if (typeof apiEndpoint !== "string" || apiEndpoint.length === 0) {
      throw new TypeError("apiEndpoint must be a non-empty string");
    }
  }
  var DEFAULT_WAIT_MS = 1e4;
  var DEFAULT_PACKAGE_NAME = "com.contributor.app";
  function createContributorUIAdapter() {
    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      appLauncher = _ref11.appLauncher,
      findDescription = _ref11.findDescription,
      findKeywords = _ref11.findKeywords,
      _ref11$packageName = _ref11.packageName,
      packageName = _ref11$packageName === void 0 ? DEFAULT_PACKAGE_NAME : _ref11$packageName,
      _ref11$waitMs = _ref11.waitMs,
      waitMs = _ref11$waitMs === void 0 ? DEFAULT_WAIT_MS : _ref11$waitMs;
    validateAppLauncher(appLauncher);
    validateFinder(findDescription, "findDescription");
    validateFinder(findKeywords, "findKeywords");
    validateWaitMs(waitMs);
    return function uiAdapter2(_0) {
      return __async(this, arguments, function (_ref12) {
        var description = _ref12.description,
          keywords = _ref12.keywords;
        return _regenerator().m(function _callee11() {
          var descField, kwField, keywordsText, _t17, _t18, _t19, _t20, _t21;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.p = _context11.n) {
              case 0:
                _context11.p = 0;
                appLauncher(packageName);
                _context11.n = 2;
                break;
              case 1:
                _context11.p = 1;
                _t17 = _context11.v;
                throw new Error("Could not launch the Contributor app.");
              case 2:
                _context11.p = 2;
                _context11.n = 3;
                return findDescription(waitMs);
              case 3:
                descField = _context11.v;
                _context11.n = 5;
                break;
              case 4:
                _context11.p = 4;
                _t18 = _context11.v;
                throw new Error("Could not find the Description field.");
              case 5:
                if (!(!descField || typeof descField.setText !== "function")) {
                  _context11.n = 6;
                  break;
                }
                throw new Error("The Description field does not support text entry.");
              case 6:
                _context11.p = 6;
                descField.setText(description);
                _context11.n = 8;
                break;
              case 7:
                _context11.p = 7;
                _t19 = _context11.v;
                throw new Error("Could not enter the description.");
              case 8:
                _context11.p = 8;
                _context11.n = 9;
                return findKeywords(waitMs);
              case 9:
                kwField = _context11.v;
                _context11.n = 11;
                break;
              case 10:
                _context11.p = 10;
                _t20 = _context11.v;
                throw new Error("Could not find the Keywords field.");
              case 11:
                if (!(!kwField || typeof kwField.setText !== "function")) {
                  _context11.n = 12;
                  break;
                }
                throw new Error("The Keywords field does not support text entry.");
              case 12:
                keywordsText = Array.isArray(keywords) ? keywords.join(", ") : String(keywords);
                _context11.p = 13;
                kwField.setText(keywordsText);
                _context11.n = 15;
                break;
              case 14:
                _context11.p = 14;
                _t21 = _context11.v;
                throw new Error("Could not enter the keywords.");
              case 15:
                return _context11.a(2);
            }
          }, _callee11, null, [[13, 14], [8, 10], [6, 7], [2, 4], [0, 1]]);
        })();
      });
    };
  }
  function validateAppLauncher(appLauncher) {
    if (typeof appLauncher !== "function") {
      throw new TypeError("appLauncher must be a function");
    }
  }
  function validateFinder(finder, name) {
    if (typeof finder !== "function") {
      throw new TypeError("".concat(name, " must be a function"));
    }
  }
  function validateWaitMs(waitMs) {
    if (!Number.isSafeInteger(waitMs) || waitMs <= 0) {
      throw new TypeError("waitMs must be a positive safe integer");
    }
  }
  function processQueue(_0) {
    return __async(this, arguments, function (_ref13) {
      var items = _ref13.items,
        processor = _ref13.processor,
        _ref13$failFast = _ref13.failFast,
        failFast = _ref13$failFast === void 0 ? false : _ref13$failFast;
      return _regenerator().m(function _callee12() {
        var _a, results, errors, succeeded, failed, i, result, _t22;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              validateQueueInput({
                items: items,
                processor: processor
              });
              results = [];
              errors = [];
              succeeded = 0;
              failed = 0;
              i = 0;
            case 1:
              if (!(i < items.length)) {
                _context12.n = 6;
                break;
              }
              _context12.p = 2;
              _context12.n = 3;
              return processor(items[i]);
            case 3:
              result = _context12.v;
              results.push(result);
              succeeded++;
              _context12.n = 5;
              break;
            case 4:
              _context12.p = 4;
              _t22 = _context12.v;
              failed++;
              errors.push({
                index: i,
                error: _t22,
                code: (_a = _t22 == null ? void 0 : _t22.code) != null ? _a : null
              });
              if (!failFast) {
                _context12.n = 5;
                break;
              }
              return _context12.a(3, 6);
            case 5:
              i++;
              _context12.n = 1;
              break;
            case 6:
              return _context12.a(2, {
                totalItems: items.length,
                processed: succeeded + failed,
                succeeded: succeeded,
                failed: failed,
                results: results,
                errors: errors
              });
          }
        }, _callee12, null, [[2, 4]]);
      })();
    });
  }
  function validateQueueInput(_ref14) {
    var items = _ref14.items,
      processor = _ref14.processor;
    if (!Array.isArray(items)) {
      throw new TypeError("items must be an array");
    }
    if (typeof processor !== "function") {
      throw new TypeError("processor must be a function");
    }
  }
  function processImageWithAI(_0) {
    return __async(this, arguments, function (_ref15) {
      var sourceUri = _ref15.sourceUri,
        mimeType = _ref15.mimeType,
        sizeBytes = _ref15.sizeBytes,
        imageBase64 = _ref15.imageBase64,
        providerCaller2 = _ref15.providerCaller,
        maxImageBytes = _ref15.maxImageBytes;
      return _regenerator().m(function _callee13() {
        var result;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              validateImageInput({
                sourceUri: sourceUri,
                mimeType: mimeType,
                sizeBytes: sizeBytes,
                imageBase64: imageBase64
              });
              _context13.n = 1;
              return callVisionProvider({
                imageBase64: imageBase64,
                mimeType: mimeType,
                providerCaller: providerCaller2,
                maxImageBytes: maxImageBytes
              });
            case 1:
              result = _context13.v;
              return _context13.a(2, result);
          }
        }, _callee13);
      })();
    });
  }
  function validateImageInput(_ref16) {
    var sourceUri = _ref16.sourceUri,
      mimeType = _ref16.mimeType,
      sizeBytes = _ref16.sizeBytes,
      imageBase64 = _ref16.imageBase64;
    if (typeof sourceUri !== "string" || sourceUri.length === 0) {
      throw new TypeError("sourceUri must be a non-empty string");
    }
    if (typeof mimeType !== "string" || mimeType.length === 0) {
      throw new TypeError("mimeType must be a non-empty string");
    }
    if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0) {
      throw new TypeError("sizeBytes must be a positive safe integer");
    }
    if (typeof imageBase64 !== "string" || imageBase64.length === 0 || imageBase64.startsWith("data:")) {
      throw new TypeError("imageBase64 must be a non-empty string without data URL prefix");
    }
  }
  function orchestrateBatchAI(_0) {
    return __async(this, arguments, function (_ref17) {
      var images = _ref17.images,
        providerCaller2 = _ref17.providerCaller,
        maxImageBytes = _ref17.maxImageBytes,
        _ref17$failFast = _ref17.failFast,
        failFast = _ref17$failFast === void 0 ? false : _ref17$failFast;
      return _regenerator().m(function _callee14() {
        var processor, queueResult;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              validateOrchestratorInput({
                images: images,
                providerCaller: providerCaller2,
                maxImageBytes: maxImageBytes
              });
              processor = function processor(image) {
                return processImageWithAI({
                  sourceUri: image.sourceUri,
                  mimeType: image.mimeType,
                  sizeBytes: image.sizeBytes,
                  imageBase64: image.imageBase64,
                  providerCaller: providerCaller2,
                  maxImageBytes: maxImageBytes
                });
              };
              _context14.n = 1;
              return processQueue({
                items: images,
                processor: processor,
                failFast: failFast
              });
            case 1:
              queueResult = _context14.v;
              return _context14.a(2, {
                totalImages: queueResult.totalItems,
                processed: queueResult.processed,
                succeeded: queueResult.succeeded,
                failed: queueResult.failed,
                results: queueResult.results,
                errors: queueResult.errors
              });
          }
        }, _callee14);
      })();
    });
  }
  function validateOrchestratorInput(_ref18) {
    var images = _ref18.images,
      providerCaller2 = _ref18.providerCaller,
      maxImageBytes = _ref18.maxImageBytes;
    if (!Array.isArray(images)) {
      throw new TypeError("images must be an array");
    }
    if (typeof providerCaller2 !== "function") {
      throw new TypeError("providerCaller must be a function");
    }
    if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
      throw new TypeError("maxImageBytes must be a positive safe integer");
    }
  }
  var CONTRIBUTOR_ENGINE_ERROR_CODES = Object.freeze({
    FIELD_ENTRY_FAILED: "FIELD_ENTRY_FAILED",
    METADATA_INVALID: "METADATA_INVALID"
  });
  var ERROR_MESSAGES4 = Object.freeze(_defineProperty(_defineProperty({}, CONTRIBUTOR_ENGINE_ERROR_CODES.FIELD_ENTRY_FAILED, "The UI adapter could not populate the Contributor app fields."), CONTRIBUTOR_ENGINE_ERROR_CODES.METADATA_INVALID, "The metadata does not pass validation."));
  var ContributorEngineError = function (_Error5) {
    "use strict";

    function ContributorEngineError(code) {
      var _this5;
      _classCallCheck(this, ContributorEngineError);
      _this5 = _callSuper(this, ContributorEngineError, [ERROR_MESSAGES4[code]]);
      _this5.name = "ContributorEngineError";
      _this5.code = code;
      return _this5;
    }
    _inherits(ContributorEngineError, _Error5);
    return _createClass(ContributorEngineError);
  }(_wrapNativeSuper(Error));
  function enterContributorMetadata(_0) {
    return __async(this, arguments, function (_ref19) {
      var description = _ref19.description,
        keywords = _ref19.keywords,
        uiAdapter2 = _ref19.uiAdapter;
      return _regenerator().m(function _callee15() {
        var validated, _t23, _t24;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              validateUiAdapter(uiAdapter2);
              _context15.p = 1;
              validated = validateVisionMetadata({
                description: description,
                keywords: keywords
              });
              _context15.n = 3;
              break;
            case 2:
              _context15.p = 2;
              _t23 = _context15.v;
              throw new ContributorEngineError(CONTRIBUTOR_ENGINE_ERROR_CODES.METADATA_INVALID);
            case 3:
              _context15.p = 3;
              _context15.n = 4;
              return uiAdapter2({
                description: validated.description,
                keywords: validated.keywords
              });
            case 4:
              _context15.n = 6;
              break;
            case 5:
              _context15.p = 5;
              _t24 = _context15.v;
              throw new ContributorEngineError(CONTRIBUTOR_ENGINE_ERROR_CODES.FIELD_ENTRY_FAILED);
            case 6:
              return _context15.a(2, {
                entered: true,
                pendingReview: true
              });
          }
        }, _callee15, null, [[3, 5], [1, 2]]);
      })();
    });
  }
  function validateUiAdapter(uiAdapter2) {
    if (typeof uiAdapter2 !== "function") {
      throw new TypeError("uiAdapter must be a function");
    }
  }
  function createLauncher(_ref20) {
    var imageReader2 = _ref20.imageReader,
      providerCaller2 = _ref20.providerCaller,
      uiAdapter2 = _ref20.uiAdapter,
      maxImageBytes = _ref20.maxImageBytes,
      maxSizeBytes = _ref20.maxSizeBytes,
      _ref20$failFast = _ref20.failFast,
      failFast = _ref20$failFast === void 0 ? false : _ref20$failFast;
    validateLauncherConfig({
      imageReader: imageReader2,
      providerCaller: providerCaller2,
      uiAdapter: uiAdapter2,
      maxImageBytes: maxImageBytes,
      maxSizeBytes: maxSizeBytes
    });
    function run(images) {
      return __async(this, null, _regenerator().m(function _callee16() {
        var _a, batchResult, contributorResults, contributorErrors, _iterator2, _step2, result, entry, _t25, _t26;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              if (Array.isArray(images)) {
                _context16.n = 1;
                break;
              }
              throw new TypeError("images must be an array");
            case 1:
              _context16.n = 2;
              return orchestrateBatchAI({
                images: images,
                providerCaller: providerCaller2,
                maxImageBytes: maxImageBytes,
                failFast: failFast
              });
            case 2:
              batchResult = _context16.v;
              contributorResults = [];
              contributorErrors = [];
              _iterator2 = _createForOfIteratorHelper(batchResult.results);
              _context16.p = 3;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context16.n = 9;
                break;
              }
              result = _step2.value;
              _context16.p = 5;
              _context16.n = 6;
              return enterContributorMetadata({
                description: result.description,
                keywords: result.keywords,
                uiAdapter: uiAdapter2
              });
            case 6:
              entry = _context16.v;
              contributorResults.push(entry);
              _context16.n = 8;
              break;
            case 7:
              _context16.p = 7;
              _t25 = _context16.v;
              contributorErrors.push({
                error: _t25,
                code: (_a = _t25 == null ? void 0 : _t25.code) != null ? _a : null
              });
            case 8:
              _context16.n = 4;
              break;
            case 9:
              _context16.n = 11;
              break;
            case 10:
              _context16.p = 10;
              _t26 = _context16.v;
              _iterator2.e(_t26);
            case 11:
              _context16.p = 11;
              _iterator2.f();
              return _context16.f(11);
            case 12:
              return _context16.a(2, {
                totalImages: batchResult.totalImages,
                succeeded: batchResult.succeeded,
                failed: batchResult.failed + contributorErrors.length,
                results: contributorResults,
                errors: [].concat(_toConsumableArray(batchResult.errors), contributorErrors)
              });
          }
        }, _callee16, null, [[5, 7], [3, 10, 11, 12]]);
      }));
    }
    return {
      run: run
    };
  }
  function validateLauncherConfig(_ref21) {
    var imageReader2 = _ref21.imageReader,
      providerCaller2 = _ref21.providerCaller,
      uiAdapter2 = _ref21.uiAdapter,
      maxImageBytes = _ref21.maxImageBytes,
      maxSizeBytes = _ref21.maxSizeBytes;
    if (!imageReader2 || typeof imageReader2.read !== "function") {
      throw new TypeError("imageReader must be an object with a read() method");
    }
    if (typeof providerCaller2 !== "function") {
      throw new TypeError("providerCaller must be a function");
    }
    if (typeof uiAdapter2 !== "function") {
      throw new TypeError("uiAdapter must be a function");
    }
    if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
      throw new TypeError("maxImageBytes must be a positive safe integer");
    }
    if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
      throw new TypeError("maxSizeBytes must be a positive safe integer");
    }
  }
  var GEMINI_MODEL = "gemini-1.5-pro";
  var GEMINI_MAX_IMAGE_BYTES = 20 * 1024 * 1024;
  var PORTABLE_MAX_SIZE_BYTES = 20 * 1024 * 1024;
  var READER_SAFETY_LIMIT_BYTES = 50 * 1024 * 1024;
  var CONTRIBUTOR_PACKAGE_NAME = "com.contributor.app";
  var API_KEY_PATH = "/sdcard/contributor-ai/api-key.txt";
  function getGeminiApiKey() {
    var file = new java.io.File(API_KEY_PATH);
    if (!file.exists()) {
      throw new Error("API key file not found at ".concat(API_KEY_PATH, ". Please create it."));
    }
    var reader = new java.io.BufferedReader(new java.io.FileReader(file));
    try {
      var key = reader.readLine();
      if (key == null || key.trim().length === 0) {
        throw new Error("API key file is empty.");
      }
      return key.trim();
    } finally {
      reader.close();
    }
  }
  var imageReader = createAutoJs6AndroidImageReader({
    context: context,
    parseUri: function parseUri(uri) {
      return android.net.Uri.parse(uri);
    },
    javaBridge: {
      createByteArray: function createByteArray(size) {
        return new java.lang.Byte[size]();
      },
      toUint8Array: function toUint8Array(javaBytes, count) {
        var arr = new Uint8Array(count);
        for (var i = 0; i < count; i++) {
          arr[i] = javaBytes[i] & 255;
        }
        return arr;
      },
      classifyError: function classifyError(error) {
        var msg = String(error && error.message ? error.message : error);
        if (/denied|permission|security/i.test(msg)) {
          return "URI_ACCESS_DENIED";
        }
        return "IMAGE_READ_FAILED";
      }
    },
    openFileReadOnly: function openFileReadOnly(path) {
      var file = new java.io.File(path);
      if (!file.exists() || !file.canRead()) return null;
      return new java.io.FileInputStream(file);
    },
    readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES
  });
  var httpCaller = createAutoJs6HttpCaller({
    httpClient: http
  });
  var providerCaller = createGeminiVisionCaller({
    httpCaller: httpCaller,
    getApiKey: getGeminiApiKey,
    model: GEMINI_MODEL
  });
  var uiAdapter = createContributorUIAdapter({
    appLauncher: function appLauncher(pkg) {
      return app.launchApp(pkg);
    },
    findDescription: function findDescription(timeout) {
      return id("description").findOne(timeout);
    },
    findKeywords: function findKeywords(timeout) {
      return id("keywords").findOne(timeout);
    },
    packageName: CONTRIBUTOR_PACKAGE_NAME
  });
  var launcher = createLauncher({
    imageReader: imageReader,
    providerCaller: providerCaller,
    uiAdapter: uiAdapter,
    maxImageBytes: GEMINI_MAX_IMAGE_BYTES,
    maxSizeBytes: PORTABLE_MAX_SIZE_BYTES,
    failFast: false
  });
  var PICK_REQUEST_CODE = 1001;
  function main() {
    return __async(this, null, _regenerator().m(function _callee17() {
      var resultData, resultReceived, intent, waitThread, clipData, images, i, uri, imageInput, pipelineResult, _t27;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            toast("Contributor AI starting...");
            resultData = null;
            resultReceived = false;
            ui.emitter.on("activity_result", function (requestCode, resultCode, data) {
              if (requestCode === PICK_REQUEST_CODE && resultCode === -1) {
                resultData = data;
                resultReceived = true;
              }
            });
            intent = new android.content.Intent(android.content.Intent.ACTION_OPEN_DOCUMENT);
            intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
            intent.setType("image/*");
            intent.putExtra(android.content.Intent.EXTRA_ALLOW_MULTIPLE, java.lang.Boolean.TRUE);
            activity.startActivityForResult(intent, PICK_REQUEST_CODE);
            waitThread = threads.start(function () {
              var waited = 0;
              while (!resultReceived && waited < 12e4) {
                sleep(500);
                waited += 500;
              }
            });
            waitThread.join();
            if (!(!resultReceived || !resultData)) {
              _context17.n = 1;
              break;
            }
            toast("No images selected or timed out.");
            return _context17.a(2);
          case 1:
            clipData = resultData.getClipData();
            if (clipData) {
              _context17.n = 2;
              break;
            }
            toast("No images selected.");
            return _context17.a(2);
          case 2:
            images = [];
            i = 0;
          case 3:
            if (!(i < clipData.getItemCount())) {
              _context17.n = 8;
              break;
            }
            uri = clipData.getItemAt(i).getUri().toString();
            _context17.p = 4;
            _context17.n = 5;
            return prepareImageInput({
              sourceUri: uri,
              reader: imageReader,
              maxSizeBytes: PORTABLE_MAX_SIZE_BYTES
            });
          case 5:
            imageInput = _context17.v;
            images.push(imageInput);
            _context17.n = 7;
            break;
          case 6:
            _context17.p = 6;
            _t27 = _context17.v;
            console.warn("Failed to read image: ".concat(uri));
          case 7:
            i++;
            _context17.n = 3;
            break;
          case 8:
            if (!(images.length === 0)) {
              _context17.n = 9;
              break;
            }
            toast("No valid images to process.");
            return _context17.a(2);
          case 9:
            toast("Processing ".concat(images.length, " images..."));
            _context17.n = 10;
            return launcher.run(images);
          case 10:
            pipelineResult = _context17.v;
            toast("Done: ".concat(pipelineResult.succeeded, " succeeded, ").concat(pipelineResult.failed, " failed out of ").concat(pipelineResult.totalImages, " images."));
            if (pipelineResult.errors.length > 0) {
              console.warn("Errors:", JSON.stringify(pipelineResult.errors, null, 2));
            }
          case 11:
            return _context17.a(2);
        }
      }, _callee17, null, [[4, 6]]);
    }));
  }
  main().catch(function (error) {
    console.error("Production pipeline failed:", error);
    toast("An error occurred. Check the console for details.");
  });
})();
