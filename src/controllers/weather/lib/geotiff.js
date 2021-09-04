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

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
})({
  "j27V": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.geoKeys = exports.geoKeyNames = exports.ExtraSamplesValues = exports.photometricInterpretations = exports.fieldTypes = exports.fieldTypeNames = exports.arrayFields = exports.fieldTagTypes = exports.fieldTags = exports.fieldTagNames = void 0;
    const fieldTagNames = {
      // TIFF Baseline
      0x013B: 'Artist',
      0x0102: 'BitsPerSample',
      0x0109: 'CellLength',
      0x0108: 'CellWidth',
      0x0140: 'ColorMap',
      0x0103: 'Compression',
      0x8298: 'Copyright',
      0x0132: 'DateTime',
      0x0152: 'ExtraSamples',
      0x010A: 'FillOrder',
      0x0121: 'FreeByteCounts',
      0x0120: 'FreeOffsets',
      0x0123: 'GrayResponseCurve',
      0x0122: 'GrayResponseUnit',
      0x013C: 'HostComputer',
      0x010E: 'ImageDescription',
      0x0101: 'ImageLength',
      0x0100: 'ImageWidth',
      0x010F: 'Make',
      0x0119: 'MaxSampleValue',
      0x0118: 'MinSampleValue',
      0x0110: 'Model',
      0x00FE: 'NewSubfileType',
      0x0112: 'Orientation',
      0x0106: 'PhotometricInterpretation',
      0x011C: 'PlanarConfiguration',
      0x0128: 'ResolutionUnit',
      0x0116: 'RowsPerStrip',
      0x0115: 'SamplesPerPixel',
      0x0131: 'Software',
      0x0117: 'StripByteCounts',
      0x0111: 'StripOffsets',
      0x00FF: 'SubfileType',
      0x0107: 'Threshholding',
      0x011A: 'XResolution',
      0x011B: 'YResolution',
      // TIFF Extended
      0x0146: 'BadFaxLines',
      0x0147: 'CleanFaxData',
      0x0157: 'ClipPath',
      0x0148: 'ConsecutiveBadFaxLines',
      0x01B1: 'Decode',
      0x01B2: 'DefaultImageColor',
      0x010D: 'DocumentName',
      0x0150: 'DotRange',
      0x0141: 'HalftoneHints',
      0x015A: 'Indexed',
      0x015B: 'JPEGTables',
      0x011D: 'PageName',
      0x0129: 'PageNumber',
      0x013D: 'Predictor',
      0x013F: 'PrimaryChromaticities',
      0x0214: 'ReferenceBlackWhite',
      0x0153: 'SampleFormat',
      0x0154: 'SMinSampleValue',
      0x0155: 'SMaxSampleValue',
      0x022F: 'StripRowCounts',
      0x014A: 'SubIFDs',
      0x0124: 'T4Options',
      0x0125: 'T6Options',
      0x0145: 'TileByteCounts',
      0x0143: 'TileLength',
      0x0144: 'TileOffsets',
      0x0142: 'TileWidth',
      0x012D: 'TransferFunction',
      0x013E: 'WhitePoint',
      0x0158: 'XClipPathUnits',
      0x011E: 'XPosition',
      0x0211: 'YCbCrCoefficients',
      0x0213: 'YCbCrPositioning',
      0x0212: 'YCbCrSubSampling',
      0x0159: 'YClipPathUnits',
      0x011F: 'YPosition',
      // EXIF
      0x9202: 'ApertureValue',
      0xA001: 'ColorSpace',
      0x9004: 'DateTimeDigitized',
      0x9003: 'DateTimeOriginal',
      0x8769: 'Exif IFD',
      0x9000: 'ExifVersion',
      0x829A: 'ExposureTime',
      0xA300: 'FileSource',
      0x9209: 'Flash',
      0xA000: 'FlashpixVersion',
      0x829D: 'FNumber',
      0xA420: 'ImageUniqueID',
      0x9208: 'LightSource',
      0x927C: 'MakerNote',
      0x9201: 'ShutterSpeedValue',
      0x9286: 'UserComment',
      // IPTC
      0x83BB: 'IPTC',
      // ICC
      0x8773: 'ICC Profile',
      // XMP
      0x02BC: 'XMP',
      // GDAL
      0xA480: 'GDAL_METADATA',
      0xA481: 'GDAL_NODATA',
      // Photoshop
      0x8649: 'Photoshop',
      // GeoTiff
      0x830E: 'ModelPixelScale',
      0x8482: 'ModelTiepoint',
      0x85D8: 'ModelTransformation',
      0x87AF: 'GeoKeyDirectory',
      0x87B0: 'GeoDoubleParams',
      0x87B1: 'GeoAsciiParams'
    };
    exports.fieldTagNames = fieldTagNames;
    const fieldTags = {};
    exports.fieldTags = fieldTags;

    for (const key in fieldTagNames) {
      if (fieldTagNames.hasOwnProperty(key)) {
        fieldTags[fieldTagNames[key]] = parseInt(key, 10);
      }
    }

    const fieldTagTypes = {
      256: 'SHORT',
      257: 'SHORT',
      258: 'SHORT',
      259: 'SHORT',
      262: 'SHORT',
      273: 'LONG',
      274: 'SHORT',
      277: 'SHORT',
      278: 'LONG',
      279: 'LONG',
      280: 'SHORT',
      281: 'SHORT',
      282: 'RATIONAL',
      283: 'RATIONAL',
      284: 'SHORT',
      286: 'SHORT',
      287: 'RATIONAL',
      296: 'SHORT',
      305: 'ASCII',
      306: 'ASCII',
      338: 'SHORT',
      339: 'SHORT',
      513: 'LONG',
      514: 'LONG',
      1024: 'SHORT',
      1025: 'SHORT',
      2048: 'SHORT',
      2049: 'ASCII',
      33550: 'DOUBLE',
      33922: 'DOUBLE',
      34665: 'LONG',
      34735: 'SHORT',
      34737: 'ASCII',
      42113: 'ASCII'
    };
    exports.fieldTagTypes = fieldTagTypes;
    const arrayFields = [fieldTags.BitsPerSample, fieldTags.ExtraSamples, fieldTags.SampleFormat, fieldTags.StripByteCounts, fieldTags.StripOffsets, fieldTags.StripRowCounts, fieldTags.TileByteCounts, fieldTags.TileOffsets];
    exports.arrayFields = arrayFields;
    const fieldTypeNames = {
      0x0001: 'BYTE',
      0x0002: 'ASCII',
      0x0003: 'SHORT',
      0x0004: 'LONG',
      0x0005: 'RATIONAL',
      0x0006: 'SBYTE',
      0x0007: 'UNDEFINED',
      0x0008: 'SSHORT',
      0x0009: 'SLONG',
      0x000A: 'SRATIONAL',
      0x000B: 'FLOAT',
      0x000C: 'DOUBLE',
      // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
      0x000D: 'IFD',
      // introduced by BigTIFF
      0x0010: 'LONG8',
      0x0011: 'SLONG8',
      0x0012: 'IFD8'
    };
    exports.fieldTypeNames = fieldTypeNames;
    const fieldTypes = {};
    exports.fieldTypes = fieldTypes;

    for (const key in fieldTypeNames) {
      if (fieldTypeNames.hasOwnProperty(key)) {
        fieldTypes[fieldTypeNames[key]] = parseInt(key, 10);
      }
    }

    const photometricInterpretations = {
      WhiteIsZero: 0,
      BlackIsZero: 1,
      RGB: 2,
      Palette: 3,
      TransparencyMask: 4,
      CMYK: 5,
      YCbCr: 6,
      CIELab: 8,
      ICCLab: 9
    };
    exports.photometricInterpretations = photometricInterpretations;
    const ExtraSamplesValues = {
      Unspecified: 0,
      Assocalpha: 1,
      Unassalpha: 2
    };
    exports.ExtraSamplesValues = ExtraSamplesValues;
    const geoKeyNames = {
      1024: 'GTModelTypeGeoKey',
      1025: 'GTRasterTypeGeoKey',
      1026: 'GTCitationGeoKey',
      2048: 'GeographicTypeGeoKey',
      2049: 'GeogCitationGeoKey',
      2050: 'GeogGeodeticDatumGeoKey',
      2051: 'GeogPrimeMeridianGeoKey',
      2052: 'GeogLinearUnitsGeoKey',
      2053: 'GeogLinearUnitSizeGeoKey',
      2054: 'GeogAngularUnitsGeoKey',
      2055: 'GeogAngularUnitSizeGeoKey',
      2056: 'GeogEllipsoidGeoKey',
      2057: 'GeogSemiMajorAxisGeoKey',
      2058: 'GeogSemiMinorAxisGeoKey',
      2059: 'GeogInvFlatteningGeoKey',
      2060: 'GeogAzimuthUnitsGeoKey',
      2061: 'GeogPrimeMeridianLongGeoKey',
      2062: 'GeogTOWGS84GeoKey',
      3072: 'ProjectedCSTypeGeoKey',
      3073: 'PCSCitationGeoKey',
      3074: 'ProjectionGeoKey',
      3075: 'ProjCoordTransGeoKey',
      3076: 'ProjLinearUnitsGeoKey',
      3077: 'ProjLinearUnitSizeGeoKey',
      3078: 'ProjStdParallel1GeoKey',
      3079: 'ProjStdParallel2GeoKey',
      3080: 'ProjNatOriginLongGeoKey',
      3081: 'ProjNatOriginLatGeoKey',
      3082: 'ProjFalseEastingGeoKey',
      3083: 'ProjFalseNorthingGeoKey',
      3084: 'ProjFalseOriginLongGeoKey',
      3085: 'ProjFalseOriginLatGeoKey',
      3086: 'ProjFalseOriginEastingGeoKey',
      3087: 'ProjFalseOriginNorthingGeoKey',
      3088: 'ProjCenterLongGeoKey',
      3089: 'ProjCenterLatGeoKey',
      3090: 'ProjCenterEastingGeoKey',
      3091: 'ProjCenterNorthingGeoKey',
      3092: 'ProjScaleAtNatOriginGeoKey',
      3093: 'ProjScaleAtCenterGeoKey',
      3094: 'ProjAzimuthAngleGeoKey',
      3095: 'ProjStraightVertPoleLongGeoKey',
      3096: 'ProjRectifiedGridAngleGeoKey',
      4096: 'VerticalCSTypeGeoKey',
      4097: 'VerticalCitationGeoKey',
      4098: 'VerticalDatumGeoKey',
      4099: 'VerticalUnitsGeoKey'
    };
    exports.geoKeyNames = geoKeyNames;
    const geoKeys = {};
    exports.geoKeys = geoKeys;

    for (const key in geoKeyNames) {
      if (geoKeyNames.hasOwnProperty(key)) {
        geoKeys[geoKeyNames[key]] = parseInt(key, 10);
      }
    }
  }, {}], "fpBl": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fromWhiteIsZero = fromWhiteIsZero;
    exports.fromBlackIsZero = fromBlackIsZero;
    exports.fromPalette = fromPalette;
    exports.fromCMYK = fromCMYK;
    exports.fromYCbCr = fromYCbCr;
    exports.fromCIELab = fromCIELab;

    function fromWhiteIsZero(raster, max) {
      const {
        width,
        height
      } = raster;
      const rgbRaster = new Uint8Array(width * height * 3);
      let value;

      for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
        value = 256 - raster[i] / max * 256;
        rgbRaster[j] = value;
        rgbRaster[j + 1] = value;
        rgbRaster[j + 2] = value;
      }

      return rgbRaster;
    }

    function fromBlackIsZero(raster, max) {
      const {
        width,
        height
      } = raster;
      const rgbRaster = new Uint8Array(width * height * 3);
      let value;

      for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
        value = raster[i] / max * 256;
        rgbRaster[j] = value;
        rgbRaster[j + 1] = value;
        rgbRaster[j + 2] = value;
      }

      return rgbRaster;
    }

    function fromPalette(raster, colorMap) {
      const {
        width,
        height
      } = raster;
      const rgbRaster = new Uint8Array(width * height * 3);
      const greenOffset = colorMap.length / 3;
      const blueOffset = colorMap.length / 3 * 2;

      for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
        const mapIndex = raster[i];
        rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
        rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
        rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
      }

      return rgbRaster;
    }

    function fromCMYK(cmykRaster) {
      const {
        width,
        height
      } = cmykRaster;
      const rgbRaster = new Uint8Array(width * height * 3);

      for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
        const c = cmykRaster[i];
        const m = cmykRaster[i + 1];
        const y = cmykRaster[i + 2];
        const k = cmykRaster[i + 3];
        rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
        rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
        rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
      }

      return rgbRaster;
    }

    function fromYCbCr(yCbCrRaster) {
      const {
        width,
        height
      } = yCbCrRaster;
      const rgbRaster = new Uint8ClampedArray(width * height * 3);

      for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
        const y = yCbCrRaster[i];
        const cb = yCbCrRaster[i + 1];
        const cr = yCbCrRaster[i + 2];
        rgbRaster[j] = y + 1.40200 * (cr - 0x80);
        rgbRaster[j + 1] = y - 0.34414 * (cb - 0x80) - 0.71414 * (cr - 0x80);
        rgbRaster[j + 2] = y + 1.77200 * (cb - 0x80);
      }

      return rgbRaster;
    }

    const Xn = 0.95047;
    const Yn = 1.00000;
    const Zn = 1.08883; // from https://github.com/antimatter15/rgb-lab/blob/master/color.js

    function fromCIELab(cieLabRaster) {
      const {
        width,
        height
      } = cieLabRaster;
      const rgbRaster = new Uint8Array(width * height * 3);

      for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
        const L = cieLabRaster[i + 0];
        const a_ = cieLabRaster[i + 1] << 24 >> 24; // conversion from uint8 to int8

        const b_ = cieLabRaster[i + 2] << 24 >> 24; // same

        let y = (L + 16) / 116;
        let x = a_ / 500 + y;
        let z = y - b_ / 200;
        let r;
        let g;
        let b;
        x = Xn * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
        y = Yn * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
        z = Zn * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.2040 + z * 1.0570;
        r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
        g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
        b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;
        rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
        rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
        rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
      }

      return rgbRaster;
    }
  }, {}], "IKSA": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.applyPredictor = applyPredictor;

    function decodeRowAcc(row, stride) {
      let length = row.length - stride;
      let offset = 0;

      do {
        for (let i = stride; i > 0; i--) {
          row[offset + stride] += row[offset];
          offset++;
        }

        length -= stride;
      } while (length > 0);
    }

    function decodeRowFloatingPoint(row, stride, bytesPerSample) {
      let index = 0;
      let count = row.length;
      const wc = count / bytesPerSample;

      while (count > stride) {
        for (let i = stride; i > 0; --i) {
          row[index + stride] += row[index];
          ++index;
        }

        count -= stride;
      }

      const copy = row.slice();

      for (let i = 0; i < wc; ++i) {
        for (let b = 0; b < bytesPerSample; ++b) {
          row[bytesPerSample * i + b] = copy[(bytesPerSample - b - 1) * wc + i];
        }
      }
    }

    function applyPredictor(block, predictor, width, height, bitsPerSample, planarConfiguration) {
      if (!predictor || predictor === 1) {
        return block;
      }

      for (let i = 0; i < bitsPerSample.length; ++i) {
        if (bitsPerSample[i] % 8 !== 0) {
          throw new Error('When decoding with predictor, only multiple of 8 bits are supported.');
        }

        if (bitsPerSample[i] !== bitsPerSample[0]) {
          throw new Error('When decoding with predictor, all samples must have the same size.');
        }
      }

      const bytesPerSample = bitsPerSample[0] / 8;
      const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;

      for (let i = 0; i < height; ++i) {
        // Last strip will be truncated if height % stripHeight != 0
        if (i * stride * width * bytesPerSample >= block.byteLength) {
          break;
        }

        let row;

        if (predictor === 2) {
          // horizontal prediction
          switch (bitsPerSample[0]) {
            case 8:
              row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
              break;

            case 16:
              row = new Uint16Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 2);
              break;

            case 32:
              row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
              break;

            default:
              throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
          }

          decodeRowAcc(row, stride, bytesPerSample);
        } else if (predictor === 3) {
          // horizontal floating point
          row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
          decodeRowFloatingPoint(row, stride, bytesPerSample);
        }
      }

      return block;
    }
  }, {}], "FJDe": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _predictor = require("../predictor");

    class BaseDecoder {
      async decode(fileDirectory, buffer) {
        const decoded = await this.decodeBlock(buffer);
        const predictor = fileDirectory.Predictor || 1;

        if (predictor !== 1) {
          const isTiled = !fileDirectory.StripOffsets;
          const tileWidth = isTiled ? fileDirectory.TileWidth : fileDirectory.ImageWidth;
          const tileHeight = isTiled ? fileDirectory.TileLength : fileDirectory.RowsPerStrip || fileDirectory.ImageLength;
          return (0, _predictor.applyPredictor)(decoded, predictor, tileWidth, tileHeight, fileDirectory.BitsPerSample, fileDirectory.PlanarConfiguration);
        }

        return decoded;
      }

    }

    exports.default = BaseDecoder;
  }, { "../predictor": "IKSA" }], "V9bQ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _basedecoder = _interopRequireDefault(require("./basedecoder"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    class RawDecoder extends _basedecoder.default {
      decodeBlock(buffer) {
        return buffer;
      }

    }

    exports.default = RawDecoder;
  }, { "./basedecoder": "FJDe" }], "tcId": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _basedecoder = _interopRequireDefault(require("./basedecoder"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    const MIN_BITS = 9;
    const CLEAR_CODE = 256; // clear code

    const EOI_CODE = 257; // end of information

    const MAX_BYTELENGTH = 12;

    function getByte(array, position, length) {
      const d = position % 8;
      const a = Math.floor(position / 8);
      const de = 8 - d;
      const ef = position + length - (a + 1) * 8;
      let fg = 8 * (a + 2) - (position + length);
      const dg = (a + 2) * 8 - position;
      fg = Math.max(0, fg);

      if (a >= array.length) {
        console.warn('ran off the end of the buffer before finding EOI_CODE (end on input code)');
        return EOI_CODE;
      }

      let chunk1 = array[a] & 2 ** (8 - d) - 1;
      chunk1 <<= length - de;
      let chunks = chunk1;

      if (a + 1 < array.length) {
        let chunk2 = array[a + 1] >>> fg;
        chunk2 <<= Math.max(0, length - dg);
        chunks += chunk2;
      }

      if (ef > 8 && a + 2 < array.length) {
        const hi = (a + 3) * 8 - (position + length);
        const chunk3 = array[a + 2] >>> hi;
        chunks += chunk3;
      }

      return chunks;
    }

    function appendReversed(dest, source) {
      for (let i = source.length - 1; i >= 0; i--) {
        dest.push(source[i]);
      }

      return dest;
    }

    function decompress(input) {
      const dictionaryIndex = new Uint16Array(4093);
      const dictionaryChar = new Uint8Array(4093);

      for (let i = 0; i <= 257; i++) {
        dictionaryIndex[i] = 4096;
        dictionaryChar[i] = i;
      }

      let dictionaryLength = 258;
      let byteLength = MIN_BITS;
      let position = 0;

      function initDictionary() {
        dictionaryLength = 258;
        byteLength = MIN_BITS;
      }

      function getNext(array) {
        const byte = getByte(array, position, byteLength);
        position += byteLength;
        return byte;
      }

      function addToDictionary(i, c) {
        dictionaryChar[dictionaryLength] = c;
        dictionaryIndex[dictionaryLength] = i;
        dictionaryLength++;
        return dictionaryLength - 1;
      }

      function getDictionaryReversed(n) {
        const rev = [];

        for (let i = n; i !== 4096; i = dictionaryIndex[i]) {
          rev.push(dictionaryChar[i]);
        }

        return rev;
      }

      const result = [];
      initDictionary();
      const array = new Uint8Array(input);
      let code = getNext(array);
      let oldCode;

      while (code !== EOI_CODE) {
        if (code === CLEAR_CODE) {
          initDictionary();
          code = getNext(array);

          while (code === CLEAR_CODE) {
            code = getNext(array);
          }

          if (code === EOI_CODE) {
            break;
          } else if (code > CLEAR_CODE) {
            throw new Error(`corrupted code at scanline ${code}`);
          } else {
            const val = getDictionaryReversed(code);
            appendReversed(result, val);
            oldCode = code;
          }
        } else if (code < dictionaryLength) {
          const val = getDictionaryReversed(code);
          appendReversed(result, val);
          addToDictionary(oldCode, val[val.length - 1]);
          oldCode = code;
        } else {
          const oldVal = getDictionaryReversed(oldCode);

          if (!oldVal) {
            throw new Error(`Bogus entry. Not in dictionary, ${oldCode} / ${dictionaryLength}, position: ${position}`);
          }

          appendReversed(result, oldVal);
          result.push(oldVal[oldVal.length - 1]);
          addToDictionary(oldCode, oldVal[oldVal.length - 1]);
          oldCode = code;
        }

        if (dictionaryLength + 1 >= 2 ** byteLength) {
          if (byteLength === MAX_BYTELENGTH) {
            oldCode = undefined;
          } else {
            byteLength++;
          }
        }

        code = getNext(array);
      }

      return new Uint8Array(result);
    }

    class LZWDecoder extends _basedecoder.default {
      decodeBlock(buffer) {
        return decompress(buffer, false).buffer;
      }

    }

    exports.default = LZWDecoder;
  }, { "./basedecoder": "FJDe" }], "J7kk": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _basedecoder = _interopRequireDefault(require("./basedecoder"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    /* -*- tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
    /* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

    /*
       Copyright 2011 notmasteryet
       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at
           http://www.apache.org/licenses/LICENSE-2.0
       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    */
    // - The JPEG specification can be found in the ITU CCITT Recommendation T.81
    //   (www.w3.org/Graphics/JPEG/itu-t81.pdf)
    // - The JFIF specification can be found in the JPEG File Interchange Format
    //   (www.w3.org/Graphics/JPEG/jfif3.pdf)
    // - The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
    //   in PostScript Level 2, Technical Note #5116
    //   (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)
    const dctZigZag = new Int32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
    const dctCos1 = 4017; // cos(pi/16)

    const dctSin1 = 799; // sin(pi/16)

    const dctCos3 = 3406; // cos(3*pi/16)

    const dctSin3 = 2276; // sin(3*pi/16)

    const dctCos6 = 1567; // cos(6*pi/16)

    const dctSin6 = 3784; // sin(6*pi/16)

    const dctSqrt2 = 5793; // sqrt(2)

    const dctSqrt1d2 = 2896; // sqrt(2) / 2

    function buildHuffmanTable(codeLengths, values) {
      let k = 0;
      const code = [];
      let length = 16;

      while (length > 0 && !codeLengths[length - 1]) {
        --length;
      }

      code.push({
        children: [],
        index: 0
      });
      let p = code[0];
      let q;

      for (let i = 0; i < length; i++) {
        for (let j = 0; j < codeLengths[i]; j++) {
          p = code.pop();
          p.children[p.index] = values[k];

          while (p.index > 0) {
            p = code.pop();
          }

          p.index++;
          code.push(p);

          while (code.length <= i) {
            code.push(q = {
              children: [],
              index: 0
            });
            p.children[p.index] = q.children;
            p = q;
          }

          k++;
        }

        if (i + 1 < length) {
          // p here points to last code
          code.push(q = {
            children: [],
            index: 0
          });
          p.children[p.index] = q.children;
          p = q;
        }
      }

      return code[0].children;
    }

    function decodeScan(data, initialOffset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
      const {
        mcusPerLine,
        progressive
      } = frame;
      const startOffset = initialOffset;
      let offset = initialOffset;
      let bitsData = 0;
      let bitsCount = 0;

      function readBit() {
        if (bitsCount > 0) {
          bitsCount--;
          return bitsData >> bitsCount & 1;
        }

        bitsData = data[offset++];

        if (bitsData === 0xFF) {
          const nextByte = data[offset++];

          if (nextByte) {
            throw new Error(`unexpected marker: ${(bitsData << 8 | nextByte).toString(16)}`);
          } // unstuff 0

        }

        bitsCount = 7;
        return bitsData >>> 7;
      }

      function decodeHuffman(tree) {
        let node = tree;
        let bit;

        while ((bit = readBit()) !== null) {
          // eslint-disable-line no-cond-assign
          node = node[bit];

          if (typeof node === 'number') {
            return node;
          }

          if (typeof node !== 'object') {
            throw new Error('invalid huffman sequence');
          }
        }

        return null;
      }

      function receive(initialLength) {
        let length = initialLength;
        let n = 0;

        while (length > 0) {
          const bit = readBit();

          if (bit === null) {
            return undefined;
          }

          n = n << 1 | bit;
          --length;
        }

        return n;
      }

      function receiveAndExtend(length) {
        const n = receive(length);

        if (n >= 1 << length - 1) {
          return n;
        }

        return n + (-1 << length) + 1;
      }

      function decodeBaseline(component, zz) {
        const t = decodeHuffman(component.huffmanTableDC);
        const diff = t === 0 ? 0 : receiveAndExtend(t);
        component.pred += diff;
        zz[0] = component.pred;
        let k = 1;

        while (k < 64) {
          const rs = decodeHuffman(component.huffmanTableAC);
          const s = rs & 15;
          const r = rs >> 4;

          if (s === 0) {
            if (r < 15) {
              break;
            }

            k += 16;
          } else {
            k += r;
            const z = dctZigZag[k];
            zz[z] = receiveAndExtend(s);
            k++;
          }
        }
      }

      function decodeDCFirst(component, zz) {
        const t = decodeHuffman(component.huffmanTableDC);
        const diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
        component.pred += diff;
        zz[0] = component.pred;
      }

      function decodeDCSuccessive(component, zz) {
        zz[0] |= readBit() << successive;
      }

      let eobrun = 0;

      function decodeACFirst(component, zz) {
        if (eobrun > 0) {
          eobrun--;
          return;
        }

        let k = spectralStart;
        const e = spectralEnd;

        while (k <= e) {
          const rs = decodeHuffman(component.huffmanTableAC);
          const s = rs & 15;
          const r = rs >> 4;

          if (s === 0) {
            if (r < 15) {
              eobrun = receive(r) + (1 << r) - 1;
              break;
            }

            k += 16;
          } else {
            k += r;
            const z = dctZigZag[k];
            zz[z] = receiveAndExtend(s) * (1 << successive);
            k++;
          }
        }
      }

      let successiveACState = 0;
      let successiveACNextValue;

      function decodeACSuccessive(component, zz) {
        let k = spectralStart;
        const e = spectralEnd;
        let r = 0;

        while (k <= e) {
          const z = dctZigZag[k];
          const direction = zz[z] < 0 ? -1 : 1;

          switch (successiveACState) {
            case 0:
              {
                // initial state
                const rs = decodeHuffman(component.huffmanTableAC);
                const s = rs & 15;
                r = rs >> 4;

                if (s === 0) {
                  if (r < 15) {
                    eobrun = receive(r) + (1 << r);
                    successiveACState = 4;
                  } else {
                    r = 16;
                    successiveACState = 1;
                  }
                } else {
                  if (s !== 1) {
                    throw new Error('invalid ACn encoding');
                  }

                  successiveACNextValue = receiveAndExtend(s);
                  successiveACState = r ? 2 : 3;
                }

                continue; // eslint-disable-line no-continue
              }

            case 1: // skipping r zero items

            case 2:
              if (zz[z]) {
                zz[z] += (readBit() << successive) * direction;
              } else {
                r--;

                if (r === 0) {
                  successiveACState = successiveACState === 2 ? 3 : 0;
                }
              }

              break;

            case 3:
              // set value for a zero item
              if (zz[z]) {
                zz[z] += (readBit() << successive) * direction;
              } else {
                zz[z] = successiveACNextValue << successive;
                successiveACState = 0;
              }

              break;

            case 4:
              // eob
              if (zz[z]) {
                zz[z] += (readBit() << successive) * direction;
              }

              break;

            default:
              break;
          }

          k++;
        }

        if (successiveACState === 4) {
          eobrun--;

          if (eobrun === 0) {
            successiveACState = 0;
          }
        }
      }

      function decodeMcu(component, decodeFunction, mcu, row, col) {
        const mcuRow = mcu / mcusPerLine | 0;
        const mcuCol = mcu % mcusPerLine;
        const blockRow = mcuRow * component.v + row;
        const blockCol = mcuCol * component.h + col;
        decodeFunction(component, component.blocks[blockRow][blockCol]);
      }

      function decodeBlock(component, decodeFunction, mcu) {
        const blockRow = mcu / component.blocksPerLine | 0;
        const blockCol = mcu % component.blocksPerLine;
        decodeFunction(component, component.blocks[blockRow][blockCol]);
      }

      const componentsLength = components.length;
      let component;
      let i;
      let j;
      let k;
      let n;
      let decodeFn;

      if (progressive) {
        if (spectralStart === 0) {
          decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
        } else {
          decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
        }
      } else {
        decodeFn = decodeBaseline;
      }

      let mcu = 0;
      let marker;
      let mcuExpected;

      if (componentsLength === 1) {
        mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
      } else {
        mcuExpected = mcusPerLine * frame.mcusPerColumn;
      }

      const usedResetInterval = resetInterval || mcuExpected;

      while (mcu < mcuExpected) {
        // reset interval stuff
        for (i = 0; i < componentsLength; i++) {
          components[i].pred = 0;
        }

        eobrun = 0;

        if (componentsLength === 1) {
          component = components[0];

          for (n = 0; n < usedResetInterval; n++) {
            decodeBlock(component, decodeFn, mcu);
            mcu++;
          }
        } else {
          for (n = 0; n < usedResetInterval; n++) {
            for (i = 0; i < componentsLength; i++) {
              component = components[i];
              const {
                h,
                v
              } = component;

              for (j = 0; j < v; j++) {
                for (k = 0; k < h; k++) {
                  decodeMcu(component, decodeFn, mcu, j, k);
                }
              }
            }

            mcu++; // If we've reached our expected MCU's, stop decoding

            if (mcu === mcuExpected) {
              break;
            }
          }
        } // find marker


        bitsCount = 0;
        marker = data[offset] << 8 | data[offset + 1];

        if (marker < 0xFF00) {
          throw new Error('marker was not found');
        }

        if (marker >= 0xFFD0 && marker <= 0xFFD7) {
          // RSTx
          offset += 2;
        } else {
          break;
        }
      }

      return offset - startOffset;
    }

    function buildComponentData(frame, component) {
      const lines = [];
      const {
        blocksPerLine,
        blocksPerColumn
      } = component;
      const samplesPerLine = blocksPerLine << 3;
      const R = new Int32Array(64);
      const r = new Uint8Array(64); // A port of poppler's IDCT method which in turn is taken from:
      //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
      //   "Practical Fast 1-D DCT Algorithms with 11 Multiplications",
      //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
      //   988-991.

      function quantizeAndInverse(zz, dataOut, dataIn) {
        const qt = component.quantizationTable;
        let v0;
        let v1;
        let v2;
        let v3;
        let v4;
        let v5;
        let v6;
        let v7;
        let t;
        const p = dataIn;
        let i; // dequant

        for (i = 0; i < 64; i++) {
          p[i] = zz[i] * qt[i];
        } // inverse DCT on rows


        for (i = 0; i < 8; ++i) {
          const row = 8 * i; // check for all-zero AC coefficients

          if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 && p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 && p[7 + row] === 0) {
            t = dctSqrt2 * p[0 + row] + 512 >> 10;
            p[0 + row] = t;
            p[1 + row] = t;
            p[2 + row] = t;
            p[3 + row] = t;
            p[4 + row] = t;
            p[5 + row] = t;
            p[6 + row] = t;
            p[7 + row] = t;
            continue; // eslint-disable-line no-continue
          } // stage 4


          v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
          v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
          v2 = p[2 + row];
          v3 = p[6 + row];
          v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
          v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
          v5 = p[3 + row] << 4;
          v6 = p[5 + row] << 4; // stage 3

          t = v0 - v1 + 1 >> 1;
          v0 = v0 + v1 + 1 >> 1;
          v1 = t;
          t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
          v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
          v3 = t;
          t = v4 - v6 + 1 >> 1;
          v4 = v4 + v6 + 1 >> 1;
          v6 = t;
          t = v7 + v5 + 1 >> 1;
          v5 = v7 - v5 + 1 >> 1;
          v7 = t; // stage 2

          t = v0 - v3 + 1 >> 1;
          v0 = v0 + v3 + 1 >> 1;
          v3 = t;
          t = v1 - v2 + 1 >> 1;
          v1 = v1 + v2 + 1 >> 1;
          v2 = t;
          t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
          v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
          v7 = t;
          t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
          v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
          v6 = t; // stage 1

          p[0 + row] = v0 + v7;
          p[7 + row] = v0 - v7;
          p[1 + row] = v1 + v6;
          p[6 + row] = v1 - v6;
          p[2 + row] = v2 + v5;
          p[5 + row] = v2 - v5;
          p[3 + row] = v3 + v4;
          p[4 + row] = v3 - v4;
        } // inverse DCT on columns


        for (i = 0; i < 8; ++i) {
          const col = i; // check for all-zero AC coefficients

          if (p[1 * 8 + col] === 0 && p[2 * 8 + col] === 0 && p[3 * 8 + col] === 0 && p[4 * 8 + col] === 0 && p[5 * 8 + col] === 0 && p[6 * 8 + col] === 0 && p[7 * 8 + col] === 0) {
            t = dctSqrt2 * dataIn[i + 0] + 8192 >> 14;
            p[0 * 8 + col] = t;
            p[1 * 8 + col] = t;
            p[2 * 8 + col] = t;
            p[3 * 8 + col] = t;
            p[4 * 8 + col] = t;
            p[5 * 8 + col] = t;
            p[6 * 8 + col] = t;
            p[7 * 8 + col] = t;
            continue; // eslint-disable-line no-continue
          } // stage 4


          v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
          v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
          v2 = p[2 * 8 + col];
          v3 = p[6 * 8 + col];
          v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
          v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
          v5 = p[3 * 8 + col];
          v6 = p[5 * 8 + col]; // stage 3

          t = v0 - v1 + 1 >> 1;
          v0 = v0 + v1 + 1 >> 1;
          v1 = t;
          t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
          v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
          v3 = t;
          t = v4 - v6 + 1 >> 1;
          v4 = v4 + v6 + 1 >> 1;
          v6 = t;
          t = v7 + v5 + 1 >> 1;
          v5 = v7 - v5 + 1 >> 1;
          v7 = t; // stage 2

          t = v0 - v3 + 1 >> 1;
          v0 = v0 + v3 + 1 >> 1;
          v3 = t;
          t = v1 - v2 + 1 >> 1;
          v1 = v1 + v2 + 1 >> 1;
          v2 = t;
          t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
          v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
          v7 = t;
          t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
          v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
          v6 = t; // stage 1

          p[0 * 8 + col] = v0 + v7;
          p[7 * 8 + col] = v0 - v7;
          p[1 * 8 + col] = v1 + v6;
          p[6 * 8 + col] = v1 - v6;
          p[2 * 8 + col] = v2 + v5;
          p[5 * 8 + col] = v2 - v5;
          p[3 * 8 + col] = v3 + v4;
          p[4 * 8 + col] = v3 - v4;
        } // convert to 8-bit integers


        for (i = 0; i < 64; ++i) {
          const sample = 128 + (p[i] + 8 >> 4);

          if (sample < 0) {
            dataOut[i] = 0;
          } else if (sample > 0XFF) {
            dataOut[i] = 0xFF;
          } else {
            dataOut[i] = sample;
          }
        }
      }

      for (let blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
        const scanLine = blockRow << 3;

        for (let i = 0; i < 8; i++) {
          lines.push(new Uint8Array(samplesPerLine));
        }

        for (let blockCol = 0; blockCol < blocksPerLine; blockCol++) {
          quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
          let offset = 0;
          const sample = blockCol << 3;

          for (let j = 0; j < 8; j++) {
            const line = lines[scanLine + j];

            for (let i = 0; i < 8; i++) {
              line[sample + i] = r[offset++];
            }
          }
        }
      }

      return lines;
    }

    class JpegStreamReader {
      constructor() {
        this.jfif = null;
        this.adobe = null;
        this.quantizationTables = [];
        this.huffmanTablesAC = [];
        this.huffmanTablesDC = [];
        this.resetFrames();
      }

      resetFrames() {
        this.frames = [];
      }

      parse(data) {
        let offset = 0; // const { length } = data;

        function readUint16() {
          const value = data[offset] << 8 | data[offset + 1];
          offset += 2;
          return value;
        }

        function readDataBlock() {
          const length = readUint16();
          const array = data.subarray(offset, offset + length - 2);
          offset += array.length;
          return array;
        }

        function prepareComponents(frame) {
          let maxH = 0;
          let maxV = 0;
          let component;
          let componentId;

          for (componentId in frame.components) {
            if (frame.components.hasOwnProperty(componentId)) {
              component = frame.components[componentId];

              if (maxH < component.h) {
                maxH = component.h;
              }

              if (maxV < component.v) {
                maxV = component.v;
              }
            }
          }

          const mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
          const mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);

          for (componentId in frame.components) {
            if (frame.components.hasOwnProperty(componentId)) {
              component = frame.components[componentId];
              const blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
              const blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / maxV);
              const blocksPerLineForMcu = mcusPerLine * component.h;
              const blocksPerColumnForMcu = mcusPerColumn * component.v;
              const blocks = [];

              for (let i = 0; i < blocksPerColumnForMcu; i++) {
                const row = [];

                for (let j = 0; j < blocksPerLineForMcu; j++) {
                  row.push(new Int32Array(64));
                }

                blocks.push(row);
              }

              component.blocksPerLine = blocksPerLine;
              component.blocksPerColumn = blocksPerColumn;
              component.blocks = blocks;
            }
          }

          frame.maxH = maxH;
          frame.maxV = maxV;
          frame.mcusPerLine = mcusPerLine;
          frame.mcusPerColumn = mcusPerColumn;
        }

        let fileMarker = readUint16();

        if (fileMarker !== 0xFFD8) {
          // SOI (Start of Image)
          throw new Error('SOI not found');
        }

        fileMarker = readUint16();

        while (fileMarker !== 0xFFD9) {
          // EOI (End of image)
          switch (fileMarker) {
            case 0xFF00:
              break;

            case 0xFFE0: // APP0 (Application Specific)

            case 0xFFE1: // APP1

            case 0xFFE2: // APP2

            case 0xFFE3: // APP3

            case 0xFFE4: // APP4

            case 0xFFE5: // APP5

            case 0xFFE6: // APP6

            case 0xFFE7: // APP7

            case 0xFFE8: // APP8

            case 0xFFE9: // APP9

            case 0xFFEA: // APP10

            case 0xFFEB: // APP11

            case 0xFFEC: // APP12

            case 0xFFED: // APP13

            case 0xFFEE: // APP14

            case 0xFFEF: // APP15

            case 0xFFFE:
              {
                // COM (Comment)
                const appData = readDataBlock();

                if (fileMarker === 0xFFE0) {
                  if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 && appData[3] === 0x46 && appData[4] === 0) {
                    // 'JFIF\x00'
                    this.jfif = {
                      version: {
                        major: appData[5],
                        minor: appData[6]
                      },
                      densityUnits: appData[7],
                      xDensity: appData[8] << 8 | appData[9],
                      yDensity: appData[10] << 8 | appData[11],
                      thumbWidth: appData[12],
                      thumbHeight: appData[13],
                      thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                    };
                  }
                } // TODO APP1 - Exif


                if (fileMarker === 0xFFEE) {
                  if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F && appData[3] === 0x62 && appData[4] === 0x65 && appData[5] === 0) {
                    // 'Adobe\x00'
                    this.adobe = {
                      version: appData[6],
                      flags0: appData[7] << 8 | appData[8],
                      flags1: appData[9] << 8 | appData[10],
                      transformCode: appData[11]
                    };
                  }
                }

                break;
              }

            case 0xFFDB:
              {
                // DQT (Define Quantization Tables)
                const quantizationTablesLength = readUint16();
                const quantizationTablesEnd = quantizationTablesLength + offset - 2;

                while (offset < quantizationTablesEnd) {
                  const quantizationTableSpec = data[offset++];
                  const tableData = new Int32Array(64);

                  if (quantizationTableSpec >> 4 === 0) {
                    // 8 bit values
                    for (let j = 0; j < 64; j++) {
                      const z = dctZigZag[j];
                      tableData[z] = data[offset++];
                    }
                  } else if (quantizationTableSpec >> 4 === 1) {
                    // 16 bit
                    for (let j = 0; j < 64; j++) {
                      const z = dctZigZag[j];
                      tableData[z] = readUint16();
                    }
                  } else {
                    throw new Error('DQT: invalid table spec');
                  }

                  this.quantizationTables[quantizationTableSpec & 15] = tableData;
                }

                break;
              }

            case 0xFFC0: // SOF0 (Start of Frame, Baseline DCT)

            case 0xFFC1: // SOF1 (Start of Frame, Extended DCT)

            case 0xFFC2:
              {
                // SOF2 (Start of Frame, Progressive DCT)
                readUint16(); // skip data length

                const frame = {
                  extended: fileMarker === 0xFFC1,
                  progressive: fileMarker === 0xFFC2,
                  precision: data[offset++],
                  scanLines: readUint16(),
                  samplesPerLine: readUint16(),
                  components: {},
                  componentsOrder: []
                };
                const componentsCount = data[offset++];
                let componentId; // let maxH = 0;
                // let maxV = 0;

                for (let i = 0; i < componentsCount; i++) {
                  componentId = data[offset];
                  const h = data[offset + 1] >> 4;
                  const v = data[offset + 1] & 15;
                  const qId = data[offset + 2];
                  frame.componentsOrder.push(componentId);
                  frame.components[componentId] = {
                    h,
                    v,
                    quantizationIdx: qId
                  };
                  offset += 3;
                }

                prepareComponents(frame);
                this.frames.push(frame);
                break;
              }

            case 0xFFC4:
              {
                // DHT (Define Huffman Tables)
                const huffmanLength = readUint16();

                for (let i = 2; i < huffmanLength;) {
                  const huffmanTableSpec = data[offset++];
                  const codeLengths = new Uint8Array(16);
                  let codeLengthSum = 0;

                  for (let j = 0; j < 16; j++, offset++) {
                    codeLengths[j] = data[offset];
                    codeLengthSum += codeLengths[j];
                  }

                  const huffmanValues = new Uint8Array(codeLengthSum);

                  for (let j = 0; j < codeLengthSum; j++, offset++) {
                    huffmanValues[j] = data[offset];
                  }

                  i += 17 + codeLengthSum;

                  if (huffmanTableSpec >> 4 === 0) {
                    this.huffmanTablesDC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                  } else {
                    this.huffmanTablesAC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                  }
                }

                break;
              }

            case 0xFFDD:
              // DRI (Define Restart Interval)
              readUint16(); // skip data length

              this.resetInterval = readUint16();
              break;

            case 0xFFDA:
              {
                // SOS (Start of Scan)
                readUint16(); // skip length

                const selectorsCount = data[offset++];
                const components = [];
                const frame = this.frames[0];

                for (let i = 0; i < selectorsCount; i++) {
                  const component = frame.components[data[offset++]];
                  const tableSpec = data[offset++];
                  component.huffmanTableDC = this.huffmanTablesDC[tableSpec >> 4];
                  component.huffmanTableAC = this.huffmanTablesAC[tableSpec & 15];
                  components.push(component);
                }

                const spectralStart = data[offset++];
                const spectralEnd = data[offset++];
                const successiveApproximation = data[offset++];
                const processed = decodeScan(data, offset, frame, components, this.resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
                offset += processed;
                break;
              }

            case 0xFFFF:
              // Fill bytes
              if (data[offset] !== 0xFF) {
                // Avoid skipping a valid marker.
                offset--;
              }

              break;

            default:
              if (data[offset - 3] === 0xFF && data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
                // could be incorrect encoding -- last 0xFF byte of the previous
                // block was eaten by the encoder
                offset -= 3;
                break;
              }

              throw new Error(`unknown JPEG marker ${fileMarker.toString(16)}`);
          }

          fileMarker = readUint16();
        }
      }

      getResult() {
        const {
          frames
        } = this;

        if (this.frames.length === 0) {
          throw new Error('no frames were decoded');
        } else if (this.frames.length > 1) {
          console.warn('more than one frame is not supported');
        } // set each frame's components quantization table


        for (let i = 0; i < this.frames.length; i++) {
          const cp = this.frames[i].components;

          for (const j of Object.keys(cp)) {
            cp[j].quantizationTable = this.quantizationTables[cp[j].quantizationIdx];
            delete cp[j].quantizationIdx;
          }
        }

        const frame = frames[0];
        const {
          components,
          componentsOrder
        } = frame;
        const outComponents = [];
        const width = frame.samplesPerLine;
        const height = frame.scanLines;

        for (let i = 0; i < componentsOrder.length; i++) {
          const component = components[componentsOrder[i]];
          outComponents.push({
            lines: buildComponentData(frame, component),
            scaleX: component.h / frame.maxH,
            scaleY: component.v / frame.maxV
          });
        }

        const out = new Uint8Array(width * height * outComponents.length);
        let oi = 0;

        for (let y = 0; y < height; ++y) {
          for (let x = 0; x < width; ++x) {
            for (let i = 0; i < outComponents.length; ++i) {
              const component = outComponents[i];
              out[oi] = component.lines[0 | y * component.scaleY][0 | x * component.scaleX];
              ++oi;
            }
          }
        }

        return out;
      }

    }

    class JpegDecoder extends _basedecoder.default {
      constructor(fileDirectory) {
        super();
        this.reader = new JpegStreamReader();

        if (fileDirectory.JPEGTables) {
          this.reader.parse(fileDirectory.JPEGTables);
        }
      }

      decodeBlock(buffer) {
        this.reader.resetFrames();
        this.reader.parse(new Uint8Array(buffer));
        return this.reader.getResult().buffer;
      }

    }

    exports.default = JpegDecoder;
  }, { "./basedecoder": "FJDe" }], "JAiC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _inflate = require("pako/lib/inflate");

    var _basedecoder = _interopRequireDefault(require("./basedecoder"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    class DeflateDecoder extends _basedecoder.default {
      decodeBlock(buffer) {
        return (0, _inflate.inflate)(new Uint8Array(buffer)).buffer;
      }

    }

    exports.default = DeflateDecoder;
  }, { "./basedecoder": "FJDe" }], "OcPz": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _basedecoder = _interopRequireDefault(require("./basedecoder"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    class PackbitsDecoder extends _basedecoder.default {
      decodeBlock(buffer) {
        const dataView = new DataView(buffer);
        const out = [];

        for (let i = 0; i < buffer.byteLength; ++i) {
          let header = dataView.getInt8(i);

          if (header < 0) {
            const next = dataView.getUint8(i + 1);
            header = -header;

            for (let j = 0; j <= header; ++j) {
              out.push(next);
            }

            i += 1;
          } else {
            for (let j = 0; j <= header; ++j) {
              out.push(dataView.getUint8(i + j + 1));
            }

            i += header + 1;
          }
        }

        return new Uint8Array(out).buffer;
      }

    }

    exports.default = PackbitsDecoder;
  }, { "./basedecoder": "FJDe" }], "FGCZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getDecoder = getDecoder;

    var _raw = _interopRequireDefault(require("./raw"));

    var _lzw = _interopRequireDefault(require("./lzw"));

    var _jpeg = _interopRequireDefault(require("./jpeg"));

    var _deflate = _interopRequireDefault(require("./deflate"));

    var _packbits = _interopRequireDefault(require("./packbits"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function getDecoder(fileDirectory) {
      switch (fileDirectory.Compression) {
        case undefined:
        case 1:
          // no compression
          return new _raw.default();

        case 5:
          // LZW
          return new _lzw.default();

        case 6:
          // JPEG
          throw new Error('old style JPEG compression is not supported.');

        case 7:
          // JPEG
          return new _jpeg.default(fileDirectory);

        case 8: // Deflate as recognized by Adobe

        case 32946:
          // Deflate GDAL default
          return new _deflate.default();

        case 32773:
          // packbits
          return new _packbits.default();

        default:
          throw new Error(`Unknown compression method identifier: ${fileDirectory.Compression}`);
      }
    }
  }, { "./raw": "V9bQ", "./lzw": "tcId", "./jpeg": "J7kk", "./deflate": "JAiC", "./packbits": "OcPz" }], "OQju": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resampleNearest = resampleNearest;
    exports.resampleBilinear = resampleBilinear;
    exports.resample = resample;
    exports.resampleNearestInterleaved = resampleNearestInterleaved;
    exports.resampleBilinearInterleaved = resampleBilinearInterleaved;
    exports.resampleInterleaved = resampleInterleaved;

    /**
     * @module resample
     */
    function copyNewSize(array, width, height, samplesPerPixel = 1) {
      return new (Object.getPrototypeOf(array).constructor)(width * height * samplesPerPixel);
    }
    /**
     * Resample the input arrays using nearest neighbor value selection.
     * @param {TypedArray[]} valueArrays The input arrays to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @returns {TypedArray[]} The resampled rasters
     */


    function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
      const relX = inWidth / outWidth;
      const relY = inHeight / outHeight;
      return valueArrays.map(array => {
        const newArray = copyNewSize(array, outWidth, outHeight);

        for (let y = 0; y < outHeight; ++y) {
          const cy = Math.min(Math.round(relY * y), inHeight - 1);

          for (let x = 0; x < outWidth; ++x) {
            const cx = Math.min(Math.round(relX * x), inWidth - 1);
            const value = array[cy * inWidth + cx];
            newArray[y * outWidth + x] = value;
          }
        }

        return newArray;
      });
    } // simple linear interpolation, code from:
    // https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support


    function lerp(v0, v1, t) {
      return (1 - t) * v0 + t * v1;
    }
    /**
     * Resample the input arrays using bilinear interpolation.
     * @param {TypedArray[]} valueArrays The input arrays to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @returns {TypedArray[]} The resampled rasters
     */


    function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
      const relX = inWidth / outWidth;
      const relY = inHeight / outHeight;
      return valueArrays.map(array => {
        const newArray = copyNewSize(array, outWidth, outHeight);

        for (let y = 0; y < outHeight; ++y) {
          const rawY = relY * y;
          const yl = Math.floor(rawY);
          const yh = Math.min(Math.ceil(rawY), inHeight - 1);

          for (let x = 0; x < outWidth; ++x) {
            const rawX = relX * x;
            const tx = rawX % 1;
            const xl = Math.floor(rawX);
            const xh = Math.min(Math.ceil(rawX), inWidth - 1);
            const ll = array[yl * inWidth + xl];
            const hl = array[yl * inWidth + xh];
            const lh = array[yh * inWidth + xl];
            const hh = array[yh * inWidth + xh];
            const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
            newArray[y * outWidth + x] = value;
          }
        }

        return newArray;
      });
    }
    /**
     * Resample the input arrays using the selected resampling method.
     * @param {TypedArray[]} valueArrays The input arrays to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @param {string} [method = 'nearest'] The desired resampling method
     * @returns {TypedArray[]} The resampled rasters
     */


    function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = 'nearest') {
      switch (method.toLowerCase()) {
        case 'nearest':
          return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);

        case 'bilinear':
        case 'linear':
          return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);

        default:
          throw new Error(`Unsupported resampling method: '${method}'`);
      }
    }
    /**
     * Resample the pixel interleaved input array using nearest neighbor value selection.
     * @param {TypedArray} valueArrays The input arrays to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @param {number} samples The number of samples per pixel for pixel
     *                         interleaved data
     * @returns {TypedArray} The resampled raster
     */


    function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
      const relX = inWidth / outWidth;
      const relY = inHeight / outHeight;
      const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);

      for (let y = 0; y < outHeight; ++y) {
        const cy = Math.min(Math.round(relY * y), inHeight - 1);

        for (let x = 0; x < outWidth; ++x) {
          const cx = Math.min(Math.round(relX * x), inWidth - 1);

          for (let i = 0; i < samples; ++i) {
            const value = valueArray[cy * inWidth * samples + cx * samples + i];
            newArray[y * outWidth * samples + x * samples + i] = value;
          }
        }
      }

      return newArray;
    }
    /**
     * Resample the pixel interleaved input array using bilinear interpolation.
     * @param {TypedArray} valueArrays The input arrays to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @param {number} samples The number of samples per pixel for pixel
     *                         interleaved data
     * @returns {TypedArray} The resampled raster
     */


    function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
      const relX = inWidth / outWidth;
      const relY = inHeight / outHeight;
      const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);

      for (let y = 0; y < outHeight; ++y) {
        const rawY = relY * y;
        const yl = Math.floor(rawY);
        const yh = Math.min(Math.ceil(rawY), inHeight - 1);

        for (let x = 0; x < outWidth; ++x) {
          const rawX = relX * x;
          const tx = rawX % 1;
          const xl = Math.floor(rawX);
          const xh = Math.min(Math.ceil(rawX), inWidth - 1);

          for (let i = 0; i < samples; ++i) {
            const ll = valueArray[yl * inWidth * samples + xl * samples + i];
            const hl = valueArray[yl * inWidth * samples + xh * samples + i];
            const lh = valueArray[yh * inWidth * samples + xl * samples + i];
            const hh = valueArray[yh * inWidth * samples + xh * samples + i];
            const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
            newArray[y * outWidth * samples + x * samples + i] = value;
          }
        }
      }

      return newArray;
    }
    /**
     * Resample the pixel interleaved input array using the selected resampling method.
     * @param {TypedArray} valueArray The input array to resample
     * @param {number} inWidth The width of the input rasters
     * @param {number} inHeight The height of the input rasters
     * @param {number} outWidth The desired width of the output rasters
     * @param {number} outHeight The desired height of the output rasters
     * @param {number} samples The number of samples per pixel for pixel
     *                                 interleaved data
     * @param {string} [method = 'nearest'] The desired resampling method
     * @returns {TypedArray} The resampled rasters
     */


    function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = 'nearest') {
      switch (method.toLowerCase()) {
        case 'nearest':
          return resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);

        case 'bilinear':
        case 'linear':
          return resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);

        default:
          throw new Error(`Unsupported resampling method: '${method}'`);
      }
    }
  }, {}], "eOWo": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _txml = _interopRequireDefault(require("txml"));

    var _globals = require("./globals");

    var _rgb = require("./rgb");

    var _compression = require("./compression");

    var _resample = require("./resample");

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    /* eslint max-len: ["error", { "code": 120 }] */
    function sum(array, start, end) {
      let s = 0;

      for (let i = start; i < end; ++i) {
        s += array[i];
      }

      return s;
    }

    function arrayForType(format, bitsPerSample, size) {
      switch (format) {
        case 1:
          // unsigned integer data
          switch (bitsPerSample) {
            case 8:
              return new Uint8Array(size);

            case 16:
              return new Uint16Array(size);

            case 32:
              return new Uint32Array(size);

            default:
              break;
          }

          break;

        case 2:
          // twos complement signed integer data
          switch (bitsPerSample) {
            case 8:
              return new Int8Array(size);

            case 16:
              return new Int16Array(size);

            case 32:
              return new Int32Array(size);

            default:
              break;
          }

          break;

        case 3:
          // floating point data
          switch (bitsPerSample) {
            case 32:
              return new Float32Array(size);

            case 64:
              return new Float64Array(size);

            default:
              break;
          }

          break;

        default:
          break;
      }

      throw Error('Unsupported data format/bitsPerSample');
    }
    /**
     * GeoTIFF sub-file image.
     */


    class GeoTIFFImage {
      /**
       * @constructor
       * @param {Object} fileDirectory The parsed file directory
       * @param {Object} geoKeys The parsed geo-keys
       * @param {DataView} dataView The DataView for the underlying file.
       * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
       * @param {Boolean} cache Whether or not decoded tiles shall be cached
       * @param {Source} source The datasource to read from
       */
      constructor(fileDirectory, geoKeys, dataView, littleEndian, cache, source) {
        this.fileDirectory = fileDirectory;
        this.geoKeys = geoKeys;
        this.dataView = dataView;
        this.littleEndian = littleEndian;
        this.tiles = cache ? {} : null;
        this.isTiled = !fileDirectory.StripOffsets;
        const planarConfiguration = fileDirectory.PlanarConfiguration;
        this.planarConfiguration = typeof planarConfiguration === 'undefined' ? 1 : planarConfiguration;

        if (this.planarConfiguration !== 1 && this.planarConfiguration !== 2) {
          throw new Error('Invalid planar configuration.');
        }

        this.source = source;
      }
      /**
       * Returns the associated parsed file directory.
       * @returns {Object} the parsed file directory
       */


      getFileDirectory() {
        return this.fileDirectory;
      }
      /**
       * Returns the associated parsed geo keys.
       * @returns {Object} the parsed geo keys
       */


      getGeoKeys() {
        return this.geoKeys;
      }
      /**
       * Returns the width of the image.
       * @returns {Number} the width of the image
       */


      getWidth() {
        return this.fileDirectory.ImageWidth;
      }
      /**
       * Returns the height of the image.
       * @returns {Number} the height of the image
       */


      getHeight() {
        return this.fileDirectory.ImageLength;
      }
      /**
       * Returns the number of samples per pixel.
       * @returns {Number} the number of samples per pixel
       */


      getSamplesPerPixel() {
        return this.fileDirectory.SamplesPerPixel;
      }
      /**
       * Returns the width of each tile.
       * @returns {Number} the width of each tile
       */


      getTileWidth() {
        return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
      }
      /**
       * Returns the height of each tile.
       * @returns {Number} the height of each tile
       */


      getTileHeight() {
        if (this.isTiled) {
          return this.fileDirectory.TileLength;
        }

        if (typeof this.fileDirectory.RowsPerStrip !== 'undefined') {
          return Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
        }

        return this.getHeight();
      }
      /**
       * Calculates the number of bytes for each pixel across all samples. Only full
       * bytes are supported, an exception is thrown when this is not the case.
       * @returns {Number} the bytes per pixel
       */


      getBytesPerPixel() {
        let bitsPerSample = 0;

        for (let i = 0; i < this.fileDirectory.BitsPerSample.length; ++i) {
          const bits = this.fileDirectory.BitsPerSample[i];

          if (bits % 8 !== 0) {
            throw new Error(`Sample bit-width of ${bits} is not supported.`);
          } else if (bits !== this.fileDirectory.BitsPerSample[0]) {
            throw new Error('Differing size of samples in a pixel are not supported.');
          }

          bitsPerSample += bits;
        }

        return bitsPerSample / 8;
      }

      getSampleByteSize(i) {
        if (i >= this.fileDirectory.BitsPerSample.length) {
          throw new RangeError(`Sample index ${i} is out of range.`);
        }

        const bits = this.fileDirectory.BitsPerSample[i];

        if (bits % 8 !== 0) {
          throw new Error(`Sample bit-width of ${bits} is not supported.`);
        }

        return bits / 8;
      }

      getReaderForSample(sampleIndex) {
        const format = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
        const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];

        switch (format) {
          case 1:
            // unsigned integer data
            switch (bitsPerSample) {
              case 8:
                return DataView.prototype.getUint8;

              case 16:
                return DataView.prototype.getUint16;

              case 32:
                return DataView.prototype.getUint32;

              default:
                break;
            }

            break;

          case 2:
            // twos complement signed integer data
            switch (bitsPerSample) {
              case 8:
                return DataView.prototype.getInt8;

              case 16:
                return DataView.prototype.getInt16;

              case 32:
                return DataView.prototype.getInt32;

              default:
                break;
            }

            break;

          case 3:
            switch (bitsPerSample) {
              case 32:
                return DataView.prototype.getFloat32;

              case 64:
                return DataView.prototype.getFloat64;

              default:
                break;
            }

            break;

          default:
            break;
        }

        throw Error('Unsupported data format/bitsPerSample');
      }

      getArrayForSample(sampleIndex, size) {
        const format = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
        const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];
        return arrayForType(format, bitsPerSample, size);
      }
      /**
       * Returns the decoded strip or tile.
       * @param {Number} x the strip or tile x-offset
       * @param {Number} y the tile y-offset (0 for stripped images)
       * @param {Number} sample the sample to get for separated samples
       * @param {Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
       * @returns {Promise.<ArrayBuffer>}
       */


      async getTileOrStrip(x, y, sample, poolOrDecoder) {
        const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
        const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
        let index;
        const {
          tiles
        } = this;

        if (this.planarConfiguration === 1) {
          index = y * numTilesPerRow + x;
        } else if (this.planarConfiguration === 2) {
          index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
        }

        let offset;
        let byteCount;

        if (this.isTiled) {
          offset = this.fileDirectory.TileOffsets[index];
          byteCount = this.fileDirectory.TileByteCounts[index];
        } else {
          offset = this.fileDirectory.StripOffsets[index];
          byteCount = this.fileDirectory.StripByteCounts[index];
        }

        const slice = await this.source.fetch(offset, byteCount); // either use the provided pool or decoder to decode the data

        let request;

        if (tiles === null) {
          request = poolOrDecoder.decode(this.fileDirectory, slice);
        } else if (!tiles[index]) {
          request = poolOrDecoder.decode(this.fileDirectory, slice);
          tiles[index] = request;
        }

        return {
          x,
          y,
          sample,
          data: await request
        };
      }
      /**
       * Internal read function.
       * @private
       * @param {Array} imageWindow The image window in pixel coordinates
       * @param {Array} samples The selected samples (0-based indices)
       * @param {TypedArray[]|TypedArray} valueArrays The array(s) to write into
       * @param {Boolean} interleave Whether or not to write in an interleaved manner
       * @param {Pool} pool The decoder pool
       * @returns {Promise<TypedArray[]>|Promise<TypedArray>}
       */


      async _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod) {
        const tileWidth = this.getTileWidth();
        const tileHeight = this.getTileHeight();
        const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
        const maxXTile = Math.min(Math.ceil(imageWindow[2] / tileWidth), Math.ceil(this.getWidth() / this.getTileWidth()));
        const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
        const maxYTile = Math.min(Math.ceil(imageWindow[3] / tileHeight), Math.ceil(this.getHeight() / this.getTileHeight()));
        const windowWidth = imageWindow[2] - imageWindow[0];
        let bytesPerPixel = this.getBytesPerPixel();
        const srcSampleOffsets = [];
        const sampleReaders = [];

        for (let i = 0; i < samples.length; ++i) {
          if (this.planarConfiguration === 1) {
            srcSampleOffsets.push(sum(this.fileDirectory.BitsPerSample, 0, samples[i]) / 8);
          } else {
            srcSampleOffsets.push(0);
          }

          sampleReaders.push(this.getReaderForSample(samples[i]));
        }

        const promises = [];
        const {
          littleEndian
        } = this;

        for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
          for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
            for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
              const si = sampleIndex;
              const sample = samples[sampleIndex];

              if (this.planarConfiguration === 2) {
                bytesPerPixel = this.getSampleByteSize(sample);
              }

              const promise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder);
              promises.push(promise);
              promise.then(tile => {
                const buffer = tile.data;
                const dataView = new DataView(buffer);
                const firstLine = tile.y * tileHeight;
                const firstCol = tile.x * tileWidth;
                const lastLine = (tile.y + 1) * tileHeight;
                const lastCol = (tile.x + 1) * tileWidth;
                const reader = sampleReaders[si];
                const ymax = Math.min(tileHeight, tileHeight - (lastLine - imageWindow[3]));
                const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]));

                for (let y = 256 * Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
                  for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                    const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
                    if (pixelOffset >= dataView.byteLength) {
                      //DataView长度不对 少了四分之三12
                      console.log(pixelOffset)
                    }
                    const value = reader.call(dataView, pixelOffset + srcSampleOffsets[si], littleEndian);
                    let windowCoordinate;

                    if (interleave) {
                      windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
                      valueArrays[windowCoordinate] = value;
                    } else {
                      windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
                      valueArrays[si][windowCoordinate] = value;
                    }
                  }
                }
              });
            }
          }
        }

        await Promise.all(promises);

        if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
          let resampled;

          if (interleave) {
            resampled = (0, _resample.resampleInterleaved)(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, samples.length, resampleMethod);
          } else {
            resampled = (0, _resample.resample)(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, resampleMethod);
          }

          resampled.width = width;
          resampled.height = height;
          return resampled;
        }

        valueArrays.width = width || imageWindow[2] - imageWindow[0];
        valueArrays.height = height || imageWindow[3] - imageWindow[1];
        return valueArrays;
      }
      /**
       * Reads raster data from the image. This function reads all selected samples
       * into separate arrays of the correct type for that sample or into a single
       * combined array when `interleave` is set. When provided, only a subset
       * of the raster is read for each sample.
       *
       * @param {Object} [options={}] optional parameters
       * @param {Array} [options.window=whole image] the subset to read data from.
       * @param {Array} [options.samples=all samples] the selection of samples to read from.
       * @param {Boolean} [options.interleave=false] whether the data shall be read
       *                                             in one single array or separate
       *                                             arrays.
       * @param {Number} [options.pool=null] The optional decoder pool to use.
       * @param {number} [options.width] The desired width of the output. When the width is
       *                                 not the same as the images, resampling will be
       *                                 performed.
       * @param {number} [options.height] The desired height of the output. When the width
       *                                  is not the same as the images, resampling will
       *                                  be performed.
       * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
       * @param {number|number[]} [options.fillValue] The value to use for parts of the image
       *                                              outside of the images extent. When
       *                                              multiple samples are requested, an
       *                                              array of fill values can be passed.
       * @returns {Promise.<(TypedArray|TypedArray[])>} the decoded arrays as a promise
       */


      async readRasters({
        window: wnd,
        samples = [],
        interleave,
        pool = null,
        width,
        height,
        resampleMethod,
        fillValue
      } = {}) {
        const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()]; // check parameters

        if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
          throw new Error('Invalid subsets');
        }

        const imageWindowWidth = imageWindow[2] - imageWindow[0];
        const imageWindowHeight = imageWindow[3] - imageWindow[1];
        const numPixels = imageWindowWidth * imageWindowHeight;

        if (!samples || !samples.length) {
          for (let i = 0; i < this.fileDirectory.SamplesPerPixel; ++i) {
            samples.push(i);
          }
        } else {
          for (let i = 0; i < samples.length; ++i) {
            if (samples[i] >= this.fileDirectory.SamplesPerPixel) {
              return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
            }
          }
        }

        let valueArrays;

        if (interleave) {
          const format = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1;
          const bitsPerSample = Math.max.apply(null, this.fileDirectory.BitsPerSample);
          valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);

          if (fillValue) {
            valueArrays.fill(fillValue);
          }
        } else {
          valueArrays = [];

          for (let i = 0; i < samples.length; ++i) {
            const valueArray = this.getArrayForSample(samples[i], numPixels);

            if (Array.isArray(fillValue) && i < fillValue.length) {
              valueArray.fill(fillValue[i]);
            } else if (fillValue && !Array.isArray(fillValue)) {
              valueArray.fill(fillValue);
            }

            valueArrays.push(valueArray);
          }
        }

        const poolOrDecoder = pool || (0, _compression.getDecoder)(this.fileDirectory);
        const result = await this._readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod);
        return result;
      }
      /**
       * Reads raster data from the image as RGB. The result is always an
       * interleaved typed array.
       * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
       * When no other method is applicable, the first sample is used to produce a
       * greayscale image.
       * When provided, only a subset of the raster is read for each sample.
       *
       * @param {Object} [options] optional parameters
       * @param {Array} [options.window=whole image] the subset to read data from.
       * @param {Number} [pool=null] The optional decoder pool to use.
       * @param {number} [width] The desired width of the output. When the width is no the
       *                         same as the images, resampling will be performed.
       * @param {number} [height] The desired height of the output. When the width is no the
       *                          same as the images, resampling will be performed.
       * @param {string} [resampleMethod='nearest'] The desired resampling method.
       * @param {bool} [enableAlpha=false] Enable reading alpha channel if present.
       * @returns {Promise.<TypedArray|TypedArray[]>} the RGB array as a Promise
       */


      async readRGB({
        window,
        pool = null,
        width,
        height,
        resampleMethod,
        enableAlpha = false
      } = {}) {
        const imageWindow = window || [0, 0, this.getWidth(), this.getHeight()]; // check parameters

        if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
          throw new Error('Invalid subsets');
        }

        const pi = this.fileDirectory.PhotometricInterpretation;

        if (pi === _globals.photometricInterpretations.RGB) {
          let s = [0, 1, 2];

          if (!(this.fileDirectory.ExtraSamples === _globals.ExtraSamplesValues.Unspecified) && enableAlpha) {
            s = [];

            for (let i = 0; i < this.fileDirectory.BitsPerSample.length; i += 1) {
              s.push(i);
            }
          }

          return this.readRasters({
            window,
            interleave: true,
            samples: s,
            pool,
            width,
            height
          });
        }

        let samples;

        switch (pi) {
          case _globals.photometricInterpretations.WhiteIsZero:
          case _globals.photometricInterpretations.BlackIsZero:
          case _globals.photometricInterpretations.Palette:
            samples = [0];
            break;

          case _globals.photometricInterpretations.CMYK:
            samples = [0, 1, 2, 3];
            break;

          case _globals.photometricInterpretations.YCbCr:
          case _globals.photometricInterpretations.CIELab:
            samples = [0, 1, 2];
            break;

          default:
            throw new Error('Invalid or unsupported photometric interpretation.');
        }

        const subOptions = {
          window: imageWindow,
          interleave: true,
          samples,
          pool,
          width,
          height,
          resampleMethod
        };
        const {
          fileDirectory
        } = this;
        const raster = await this.readRasters(subOptions);
        const max = 2 ** this.fileDirectory.BitsPerSample[0];
        let data;

        switch (pi) {
          case _globals.photometricInterpretations.WhiteIsZero:
            data = (0, _rgb.fromWhiteIsZero)(raster, max);
            break;

          case _globals.photometricInterpretations.BlackIsZero:
            data = (0, _rgb.fromBlackIsZero)(raster, max);
            break;

          case _globals.photometricInterpretations.Palette:
            data = (0, _rgb.fromPalette)(raster, fileDirectory.ColorMap);
            break;

          case _globals.photometricInterpretations.CMYK:
            data = (0, _rgb.fromCMYK)(raster);
            break;

          case _globals.photometricInterpretations.YCbCr:
            data = (0, _rgb.fromYCbCr)(raster);
            break;

          case _globals.photometricInterpretations.CIELab:
            data = (0, _rgb.fromCIELab)(raster);
            break;

          default:
            throw new Error('Unsupported photometric interpretation.');
        }

        data.width = raster.width;
        data.height = raster.height;
        return data;
      }
      /**
       * Returns an array of tiepoints.
       * @returns {Object[]}
       */


      getTiePoints() {
        if (!this.fileDirectory.ModelTiepoint) {
          return [];
        }

        const tiePoints = [];

        for (let i = 0; i < this.fileDirectory.ModelTiepoint.length; i += 6) {
          tiePoints.push({
            i: this.fileDirectory.ModelTiepoint[i],
            j: this.fileDirectory.ModelTiepoint[i + 1],
            k: this.fileDirectory.ModelTiepoint[i + 2],
            x: this.fileDirectory.ModelTiepoint[i + 3],
            y: this.fileDirectory.ModelTiepoint[i + 4],
            z: this.fileDirectory.ModelTiepoint[i + 5]
          });
        }

        return tiePoints;
      }
      /**
       * Returns the parsed GDAL metadata items.
       *
       * If sample is passed to null, dataset-level metadata will be returned.
       * Otherwise only metadata specific to the provided sample will be returned.
       *
       * @param {Number} [sample=null] The sample index.
       * @returns {Object}
       */


      getGDALMetadata(sample = null) {
        const metadata = {};

        if (!this.fileDirectory.GDAL_METADATA) {
          return null;
        }

        const string = this.fileDirectory.GDAL_METADATA;
        const xmlDom = (0, _txml.default)(string.substring(0, string.length - 1));

        if (!xmlDom[0].tagName) {
          throw new Error('Failed to parse GDAL metadata XML.');
        }

        const root = xmlDom[0];

        if (root.tagName !== 'GDALMetadata') {
          throw new Error('Unexpected GDAL metadata XML tag.');
        }

        let items = root.children.filter(child => child.tagName === 'Item');

        if (sample !== null) {
          items = items.filter(item => Number(item.attributes.sample) === sample);
        }

        for (let i = 0; i < items.length; ++i) {
          const item = items[i];
          metadata[item.attributes.name] = item.children[0];
        }

        return metadata;
      }
      /**
       * Returns the GDAL nodata value
       * @returns {Number} or null
       */


      getGDALNoData() {
        if (!this.fileDirectory.GDAL_NODATA) {
          return null;
        }

        const string = this.fileDirectory.GDAL_NODATA;
        return Number(string.substring(0, string.length - 1));
      }
      /**
       * Returns the image origin as a XYZ-vector. When the image has no affine
       * transformation, then an exception is thrown.
       * @returns {Array} The origin as a vector
       */


      getOrigin() {
        const tiePoints = this.fileDirectory.ModelTiepoint;
        const modelTransformation = this.fileDirectory.ModelTransformation;

        if (tiePoints && tiePoints.length === 6) {
          return [tiePoints[3], tiePoints[4], tiePoints[5]];
        }

        if (modelTransformation) {
          return [modelTransformation[3], modelTransformation[7], modelTransformation[11]];
        }

        throw new Error('The image does not have an affine transformation.');
      }
      /**
       * Returns the image resolution as a XYZ-vector. When the image has no affine
       * transformation, then an exception is thrown.
       * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
       *                                             in cases when the current image does not have the
       *                                             required tags on its own.
       * @returns {Array} The resolution as a vector
       */


      getResolution(referenceImage = null) {
        const modelPixelScale = this.fileDirectory.ModelPixelScale;
        const modelTransformation = this.fileDirectory.ModelTransformation;

        if (modelPixelScale) {
          return [modelPixelScale[0], -modelPixelScale[1], modelPixelScale[2]];
        }

        if (modelTransformation) {
          return [modelTransformation[0], modelTransformation[5], modelTransformation[10]];
        }

        if (referenceImage) {
          const [refResX, refResY, refResZ] = referenceImage.getResolution();
          return [refResX * referenceImage.getWidth() / this.getWidth(), refResY * referenceImage.getHeight() / this.getHeight(), refResZ * referenceImage.getWidth() / this.getWidth()];
        }

        throw new Error('The image does not have an affine transformation.');
      }
      /**
       * Returns whether or not the pixels of the image depict an area (or point).
       * @returns {Boolean} Whether the pixels are a point
       */


      pixelIsArea() {
        return this.geoKeys.GTRasterTypeGeoKey === 1;
      }
      /**
       * Returns the image bounding box as an array of 4 values: min-x, min-y,
       * max-x and max-y. When the image has no affine transformation, then an
       * exception is thrown.
       * @returns {Array} The bounding box
       */


      getBoundingBox() {
        const origin = this.getOrigin();
        const resolution = this.getResolution();
        const x1 = origin[0];
        const y1 = origin[1];
        const x2 = x1 + resolution[0] * this.getWidth();
        const y2 = y1 + resolution[1] * this.getHeight();
        return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
      }

    }

    var _default = GeoTIFFImage;
    exports.default = _default;
  }, { "./globals": "j27V", "./rgb": "fpBl", "./compression": "FGCZ", "./resample": "OQju" }], "dqpX": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    class DataView64 {
      constructor(arrayBuffer) {
        this._dataView = new DataView(arrayBuffer);
      }

      get buffer() {
        return this._dataView.buffer;
      }

      getUint64(offset, littleEndian) {
        const left = this.getUint32(offset, littleEndian);
        const right = this.getUint32(offset + 4, littleEndian);
        let combined;

        if (littleEndian) {
          combined = left + 2 ** 32 * right;

          if (!Number.isSafeInteger(combined)) {
            throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
          }

          return combined;
        }

        combined = 2 ** 32 * left + right;

        if (!Number.isSafeInteger(combined)) {
          throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
        }

        return combined;
      } // adapted from https://stackoverflow.com/a/55338384/8060591


      getInt64(offset, littleEndian) {
        let value = 0;
        const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 0x80) > 0;
        let carrying = true;

        for (let i = 0; i < 8; i++) {
          let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));

          if (isNegative) {
            if (carrying) {
              if (byte !== 0x00) {
                byte = ~(byte - 1) & 0xff;
                carrying = false;
              }
            } else {
              byte = ~byte & 0xff;
            }
          }

          value += byte * 256 ** i;
        }

        if (isNegative) {
          value = -value;
        }

        return value;
      }

      getUint8(offset, littleEndian) {
        return this._dataView.getUint8(offset, littleEndian);
      }

      getInt8(offset, littleEndian) {
        return this._dataView.getInt8(offset, littleEndian);
      }

      getUint16(offset, littleEndian) {
        return this._dataView.getUint16(offset, littleEndian);
      }

      getInt16(offset, littleEndian) {
        return this._dataView.getInt16(offset, littleEndian);
      }

      getUint32(offset, littleEndian) {
        return this._dataView.getUint32(offset, littleEndian);
      }

      getInt32(offset, littleEndian) {
        return this._dataView.getInt32(offset, littleEndian);
      }

      getFloat32(offset, littleEndian) {
        return this._dataView.getFloat32(offset, littleEndian);
      }

      getFloat64(offset, littleEndian) {
        return this._dataView.getFloat64(offset, littleEndian);
      }

    }

    exports.default = DataView64;
  }, {}], "dGLV": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    class DataSlice {
      constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
        this._dataView = new DataView(arrayBuffer);
        this._sliceOffset = sliceOffset;
        this._littleEndian = littleEndian;
        this._bigTiff = bigTiff;
      }

      get sliceOffset() {
        return this._sliceOffset;
      }

      get sliceTop() {
        return this._sliceOffset + this.buffer.byteLength;
      }

      get littleEndian() {
        return this._littleEndian;
      }

      get bigTiff() {
        return this._bigTiff;
      }

      get buffer() {
        return this._dataView.buffer;
      }

      covers(offset, length) {
        return this.sliceOffset <= offset && this.sliceTop >= offset + length;
      }

      readUint8(offset) {
        return this._dataView.getUint8(offset - this._sliceOffset, this._littleEndian);
      }

      readInt8(offset) {
        return this._dataView.getInt8(offset - this._sliceOffset, this._littleEndian);
      }

      readUint16(offset) {
        return this._dataView.getUint16(offset - this._sliceOffset, this._littleEndian);
      }

      readInt16(offset) {
        return this._dataView.getInt16(offset - this._sliceOffset, this._littleEndian);
      }

      readUint32(offset) {
        return this._dataView.getUint32(offset - this._sliceOffset, this._littleEndian);
      }

      readInt32(offset) {
        return this._dataView.getInt32(offset - this._sliceOffset, this._littleEndian);
      }

      readFloat32(offset) {
        return this._dataView.getFloat32(offset - this._sliceOffset, this._littleEndian);
      }

      readFloat64(offset) {
        return this._dataView.getFloat64(offset - this._sliceOffset, this._littleEndian);
      }

      readUint64(offset) {
        const left = this.readUint32(offset);
        const right = this.readUint32(offset + 4);
        let combined;

        if (this._littleEndian) {
          combined = left + 2 ** 32 * right;

          if (!Number.isSafeInteger(combined)) {
            throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
          }

          return combined;
        }

        combined = 2 ** 32 * left + right;

        if (!Number.isSafeInteger(combined)) {
          throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
        }

        return combined;
      } // adapted from https://stackoverflow.com/a/55338384/8060591


      readInt64(offset) {
        let value = 0;
        const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 0x80) > 0;
        let carrying = true;

        for (let i = 0; i < 8; i++) {
          let byte = this._dataView.getUint8(offset + (this._littleEndian ? i : 7 - i));

          if (isNegative) {
            if (carrying) {
              if (byte !== 0x00) {
                byte = ~(byte - 1) & 0xff;
                carrying = false;
              }
            } else {
              byte = ~byte & 0xff;
            }
          }

          value += byte * 256 ** i;
        }

        if (isNegative) {
          value = -value;
        }

        return value;
      }

      readOffset(offset) {
        if (this._bigTiff) {
          return this.readUint64(offset);
        }

        return this.readUint32(offset);
      }

    }

    exports.default = DataSlice;
  }, {}], "dHPO": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _threads = require("threads");

    const defaultPoolSize = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : null;
    /**
     * @module pool
     */

    /**
     * Pool for workers to decode chunks of the images.
     */

    class Pool {
      /**
       * @constructor
       * @param {Number} size The size of the pool. Defaults to the number of CPUs
       *                      available. When this parameter is `null` or 0, then the
       *                      decoding will be done in the main thread.
       * @param {Worker} worker The decoder worker, loaded and initialised. Enables
       *                        loading the worker using worker-loader(or others) externally
       *                        when using this library as a webpack dependency.
       */
      constructor(size = defaultPoolSize, worker = new _threads.Worker("/decoder.worker.dc66acce.js")) {
        this.pool = (0, _threads.Pool)(() => (0, _threads.spawn)(worker), size);
      }
      /**
       * Decode the given block of bytes with the set compression method.
       * @param {ArrayBuffer} buffer the array buffer of bytes to decode.
       * @returns {Promise.<ArrayBuffer>} the decoded result as a `Promise`
       */


      async decode(fileDirectory, buffer) {
        return new Promise((resolve, reject) => {
          this.pool.queue(async decode => {
            try {
              const data = await decode(fileDirectory, (0, _threads.Transfer)(buffer));
              resolve(data);
            } catch (err) {
              reject(err);
            }
          });
        });
      }

      destroy() {
        this.pool.terminate(true);
      }

    }

    var _default = Pool;
    exports.default = _default;
  }, { "./decoder.worker.js": [["decoder.worker.dc66acce.js", "LHx9"], "decoder.worker.dc66acce.js.map", "LHx9"] }], "cUx7": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.makeFetchSource = makeFetchSource;
    exports.makeXHRSource = makeXHRSource;
    exports.makeHttpSource = makeHttpSource;
    exports.makeRemoteSource = makeRemoteSource;
    exports.makeBufferSource = makeBufferSource;
    exports.makeFileSource = makeFileSource;
    exports.makeFileReaderSource = makeFileReaderSource;

    var _buffer = require("buffer");

    var _fs = require("fs");

    var _http = _interopRequireDefault(require("http"));

    var _https = _interopRequireDefault(require("https"));

    var _url = _interopRequireDefault(require("url"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function readRangeFromBlocks(blocks, rangeOffset, rangeLength) {
      const rangeTop = rangeOffset + rangeLength;
      const rangeData = new ArrayBuffer(rangeLength);
      const rangeView = new Uint8Array(rangeData);

      for (const block of blocks) {
        const delta = block.offset - rangeOffset;
        const topDelta = block.top - rangeTop;
        let blockInnerOffset = 0;
        let rangeInnerOffset = 0;
        let usedBlockLength;

        if (delta < 0) {
          blockInnerOffset = -delta;
        } else if (delta > 0) {
          rangeInnerOffset = delta;
        }

        if (topDelta < 0) {
          usedBlockLength = block.length - blockInnerOffset;
        } else {
          usedBlockLength = rangeTop - block.offset - blockInnerOffset;
        }

        const blockView = new Uint8Array(block.data, blockInnerOffset, usedBlockLength);
        rangeView.set(blockView, rangeInnerOffset);
      }

      return rangeData;
    }
    /**
     * Interface for Source objects.
     * @interface Source
     */

    /**
     * @function Source#fetch
     * @summary The main method to retrieve the data from the source.
     * @param {number} offset The offset to read from in the source
     * @param {number} length The requested number of bytes
     */

    /**
     * @typedef {object} Block
     * @property {ArrayBuffer} data The actual data of the block.
     * @property {number} offset The actual offset of the block within the file.
     * @property {number} length The actual size of the block in bytes.
     */

    /**
     * Callback type for sources to request patches of data.
     * @callback requestCallback
     * @async
     * @param {number} offset The offset within the file.
     * @param {number} length The desired length of data to be read.
     * @returns {Promise<Block>} The block of data.
     */

    /**
     * @module source
     */

    /*
     * Split a list of identifiers to form groups of coherent ones
     */


    function getCoherentBlockGroups(blockIds) {
      if (blockIds.length === 0) {
        return [];
      }

      const groups = [];
      let current = [];
      groups.push(current);

      for (let i = 0; i < blockIds.length; ++i) {
        if (i === 0 || blockIds[i] === blockIds[i - 1] + 1) {
          current.push(blockIds[i]);
        } else {
          current = [blockIds[i]];
          groups.push(current);
        }
      }

      return groups;
    }
    /*
     * Promisified wrapper around 'setTimeout' to allow 'await'
     */


    async function wait(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    /**
     * BlockedSource - an abstraction of (remote) files.
     * @implements Source
     */


    class BlockedSource {
      /**
       * @param {requestCallback} retrievalFunction Callback function to request data
       * @param {object} options Additional options
       * @param {object} options.blockSize Size of blocks to be fetched
       */
      constructor(retrievalFunction, {
        blockSize = 65536
      } = {}) {
        this.retrievalFunction = retrievalFunction;
        this.blockSize = blockSize; // currently running block requests

        this.blockRequests = new Map(); // already retrieved blocks

        this.blocks = new Map(); // block ids waiting for a batched request. Either a Set or null

        this.blockIdsAwaitingRequest = null;
      }
      /**
       * Fetch a subset of the file.
       * @param {number} offset The offset within the file to read from.
       * @param {number} length The length in bytes to read from.
       * @returns {ArrayBuffer} The subset of the file.
       */


      async fetch(offset, length, immediate = false) {
        const top = offset + length; // calculate what blocks intersect the specified range (offset + length)
        // determine what blocks are already stored or beeing requested

        const firstBlockOffset = Math.floor(offset / this.blockSize) * this.blockSize;
        const allBlockIds = [];
        const missingBlockIds = [];
        const blockRequests = [];

        for (let current = firstBlockOffset; current < top; current += this.blockSize) {
          const blockId = Math.floor(current / this.blockSize);

          if (!this.blocks.has(blockId) && !this.blockRequests.has(blockId)) {
            missingBlockIds.push(blockId);
          }

          if (this.blockRequests.has(blockId)) {
            blockRequests.push(this.blockRequests.get(blockId));
          }

          allBlockIds.push(blockId);
        } // determine whether there are already blocks in the queue to be requested
        // if so, add the missing blocks to this list


        if (!this.blockIdsAwaitingRequest) {
          this.blockIdsAwaitingRequest = new Set(missingBlockIds);
        } else {
          for (let i = 0; i < missingBlockIds.length; ++i) {
            const id = missingBlockIds[i];
            this.blockIdsAwaitingRequest.add(id);
          }
        } // in immediate mode, we don't want to wait for possible additional requests coming in


        if (!immediate) {
          await wait();
        } // determine if we are the thread to start the requests.


        if (this.blockIdsAwaitingRequest) {
          // get all coherent blocks as groups to be requested in a single request
          const groups = getCoherentBlockGroups(Array.from(this.blockIdsAwaitingRequest).sort()); // iterate over all blocks

          for (const group of groups) {
            // fetch a group as in a single request
            const request = this.requestData(group[0] * this.blockSize, group.length * this.blockSize); // for each block in the request, make a small 'splitter',
            // i.e: wait for the request to finish, then cut out the bytes for
            // that block and store it there.
            // we keep that as a promise in 'blockRequests' to allow waiting on
            // a single block.

            for (let i = 0; i < group.length; ++i) {
              const id = group[i];
              this.blockRequests.set(id, (async () => {
                const response = await request;
                const o = i * this.blockSize;
                const t = Math.min(o + this.blockSize, response.data.byteLength);
                const data = response.data.slice(o, t);
                this.blockRequests.delete(id);
                this.blocks.set(id, {
                  data,
                  offset: response.offset + o,
                  length: data.byteLength,
                  top: response.offset + t
                });
              })());
            }
          }

          this.blockIdsAwaitingRequest = null;
        } // get a list of currently running requests for the blocks still missing


        const missingRequests = [];

        for (const blockId of missingBlockIds) {
          if (this.blockRequests.has(blockId)) {
            missingRequests.push(this.blockRequests.get(blockId));
          }
        } // wait for all missing requests to finish


        await Promise.all(missingRequests);
        await Promise.all(blockRequests); // now get all blocks for the request and return a summary buffer

        const blocks = allBlockIds.map(id => this.blocks.get(id));
        return readRangeFromBlocks(blocks, offset, length);
      }

      async requestData(requestedOffset, requestedLength) {
        const response = await this.retrievalFunction(requestedOffset, requestedLength);

        if (!response.length) {
          response.length = response.data.byteLength;
        } else if (response.length !== response.data.byteLength) {
          response.data = response.data.slice(0, response.length);
        }

        response.top = response.offset + response.length;
        return response;
      }

    }
    /**
     * Create a new source to read from a remote file using the
     * [fetch]{@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API} API.
     * @param {string} url The URL to send requests to.
     * @param {Object} [options] Additional options.
     * @param {Number} [options.blockSize] The block size to use.
     * @param {object} [options.headers] Additional headers to be sent to the server.
     * @returns The constructed source
     */


    function makeFetchSource(url, {
      headers = {},
      blockSize
    } = {}) {
      return new BlockedSource(async (offset, length) => {
        const response = await fetch(url, {
          headers: {
            ...headers,
            Range: `bytes=${offset}-${offset + length - 1}`
          }
        }); // check the response was okay and if the server actually understands range requests

        if (!response.ok) {
          throw new Error('Error fetching data.');
        } else if (response.status === 206) {
          const data = response.arrayBuffer ? await response.arrayBuffer() : (await response.buffer()).buffer;
          return {
            data,
            offset,
            length
          };
        } else {
          const data = response.arrayBuffer ? await response.arrayBuffer() : (await response.buffer()).buffer;
          return {
            data,
            offset: 0,
            length: data.byteLength
          };
        }
      }, {
        blockSize
      });
    }
    /**
     * Create a new source to read from a remote file using the
     * [XHR]{@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest} API.
     * @param {string} url The URL to send requests to.
     * @param {Object} [options] Additional options.
     * @param {Number} [options.blockSize] The block size to use.
     * @param {object} [options.headers] Additional headers to be sent to the server.
     * @returns The constructed source
     */


    function makeXHRSource(url, {
      headers = {},
      blockSize
    } = {}) {
      return new BlockedSource(async (offset, length) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('GET', url);
          request.responseType = 'arraybuffer';
          const requestHeaders = {
            ...headers,
            Range: `bytes=${offset}-${offset + length - 1}`
          };

          for (const [key, value] of Object.entries(requestHeaders)) {
            request.setRequestHeader(key, value);
          }

          request.onload = () => {
            const data = request.response;

            if (request.status === 206) {
              resolve({
                data,
                offset,
                length
              });
            } else {
              resolve({
                data,
                offset: 0,
                length: data.byteLength
              });
            }
          };

          request.onerror = reject;
          request.send();
        });
      }, {
        blockSize
      });
    }
    /**
     * Create a new source to read from a remote file using the node
     * [http]{@link https://nodejs.org/api/http.html} API.
     * @param {string} url The URL to send requests to.
     * @param {Object} [options] Additional options.
     * @param {Number} [options.blockSize] The block size to use.
     * @param {object} [options.headers] Additional headers to be sent to the server.
     */


    function makeHttpSource(url, {
      headers = {},
      blockSize
    } = {}) {
      return new BlockedSource(async (offset, length) => new Promise((resolve, reject) => {
        const parsed = _url.default.parse(url);

        const request = (parsed.protocol === 'http:' ? _http.default : _https.default).get({
          ...parsed,
          headers: {
            ...headers,
            Range: `bytes=${offset}-${offset + length - 1}`
          }
        }, result => {
          const chunks = []; // collect chunks

          result.on('data', chunk => {
            chunks.push(chunk);
          }); // concatenate all chunks and resolve the promise with the resulting buffer

          result.on('end', () => {
            const data = _buffer.Buffer.concat(chunks).buffer;

            resolve({
              data,
              offset,
              length: data.byteLength
            });
          });
        });
        request.on('error', reject);
      }), {
        blockSize
      });
    }
    /**
     * Create a new source to read from a remote file. Uses either XHR, fetch or nodes http API.
     * @param {string} url The URL to send requests to.
     * @param {Object} [options] Additional options.
     * @param {Boolean} [options.forceXHR] Force the usage of XMLHttpRequest.
     * @param {Number} [options.blockSize] The block size to use.
     * @param {object} [options.headers] Additional headers to be sent to the server.
     * @returns The constructed source
     */


    function makeRemoteSource(url, options) {
      const {
        forceXHR
      } = options;

      if (typeof fetch === 'function' && !forceXHR) {
        return makeFetchSource(url, options);
      }

      if (typeof XMLHttpRequest !== 'undefined') {
        return makeXHRSource(url, options);
      }

      if (_http.default.get) {
        return makeHttpSource(url, options);
      }

      throw new Error('No remote source available');
    }
    /**
     * Create a new source to read from a local
     * [ArrayBuffer]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}.
     * @param {ArrayBuffer} arrayBuffer The ArrayBuffer to parse the GeoTIFF from.
     * @returns The constructed source
     */


    function makeBufferSource(arrayBuffer) {
      return {
        async fetch(offset, length) {
          return arrayBuffer.slice(offset, offset + length);
        }

      };
    }

    function closeAsync(fd) {
      return new Promise((resolve, reject) => {
        (0, _fs.close)(fd, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    function openAsync(path, flags, mode = undefined) {
      return new Promise((resolve, reject) => {
        (0, _fs.open)(path, flags, mode, (err, fd) => {
          if (err) {
            reject(err);
          } else {
            resolve(fd);
          }
        });
      });
    }

    function readAsync(...args) {
      return new Promise((resolve, reject) => {
        (0, _fs.read)(...args, (err, bytesRead, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              bytesRead,
              buffer
            });
          }
        });
      });
    }
    /**
     * Creates a new source using the node filesystem API.
     * @param {string} path The path to the file in the local filesystem.
     * @returns The constructed source
     */


    function makeFileSource(path) {
      const fileOpen = openAsync(path, 'r');
      return {
        async fetch(offset, length) {
          const fd = await fileOpen;
          const {
            buffer
          } = await readAsync(fd, _buffer.Buffer.alloc(length), 0, length, offset);
          return buffer.buffer;
        },

        async close() {
          const fd = await fileOpen;
          return await closeAsync(fd);
        }

      };
    }
    /**
     * Create a new source from a given file/blob.
     * @param {Blob} file The file or blob to read from.
     * @returns The constructed source
     */


    function makeFileReaderSource(file) {
      return {
        async fetch(offset, length) {
          return new Promise((resolve, reject) => {
            const blob = file.slice(offset, offset + length);
            const reader = new FileReader();

            reader.onload = event => resolve(event.target.result);

            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
          });
        }

      };
    }
  }, {}], "FOZT": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assign = assign;
    exports.chunk = chunk;
    exports.endsWith = endsWith;
    exports.forEach = forEach;
    exports.invert = invert;
    exports.range = range;
    exports.times = times;
    exports.toArray = toArray;
    exports.toArrayRecursively = toArrayRecursively;

    function assign(target, source) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }

    function chunk(iterable, length) {
      const results = [];
      const lengthOfIterable = iterable.length;

      for (let i = 0; i < lengthOfIterable; i += length) {
        const chunked = [];

        for (let ci = i; ci < i + length; ci++) {
          chunked.push(iterable[ci]);
        }

        results.push(chunked);
      }

      return results;
    }

    function endsWith(string, expectedEnding) {
      if (string.length < expectedEnding.length) {
        return false;
      }

      const actualEnding = string.substr(string.length - expectedEnding.length);
      return actualEnding === expectedEnding;
    }

    function forEach(iterable, func) {
      const {
        length
      } = iterable;

      for (let i = 0; i < length; i++) {
        func(iterable[i], i);
      }
    }

    function invert(oldObj) {
      const newObj = {};

      for (const key in oldObj) {
        if (oldObj.hasOwnProperty(key)) {
          const value = oldObj[key];
          newObj[value] = key;
        }
      }

      return newObj;
    }

    function range(n) {
      const results = [];

      for (let i = 0; i < n; i++) {
        results.push(i);
      }

      return results;
    }

    function times(numTimes, func) {
      const results = [];

      for (let i = 0; i < numTimes; i++) {
        results.push(func(i));
      }

      return results;
    }

    function toArray(iterable) {
      const results = [];
      const {
        length
      } = iterable;

      for (let i = 0; i < length; i++) {
        results.push(iterable[i]);
      }

      return results;
    }

    function toArrayRecursively(input) {
      if (input.length) {
        return toArray(input).map(toArrayRecursively);
      }

      return input;
    }
  }, {}], "BGyE": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.writeGeotiff = writeGeotiff;

    var _globals = require("./globals");

    var _utils = require("./utils");

    /*
      Some parts of this file are based on UTIF.js,
      which was released under the MIT License.
      You can view that here:
      https://github.com/photopea/UTIF.js/blob/master/LICENSE
    */
    const tagName2Code = (0, _utils.invert)(_globals.fieldTagNames);
    const geoKeyName2Code = (0, _utils.invert)(_globals.geoKeyNames);
    const name2code = {};
    (0, _utils.assign)(name2code, tagName2Code);
    (0, _utils.assign)(name2code, geoKeyName2Code);
    const typeName2byte = (0, _utils.invert)(_globals.fieldTypeNames); // config variables

    const numBytesInIfd = 1000;
    const _binBE = {
      nextZero: (data, o) => {
        let oincr = o;

        while (data[oincr] !== 0) {
          oincr++;
        }

        return oincr;
      },
      readUshort: (buff, p) => {
        return buff[p] << 8 | buff[p + 1];
      },
      readShort: (buff, p) => {
        const a = _binBE.ui8;
        a[0] = buff[p + 1];
        a[1] = buff[p + 0];
        return _binBE.i16[0];
      },
      readInt: (buff, p) => {
        const a = _binBE.ui8;
        a[0] = buff[p + 3];
        a[1] = buff[p + 2];
        a[2] = buff[p + 1];
        a[3] = buff[p + 0];
        return _binBE.i32[0];
      },
      readUint: (buff, p) => {
        const a = _binBE.ui8;
        a[0] = buff[p + 3];
        a[1] = buff[p + 2];
        a[2] = buff[p + 1];
        a[3] = buff[p + 0];
        return _binBE.ui32[0];
      },
      readASCII: (buff, p, l) => {
        return l.map(i => String.fromCharCode(buff[p + i])).join('');
      },
      readFloat: (buff, p) => {
        const a = _binBE.ui8;
        (0, _utils.times)(4, i => {
          a[i] = buff[p + 3 - i];
        });
        return _binBE.fl32[0];
      },
      readDouble: (buff, p) => {
        const a = _binBE.ui8;
        (0, _utils.times)(8, i => {
          a[i] = buff[p + 7 - i];
        });
        return _binBE.fl64[0];
      },
      writeUshort: (buff, p, n) => {
        buff[p] = n >> 8 & 255;
        buff[p + 1] = n & 255;
      },
      writeUint: (buff, p, n) => {
        buff[p] = n >> 24 & 255;
        buff[p + 1] = n >> 16 & 255;
        buff[p + 2] = n >> 8 & 255;
        buff[p + 3] = n >> 0 & 255;
      },
      writeASCII: (buff, p, s) => {
        (0, _utils.times)(s.length, i => {
          buff[p + i] = s.charCodeAt(i);
        });
      },
      ui8: new Uint8Array(8)
    };
    _binBE.fl64 = new Float64Array(_binBE.ui8.buffer);

    _binBE.writeDouble = (buff, p, n) => {
      _binBE.fl64[0] = n;
      (0, _utils.times)(8, i => {
        buff[p + i] = _binBE.ui8[7 - i];
      });
    };

    const _writeIFD = (bin, data, _offset, ifd) => {
      let offset = _offset;
      const keys = Object.keys(ifd).filter(key => {
        return key !== undefined && key !== null && key !== 'undefined';
      });
      bin.writeUshort(data, offset, keys.length);
      offset += 2;
      let eoff = offset + 12 * keys.length + 4;

      for (const key of keys) {
        let tag = null;

        if (typeof key === 'number') {
          tag = key;
        } else if (typeof key === 'string') {
          tag = parseInt(key, 10);
        }

        const typeName = _globals.fieldTagTypes[tag];
        const typeNum = typeName2byte[typeName];

        if (typeName == null || typeName === undefined || typeof typeName === 'undefined') {
          throw new Error(`unknown type of tag: ${tag}`);
        }

        let val = ifd[key];

        if (typeof val === 'undefined') {
          throw new Error(`failed to get value for key ${key}`);
        } // ASCIIZ format with trailing 0 character
        // http://www.fileformat.info/format/tiff/corion.htm
        // https://stackoverflow.com/questions/7783044/whats-the-difference-between-asciiz-vs-ascii


        if (typeName === 'ASCII' && typeof val === 'string' && (0, _utils.endsWith)(val, '\u0000') === false) {
          val += '\u0000';
        }

        const num = val.length;
        bin.writeUshort(data, offset, tag);
        offset += 2;
        bin.writeUshort(data, offset, typeNum);
        offset += 2;
        bin.writeUint(data, offset, num);
        offset += 4;
        let dlen = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][typeNum] * num;
        let toff = offset;

        if (dlen > 4) {
          bin.writeUint(data, offset, eoff);
          toff = eoff;
        }

        if (typeName === 'ASCII') {
          bin.writeASCII(data, toff, val);
        } else if (typeName === 'SHORT') {
          (0, _utils.times)(num, i => {
            bin.writeUshort(data, toff + 2 * i, val[i]);
          });
        } else if (typeName === 'LONG') {
          (0, _utils.times)(num, i => {
            bin.writeUint(data, toff + 4 * i, val[i]);
          });
        } else if (typeName === 'RATIONAL') {
          (0, _utils.times)(num, i => {
            bin.writeUint(data, toff + 8 * i, Math.round(val[i] * 10000));
            bin.writeUint(data, toff + 8 * i + 4, 10000);
          });
        } else if (typeName === 'DOUBLE') {
          (0, _utils.times)(num, i => {
            bin.writeDouble(data, toff + 8 * i, val[i]);
          });
        }

        if (dlen > 4) {
          dlen += dlen & 1;
          eoff += dlen;
        }

        offset += 4;
      }

      return [offset, eoff];
    };

    const encodeIfds = ifds => {
      const data = new Uint8Array(numBytesInIfd);
      let offset = 4;
      const bin = _binBE; // set big-endian byte-order
      // https://en.wikipedia.org/wiki/TIFF#Byte_order

      data[0] = 77;
      data[1] = 77; // set format-version number
      // https://en.wikipedia.org/wiki/TIFF#Byte_order

      data[3] = 42;
      let ifdo = 8;
      bin.writeUint(data, offset, ifdo);
      offset += 4;
      ifds.forEach((ifd, i) => {
        const noffs = _writeIFD(bin, data, ifdo, ifd);

        ifdo = noffs[1];

        if (i < ifds.length - 1) {
          bin.writeUint(data, noffs[0], ifdo);
        }
      });

      if (data.slice) {
        return data.slice(0, ifdo).buffer;
      } // node hasn't implemented slice on Uint8Array yet


      const result = new Uint8Array(ifdo);

      for (let i = 0; i < ifdo; i++) {
        result[i] = data[i];
      }

      return result.buffer;
    };

    const encodeImage = (values, width, height, metadata, type) => {
      if (height === undefined || height === null) {
        throw new Error(`you passed into encodeImage a width of type ${height}`);
      }

      if (width === undefined || width === null) {
        throw new Error(`you passed into encodeImage a width of type ${width}`);
      }

      const ifd = {
        256: [width],
        // ImageWidth
        257: [height],
        // ImageLength
        273: [numBytesInIfd],
        // strips offset
        278: [height],
        // RowsPerStrip
        305: 'geotiff.js' // no array for ASCII(Z)

      };

      if (metadata) {
        for (const i in metadata) {
          if (metadata.hasOwnProperty(i)) {
            ifd[i] = metadata[i];
          }
        }
      }

      const prfx = new Uint8Array(encodeIfds([ifd]));
      const typeArrayFunc = getTransformFromType(type)
      const typeArray = new typeArrayFunc(values)
      const img = new Uint8Array(typeArray.buffer);
      const typeBytes = getBytes(type)
      const samplesPerPixel = ifd[277];
      const data = new Uint8Array(numBytesInIfd + width * height * typeBytes);
      (0, _utils.times)(prfx.length, i => {
        data[i] = prfx[i];
      });
      // Math.floor(i / 4) * 4 + (4 - i % 4 - 1)
      (0, _utils.forEach)(img, (value, i) => {
        //大小端转化
        //data[numBytesInIfd + i] = value;
        if (typeBytes === 4) {//float
          data[numBytesInIfd + Math.floor(i / 4) * 4 + (4 - i % 4 - 1)] = value;
        }
        else if (typeBytes === 2) {//short
          data[numBytesInIfd + Math.floor(i / 2) * 2 + (2 - i % 2 - 1)] = value
        } else if (typeBytes === 8) {//double
          data[numBytesInIfd + Math.floor(i / 8) * 8 + (8 - i % 8 - 1)] = value;
        }
      });
      return data.buffer;
    };

    const convertToTids = input => {
      const result = {};

      for (const key in input) {
        if (key !== 'StripOffsets') {
          if (!name2code[key]) {
            console.error(key, 'not in name2code:', Object.keys(name2code));
          }

          result[name2code[key]] = input[key];
        }
      }

      return result;
    };

    const toArray = input => {
      if (Array.isArray(input)) {
        return input;
      }

      return [input];
    };

    const metadataDefaults = [['Compression', 1], // no compression
    ['PlanarConfiguration', 1], ['XPosition', 0], ['YPosition', 0], ['ResolutionUnit', 1], // Code 1 for actual pixel count or 2 for pixels per inch.
    ['ExtraSamples', 0], // should this be an array??
    ['GeoAsciiParams', 'WGS 84\u0000'], ['ModelTiepoint', [0, 0, 0, -180, 90, 0]], // raster fits whole globe
    ['GTModelTypeGeoKey', 2], ['GTRasterTypeGeoKey', 1], ['GeographicTypeGeoKey', 4326], ['GeogCitationGeoKey', 'WGS 84']];

    function getBytes(type) {
      let bytes = 0;
      switch (type) {
        case 'float':
          bytes = 4;
          break;
        case 'double':
          bytes = 8;
          break;
        case 'int':
          bytes = 4;
          break;
        case 'short':
          bytes = 2;
          break;
        case 'char':
          bytes = 1;
          break;
        default:
          bytes = 3;
      }
      return bytes;
    }
    function getTransformFromType(type) {
      let func;
      switch (type) {
        case 'float':
          func = Float32Array;
          break;
        case 'double':
          func = Float64Array;
          break;
        case 'int':
          func = Int32Array;
          break;
        case 'short':
          func = Int16Array;
          break;
        case 'char':
          func = Int8Array;
          break;
        default:
          func = Uint8Array;
      }
      return func;
    }
    function writeGeotiff(data, metadata, type) {
      const isFlattened = typeof data[0] === 'number';
      let height;
      let numBands;
      let width;
      let flattenedValues;

      if (isFlattened) {//是否完全展开成单个数组
        height = metadata.height || metadata.ImageLength;
        width = metadata.width || metadata.ImageWidth;
        numBands = data.length / (height * width);
        flattenedValues = data;
      } else {
        numBands = data.length;
        height = data[0].length;
        width = data[0][0].length;
        flattenedValues = [];
        (0, _utils.times)(height, rowIndex => {
          (0, _utils.times)(width, columnIndex => {
            (0, _utils.times)(numBands, bandIndex => {
              flattenedValues.push(data[bandIndex][rowIndex][columnIndex]);
            });
          });
        });
      }

      metadata.ImageLength = height;
      delete metadata.height;
      metadata.ImageWidth = width;
      delete metadata.width; // consult https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml

      if (!metadata.BitsPerSample) {
        metadata.BitsPerSample = (0, _utils.times)(numBands, () => 8);
      }

      metadataDefaults.forEach(tag => {
        const key = tag[0];

        if (!metadata[key]) {
          const value = tag[1];
          metadata[key] = value;
        }
      }); // The color space of the image data.
      // 1=black is zero and 2=RGB.

      if (!metadata.PhotometricInterpretation) {
        metadata.PhotometricInterpretation = metadata.BitsPerSample.length === 3 ? 2 : 1;
      } // The number of components per pixel.


      if (!metadata.SamplesPerPixel) {
        metadata.SamplesPerPixel = [numBands];
      }
      const typeBytes = getBytes(type)
      if (!metadata.StripByteCounts) {
        // we are only writing one strip
        // 如果是float32 ，则 ，此时为4*height*width，因为这个数据代表，最后取值时，要取出数据的长度
        // metadata.StripByteCounts = [numBands * height * width];
        metadata.StripByteCounts = [typeBytes * height * width];
      }

      if (!metadata.ModelPixelScale) {
        // assumes raster takes up exactly the whole globe
        metadata.ModelPixelScale = [360 / width, 180 / height, 0];
      }

      if (!metadata.SampleFormat) {
        metadata.SampleFormat = (0, _utils.times)(numBands, () => 1);
      }

      const geoKeys = Object.keys(metadata).filter(key => (0, _utils.endsWith)(key, 'GeoKey')).sort((a, b) => name2code[a] - name2code[b]);

      if (!metadata.GeoKeyDirectory) {
        const NumberOfKeys = geoKeys.length;
        const GeoKeyDirectory = [1, 1, 0, NumberOfKeys];
        geoKeys.forEach(geoKey => {
          const KeyID = Number(name2code[geoKey]);
          GeoKeyDirectory.push(KeyID);
          let Count;
          let TIFFTagLocation;
          let valueOffset;

          if (_globals.fieldTagTypes[KeyID] === 'SHORT') {
            Count = 1;
            TIFFTagLocation = 0;
            valueOffset = metadata[geoKey];
          } else if (geoKey === 'GeogCitationGeoKey') {
            Count = metadata.GeoAsciiParams.length;
            TIFFTagLocation = Number(name2code.GeoAsciiParams);
            valueOffset = 0;
          } else {
            console.log(`[geotiff.js] couldn't get TIFFTagLocation for ${geoKey}`);
          }

          GeoKeyDirectory.push(TIFFTagLocation);
          GeoKeyDirectory.push(Count);
          GeoKeyDirectory.push(valueOffset);
        });
        metadata.GeoKeyDirectory = GeoKeyDirectory;
      } // delete GeoKeys from metadata, because stored in GeoKeyDirectory tag


      for (const geoKey in geoKeys) {
        if (geoKeys.hasOwnProperty(geoKey)) {
          delete metadata[geoKey];
        }
      }

      ['Compression', 'ExtraSamples', 'GeographicTypeGeoKey', 'GTModelTypeGeoKey', 'GTRasterTypeGeoKey', 'ImageLength', // synonym of ImageHeight
        'MaxSampleValue', 'MinSampleValue', 'StripByteCounts', 'ImageWidth', 'PhotometricInterpretation', 'PlanarConfiguration', 'ResolutionUnit', 'SampleFormat', 'SamplesPerPixel', 'XPosition', 'YPosition'].forEach(name => {
          if (metadata[name]) {
            metadata[name] = toArray(metadata[name]);
          }
        });
      const encodedMetadata = convertToTids(metadata);
      const outputImage = encodeImage(flattenedValues, width, height, encodedMetadata, type);
      return outputImage;
    }
  }, { "./globals": "j27V", "./utils": "FOZT" }], "dy4f": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setLogger = setLogger;
    exports.log = log;
    exports.info = info;
    exports.warn = warn;
    exports.error = error;
    exports.time = time;
    exports.timeEnd = timeEnd;

    /**
     * A no-op logger
     */
    class DummyLogger {
      log() { }

      info() { }

      warn() { }

      error() { }

      time() { }

      timeEnd() { }

    }

    let LOGGER = new DummyLogger();
    /**
     *
     * @param {object} logger the new logger. e.g `console`
     */

    function setLogger(logger = new DummyLogger()) {
      LOGGER = logger;
    }

    function log(...args) {
      return LOGGER.log(...args);
    }

    function info(...args) {
      return LOGGER.info(...args);
    }

    function warn(...args) {
      return LOGGER.warn(...args);
    }

    function error(...args) {
      return LOGGER.error(...args);
    }

    function time(...args) {
      return LOGGER.time(...args);
    }

    function timeEnd(...args) {
      return LOGGER.timeEnd(...args);
    }
  }, {}], "bsJs": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fromUrl = fromUrl;
    exports.fromArrayBuffer = fromArrayBuffer;
    exports.fromFile = fromFile;
    exports.fromBlob = fromBlob;
    exports.fromUrls = fromUrls;
    exports.writeArrayBuffer = writeArrayBuffer;
    Object.defineProperty(exports, "Pool", {
      enumerable: true,
      get: function () {
        return _pool.default;
      }
    });
    Object.defineProperty(exports, "getDecoder", {
      enumerable: true,
      get: function () {
        return _compression.getDecoder;
      }
    });
    Object.defineProperty(exports, "setLogger", {
      enumerable: true,
      get: function () {
        return _logging.setLogger;
      }
    });
    exports.rgb = exports.globals = exports.MultiGeoTIFF = exports.default = exports.GeoTIFF = void 0;

    var _geotiffimage = _interopRequireDefault(require("./geotiffimage"));

    var _dataview = _interopRequireDefault(require("./dataview64"));

    var _dataslice = _interopRequireDefault(require("./dataslice"));

    var _pool = _interopRequireDefault(require("./pool"));

    var _source = require("./source");

    var globals = _interopRequireWildcard(require("./globals"));

    exports.globals = globals;

    var _geotiffwriter = require("./geotiffwriter");

    var rgb = _interopRequireWildcard(require("./rgb"));

    exports.rgb = rgb;

    var _compression = require("./compression");

    var _logging = require("./logging");

    function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function getFieldTypeLength(fieldType) {
      switch (fieldType) {
        case globals.fieldTypes.BYTE:
        case globals.fieldTypes.ASCII:
        case globals.fieldTypes.SBYTE:
        case globals.fieldTypes.UNDEFINED:
          return 1;

        case globals.fieldTypes.SHORT:
        case globals.fieldTypes.SSHORT:
          return 2;

        case globals.fieldTypes.LONG:
        case globals.fieldTypes.SLONG:
        case globals.fieldTypes.FLOAT:
        case globals.fieldTypes.IFD:
          return 4;

        case globals.fieldTypes.RATIONAL:
        case globals.fieldTypes.SRATIONAL:
        case globals.fieldTypes.DOUBLE:
        case globals.fieldTypes.LONG8:
        case globals.fieldTypes.SLONG8:
        case globals.fieldTypes.IFD8:
          return 8;

        default:
          throw new RangeError(`Invalid field type: ${fieldType}`);
      }
    }

    function parseGeoKeyDirectory(fileDirectory) {
      const rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;

      if (!rawGeoKeyDirectory) {
        return null;
      }

      const geoKeyDirectory = {};

      for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
        const key = globals.geoKeyNames[rawGeoKeyDirectory[i]];
        const location = rawGeoKeyDirectory[i + 1] ? globals.fieldTagNames[rawGeoKeyDirectory[i + 1]] : null;
        const count = rawGeoKeyDirectory[i + 2];
        const offset = rawGeoKeyDirectory[i + 3];
        let value = null;

        if (!location) {
          value = offset;
        } else {
          value = fileDirectory[location];

          if (typeof value === 'undefined' || value === null) {
            throw new Error(`Could not get value of geoKey '${key}'.`);
          } else if (typeof value === 'string') {
            value = value.substring(offset, offset + count - 1);
          } else if (value.subarray) {
            value = value.subarray(offset, offset + count);

            if (count === 1) {
              value = value[0];
            }
          }
        }

        geoKeyDirectory[key] = value;
      }

      return geoKeyDirectory;
    }

    function getValues(dataSlice, fieldType, count, offset) {
      let values = null;
      let readMethod = null;
      const fieldTypeLength = getFieldTypeLength(fieldType);

      switch (fieldType) {
        case globals.fieldTypes.BYTE:
        case globals.fieldTypes.ASCII:
        case globals.fieldTypes.UNDEFINED:
          values = new Uint8Array(count);
          readMethod = dataSlice.readUint8;
          break;

        case globals.fieldTypes.SBYTE:
          values = new Int8Array(count);
          readMethod = dataSlice.readInt8;
          break;

        case globals.fieldTypes.SHORT:
          values = new Uint16Array(count);
          readMethod = dataSlice.readUint16;
          break;

        case globals.fieldTypes.SSHORT:
          values = new Int16Array(count);
          readMethod = dataSlice.readInt16;
          break;

        case globals.fieldTypes.LONG:
        case globals.fieldTypes.IFD:
          values = new Uint32Array(count);
          readMethod = dataSlice.readUint32;
          break;

        case globals.fieldTypes.SLONG:
          values = new Int32Array(count);
          readMethod = dataSlice.readInt32;
          break;

        case globals.fieldTypes.LONG8:
        case globals.fieldTypes.IFD8:
          values = new Array(count);
          readMethod = dataSlice.readUint64;
          break;

        case globals.fieldTypes.SLONG8:
          values = new Array(count);
          readMethod = dataSlice.readInt64;
          break;

        case globals.fieldTypes.RATIONAL:
          values = new Uint32Array(count * 2);
          readMethod = dataSlice.readUint32;
          break;

        case globals.fieldTypes.SRATIONAL:
          values = new Int32Array(count * 2);
          readMethod = dataSlice.readInt32;
          break;

        case globals.fieldTypes.FLOAT:
          values = new Float32Array(count);
          readMethod = dataSlice.readFloat32;
          break;

        case globals.fieldTypes.DOUBLE:
          values = new Float64Array(count);
          readMethod = dataSlice.readFloat64;
          break;

        default:
          throw new RangeError(`Invalid field type: ${fieldType}`);
      } // normal fields


      if (!(fieldType === globals.fieldTypes.RATIONAL || fieldType === globals.fieldTypes.SRATIONAL)) {
        for (let i = 0; i < count; ++i) {
          values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
        }
      } else {
        // RATIONAL or SRATIONAL
        for (let i = 0; i < count; i += 2) {
          values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
          values[i + 1] = readMethod.call(dataSlice, offset + (i * fieldTypeLength + 4));
        }
      }

      if (fieldType === globals.fieldTypes.ASCII) {
        return new TextDecoder('utf-8').decode(values);
      }

      return values;
    }
    /**
     * Data class to store the parsed file directory, geo key directory and
     * offset to the next IFD
     */


    class ImageFileDirectory {
      constructor(fileDirectory, geoKeyDirectory, nextIFDByteOffset) {
        this.fileDirectory = fileDirectory;
        this.geoKeyDirectory = geoKeyDirectory;
        this.nextIFDByteOffset = nextIFDByteOffset;
      }

    }
    /**
     * Error class for cases when an IFD index was requested, that does not exist
     * in the file.
     */


    class GeoTIFFImageIndexError extends Error {
      constructor(index) {
        super(`No image at index ${index}`);
        this.index = index;
      }

    }

    class GeoTIFFBase {
      /**
       * (experimental) Reads raster data from the best fitting image. This function uses
       * the image with the lowest resolution that is still a higher resolution than the
       * requested resolution.
       * When specified, the `bbox` option is translated to the `window` option and the
       * `resX` and `resY` to `width` and `height` respectively.
       * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
       * image is called and the result returned.
       * @see GeoTIFFImage.readRasters
       * @param {Object} [options={}] optional parameters
       * @param {Array} [options.window=whole image] the subset to read data from.
       * @param {Array} [options.bbox=whole image] the subset to read data from in
       *                                           geographical coordinates.
       * @param {Array} [options.samples=all samples] the selection of samples to read from.
       * @param {Boolean} [options.interleave=false] whether the data shall be read
       *                                             in one single array or separate
       *                                             arrays.
       * @param {Number} [options.pool=null] The optional decoder pool to use.
       * @param {Number} [options.width] The desired width of the output. When the width is not the
       *                                 same as the images, resampling will be performed.
       * @param {Number} [options.height] The desired height of the output. When the width is not the
       *                                  same as the images, resampling will be performed.
       * @param {String} [options.resampleMethod='nearest'] The desired resampling method.
       * @param {Number|Number[]} [options.fillValue] The value to use for parts of the image
       *                                              outside of the images extent. When multiple
       *                                              samples are requested, an array of fill values
       *                                              can be passed.
       * @returns {Promise.<(TypedArray|TypedArray[])>} the decoded arrays as a promise
       */
      async readRasters(options = {}) {
        const {
          window: imageWindow,
          width,
          height
        } = options;
        let {
          resX,
          resY,
          bbox
        } = options;
        const firstImage = await this.getImage();
        let usedImage = firstImage;
        const imageCount = await this.getImageCount();
        const imgBBox = firstImage.getBoundingBox();

        if (imageWindow && bbox) {
          throw new Error('Both "bbox" and "window" passed.');
        } // if width/height is passed, transform it to resolution


        if (width || height) {
          // if we have an image window (pixel coordinates), transform it to a BBox
          // using the origin/resolution of the first image.
          if (imageWindow) {
            const [oX, oY] = firstImage.getOrigin();
            const [rX, rY] = firstImage.getResolution();
            bbox = [oX + imageWindow[0] * rX, oY + imageWindow[1] * rY, oX + imageWindow[2] * rX, oY + imageWindow[3] * rY];
          } // if we have a bbox (or calculated one)


          const usedBBox = bbox || imgBBox;

          if (width) {
            if (resX) {
              throw new Error('Both width and resX passed');
            }

            resX = (usedBBox[2] - usedBBox[0]) / width;
          }

          if (height) {
            if (resY) {
              throw new Error('Both width and resY passed');
            }

            resY = (usedBBox[3] - usedBBox[1]) / height;
          }
        } // if resolution is set or calculated, try to get the image with the worst acceptable resolution


        if (resX || resY) {
          const allImages = [];

          for (let i = 0; i < imageCount; ++i) {
            const image = await this.getImage(i);
            const {
              SubfileType: subfileType,
              NewSubfileType: newSubfileType
            } = image.fileDirectory;

            if (i === 0 || subfileType === 2 || newSubfileType & 1) {
              allImages.push(image);
            }
          }

          allImages.sort((a, b) => a.getWidth() - b.getWidth());

          for (let i = 0; i < allImages.length; ++i) {
            const image = allImages[i];
            const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
            const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
            usedImage = image;

            if (resX && resX > imgResX || resY && resY > imgResY) {
              break;
            }
          }
        }

        let wnd = imageWindow;

        if (bbox) {
          const [oX, oY] = firstImage.getOrigin();
          const [imageResX, imageResY] = usedImage.getResolution(firstImage);
          wnd = [Math.round((bbox[0] - oX) / imageResX), Math.round((bbox[1] - oY) / imageResY), Math.round((bbox[2] - oX) / imageResX), Math.round((bbox[3] - oY) / imageResY)];
          wnd = [Math.min(wnd[0], wnd[2]), Math.min(wnd[1], wnd[3]), Math.max(wnd[0], wnd[2]), Math.max(wnd[1], wnd[3])];
        }

        return usedImage.readRasters({
          ...options,
          window: wnd
        });
      }

    }
    /**
     * The abstraction for a whole GeoTIFF file.
     * @augments GeoTIFFBase
     */


    class GeoTIFF extends GeoTIFFBase {
      /**
       * @constructor
       * @param {Source} source The datasource to read from.
       * @param {Boolean} littleEndian Whether the image uses little endian.
       * @param {Boolean} bigTiff Whether the image uses bigTIFF conventions.
       * @param {Number} firstIFDOffset The numeric byte-offset from the start of the image
       *                                to the first IFD.
       * @param {Object} [options] further options.
       * @param {Boolean} [options.cache=false] whether or not decoded tiles shall be cached.
       */
      constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
        super();
        this.source = source;
        this.littleEndian = littleEndian;
        this.bigTiff = bigTiff;
        this.firstIFDOffset = firstIFDOffset;
        this.cache = options.cache || false;
        this.ifdRequests = [];
        this.ghostValues = null;
      }

      async getSlice(offset, size) {
        const fallbackSize = this.bigTiff ? 4048 : 1024;
        return new _dataslice.default(await this.source.fetch(offset, typeof size !== 'undefined' ? size : fallbackSize), offset, this.littleEndian, this.bigTiff);
      }
      /**
       * Instructs to parse an image file directory at the given file offset.
       * As there is no way to ensure that a location is indeed the start of an IFD,
       * this function must be called with caution (e.g only using the IFD offsets from
       * the headers or other IFDs).
       * @param {number} offset the offset to parse the IFD at
       * @returns {ImageFileDirectory} the parsed IFD
       */


      async parseFileDirectoryAt(offset) {
        const entrySize = this.bigTiff ? 20 : 12;
        const offsetSize = this.bigTiff ? 8 : 2;
        let dataSlice = await this.getSlice(offset);
        const numDirEntries = this.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset); // if the slice does not cover the whole IFD, request a bigger slice, where the
        // whole IFD fits: num of entries + n x tag length + offset to next IFD

        const byteSize = numDirEntries * entrySize + (this.bigTiff ? 16 : 6);

        if (!dataSlice.covers(offset, byteSize)) {
          dataSlice = await this.getSlice(offset, byteSize);
        }

        const fileDirectory = {}; // loop over the IFD and create a file directory object

        let i = offset + (this.bigTiff ? 8 : 2);

        for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
          const fieldTag = dataSlice.readUint16(i);
          const fieldType = dataSlice.readUint16(i + 2);
          const typeCount = this.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
          let fieldValues;
          let value;
          const fieldTypeLength = getFieldTypeLength(fieldType);
          const valueOffset = i + (this.bigTiff ? 12 : 8); // check whether the value is directly encoded in the tag or refers to a
          // different external byte range

          if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
            fieldValues = getValues(dataSlice, fieldType, typeCount, valueOffset);
          } else {
            // resolve the reference to the actual byte range
            const actualOffset = dataSlice.readOffset(valueOffset);
            const length = getFieldTypeLength(fieldType) * typeCount; // check, whether we actually cover the referenced byte range; if not,
            // request a new slice of bytes to read from it

            if (dataSlice.covers(actualOffset, length)) {
              fieldValues = getValues(dataSlice, fieldType, typeCount, actualOffset);
            } else {
              const fieldDataSlice = await this.getSlice(actualOffset, length);
              fieldValues = getValues(fieldDataSlice, fieldType, typeCount, actualOffset);
            }
          } // unpack single values from the array


          if (typeCount === 1 && globals.arrayFields.indexOf(fieldTag) === -1 && !(fieldType === globals.fieldTypes.RATIONAL || fieldType === globals.fieldTypes.SRATIONAL)) {
            value = fieldValues[0];
          } else {
            value = fieldValues;
          } // write the tags value to the file directly


          fileDirectory[globals.fieldTagNames[fieldTag]] = value;
        }

        const geoKeyDirectory = parseGeoKeyDirectory(fileDirectory);
        const nextIFDByteOffset = dataSlice.readOffset(offset + offsetSize + entrySize * numDirEntries);
        return new ImageFileDirectory(fileDirectory, geoKeyDirectory, nextIFDByteOffset);
      }

      async requestIFD(index) {
        // see if we already have that IFD index requested.
        if (this.ifdRequests[index]) {
          // attach to an already requested IFD
          return this.ifdRequests[index];
        } else if (index === 0) {
          // special case for index 0
          this.ifdRequests[index] = this.parseFileDirectoryAt(this.firstIFDOffset);
          return this.ifdRequests[index];
        } else if (!this.ifdRequests[index - 1]) {
          // if the previous IFD was not yet loaded, load that one first
          // this is the recursive call.
          try {
            this.ifdRequests[index - 1] = this.requestIFD(index - 1);
          } catch (e) {
            // if the previous one already was an index error, rethrow
            // with the current index
            if (e instanceof GeoTIFFImageIndexError) {
              throw new GeoTIFFImageIndexError(index);
            } // rethrow anything else


            throw e;
          }
        } // if the previous IFD was loaded, we can finally fetch the one we are interested in.
        // we need to wrap this in an IIFE, otherwise this.ifdRequests[index] would be delayed


        this.ifdRequests[index] = (async () => {
          const previousIfd = await this.ifdRequests[index - 1];

          if (previousIfd.nextIFDByteOffset === 0) {
            throw new GeoTIFFImageIndexError(index);
          }

          return this.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
        })();

        return this.ifdRequests[index];
      }
      /**
       * Get the n-th internal subfile of an image. By default, the first is returned.
       *
       * @param {Number} [index=0] the index of the image to return.
       * @returns {GeoTIFFImage} the image at the given index
       */


      async getImage(index = 0) {
        const ifd = await this.requestIFD(index);
        return new _geotiffimage.default(ifd.fileDirectory, ifd.geoKeyDirectory, this.dataView, this.littleEndian, this.cache, this.source);
      }
      /**
       * Returns the count of the internal subfiles.
       *
       * @returns {Number} the number of internal subfile images
       */


      async getImageCount() {
        let index = 0; // loop until we run out of IFDs

        let hasNext = true;

        while (hasNext) {
          try {
            await this.requestIFD(index);
            ++index;
          } catch (e) {
            if (e instanceof GeoTIFFImageIndexError) {
              hasNext = false;
            } else {
              throw e;
            }
          }
        }

        return index;
      }
      /**
       * Get the values of the COG ghost area as a parsed map.
       * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
       * @returns {Object} the parsed ghost area or null, if no such area was found
       */


      async getGhostValues() {
        const offset = this.bigTiff ? 16 : 8;

        if (this.ghostValues) {
          return this.ghostValues;
        }

        const detectionString = 'GDAL_STRUCTURAL_METADATA_SIZE=';
        const heuristicAreaSize = detectionString.length + 100;
        let slice = await this.getSlice(offset, heuristicAreaSize);

        if (detectionString === getValues(slice, globals.fieldTypes.ASCII, detectionString.length, offset)) {
          const valuesString = getValues(slice, globals.fieldTypes.ASCII, heuristicAreaSize, offset);
          const firstLine = valuesString.split('\n')[0];
          const metadataSize = Number(firstLine.split('=')[1].split(' ')[0]) + firstLine.length;

          if (metadataSize > heuristicAreaSize) {
            slice = await this.getSlice(offset, metadataSize);
          }

          const fullString = getValues(slice, globals.fieldTypes.ASCII, metadataSize, offset);
          this.ghostValues = {};
          fullString.split('\n').filter(line => line.length > 0).map(line => line.split('=')).forEach(([key, value]) => {
            this.ghostValues[key] = value;
          });
        }

        return this.ghostValues;
      }
      /**
       * Parse a (Geo)TIFF file from the given source.
       *
       * @param {source~Source} source The source of data to parse from.
       * @param {object} options Additional options.
       */


      static async fromSource(source, options) {
        const headerData = await source.fetch(0, 1024);
        const dataView = new _dataview.default(headerData);
        const BOM = dataView.getUint16(0, 0);
        let littleEndian;

        if (BOM === 0x4949) {
          littleEndian = true;
        } else if (BOM === 0x4D4D) {
          littleEndian = false;
        } else {
          throw new TypeError('Invalid byte order value.');
        }

        const magicNumber = dataView.getUint16(2, littleEndian);
        let bigTiff;

        if (magicNumber === 42) {
          bigTiff = false;
        } else if (magicNumber === 43) {
          bigTiff = true;
          const offsetByteSize = dataView.getUint16(4, littleEndian);

          if (offsetByteSize !== 8) {
            throw new Error('Unsupported offset byte-size.');
          }
        } else {
          throw new TypeError('Invalid magic number.');
        }

        const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
        return new GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
      }
      /**
       * Closes the underlying file buffer
       * N.B. After the GeoTIFF has been completely processed it needs
       * to be closed but only if it has been constructed from a file.
       */


      close() {
        if (typeof this.source.close === 'function') {
          return this.source.close();
        }

        return false;
      }

    }

    exports.GeoTIFF = GeoTIFF;
    var _default = GeoTIFF;
    /**
     * Wrapper for GeoTIFF files that have external overviews.
     * @augments GeoTIFFBase
     */

    exports.default = _default;

    class MultiGeoTIFF extends GeoTIFFBase {
      /**
       * Construct a new MultiGeoTIFF from a main and several overview files.
       * @param {GeoTIFF} mainFile The main GeoTIFF file.
       * @param {GeoTIFF[]} overviewFiles An array of overview files.
       */
      constructor(mainFile, overviewFiles) {
        super();
        this.mainFile = mainFile;
        this.overviewFiles = overviewFiles;
        this.imageFiles = [mainFile].concat(overviewFiles);
        this.fileDirectoriesPerFile = null;
        this.fileDirectoriesPerFileParsing = null;
        this.imageCount = null;
      }

      async parseFileDirectoriesPerFile() {
        const requests = [this.mainFile.parseFileDirectoryAt(this.mainFile.firstIFDOffset)].concat(this.overviewFiles.map(file => file.parseFileDirectoryAt(file.firstIFDOffset)));
        this.fileDirectoriesPerFile = await Promise.all(requests);
        return this.fileDirectoriesPerFile;
      }
      /**
       * Get the n-th internal subfile of an image. By default, the first is returned.
       *
       * @param {Number} [index=0] the index of the image to return.
       * @returns {GeoTIFFImage} the image at the given index
       */


      async getImage(index = 0) {
        await this.getImageCount();
        await this.parseFileDirectoriesPerFile();
        let visited = 0;
        let relativeIndex = 0;

        for (let i = 0; i < this.imageFiles.length; i++) {
          const imageFile = this.imageFiles[i];

          for (let ii = 0; ii < this.imageCounts[i]; ii++) {
            if (index === visited) {
              const ifd = await imageFile.requestIFD(relativeIndex);
              return new _geotiffimage.default(ifd.fileDirectory, imageFile.geoKeyDirectory, imageFile.dataView, imageFile.littleEndian, imageFile.cache, imageFile.source);
            }

            visited++;
            relativeIndex++;
          }

          relativeIndex = 0;
        }

        throw new RangeError('Invalid image index');
      }
      /**
       * Returns the count of the internal subfiles.
       *
       * @returns {Number} the number of internal subfile images
       */


      async getImageCount() {
        if (this.imageCount !== null) {
          return this.imageCount;
        }

        const requests = [this.mainFile.getImageCount()].concat(this.overviewFiles.map(file => file.getImageCount()));
        this.imageCounts = await Promise.all(requests);
        this.imageCount = this.imageCounts.reduce((count, ifds) => count + ifds, 0);
        return this.imageCount;
      }

    }

    exports.MultiGeoTIFF = MultiGeoTIFF;

    /**
     * Creates a new GeoTIFF from a remote URL.
     * @param {string} url The URL to access the image from
     * @param {object} [options] Additional options to pass to the source.
     *                           See {@link makeRemoteSource} for details.
     * @returns {Promise.<GeoTIFF>} The resulting GeoTIFF file.
     */
    async function fromUrl(url, options = {}) {
      return GeoTIFF.fromSource((0, _source.makeRemoteSource)(url, options));
    }
    /**
     * Construct a new GeoTIFF from an
     * [ArrayBuffer]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}.
     * @param {ArrayBuffer} arrayBuffer The data to read the file from.
     * @returns {Promise.<GeoTIFF>} The resulting GeoTIFF file.
     */


    async function fromArrayBuffer(arrayBuffer) {
      return GeoTIFF.fromSource((0, _source.makeBufferSource)(arrayBuffer));
    }
    /**
     * Construct a GeoTIFF from a local file path. This uses the node
     * [filesystem API]{@link https://nodejs.org/api/fs.html} and is
     * not available on browsers.
     *
     * N.B. After the GeoTIFF has been completely processed it needs
     * to be closed but only if it has been constructed from a file.
     * @param {string} path The file path to read from.
     * @returns {Promise.<GeoTIFF>} The resulting GeoTIFF file.
     */


    async function fromFile(path) {
      return GeoTIFF.fromSource((0, _source.makeFileSource)(path));
    }
    /**
     * Construct a GeoTIFF from an HTML
     * [Blob]{@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} or
     * [File]{@link https://developer.mozilla.org/en-US/docs/Web/API/File}
     * object.
     * @param {Blob|File} blob The Blob or File object to read from.
     * @returns {Promise.<GeoTIFF>} The resulting GeoTIFF file.
     */


    async function fromBlob(blob) {
      return GeoTIFF.fromSource((0, _source.makeFileReaderSource)(blob));
    }
    /**
     * Construct a MultiGeoTIFF from the given URLs.
     * @param {string} mainUrl The URL for the main file.
     * @param {string[]} overviewUrls An array of URLs for the overview images.
     * @param {object} [options] Additional options to pass to the source.
     *                           See [makeRemoteSource]{@link module:source.makeRemoteSource}
     *                           for details.
     * @returns {Promise.<MultiGeoTIFF>} The resulting MultiGeoTIFF file.
     */


    async function fromUrls(mainUrl, overviewUrls = [], options = {}) {
      const mainFile = await GeoTIFF.fromSource((0, _source.makeRemoteSource)(mainUrl, options));
      const overviewFiles = await Promise.all(overviewUrls.map(url => GeoTIFF.fromSource((0, _source.makeRemoteSource)(url, options))));
      return new MultiGeoTIFF(mainFile, overviewFiles);
    }
    /**
     * Main creating function for GeoTIFF files.
     * @param {(Array)} array of pixel values
     * @returns {metadata} metadata
     */


    async function writeArrayBuffer(values, metadata, type) {
      return (0, _geotiffwriter.writeGeotiff)(values, metadata, type);
    }
  }, { "./geotiffimage": "eOWo", "./dataview64": "dqpX", "./dataslice": "dGLV", "./pool": "dHPO", "./source": "cUx7", "./globals": "j27V", "./geotiffwriter": "BGyE", "./rgb": "fpBl", "./compression": "FGCZ", "./logging": "dy4f" }]
}, {}, ["bsJs"], null)
//# sourceMappingURL=/geotiff.js.map