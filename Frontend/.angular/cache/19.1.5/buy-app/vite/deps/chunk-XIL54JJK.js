import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-WOR4A3D2.js";

// node_modules/tweetnacl-util/nacl-util.js
var require_nacl_util = __commonJS({
  "node_modules/tweetnacl-util/nacl-util.js"(exports, module) {
    (function(root, f) {
      "use strict";
      if (typeof module !== "undefined" && module.exports) module.exports = f();
      else if (root.nacl) root.nacl.util = f();
      else {
        root.nacl = {};
        root.nacl.util = f();
      }
    })(exports, function() {
      "use strict";
      var util = {};
      function validateBase64(s) {
        if (!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(s)) {
          throw new TypeError("invalid encoding");
        }
      }
      util.decodeUTF8 = function(s) {
        if (typeof s !== "string") throw new TypeError("expected string");
        var i, d = unescape(encodeURIComponent(s)), b = new Uint8Array(d.length);
        for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
        return b;
      };
      util.encodeUTF8 = function(arr) {
        var i, s = [];
        for (i = 0; i < arr.length; i++) s.push(String.fromCharCode(arr[i]));
        return decodeURIComponent(escape(s.join("")));
      };
      if (typeof atob === "undefined") {
        if (typeof Buffer.from !== "undefined") {
          util.encodeBase64 = function(arr) {
            return Buffer.from(arr).toString("base64");
          };
          util.decodeBase64 = function(s) {
            validateBase64(s);
            return new Uint8Array(Array.prototype.slice.call(Buffer.from(s, "base64"), 0));
          };
        } else {
          util.encodeBase64 = function(arr) {
            return new Buffer(arr).toString("base64");
          };
          util.decodeBase64 = function(s) {
            validateBase64(s);
            return new Uint8Array(Array.prototype.slice.call(new Buffer(s, "base64"), 0));
          };
        }
      } else {
        util.encodeBase64 = function(arr) {
          var i, s = [], len = arr.length;
          for (i = 0; i < len; i++) s.push(String.fromCharCode(arr[i]));
          return btoa(s.join(""));
        };
        util.decodeBase64 = function(s) {
          validateBase64(s);
          var i, d = atob(s), b = new Uint8Array(d.length);
          for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
          return b;
        };
      }
      return util;
    });
  }
});

// browser-external:crypto
var require_crypto = __commonJS({
  "browser-external:crypto"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "crypto" has been externalized for browser compatibility. Cannot access "crypto.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@tonconnect/protocol/node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/@tonconnect/protocol/node_modules/tweetnacl/nacl-fast.js"(exports, module) {
    (function(nacl2) {
      "use strict";
      var gf = function(init) {
        var i, r = new Float64Array(16);
        if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i, h, l) {
        x[i] = h >> 24 & 255;
        x[i + 1] = h >> 16 & 255;
        x[i + 2] = h >> 8 & 255;
        x[i + 3] = h & 255;
        x[i + 4] = l >> 24 & 255;
        x[i + 5] = l >> 16 & 255;
        x[i + 6] = l >> 8 & 255;
        x[i + 7] = l & 255;
      }
      function vn(x, xi, y, yi, n) {
        var i, d = 0;
        for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x1 >>> 0 & 255;
        o[5] = x1 >>> 8 & 255;
        o[6] = x1 >>> 16 & 255;
        o[7] = x1 >>> 24 & 255;
        o[8] = x2 >>> 0 & 255;
        o[9] = x2 >>> 8 & 255;
        o[10] = x2 >>> 16 & 255;
        o[11] = x2 >>> 24 & 255;
        o[12] = x3 >>> 0 & 255;
        o[13] = x3 >>> 8 & 255;
        o[14] = x3 >>> 16 & 255;
        o[15] = x3 >>> 24 & 255;
        o[16] = x4 >>> 0 & 255;
        o[17] = x4 >>> 8 & 255;
        o[18] = x4 >>> 16 & 255;
        o[19] = x4 >>> 24 & 255;
        o[20] = x5 >>> 0 & 255;
        o[21] = x5 >>> 8 & 255;
        o[22] = x5 >>> 16 & 255;
        o[23] = x5 >>> 24 & 255;
        o[24] = x6 >>> 0 & 255;
        o[25] = x6 >>> 8 & 255;
        o[26] = x6 >>> 16 & 255;
        o[27] = x6 >>> 24 & 255;
        o[28] = x7 >>> 0 & 255;
        o[29] = x7 >>> 8 & 255;
        o[30] = x7 >>> 16 & 255;
        o[31] = x7 >>> 24 & 255;
        o[32] = x8 >>> 0 & 255;
        o[33] = x8 >>> 8 & 255;
        o[34] = x8 >>> 16 & 255;
        o[35] = x8 >>> 24 & 255;
        o[36] = x9 >>> 0 & 255;
        o[37] = x9 >>> 8 & 255;
        o[38] = x9 >>> 16 & 255;
        o[39] = x9 >>> 24 & 255;
        o[40] = x10 >>> 0 & 255;
        o[41] = x10 >>> 8 & 255;
        o[42] = x10 >>> 16 & 255;
        o[43] = x10 >>> 24 & 255;
        o[44] = x11 >>> 0 & 255;
        o[45] = x11 >>> 8 & 255;
        o[46] = x11 >>> 16 & 255;
        o[47] = x11 >>> 24 & 255;
        o[48] = x12 >>> 0 & 255;
        o[49] = x12 >>> 8 & 255;
        o[50] = x12 >>> 16 & 255;
        o[51] = x12 >>> 24 & 255;
        o[52] = x13 >>> 0 & 255;
        o[53] = x13 >>> 8 & 255;
        o[54] = x13 >>> 16 & 255;
        o[55] = x13 >>> 24 & 255;
        o[56] = x14 >>> 0 & 255;
        o[57] = x14 >>> 8 & 255;
        o[58] = x14 >>> 16 & 255;
        o[59] = x14 >>> 24 & 255;
        o[60] = x15 >>> 0 & 255;
        o[61] = x15 >>> 8 & 255;
        o[62] = x15 >>> 16 & 255;
        o[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x5 >>> 0 & 255;
        o[5] = x5 >>> 8 & 255;
        o[6] = x5 >>> 16 & 255;
        o[7] = x5 >>> 24 & 255;
        o[8] = x10 >>> 0 & 255;
        o[9] = x10 >>> 8 & 255;
        o[10] = x10 >>> 16 & 255;
        o[11] = x10 >>> 24 & 255;
        o[12] = x15 >>> 0 & 255;
        o[13] = x15 >>> 8 & 255;
        o[14] = x15 >>> 16 & 255;
        o[15] = x15 >>> 24 & 255;
        o[16] = x6 >>> 0 & 255;
        o[17] = x6 >>> 8 & 255;
        o[18] = x6 >>> 16 & 255;
        o[19] = x6 >>> 24 & 255;
        o[20] = x7 >>> 0 & 255;
        o[21] = x7 >>> 8 & 255;
        o[22] = x7 >>> 16 & 255;
        o[23] = x7 >>> 24 & 255;
        o[24] = x8 >>> 0 & 255;
        o[25] = x8 >>> 8 & 255;
        o[26] = x8 >>> 16 & 255;
        o[27] = x8 >>> 24 & 255;
        o[28] = x9 >>> 0 & 255;
        o[29] = x9 >>> 8 & 255;
        o[30] = x9 >>> 16 & 255;
        o[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
        }
        return 0;
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = x[i];
        }
        return 0;
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20(c, cpos, d, sn, s);
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i;
        if (this.leftover) {
          i = this.leftover;
          this.buffer[i++] = 1;
          for (; i < 16; i++) this.buffer[i] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this.h[i] += c;
          c = this.h[i] >>> 13;
          this.h[i] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++) g[i] &= mask;
        mask = ~mask;
        for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
          this.h[i] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes) want = bytes;
          for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16) return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k);
        s.update(m, mpos, n);
        s.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i;
        if (d < 32) return -1;
        crypto_stream_xor(c, 0, m, 0, d, n, k);
        crypto_onetimeauth(c, 16, c, 32, d - 32, c);
        for (i = 0; i < 16; i++) c[i] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i;
        var x = new Uint8Array(32);
        if (d < 32) return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
        crypto_stream_xor(m, 0, c, 0, d, n, k);
        for (i = 0; i < 32; i++) m[i] = 0;
        return 0;
      }
      function set25519(r, a) {
        var i;
        for (i = 0; i < 16; i++) r[i] = a[i] | 0;
      }
      function car25519(o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535;
          c = Math.floor(v / 65536);
          o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        var t, c = ~(b - 1);
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i]);
          p[i] ^= t;
          q[i] ^= t;
        }
      }
      function pack25519(o, n) {
        var i, j, b;
        var m = gf(), t = gf();
        for (i = 0; i < 16; i++) t[i] = n[i];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255;
          o[2 * i + 1] = t[i] >> 8;
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d, b);
        return crypto_verify_32(c, 0, d, 0);
      }
      function par25519(a) {
        var d = new Uint8Array(32);
        pack25519(d, a);
        return d[0] & 1;
      }
      function unpack25519(o, n) {
        var i;
        for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        o[15] &= 32767;
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
      }
      function M(o, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
      }
      function S(o, a) {
        M(o, a, a);
      }
      function inv25519(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function pow2523(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function crypto_scalarmult(q, n, p) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i;
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
        for (i = 0; i < 31; i++) z[i] = n[i];
        z[31] = n[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p);
        for (i = 0; i < 16; i++) {
          b[i] = x[i];
          d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
          r = z[i >>> 3] >>> (i & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d, r);
          A(e, a, c);
          Z(a, a, c);
          A(c, b, d);
          Z(b, b, d);
          S(d, e);
          S(f, a);
          M(a, c, a);
          M(c, b, e);
          A(e, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d, f);
          M(a, c, _121665);
          A(a, a, d);
          M(c, c, a);
          M(a, d, f);
          M(d, b, x);
          S(b, e);
          sel25519(a, b, r);
          sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i];
          x[i + 32] = c[i];
          x[i + 48] = b[i];
          x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32);
        crypto_scalarmult(s, x, y);
        return crypto_core_hsalsa20(k, _0, s, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d, n, k);
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d, n, k);
      }
      var K = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos;
            wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l = al7;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 65535 | d << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l = tl;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 65535 | d << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l = bl3;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 65535 | d << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l = wl[j];
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 65535 | d << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l = al0;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[0];
          l = hl[0];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[0] = ah0 = c & 65535 | d << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l = al1;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[1];
          l = hl[1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[1] = ah1 = c & 65535 | d << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l = al2;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[2];
          l = hl[2];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[2] = ah2 = c & 65535 | d << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l = al3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[3];
          l = hl[3];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[3] = ah3 = c & 65535 | d << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l = al4;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[4];
          l = hl[4];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[4] = ah4 = c & 65535 | d << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l = al5;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[5];
          l = hl[5];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[5] = ah5 = c & 65535 | d << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l = al6;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[6];
          l = hl[6];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[6] = ah6 = c & 65535 | d << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[7];
          l = hl[7];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[7] = ah7 = c & 65535 | d << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i = 0; i < n; i++) x[i] = m[b - n + i];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
        return 0;
      }
      function add(p, q) {
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p[1], p[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p[0], p[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p[3], q[3]);
        M(c, c, D2);
        M(d, p[2], q[2]);
        A(d, d, d);
        Z(e, b, a);
        Z(f, d, c);
        A(g, d, c);
        A(h, b, a);
        M(p[0], e, f);
        M(p[1], h, g);
        M(p[2], g, f);
        M(p[3], e, h);
      }
      function cswap(p, q, b) {
        var i;
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b);
        }
      }
      function pack(r, p) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p[2]);
        M(tx, p[0], zi);
        M(ty, p[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p, q, s) {
        var b, i;
        set25519(p[0], gf0);
        set25519(p[1], gf1);
        set25519(p[2], gf1);
        set25519(p[3], gf0);
        for (i = 255; i >= 0; --i) {
          b = s[i / 8 | 0] >> (i & 7) & 1;
          cswap(p, q, b);
          add(q, p);
          add(p, p);
          cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p, q, s);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()];
        var i;
        if (!seeded) randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p, d);
        pack(pk, p);
        for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
        return 0;
      }
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          carry = 0;
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++) x[j] -= carry * L[j];
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8;
          r[i] = x[i] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i;
        for (i = 0; i < 64; i++) x[i] = r[i];
        for (i = 0; i < 64; i++) r[i] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i, j, x = new Float64Array(64);
        var p = [gf(), gf(), gf(), gf()];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n + 64;
        for (i = 0; i < n; i++) sm[64 + i] = m[i];
        for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p, r);
        pack(sm, p);
        for (i = 32; i < 64; i++) sm[i] = sk[i];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i = 0; i < 64; i++) x[i] = 0;
        for (i = 0; i < 32; i++) x[i] = r[i];
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) return -1;
        if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n < 64) return -1;
        if (unpackneg(q, pk)) return -1;
        for (i = 0; i < n; i++) m[i] = sm[i];
        for (i = 0; i < 32; i++) m[i + 32] = pk[i];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p, q, h);
        scalarbase(q, sm.subarray(32));
        add(p, q);
        pack(t, p);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++) m[i] = 0;
          return -1;
        }
        for (i = 0; i < n; i++) m[i] = sm[i + 64];
        return n;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl2.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES) throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array)) throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++) arr[i] = 0;
      }
      nacl2.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl2.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl2.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
        if (c.length < 32) return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl2.scalarMult = function(n, p) {
        checkArrayTypes(n, p);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        if (p.length !== crypto_scalarmult_BYTES) throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p);
        return q;
      };
      nacl2.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl2.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox(msg, nonce, k);
      };
      nacl2.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl2.box.after = nacl2.secretbox;
      nacl2.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox.open(msg, nonce, k);
      };
      nacl2.box.open.after = nacl2.secretbox.open;
      nacl2.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl2.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return {
          publicKey: pk,
          secretKey: new Uint8Array(secretKey)
        };
      };
      nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl2.box.nonceLength = crypto_box_NONCEBYTES;
      nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
      nacl2.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl2.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0) return null;
        var m = new Uint8Array(mlen);
        for (var i = 0; i < m.length; i++) m[i] = tmp[i];
        return m;
      };
      nacl2.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl2.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
        return sig;
      };
      nacl2.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES) throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i;
        for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
        for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl2.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl2.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
        return {
          publicKey: pk,
          secretKey: new Uint8Array(secretKey)
        };
      };
      nacl2.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES) throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i = 0; i < 32; i++) sk[i] = seed[i];
        crypto_sign_keypair(pk, sk, true);
        return {
          publicKey: pk,
          secretKey: sk
        };
      };
      nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl2.sign.signatureLength = crypto_sign_BYTES;
      nacl2.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl2.hash.hashLength = crypto_hash_BYTES;
      nacl2.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0) return false;
        if (x.length !== y.length) return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl2.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto && crypto.getRandomValues) {
          var QUOTA = 65536;
          nacl2.setPRNG(function(x, n) {
            var i, v = new Uint8Array(n);
            for (i = 0; i < n; i += QUOTA) {
              crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            for (i = 0; i < n; i++) x[i] = v[i];
            cleanup(v);
          });
        } else if (typeof __require !== "undefined") {
          crypto = require_crypto();
          if (crypto && crypto.randomBytes) {
            nacl2.setPRNG(function(x, n) {
              var i, v = crypto.randomBytes(n);
              for (i = 0; i < n; i++) x[i] = v[i];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module !== "undefined" && module.exports ? module.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/@tonconnect/protocol/lib/esm/index.mjs
var import_tweetnacl_util = __toESM(require_nacl_util(), 1);
var import_tweetnacl = __toESM(require_nacl_fast(), 1);
var CONNECT_EVENT_ERROR_CODES;
(function(CONNECT_EVENT_ERROR_CODES2) {
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_NOT_FOUND_ERROR"] = 2] = "MANIFEST_NOT_FOUND_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["MANIFEST_CONTENT_ERROR"] = 3] = "MANIFEST_CONTENT_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  CONNECT_EVENT_ERROR_CODES2[CONNECT_EVENT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_EVENT_ERROR_CODES || (CONNECT_EVENT_ERROR_CODES = {}));
var CONNECT_ITEM_ERROR_CODES;
(function(CONNECT_ITEM_ERROR_CODES2) {
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  CONNECT_ITEM_ERROR_CODES2[CONNECT_ITEM_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(CONNECT_ITEM_ERROR_CODES || (CONNECT_ITEM_ERROR_CODES = {}));
var SEND_TRANSACTION_ERROR_CODES;
(function(SEND_TRANSACTION_ERROR_CODES2) {
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SEND_TRANSACTION_ERROR_CODES2[SEND_TRANSACTION_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SEND_TRANSACTION_ERROR_CODES || (SEND_TRANSACTION_ERROR_CODES = {}));
var SIGN_DATA_ERROR_CODES;
(function(SIGN_DATA_ERROR_CODES2) {
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["USER_REJECTS_ERROR"] = 300] = "USER_REJECTS_ERROR";
  SIGN_DATA_ERROR_CODES2[SIGN_DATA_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(SIGN_DATA_ERROR_CODES || (SIGN_DATA_ERROR_CODES = {}));
var DISCONNECT_ERROR_CODES;
(function(DISCONNECT_ERROR_CODES2) {
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["BAD_REQUEST_ERROR"] = 1] = "BAD_REQUEST_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["UNKNOWN_APP_ERROR"] = 100] = "UNKNOWN_APP_ERROR";
  DISCONNECT_ERROR_CODES2[DISCONNECT_ERROR_CODES2["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
})(DISCONNECT_ERROR_CODES || (DISCONNECT_ERROR_CODES = {}));
var CHAIN;
(function(CHAIN2) {
  CHAIN2["MAINNET"] = "-239";
  CHAIN2["TESTNET"] = "-3";
})(CHAIN || (CHAIN = {}));
function encodeUint8Array(value, urlSafe) {
  const encoded = import_tweetnacl_util.default.encodeBase64(value);
  if (!urlSafe) {
    return encoded;
  }
  return encodeURIComponent(encoded);
}
function decodeToUint8Array(value, urlSafe) {
  if (urlSafe) {
    value = decodeURIComponent(value);
  }
  return import_tweetnacl_util.default.decodeBase64(value);
}
function encode(value, urlSafe = false) {
  let uint8Array;
  if (value instanceof Uint8Array) {
    uint8Array = value;
  } else {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    uint8Array = import_tweetnacl_util.default.decodeUTF8(value);
  }
  return encodeUint8Array(uint8Array, urlSafe);
}
function decode(value, urlSafe = false) {
  const decodedUint8Array = decodeToUint8Array(value, urlSafe);
  return {
    toString() {
      return import_tweetnacl_util.default.encodeUTF8(decodedUint8Array);
    },
    toObject() {
      try {
        return JSON.parse(import_tweetnacl_util.default.encodeUTF8(decodedUint8Array));
      } catch (e) {
        return null;
      }
    },
    toUint8Array() {
      return decodedUint8Array;
    }
  };
}
var Base64 = {
  encode,
  decode
};
function concatUint8Arrays(buffer1, buffer2) {
  const mergedArray = new Uint8Array(buffer1.length + buffer2.length);
  mergedArray.set(buffer1);
  mergedArray.set(buffer2, buffer1.length);
  return mergedArray;
}
function splitToUint8Arrays(array, index) {
  if (index >= array.length) {
    throw new Error("Index is out of buffer");
  }
  const subArray1 = array.slice(0, index);
  const subArray2 = array.slice(index);
  return [subArray1, subArray2];
}
function toHexString(byteArray) {
  let hexString = "";
  byteArray.forEach((byte) => {
    hexString += ("0" + (byte & 255).toString(16)).slice(-2);
  });
  return hexString;
}
function hexToByteArray(hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error(`Cannot convert ${hexString} to bytesArray`);
  }
  const result = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    result[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }
  return result;
}
var SessionCrypto = class {
  constructor(keyPair) {
    this.nonceLength = 24;
    this.keyPair = keyPair ? this.createKeypairFromString(keyPair) : this.createKeypair();
    this.sessionId = toHexString(this.keyPair.publicKey);
  }
  createKeypair() {
    return import_tweetnacl.default.box.keyPair();
  }
  createKeypairFromString(keyPair) {
    return {
      publicKey: hexToByteArray(keyPair.publicKey),
      secretKey: hexToByteArray(keyPair.secretKey)
    };
  }
  createNonce() {
    return import_tweetnacl.default.randomBytes(this.nonceLength);
  }
  encrypt(message, receiverPublicKey) {
    const encodedMessage = new TextEncoder().encode(message);
    const nonce = this.createNonce();
    const encrypted = import_tweetnacl.default.box(encodedMessage, nonce, receiverPublicKey, this.keyPair.secretKey);
    return concatUint8Arrays(nonce, encrypted);
  }
  decrypt(message, senderPublicKey) {
    const [nonce, internalMessage] = splitToUint8Arrays(message, this.nonceLength);
    const decrypted = import_tweetnacl.default.box.open(internalMessage, nonce, senderPublicKey, this.keyPair.secretKey);
    if (!decrypted) {
      throw new Error(`Decryption error: 
 message: ${message.toString()} 
 sender pubkey: ${senderPublicKey.toString()} 
 keypair pubkey: ${this.keyPair.publicKey.toString()} 
 keypair secretkey: ${this.keyPair.secretKey.toString()}`);
    }
    return new TextDecoder().decode(decrypted);
  }
  stringifyKeypair() {
    return {
      publicKey: toHexString(this.keyPair.publicKey),
      secretKey: toHexString(this.keyPair.secretKey)
    };
  }
};

// node_modules/@tonconnect/isomorphic-eventsource/browser.js
{
}

// node_modules/@tonconnect/isomorphic-fetch/browser.js
{
}

// node_modules/@tonconnect/sdk/lib/esm/index.mjs
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var TonConnectError = class _TonConnectError extends Error {
  constructor(message, options) {
    super(message, options);
    this.message = `${_TonConnectError.prefix} ${this.constructor.name}${this.info ? ": " + this.info : ""}${message ? "\n" + message : ""}`;
    Object.setPrototypeOf(this, _TonConnectError.prototype);
  }
  get info() {
    return "";
  }
};
TonConnectError.prefix = "[TON_CONNECT_SDK_ERROR]";
var DappMetadataError = class _DappMetadataError extends TonConnectError {
  get info() {
    return "Passed DappMetadata is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _DappMetadataError.prototype);
  }
};
var ManifestContentErrorError = class _ManifestContentErrorError extends TonConnectError {
  get info() {
    return "Passed `tonconnect-manifest.json` contains errors. Check format of your manifest. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ManifestContentErrorError.prototype);
  }
};
var ManifestNotFoundError = class _ManifestNotFoundError extends TonConnectError {
  get info() {
    return "Manifest not found. Make sure you added `tonconnect-manifest.json` to the root of your app or passed correct manifestUrl. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ManifestNotFoundError.prototype);
  }
};
var WalletAlreadyConnectedError = class _WalletAlreadyConnectedError extends TonConnectError {
  get info() {
    return "Wallet connection called but wallet already connected. To avoid the error, disconnect the wallet before doing a new connection.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletAlreadyConnectedError.prototype);
  }
};
var WalletNotConnectedError = class _WalletNotConnectedError extends TonConnectError {
  get info() {
    return "Send transaction or other protocol methods called while wallet is not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotConnectedError.prototype);
  }
};
var WalletNotInjectedError = class _WalletNotInjectedError extends TonConnectError {
  get info() {
    return "There is an attempt to connect to the injected wallet while it is not exists in the webpage.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotInjectedError.prototype);
  }
};
var WalletNotSupportFeatureError = class _WalletNotSupportFeatureError extends TonConnectError {
  get info() {
    return "Wallet doesn't support requested feature method.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WalletNotSupportFeatureError.prototype);
  }
};
var WalletMissingRequiredFeaturesError = class _WalletMissingRequiredFeaturesError extends TonConnectError {
  get info() {
    return "Missing required features. You need to update your wallet.";
  }
  constructor(message, options) {
    super(message, options);
    Object.setPrototypeOf(this, _WalletMissingRequiredFeaturesError.prototype);
  }
};
function isWalletConnectionSourceJS(value) {
  return "jsBridgeKey" in value;
}
var UserRejectsError = class _UserRejectsError extends TonConnectError {
  get info() {
    return "User rejects the action in the wallet.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UserRejectsError.prototype);
  }
};
var BadRequestError = class _BadRequestError extends TonConnectError {
  get info() {
    return "Request to the wallet contains errors.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _BadRequestError.prototype);
  }
};
var UnknownAppError = class _UnknownAppError extends TonConnectError {
  get info() {
    return "App tries to send rpc request to the injected wallet while not connected.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UnknownAppError.prototype);
  }
};
var LocalstorageNotFoundError = class _LocalstorageNotFoundError extends TonConnectError {
  get info() {
    return "Storage was not specified in the `DappMetadata` and default `localStorage` was not detected in the environment.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _LocalstorageNotFoundError.prototype);
  }
};
var FetchWalletsError = class _FetchWalletsError extends TonConnectError {
  get info() {
    return "An error occurred while fetching the wallets list.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _FetchWalletsError.prototype);
  }
};
var WrongAddressError = class _WrongAddressError extends TonConnectError {
  get info() {
    return "Passed address is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _WrongAddressError.prototype);
  }
};
var ParseHexError = class _ParseHexError extends TonConnectError {
  get info() {
    return "Passed hex is in incorrect format.";
  }
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _ParseHexError.prototype);
  }
};
var UnknownError = class _UnknownError extends TonConnectError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, _UnknownError.prototype);
  }
};
var connectEventErrorsCodes = {
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [CONNECT_EVENT_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [CONNECT_EVENT_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [CONNECT_EVENT_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_NOT_FOUND_ERROR]: ManifestNotFoundError,
  [CONNECT_EVENT_ERROR_CODES.MANIFEST_CONTENT_ERROR]: ManifestContentErrorError
};
var ConnectErrorsParser = class {
  parseError(error) {
    let ErrorConstructor = UnknownError;
    if (error.code in connectEventErrorsCodes) {
      ErrorConstructor = connectEventErrorsCodes[error.code] || UnknownError;
    }
    return new ErrorConstructor(error.message);
  }
};
var connectErrorsParser = new ConnectErrorsParser();
var RpcParser = class {
  isError(response) {
    return "error" in response;
  }
};
var sendTransactionErrors = {
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_ERROR]: UnknownError,
  [SEND_TRANSACTION_ERROR_CODES.USER_REJECTS_ERROR]: UserRejectsError,
  [SEND_TRANSACTION_ERROR_CODES.BAD_REQUEST_ERROR]: BadRequestError,
  [SEND_TRANSACTION_ERROR_CODES.UNKNOWN_APP_ERROR]: UnknownAppError
};
var SendTransactionParser = class extends RpcParser {
  convertToRpcRequest(request) {
    return {
      method: "sendTransaction",
      params: [JSON.stringify(request)]
    };
  }
  parseAndThrowError(response) {
    let ErrorConstructor = UnknownError;
    if (response.error.code in sendTransactionErrors) {
      ErrorConstructor = sendTransactionErrors[response.error.code] || UnknownError;
    }
    throw new ErrorConstructor(response.error.message);
  }
  convertFromRpcResponse(rpcResponse) {
    return {
      boc: rpcResponse.result
    };
  }
};
var sendTransactionParser = new SendTransactionParser();
var HttpBridgeGatewayStorage = class {
  constructor(storage, bridgeUrl) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_http-bridge-gateway::" + bridgeUrl;
  }
  storeLastEventId(lastEventId) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.setItem(this.storeKey, lastEventId);
    });
  }
  removeLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      return stored;
    });
  }
};
function removeUrlLastSlash(url) {
  if (url.slice(-1) === "/") {
    return url.slice(0, -1);
  }
  return url;
}
function addPathToUrl(url, path) {
  return removeUrlLastSlash(url) + "/" + path;
}
function isTelegramUrl(link) {
  if (!link) {
    return false;
  }
  const url = new URL(link);
  return url.protocol === "tg:" || url.hostname === "t.me";
}
function encodeTelegramUrlParameters(parameters) {
  return parameters.replaceAll(".", "%2E").replaceAll("-", "%2D").replaceAll("_", "%5F").replaceAll("&", "-").replaceAll("=", "__").replaceAll("%", "--");
}
function delay(timeout2, options) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      var _a, _b;
      if ((_a = options === null || options === void 0 ? void 0 : options.signal) === null || _a === void 0 ? void 0 : _a.aborted) {
        reject(new TonConnectError("Delay aborted"));
        return;
      }
      const timeoutId = setTimeout(() => resolve(), timeout2);
      (_b = options === null || options === void 0 ? void 0 : options.signal) === null || _b === void 0 ? void 0 : _b.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new TonConnectError("Delay aborted"));
      });
    });
  });
}
function createAbortController(signal) {
  const abortController = new AbortController();
  if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
    abortController.abort();
  } else {
    signal === null || signal === void 0 ? void 0 : signal.addEventListener("abort", () => abortController.abort(), {
      once: true
    });
  }
  return abortController;
}
function callForSuccess(fn, options) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    const attempts = (_a = options === null || options === void 0 ? void 0 : options.attempts) !== null && _a !== void 0 ? _a : 10;
    const delayMs = (_b = options === null || options === void 0 ? void 0 : options.delayMs) !== null && _b !== void 0 ? _b : 200;
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    if (typeof fn !== "function") {
      throw new TonConnectError(`Expected a function, got ${typeof fn}`);
    }
    let i = 0;
    let lastError;
    while (i < attempts) {
      if (abortController.signal.aborted) {
        throw new TonConnectError(`Aborted after attempts ${i}`);
      }
      try {
        return yield fn({
          signal: abortController.signal
        });
      } catch (err) {
        lastError = err;
        i++;
        if (i < attempts) {
          yield delay(delayMs);
        }
      }
    }
    throw lastError;
  });
}
function logDebug(...args) {
  {
    try {
      console.debug("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logError(...args) {
  {
    try {
      console.error("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function logWarning(...args) {
  {
    try {
      console.warn("[TON_CONNECT_SDK]", ...args);
    } catch (_a) {
    }
  }
}
function createResource(createFn, disposeFn) {
  let currentResource = null;
  let currentArgs = null;
  let currentPromise = null;
  let currentSignal = null;
  let abortController = null;
  const create = (signal, ...args) => __awaiter(this, void 0, void 0, function* () {
    currentSignal = signal !== null && signal !== void 0 ? signal : null;
    abortController === null || abortController === void 0 ? void 0 : abortController.abort();
    abortController = createAbortController(signal);
    if (abortController.signal.aborted) {
      throw new TonConnectError("Resource creation was aborted");
    }
    currentArgs = args !== null && args !== void 0 ? args : null;
    const promise = createFn(abortController.signal, ...args);
    currentPromise = promise;
    const resource = yield promise;
    if (currentPromise !== promise && resource !== currentResource) {
      yield disposeFn(resource);
      throw new TonConnectError("Resource creation was aborted by a new resource creation");
    }
    currentResource = resource;
    return currentResource;
  });
  const current = () => {
    return currentResource !== null && currentResource !== void 0 ? currentResource : null;
  };
  const dispose = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const resource = currentResource;
      currentResource = null;
      const promise = currentPromise;
      currentPromise = null;
      try {
        abortController === null || abortController === void 0 ? void 0 : abortController.abort();
      } catch (e) {
      }
      yield Promise.allSettled([resource ? disposeFn(resource) : Promise.resolve(), promise ? disposeFn(yield promise) : Promise.resolve()]);
    } catch (e) {
    }
  });
  const recreate = (delayMs) => __awaiter(this, void 0, void 0, function* () {
    const resource = currentResource;
    const promise = currentPromise;
    const args = currentArgs;
    const signal = currentSignal;
    yield delay(delayMs);
    if (resource === currentResource && promise === currentPromise && args === currentArgs && signal === currentSignal) {
      return yield create(currentSignal, ...args !== null && args !== void 0 ? args : []);
    }
    throw new TonConnectError("Resource recreation was aborted by a new resource creation");
  });
  return {
    create,
    current,
    dispose,
    recreate
  };
}
function timeout(fn, options) {
  const timeout2 = options === null || options === void 0 ? void 0 : options.timeout;
  const signal = options === null || options === void 0 ? void 0 : options.signal;
  const abortController = createAbortController(signal);
  return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    if (abortController.signal.aborted) {
      reject(new TonConnectError("Operation aborted"));
      return;
    }
    let timeoutId;
    if (typeof timeout2 !== "undefined") {
      timeoutId = setTimeout(() => {
        abortController.abort();
        reject(new TonConnectError(`Timeout after ${timeout2}ms`));
      }, timeout2);
    }
    abortController.signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new TonConnectError("Operation aborted"));
    }, {
      once: true
    });
    const deferOptions = {
      timeout: timeout2,
      abort: abortController.signal
    };
    yield fn((...args) => {
      clearTimeout(timeoutId);
      resolve(...args);
    }, () => {
      clearTimeout(timeoutId);
      reject();
    }, deferOptions);
  }));
}
var BridgeGateway = class {
  constructor(storage, bridgeUrl, sessionId, listener, errorsListener) {
    this.bridgeUrl = bridgeUrl;
    this.sessionId = sessionId;
    this.listener = listener;
    this.errorsListener = errorsListener;
    this.ssePath = "events";
    this.postPath = "message";
    this.heartbeatMessage = "heartbeat";
    this.defaultTtl = 300;
    this.defaultReconnectDelay = 2e3;
    this.defaultResendDelay = 5e3;
    this.eventSource = createResource((signal, openingDeadlineMS) => __awaiter(this, void 0, void 0, function* () {
      const eventSourceConfig = {
        bridgeUrl: this.bridgeUrl,
        ssePath: this.ssePath,
        sessionId: this.sessionId,
        bridgeGatewayStorage: this.bridgeGatewayStorage,
        errorHandler: this.errorsHandler.bind(this),
        messageHandler: this.messagesHandler.bind(this),
        signal,
        openingDeadlineMS
      };
      return yield createEventSource(eventSourceConfig);
    }), (resource) => __awaiter(this, void 0, void 0, function* () {
      resource.close();
    }));
    this.bridgeGatewayStorage = new HttpBridgeGatewayStorage(storage, bridgeUrl);
  }
  get isReady() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) === EventSource.OPEN;
  }
  get isClosed() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) !== EventSource.OPEN;
  }
  get isConnecting() {
    const eventSource = this.eventSource.current();
    return (eventSource === null || eventSource === void 0 ? void 0 : eventSource.readyState) === EventSource.CONNECTING;
  }
  registerSession(options) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventSource.create(options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.openingDeadlineMS);
    });
  }
  send(message, receiver, topic, ttlOrOptions) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof ttlOrOptions === "number") {
        options.ttl = ttlOrOptions;
      } else {
        options.ttl = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.ttl;
        options.signal = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.signal;
        options.attempts = ttlOrOptions === null || ttlOrOptions === void 0 ? void 0 : ttlOrOptions.attempts;
      }
      const url = new URL(addPathToUrl(this.bridgeUrl, this.postPath));
      url.searchParams.append("client_id", this.sessionId);
      url.searchParams.append("to", receiver);
      url.searchParams.append("ttl", ((options === null || options === void 0 ? void 0 : options.ttl) || this.defaultTtl).toString());
      url.searchParams.append("topic", topic);
      const body = Base64.encode(message);
      yield callForSuccess((options2) => __awaiter(this, void 0, void 0, function* () {
        const response = yield this.post(url, body, options2.signal);
        if (!response.ok) {
          throw new TonConnectError(`Bridge send failed, status ${response.status}`);
        }
      }), {
        attempts: (_a = options === null || options === void 0 ? void 0 : options.attempts) !== null && _a !== void 0 ? _a : Number.MAX_SAFE_INTEGER,
        delayMs: this.defaultResendDelay,
        signal: options === null || options === void 0 ? void 0 : options.signal
      });
    });
  }
  pause() {
    this.eventSource.dispose().catch((e) => logError(`Bridge pause failed, ${e}`));
  }
  unPause() {
    return __awaiter(this, void 0, void 0, function* () {
      const RECREATE_WITHOUT_DELAY = 0;
      yield this.eventSource.recreate(RECREATE_WITHOUT_DELAY);
    });
  }
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventSource.dispose().catch((e) => logError(`Bridge close failed, ${e}`));
    });
  }
  setListener(listener) {
    this.listener = listener;
  }
  setErrorsListener(errorsListener) {
    this.errorsListener = errorsListener;
  }
  post(url, body, signal) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(url, {
        method: "post",
        body,
        signal
      });
      if (!response.ok) {
        throw new TonConnectError(`Bridge send failed, status ${response.status}`);
      }
      return response;
    });
  }
  errorsHandler(eventSource, e) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.isConnecting) {
        eventSource.close();
        throw new TonConnectError("Bridge error, failed to connect");
      }
      if (this.isReady) {
        try {
          this.errorsListener(e);
        } catch (e2) {
        }
        return;
      }
      if (this.isClosed) {
        eventSource.close();
        logDebug(`Bridge reconnecting, ${this.defaultReconnectDelay}ms delay`);
        return yield this.eventSource.recreate(this.defaultReconnectDelay);
      }
      throw new TonConnectError("Bridge error, unknown state");
    });
  }
  messagesHandler(e) {
    return __awaiter(this, void 0, void 0, function* () {
      if (e.data === this.heartbeatMessage) {
        return;
      }
      yield this.bridgeGatewayStorage.storeLastEventId(e.lastEventId);
      if (this.isClosed) {
        return;
      }
      let bridgeIncomingMessage;
      try {
        bridgeIncomingMessage = JSON.parse(e.data);
      } catch (e2) {
        throw new TonConnectError(`Bridge message parse failed, message ${e2.data}`);
      }
      this.listener(bridgeIncomingMessage);
    });
  }
};
function createEventSource(config) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield timeout((resolve, reject, deferOptions) => __awaiter(this, void 0, void 0, function* () {
      var _a;
      const abortController = createAbortController(deferOptions.signal);
      const signal = abortController.signal;
      if (signal.aborted) {
        reject(new TonConnectError("Bridge connection aborted"));
        return;
      }
      const url = new URL(addPathToUrl(config.bridgeUrl, config.ssePath));
      url.searchParams.append("client_id", config.sessionId);
      const lastEventId = yield config.bridgeGatewayStorage.getLastEventId();
      if (lastEventId) {
        url.searchParams.append("last_event_id", lastEventId);
      }
      if (signal.aborted) {
        reject(new TonConnectError("Bridge connection aborted"));
        return;
      }
      const eventSource = new EventSource(url.toString());
      eventSource.onerror = (reason) => __awaiter(this, void 0, void 0, function* () {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        try {
          const newInstance = yield config.errorHandler(eventSource, reason);
          if (newInstance !== eventSource) {
            eventSource.close();
          }
          if (newInstance && newInstance !== eventSource) {
            resolve(newInstance);
          }
        } catch (e) {
          eventSource.close();
          reject(e);
        }
      });
      eventSource.onopen = () => {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        resolve(eventSource);
      };
      eventSource.onmessage = (event) => {
        if (signal.aborted) {
          eventSource.close();
          reject(new TonConnectError("Bridge connection aborted"));
          return;
        }
        config.messageHandler(event);
      };
      (_a = config.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => {
        eventSource.close();
        reject(new TonConnectError("Bridge connection aborted"));
      });
    }), {
      timeout: config.openingDeadlineMS,
      signal: config.signal
    });
  });
}
function isPendingConnectionHttp(connection) {
  return !("connectEvent" in connection);
}
var BridgeConnectionStorage = class {
  constructor(storage) {
    this.storage = storage;
    this.storeKey = "ton-connect-storage_bridge-connection";
  }
  storeConnection(connection) {
    return __awaiter(this, void 0, void 0, function* () {
      if (connection.type === "injected") {
        return this.storage.setItem(this.storeKey, JSON.stringify(connection));
      }
      if (!isPendingConnectionHttp(connection)) {
        const rawSession = {
          sessionKeyPair: connection.session.sessionCrypto.stringifyKeypair(),
          walletPublicKey: connection.session.walletPublicKey,
          bridgeUrl: connection.session.bridgeUrl
        };
        const rawConnection2 = {
          type: "http",
          connectEvent: connection.connectEvent,
          session: rawSession,
          lastWalletEventId: connection.lastWalletEventId,
          nextRpcRequestId: connection.nextRpcRequestId
        };
        return this.storage.setItem(this.storeKey, JSON.stringify(rawConnection2));
      }
      const rawConnection = {
        type: "http",
        connectionSource: connection.connectionSource,
        sessionCrypto: connection.sessionCrypto.stringifyKeypair()
      };
      return this.storage.setItem(this.storeKey, JSON.stringify(rawConnection));
    });
  }
  removeConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.storage.removeItem(this.storeKey);
    });
  }
  getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      if (connection.type === "injected") {
        return connection;
      }
      if ("connectEvent" in connection) {
        const sessionCrypto = new SessionCrypto(connection.session.sessionKeyPair);
        return {
          type: "http",
          connectEvent: connection.connectEvent,
          lastWalletEventId: connection.lastWalletEventId,
          nextRpcRequestId: connection.nextRpcRequestId,
          session: {
            sessionCrypto,
            bridgeUrl: connection.session.bridgeUrl,
            walletPublicKey: connection.session.walletPublicKey
          }
        };
      }
      return {
        type: "http",
        sessionCrypto: new SessionCrypto(connection.sessionCrypto),
        connectionSource: connection.connectionSource
      };
    });
  }
  getHttpConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read HTTP connection source while nothing is stored");
      }
      if (connection.type === "injected") {
        throw new TonConnectError("Trying to read HTTP connection source while injected connection is stored");
      }
      return connection;
    });
  }
  getHttpPendingConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read HTTP connection source while nothing is stored");
      }
      if (connection.type === "injected") {
        throw new TonConnectError("Trying to read HTTP connection source while injected connection is stored");
      }
      if (!isPendingConnectionHttp(connection)) {
        throw new TonConnectError("Trying to read HTTP-pending connection while http connection is stored");
      }
      return connection;
    });
  }
  getInjectedConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (!connection) {
        throw new TonConnectError("Trying to read Injected bridge connection source while nothing is stored");
      }
      if ((connection === null || connection === void 0 ? void 0 : connection.type) === "http") {
        throw new TonConnectError("Trying to read Injected bridge connection source while HTTP connection is stored");
      }
      return connection;
    });
  }
  storedConnectionType() {
    return __awaiter(this, void 0, void 0, function* () {
      const stored = yield this.storage.getItem(this.storeKey);
      if (!stored) {
        return null;
      }
      const connection = JSON.parse(stored);
      return connection.type;
    });
  }
  storeLastWalletEventId(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && connection.type === "http" && !isPendingConnectionHttp(connection)) {
        connection.lastWalletEventId = id;
        return this.storeConnection(connection);
      }
    });
  }
  getLastWalletEventId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "lastWalletEventId" in connection) {
        return connection.lastWalletEventId;
      }
      return void 0;
    });
  }
  increaseNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "nextRpcRequestId" in connection) {
        const lastId = connection.nextRpcRequestId || 0;
        connection.nextRpcRequestId = lastId + 1;
        return this.storeConnection(connection);
      }
    });
  }
  getNextRpcRequestId() {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield this.getConnection();
      if (connection && "nextRpcRequestId" in connection) {
        return connection.nextRpcRequestId || 0;
      }
      return 0;
    });
  }
};
var PROTOCOL_VERSION = 2;
var BridgeProvider = class _BridgeProvider {
  constructor(storage, walletConnectionSource) {
    this.storage = storage;
    this.walletConnectionSource = walletConnectionSource;
    this.type = "http";
    this.standardUniversalLink = "tc://";
    this.pendingRequests = /* @__PURE__ */ new Map();
    this.session = null;
    this.gateway = null;
    this.pendingGateways = [];
    this.listeners = [];
    this.defaultOpeningDeadlineMS = 12e3;
    this.defaultRetryTimeoutMS = 2e3;
    this.connectionStorage = new BridgeConnectionStorage(storage);
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getHttpConnection();
      if (isPendingConnectionHttp(connection)) {
        return new _BridgeProvider(storage, connection.connectionSource);
      }
      return new _BridgeProvider(storage, {
        bridgeUrl: connection.session.bridgeUrl
      });
    });
  }
  connect(message, options) {
    var _a;
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
    this.abortController = abortController;
    this.closeGateways();
    const sessionCrypto = new SessionCrypto();
    this.session = {
      sessionCrypto,
      bridgeUrl: "bridgeUrl" in this.walletConnectionSource ? this.walletConnectionSource.bridgeUrl : ""
    };
    this.connectionStorage.storeConnection({
      type: "http",
      connectionSource: this.walletConnectionSource,
      sessionCrypto
    }).then(() => __awaiter(this, void 0, void 0, function* () {
      if (abortController.signal.aborted) {
        return;
      }
      yield callForSuccess((_options) => {
        var _a2;
        return this.openGateways(sessionCrypto, {
          openingDeadlineMS: (_a2 = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _a2 !== void 0 ? _a2 : this.defaultOpeningDeadlineMS,
          signal: _options === null || _options === void 0 ? void 0 : _options.signal
        });
      }, {
        attempts: Number.MAX_SAFE_INTEGER,
        delayMs: this.defaultRetryTimeoutMS,
        signal: abortController.signal
      });
    }));
    const universalLink = "universalLink" in this.walletConnectionSource && this.walletConnectionSource.universalLink ? this.walletConnectionSource.universalLink : this.standardUniversalLink;
    return this.generateUniversalLink(universalLink, message);
  }
  restoreConnection(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        return;
      }
      this.closeGateways();
      const storedConnection = yield this.connectionStorage.getHttpConnection();
      if (!storedConnection) {
        return;
      }
      if (abortController.signal.aborted) {
        return;
      }
      const openingDeadlineMS = (_b = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _b !== void 0 ? _b : this.defaultOpeningDeadlineMS;
      if (isPendingConnectionHttp(storedConnection)) {
        this.session = {
          sessionCrypto: storedConnection.sessionCrypto,
          bridgeUrl: "bridgeUrl" in this.walletConnectionSource ? this.walletConnectionSource.bridgeUrl : ""
        };
        return yield this.openGateways(storedConnection.sessionCrypto, {
          openingDeadlineMS,
          signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal
        });
      }
      if (Array.isArray(this.walletConnectionSource)) {
        throw new TonConnectError("Internal error. Connection source is array while WalletConnectionSourceHTTP was expected.");
      }
      this.session = storedConnection.session;
      if (this.gateway) {
        logDebug("Gateway is already opened, closing previous gateway");
        yield this.gateway.close();
      }
      this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, storedConnection.session.sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
      if (abortController.signal.aborted) {
        return;
      }
      this.listeners.forEach((listener) => listener(storedConnection.connectEvent));
      try {
        yield callForSuccess((options2) => this.gateway.registerSession({
          openingDeadlineMS,
          signal: options2.signal
        }), {
          attempts: Number.MAX_SAFE_INTEGER,
          delayMs: this.defaultRetryTimeoutMS,
          signal: abortController.signal
        });
      } catch (e) {
        yield this.disconnect({
          signal: abortController.signal
        });
        return;
      }
    });
  }
  sendRequest(request, optionsOrOnRequestSent) {
    const options = {};
    if (typeof optionsOrOnRequestSent === "function") {
      options.onRequestSent = optionsOrOnRequestSent;
    } else {
      options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
      options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      options.attempts = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.attempts;
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      var _a;
      if (!this.gateway || !this.session || !("walletPublicKey" in this.session)) {
        throw new TonConnectError("Trying to send bridge request without session");
      }
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send http-bridge request:", Object.assign(Object.assign({}, request), {
        id
      }));
      const encodedRequest = this.session.sessionCrypto.encrypt(JSON.stringify(Object.assign(Object.assign({}, request), {
        id
      })), hexToByteArray(this.session.walletPublicKey));
      try {
        yield this.gateway.send(encodedRequest, this.session.walletPublicKey, request.method, {
          attempts: options === null || options === void 0 ? void 0 : options.attempts,
          signal: options === null || options === void 0 ? void 0 : options.signal
        });
        (_a = options === null || options === void 0 ? void 0 : options.onRequestSent) === null || _a === void 0 ? void 0 : _a.call(options);
        this.pendingRequests.set(id.toString(), resolve);
      } catch (e) {
        reject(e);
      }
    }));
  }
  closeConnection() {
    this.closeGateways();
    this.listeners = [];
    this.session = null;
    this.gateway = null;
  }
  disconnect(options) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let called = false;
        let timeoutId = null;
        const onRequestSent = () => {
          if (!called) {
            called = true;
            this.removeBridgeAndSession().then(resolve);
          }
        };
        try {
          this.closeGateways();
          const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
          timeoutId = setTimeout(() => {
            abortController.abort();
          }, this.defaultOpeningDeadlineMS);
          yield this.sendRequest({
            method: "disconnect",
            params: []
          }, {
            onRequestSent,
            signal: abortController.signal,
            attempts: 1
          });
        } catch (e) {
          logDebug("Disconnect error:", e);
          if (!called) {
            this.removeBridgeAndSession().then(resolve);
          }
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          onRequestSent();
        }
      }));
    });
  }
  listen(callback) {
    this.listeners.push(callback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
  pause() {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.pause();
    this.pendingGateways.forEach((bridge) => bridge.pause());
  }
  unPause() {
    return __awaiter(this, void 0, void 0, function* () {
      const promises = this.pendingGateways.map((bridge) => bridge.unPause());
      if (this.gateway) {
        promises.push(this.gateway.unPause());
      }
      yield Promise.all(promises);
    });
  }
  pendingGatewaysListener(gateway, bridgeUrl, bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.pendingGateways.includes(gateway)) {
        yield gateway.close();
        return;
      }
      this.closeGateways({
        except: gateway
      });
      if (this.gateway) {
        logDebug("Gateway is already opened, closing previous gateway");
        yield this.gateway.close();
      }
      this.session.bridgeUrl = bridgeUrl;
      this.gateway = gateway;
      this.gateway.setErrorsListener(this.gatewayErrorsListener.bind(this));
      this.gateway.setListener(this.gatewayListener.bind(this));
      return this.gatewayListener(bridgeIncomingMessage);
    });
  }
  gatewayListener(bridgeIncomingMessage) {
    return __awaiter(this, void 0, void 0, function* () {
      const walletMessage = JSON.parse(this.session.sessionCrypto.decrypt(Base64.decode(bridgeIncomingMessage.message).toUint8Array(), hexToByteArray(bridgeIncomingMessage.from)));
      logDebug("Wallet message received:", walletMessage);
      if (!("event" in walletMessage)) {
        const id = walletMessage.id.toString();
        const resolve = this.pendingRequests.get(id);
        if (!resolve) {
          logDebug(`Response id ${id} doesn't match any request's id`);
          return;
        }
        resolve(walletMessage);
        this.pendingRequests.delete(id);
        return;
      }
      if (walletMessage.id !== void 0) {
        const lastId = yield this.connectionStorage.getLastWalletEventId();
        if (lastId !== void 0 && walletMessage.id <= lastId) {
          logError(`Received event id (=${walletMessage.id}) must be greater than stored last wallet event id (=${lastId}) `);
          return;
        }
        if (walletMessage.event !== "connect") {
          yield this.connectionStorage.storeLastWalletEventId(walletMessage.id);
        }
      }
      const listeners = this.listeners;
      if (walletMessage.event === "connect") {
        yield this.updateSession(walletMessage, bridgeIncomingMessage.from);
      }
      if (walletMessage.event === "disconnect") {
        logDebug(`Removing bridge and session: received disconnect event`);
        yield this.removeBridgeAndSession();
      }
      listeners.forEach((listener) => listener(walletMessage));
    });
  }
  gatewayErrorsListener(e) {
    return __awaiter(this, void 0, void 0, function* () {
      throw new TonConnectError(`Bridge error ${JSON.stringify(e)}`);
    });
  }
  updateSession(connectEvent, walletPublicKey) {
    return __awaiter(this, void 0, void 0, function* () {
      this.session = Object.assign(Object.assign({}, this.session), {
        walletPublicKey
      });
      const tonAddrItem = connectEvent.payload.items.find((item) => item.name === "ton_addr");
      const connectEventToSave = Object.assign(Object.assign({}, connectEvent), {
        payload: Object.assign(Object.assign({}, connectEvent.payload), {
          items: [tonAddrItem]
        })
      });
      yield this.connectionStorage.storeConnection({
        type: "http",
        session: this.session,
        lastWalletEventId: connectEvent.id,
        connectEvent: connectEventToSave,
        nextRpcRequestId: 0
      });
    });
  }
  removeBridgeAndSession() {
    return __awaiter(this, void 0, void 0, function* () {
      this.closeConnection();
      yield this.connectionStorage.removeConnection();
    });
  }
  generateUniversalLink(universalLink, message) {
    if (isTelegramUrl(universalLink)) {
      return this.generateTGUniversalLink(universalLink, message);
    }
    return this.generateRegularUniversalLink(universalLink, message);
  }
  generateRegularUniversalLink(universalLink, message) {
    const url = new URL(universalLink);
    url.searchParams.append("v", PROTOCOL_VERSION.toString());
    url.searchParams.append("id", this.session.sessionCrypto.sessionId);
    url.searchParams.append("r", JSON.stringify(message));
    return url.toString();
  }
  generateTGUniversalLink(universalLink, message) {
    const urlToWrap = this.generateRegularUniversalLink("about:blank", message);
    const linkParams = urlToWrap.split("?")[1];
    const startapp = "tonconnect-" + encodeTelegramUrlParameters(linkParams);
    const updatedUniversalLink = this.convertToDirectLink(universalLink);
    const url = new URL(updatedUniversalLink);
    url.searchParams.append("startapp", startapp);
    return url.toString();
  }
  // TODO: Remove this method after all dApps and the wallets-list.json have been updated
  convertToDirectLink(universalLink) {
    const url = new URL(universalLink);
    if (url.searchParams.has("attach")) {
      url.searchParams.delete("attach");
      url.pathname += "/start";
    }
    return url.toString();
  }
  openGateways(sessionCrypto, options) {
    return __awaiter(this, void 0, void 0, function* () {
      if (Array.isArray(this.walletConnectionSource)) {
        this.pendingGateways.map((bridge) => bridge.close().catch());
        this.pendingGateways = this.walletConnectionSource.map((source) => {
          const gateway = new BridgeGateway(this.storage, source.bridgeUrl, sessionCrypto.sessionId, () => {
          }, () => {
          });
          gateway.setListener((message) => this.pendingGatewaysListener(gateway, source.bridgeUrl, message));
          return gateway;
        });
        yield Promise.allSettled(this.pendingGateways.map((bridge) => callForSuccess((_options) => {
          var _a;
          if (!this.pendingGateways.some((item) => item === bridge)) {
            return bridge.close();
          }
          return bridge.registerSession({
            openingDeadlineMS: (_a = options === null || options === void 0 ? void 0 : options.openingDeadlineMS) !== null && _a !== void 0 ? _a : this.defaultOpeningDeadlineMS,
            signal: _options.signal
          });
        }, {
          attempts: Number.MAX_SAFE_INTEGER,
          delayMs: this.defaultRetryTimeoutMS,
          signal: options === null || options === void 0 ? void 0 : options.signal
        })));
        return;
      } else {
        if (this.gateway) {
          logDebug(`Gateway is already opened, closing previous gateway`);
          yield this.gateway.close();
        }
        this.gateway = new BridgeGateway(this.storage, this.walletConnectionSource.bridgeUrl, sessionCrypto.sessionId, this.gatewayListener.bind(this), this.gatewayErrorsListener.bind(this));
        return yield this.gateway.registerSession({
          openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
          signal: options === null || options === void 0 ? void 0 : options.signal
        });
      }
    });
  }
  closeGateways(options) {
    var _a;
    (_a = this.gateway) === null || _a === void 0 ? void 0 : _a.close();
    this.pendingGateways.filter((item) => item !== (options === null || options === void 0 ? void 0 : options.except)).forEach((bridge) => bridge.close());
    this.pendingGateways = [];
  }
};
function hasProperty(value, propertyKey) {
  return hasProperties(value, [propertyKey]);
}
function hasProperties(value, propertyKeys) {
  if (!value || typeof value !== "object") {
    return false;
  }
  return propertyKeys.every((propertyKey) => propertyKey in value);
}
function isJSBridgeWithMetadata(value) {
  try {
    if (!hasProperty(value, "tonconnect") || !hasProperty(value.tonconnect, "walletInfo")) {
      return false;
    }
    return hasProperties(value.tonconnect.walletInfo, ["name", "app_name", "image", "about_url", "platforms"]);
  } catch (_a) {
    return false;
  }
}
var InMemoryStorage = class _InMemoryStorage {
  constructor() {
    this.storage = {};
  }
  static getInstance() {
    if (!_InMemoryStorage.instance) {
      _InMemoryStorage.instance = new _InMemoryStorage();
    }
    return _InMemoryStorage.instance;
  }
  get length() {
    return Object.keys(this.storage).length;
  }
  clear() {
    this.storage = {};
  }
  getItem(key) {
    var _a;
    return (_a = this.storage[key]) !== null && _a !== void 0 ? _a : null;
  }
  key(index) {
    var _a;
    const keys = Object.keys(this.storage);
    if (index < 0 || index >= keys.length) {
      return null;
    }
    return (_a = keys[index]) !== null && _a !== void 0 ? _a : null;
  }
  removeItem(key) {
    delete this.storage[key];
  }
  setItem(key, value) {
    this.storage[key] = value;
  }
};
function getWindow() {
  if (typeof window === "undefined") {
    return void 0;
  }
  return window;
}
function tryGetWindowKeys() {
  const window2 = getWindow();
  if (!window2) {
    return [];
  }
  try {
    return Object.keys(window2);
  } catch (_a) {
    return [];
  }
}
function getDocument() {
  if (typeof document === "undefined") {
    return void 0;
  }
  return document;
}
function getWebPageManifest() {
  var _a;
  const origin = (_a = getWindow()) === null || _a === void 0 ? void 0 : _a.location.origin;
  if (origin) {
    return origin + "/tonconnect-manifest.json";
  }
  return "";
}
function tryGetLocalStorage() {
  if (isLocalStorageAvailable()) {
    return localStorage;
  }
  if (isNodeJs()) {
    throw new TonConnectError("`localStorage` is unavailable, but it is required for TonConnect. For more details, see https://github.com/ton-connect/sdk/tree/main/packages/sdk#init-connector");
  }
  return InMemoryStorage.getInstance();
}
function isLocalStorageAvailable() {
  try {
    return typeof localStorage !== "undefined";
  } catch (_a) {
    return false;
  }
}
function isNodeJs() {
  return typeof process !== "undefined" && process.versions != null && process.versions.node != null;
}
var InjectedProvider = class _InjectedProvider {
  constructor(storage, injectedWalletKey) {
    this.injectedWalletKey = injectedWalletKey;
    this.type = "injected";
    this.unsubscribeCallback = null;
    this.listenSubscriptions = false;
    this.listeners = [];
    const window2 = _InjectedProvider.window;
    if (!_InjectedProvider.isWindowContainsWallet(window2, injectedWalletKey)) {
      throw new WalletNotInjectedError();
    }
    this.connectionStorage = new BridgeConnectionStorage(storage);
    this.injectedWallet = window2[injectedWalletKey].tonconnect;
  }
  static fromStorage(storage) {
    return __awaiter(this, void 0, void 0, function* () {
      const bridgeConnectionStorage = new BridgeConnectionStorage(storage);
      const connection = yield bridgeConnectionStorage.getInjectedConnection();
      return new _InjectedProvider(storage, connection.jsBridgeKey);
    });
  }
  static isWalletInjected(injectedWalletKey) {
    return _InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey);
  }
  static isInsideWalletBrowser(injectedWalletKey) {
    if (_InjectedProvider.isWindowContainsWallet(this.window, injectedWalletKey)) {
      return this.window[injectedWalletKey].tonconnect.isWalletBrowser;
    }
    return false;
  }
  static getCurrentlyInjectedWallets() {
    if (!this.window) {
      return [];
    }
    const windowKeys = tryGetWindowKeys();
    const wallets = windowKeys.filter(([_, value]) => isJSBridgeWithMetadata(value));
    return wallets.map(([jsBridgeKey, wallet]) => ({
      name: wallet.tonconnect.walletInfo.name,
      appName: wallet.tonconnect.walletInfo.app_name,
      aboutUrl: wallet.tonconnect.walletInfo.about_url,
      imageUrl: wallet.tonconnect.walletInfo.image,
      tondns: wallet.tonconnect.walletInfo.tondns,
      jsBridgeKey,
      injected: true,
      embedded: wallet.tonconnect.isWalletBrowser,
      platforms: wallet.tonconnect.walletInfo.platforms,
      features: wallet.tonconnect.walletInfo.features
    }));
  }
  static isWindowContainsWallet(window2, injectedWalletKey) {
    return !!window2 && injectedWalletKey in window2 && typeof window2[injectedWalletKey] === "object" && "tonconnect" in window2[injectedWalletKey];
  }
  connect(message) {
    this._connect(PROTOCOL_VERSION, message);
  }
  restoreConnection() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider restoring connection...`);
        const connectEvent = yield this.injectedWallet.restoreConnection();
        logDebug("Injected Provider restoring connection response", connectEvent);
        if (connectEvent.event === "connect") {
          this.makeSubscriptions();
          this.listeners.forEach((listener) => listener(connectEvent));
        } else {
          yield this.connectionStorage.removeConnection();
        }
      } catch (e) {
        yield this.connectionStorage.removeConnection();
        console.error(e);
      }
    });
  }
  closeConnection() {
    if (this.listenSubscriptions) {
      this.injectedWallet.disconnect();
    }
    this.closeAllListeners();
  }
  disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => {
        const onRequestSent = () => {
          this.closeAllListeners();
          this.connectionStorage.removeConnection().then(resolve);
        };
        try {
          this.injectedWallet.disconnect();
          onRequestSent();
        } catch (e) {
          logDebug(e);
          this.sendRequest({
            method: "disconnect",
            params: []
          }, onRequestSent);
        }
      });
    });
  }
  closeAllListeners() {
    var _a;
    this.listenSubscriptions = false;
    this.listeners = [];
    (_a = this.unsubscribeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  listen(eventsCallback) {
    this.listeners.push(eventsCallback);
    return () => this.listeners = this.listeners.filter((listener) => listener !== eventsCallback);
  }
  sendRequest(request, optionsOrOnRequestSent) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof optionsOrOnRequestSent === "function") {
        options.onRequestSent = optionsOrOnRequestSent;
      } else {
        options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
        options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      }
      const id = (yield this.connectionStorage.getNextRpcRequestId()).toString();
      yield this.connectionStorage.increaseNextRpcRequestId();
      logDebug("Send injected-bridge request:", Object.assign(Object.assign({}, request), {
        id
      }));
      const result = this.injectedWallet.send(Object.assign(Object.assign({}, request), {
        id
      }));
      result.then((response) => logDebug("Wallet message received:", response));
      (_a = options === null || options === void 0 ? void 0 : options.onRequestSent) === null || _a === void 0 ? void 0 : _a.call(options);
      return result;
    });
  }
  _connect(protocolVersion, message) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        logDebug(`Injected Provider connect request: protocolVersion: ${protocolVersion}, message:`, message);
        const connectEvent = yield this.injectedWallet.connect(protocolVersion, message);
        logDebug("Injected Provider connect response:", connectEvent);
        if (connectEvent.event === "connect") {
          yield this.updateSession();
          this.makeSubscriptions();
        }
        this.listeners.forEach((listener) => listener(connectEvent));
      } catch (e) {
        logDebug("Injected Provider connect error:", e);
        const connectEventError = {
          event: "connect_error",
          payload: {
            code: 0,
            message: e === null || e === void 0 ? void 0 : e.toString()
          }
        };
        this.listeners.forEach((listener) => listener(connectEventError));
      }
    });
  }
  makeSubscriptions() {
    this.listenSubscriptions = true;
    this.unsubscribeCallback = this.injectedWallet.listen((e) => {
      logDebug("Wallet message received:", e);
      if (this.listenSubscriptions) {
        this.listeners.forEach((listener) => listener(e));
      }
      if (e.event === "disconnect") {
        this.disconnect();
      }
    });
  }
  updateSession() {
    return this.connectionStorage.storeConnection({
      type: "injected",
      jsBridgeKey: this.injectedWalletKey,
      nextRpcRequestId: 0
    });
  }
};
InjectedProvider.window = getWindow();
var DefaultStorage = class {
  constructor() {
    this.localStorage = tryGetLocalStorage();
  }
  getItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.localStorage.getItem(key);
    });
  }
  removeItem(key) {
    return __awaiter(this, void 0, void 0, function* () {
      this.localStorage.removeItem(key);
    });
  }
  setItem(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
      this.localStorage.setItem(key, value);
    });
  }
};
function isWalletInfoCurrentlyInjected(value) {
  return isWalletInfoInjectable(value) && value.injected;
}
function isWalletInfoCurrentlyEmbedded(value) {
  return isWalletInfoCurrentlyInjected(value) && value.embedded;
}
function isWalletInfoInjectable(value) {
  return "jsBridgeKey" in value;
}
function isWalletInfoRemote(value) {
  return "bridgeUrl" in value;
}
function isWalletInfoInjected(value) {
  return "jsBridgeKey" in value;
}
var FALLBACK_WALLETS_LIST = [{
  app_name: "telegram-wallet",
  name: "Wallet",
  image: "https://wallet.tg/images/logo-288.png",
  about_url: "https://wallet.tg/",
  universal_url: "https://t.me/wallet?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://walletbot.me/tonconnect-bridge/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "tonkeeper",
  name: "Tonkeeper",
  image: "https://tonkeeper.com/assets/tonconnect-icon.png",
  tondns: "tonkeeper.ton",
  about_url: "https://tonkeeper.com",
  universal_url: "https://app.tonkeeper.com/ton-connect",
  deepLink: "tonkeeper-tc://",
  bridge: [{
    type: "sse",
    url: "https://bridge.tonapi.io/bridge"
  }, {
    type: "js",
    key: "tonkeeper"
  }],
  platforms: ["ios", "android", "chrome", "firefox", "macos"]
}, {
  app_name: "mytonwallet",
  name: "MyTonWallet",
  image: "https://static.mytonwallet.io/icon-256.png",
  about_url: "https://mytonwallet.io",
  universal_url: "https://connect.mytonwallet.org",
  bridge: [{
    type: "js",
    key: "mytonwallet"
  }, {
    type: "sse",
    url: "https://tonconnectbridge.mytonwallet.org/bridge/"
  }],
  platforms: ["chrome", "windows", "macos", "linux", "ios", "android", "firefox"]
}, {
  app_name: "tonhub",
  name: "Tonhub",
  image: "https://tonhub.com/tonconnect_logo.png",
  about_url: "https://tonhub.com",
  universal_url: "https://tonhub.com/ton-connect",
  bridge: [{
    type: "js",
    key: "tonhub"
  }, {
    type: "sse",
    url: "https://connect.tonhubapi.com/tonconnect"
  }],
  platforms: ["ios", "android"]
}, {
  app_name: "bitgetTonWallet",
  name: "Bitget Wallet",
  image: "https://raw.githubusercontent.com/bitgetwallet/download/refs/heads/main/logo/png/bitget_wallet_logo_288_mini.png",
  about_url: "https://web3.bitget.com",
  deepLink: "bitkeep://",
  bridge: [{
    type: "js",
    key: "bitgetTonWallet"
  }, {
    type: "sse",
    url: "https://ton-connect-bridge.bgwapi.io/bridge"
  }],
  platforms: ["ios", "android", "chrome"],
  universal_url: "https://bkcode.vip/ton-connect"
}, {
  app_name: "okxMiniWallet",
  name: "OKX Mini Wallet",
  image: "https://static.okx.com/cdn/assets/imgs/2411/8BE1A4A434D8F58A.png",
  about_url: "https://www.okx.com/web3",
  universal_url: "https://t.me/OKX_WALLET_BOT?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://www.okx.com/tonbridge/discover/rpc/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "binanceWeb3TonWallet",
  name: "Binance Web3 Wallet",
  image: "https://public.bnbstatic.com/static/binance-w3w/ton-provider/binancew3w.png",
  about_url: "https://www.binance.com/en/web3wallet",
  deepLink: "bnc://app.binance.com/cedefi/ton-connect",
  bridge: [{
    type: "js",
    key: "binancew3w"
  }, {
    type: "sse",
    url: "https://wallet.binance.com/tonbridge/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"],
  universal_url: "https://app.binance.com/cedefi/ton-connect"
}, {
  app_name: "fintopio-tg",
  name: "Fintopio",
  image: "https://fintopio.com/tonconnect-icon.png",
  about_url: "https://fintopio.com",
  universal_url: "https://t.me/fintopio?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://wallet-bridge.fintopio.com/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "okxTonWallet",
  name: "OKX Wallet",
  image: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
  about_url: "https://www.okx.com/web3",
  universal_url: "https://www.okx.com/download?appendQuery=true&deeplink=okx://web3/wallet/tonconnect",
  bridge: [{
    type: "js",
    key: "okxTonWallet"
  }, {
    type: "sse",
    url: "https://www.okx.com/tonbridge/discover/rpc/bridge"
  }],
  platforms: ["chrome", "safari", "firefox", "ios", "android"]
}, {
  app_name: "hot",
  name: "HOT",
  image: "https://raw.githubusercontent.com/hot-dao/media/main/logo.png",
  about_url: "https://hot-labs.org/",
  universal_url: "https://t.me/herewalletbot?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://sse-bridge.hot-labs.org"
  }, {
    type: "js",
    key: "hotWallet"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "bybitTonWallet",
  name: "Bybit Wallet",
  image: "https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png",
  about_url: "https://www.bybit.com/web3",
  universal_url: "https://app.bybit.com/ton-connect",
  deepLink: "bybitapp://",
  bridge: [{
    type: "js",
    key: "bybitTonWallet"
  }, {
    type: "sse",
    url: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge"
  }],
  platforms: ["ios", "android", "chrome"]
}, {
  app_name: "dewallet",
  name: "DeWallet",
  image: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
  about_url: "https://delabwallet.com",
  universal_url: "https://t.me/dewallet?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://bridge.dewallet.pro/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "safepalwallet",
  name: "SafePal",
  image: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
  tondns: "",
  about_url: "https://www.safepal.com",
  universal_url: "https://link.safepal.io/ton-connect",
  deepLink: "safepal-tc://",
  bridge: [{
    type: "sse",
    url: "https://ton-bridge.safepal.com/tonbridge/v1/bridge"
  }, {
    type: "js",
    key: "safepalwallet"
  }],
  platforms: ["ios", "android", "chrome", "firefox"]
}, {
  app_name: "GateWallet",
  name: "GateWallet",
  image: "https://img.gatedataimg.com/prd-ordinal-imgs/036f07bb8730716e/gateio-0925.png",
  about_url: "https://www.gate.io/",
  bridge: [{
    type: "js",
    key: "gatetonwallet"
  }, {
    type: "sse",
    url: "https://dapp.gateio.services/tonbridge_api/bridge/v1"
  }],
  platforms: ["ios", "android"],
  universal_url: "https://gateio.go.link/gateio/web3?adj_t=1ff8khdw_1fu4ccc7"
}, {
  app_name: "openmask",
  name: "OpenMask",
  image: "https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png",
  about_url: "https://www.openmask.app/",
  bridge: [{
    type: "js",
    key: "openmask"
  }],
  platforms: ["chrome"]
}, {
  app_name: "BitgetWeb3",
  name: "BitgetWeb3",
  image: "https://img.bitgetimg.com/image/third/1731638059795.png",
  about_url: "​https://www.bitget.com",
  universal_url: "https://t.me/BitgetOfficialBot?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://ton-connect-bridge.bgwapi.io/bridge"
  }],
  platforms: ["ios", "android", "windows", "macos", "linux"]
}, {
  app_name: "tobi",
  name: "Tobi",
  image: "https://app.tobiwallet.app/icons/logo-288.png",
  about_url: "https://tobi.fun",
  universal_url: "https://t.me/TobiCopilotBot?attach=wallet",
  bridge: [{
    type: "sse",
    url: "https://ton-bridge.tobiwallet.app/bridge"
  }],
  platforms: ["ios", "android", "macos", "windows", "linux"]
}, {
  app_name: "xtonwallet",
  name: "XTONWallet",
  image: "https://xtonwallet.com/assets/img/icon-256-back.png",
  about_url: "https://xtonwallet.com",
  bridge: [{
    type: "js",
    key: "xtonwallet"
  }],
  platforms: ["chrome", "firefox"]
}, {
  app_name: "tonwallet",
  name: "TON Wallet",
  image: "https://wallet.ton.org/assets/ui/qr-logo.png",
  about_url: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
  bridge: [{
    type: "js",
    key: "tonwallet"
  }],
  platforms: ["chrome"]
}];
var WalletsListManager = class {
  constructor(options) {
    var _a;
    this.walletsListCache = null;
    this.walletsListCacheCreationTimestamp = null;
    this.walletsListSource = (_a = options === null || options === void 0 ? void 0 : options.walletsListSource) !== null && _a !== void 0 ? _a : "https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets-v2.json";
    this.cacheTTLMs = options === null || options === void 0 ? void 0 : options.cacheTTLMs;
  }
  getWallets() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.cacheTTLMs && this.walletsListCacheCreationTimestamp && Date.now() > this.walletsListCacheCreationTimestamp + this.cacheTTLMs) {
        this.walletsListCache = null;
      }
      if (!this.walletsListCache) {
        this.walletsListCache = this.fetchWalletsList();
        this.walletsListCache.then(() => {
          this.walletsListCacheCreationTimestamp = Date.now();
        }).catch(() => {
          this.walletsListCache = null;
          this.walletsListCacheCreationTimestamp = null;
        });
      }
      return this.walletsListCache;
    });
  }
  getEmbeddedWallet() {
    return __awaiter(this, void 0, void 0, function* () {
      const walletsList = yield this.getWallets();
      const embeddedWallets = walletsList.filter(isWalletInfoCurrentlyEmbedded);
      return embeddedWallets.length === 1 ? embeddedWallets[0] : null;
    });
  }
  fetchWalletsList() {
    return __awaiter(this, void 0, void 0, function* () {
      let walletsList = [];
      try {
        const walletsResponse = yield fetch(this.walletsListSource);
        walletsList = yield walletsResponse.json();
        if (!Array.isArray(walletsList)) {
          throw new FetchWalletsError("Wrong wallets list format, wallets list must be an array.");
        }
        const wrongFormatWallets = walletsList.filter((wallet) => !this.isCorrectWalletConfigDTO(wallet));
        if (wrongFormatWallets.length) {
          logError(`Wallet(s) ${wrongFormatWallets.map((wallet) => (wallet === null || wallet === void 0 ? void 0 : wallet.name) || "unknown").join(", ")} config format is wrong. They were removed from the wallets list.`);
          walletsList = walletsList.filter((wallet) => this.isCorrectWalletConfigDTO(wallet));
        }
      } catch (e) {
        logError(e);
        walletsList = FALLBACK_WALLETS_LIST;
      }
      let currentlyInjectedWallets = [];
      try {
        currentlyInjectedWallets = InjectedProvider.getCurrentlyInjectedWallets();
      } catch (e) {
        logError(e);
      }
      return this.mergeWalletsLists(this.walletConfigDTOListToWalletConfigList(walletsList), currentlyInjectedWallets);
    });
  }
  walletConfigDTOListToWalletConfigList(walletConfigDTO) {
    return walletConfigDTO.map((walletConfigDTO2) => {
      const walletConfig = {
        name: walletConfigDTO2.name,
        appName: walletConfigDTO2.app_name,
        imageUrl: walletConfigDTO2.image,
        aboutUrl: walletConfigDTO2.about_url,
        tondns: walletConfigDTO2.tondns,
        platforms: walletConfigDTO2.platforms,
        features: walletConfigDTO2.features
      };
      walletConfigDTO2.bridge.forEach((bridge) => {
        if (bridge.type === "sse") {
          walletConfig.bridgeUrl = bridge.url;
          walletConfig.universalLink = walletConfigDTO2.universal_url;
          walletConfig.deepLink = walletConfigDTO2.deepLink;
        }
        if (bridge.type === "js") {
          const jsBridgeKey = bridge.key;
          walletConfig.jsBridgeKey = jsBridgeKey;
          walletConfig.injected = InjectedProvider.isWalletInjected(jsBridgeKey);
          walletConfig.embedded = InjectedProvider.isInsideWalletBrowser(jsBridgeKey);
        }
      });
      return walletConfig;
    });
  }
  mergeWalletsLists(list1, list2) {
    const names = new Set(list1.concat(list2).map((item) => item.name));
    return [...names.values()].map((name) => {
      const list1Item = list1.find((item) => item.name === name);
      const list2Item = list2.find((item) => item.name === name);
      return Object.assign(Object.assign({}, list1Item && Object.assign({}, list1Item)), list2Item && Object.assign({}, list2Item));
    });
  }
  // eslint-disable-next-line complexity
  isCorrectWalletConfigDTO(value) {
    if (!value || !(typeof value === "object")) {
      return false;
    }
    const containsName = "name" in value;
    const containsAppName = "app_name" in value;
    const containsImage = "image" in value;
    const containsAbout = "about_url" in value;
    const containsPlatforms = "platforms" in value;
    if (!containsName || !containsImage || !containsAbout || !containsPlatforms || !containsAppName) {
      return false;
    }
    if (!value.platforms || !Array.isArray(value.platforms) || !value.platforms.length) {
      return false;
    }
    if (!("bridge" in value) || !Array.isArray(value.bridge) || !value.bridge.length) {
      return false;
    }
    const bridge = value.bridge;
    if (bridge.some((item) => !item || typeof item !== "object" || !("type" in item))) {
      return false;
    }
    const sseBridge = bridge.find((item) => item.type === "sse");
    if (sseBridge) {
      if (!(typeof sseBridge === "object" && "url" in sseBridge) || !sseBridge.url || !value.universal_url) {
        return false;
      }
    }
    const jsBridge = bridge.find((item) => item.type === "js");
    if (jsBridge) {
      if (typeof jsBridge !== "object" || !("key" in jsBridge) || !jsBridge.key) {
        return false;
      }
    }
    return true;
  }
};
function checkSendTransactionSupport(features, options) {
  const supportsDeprecatedSendTransactionFeature = features.includes("SendTransaction");
  const sendTransactionFeature = findFeature(features, "SendTransaction");
  if (!supportsDeprecatedSendTransactionFeature && !sendTransactionFeature) {
    throw new WalletNotSupportFeatureError("Wallet doesn't support SendTransaction feature.");
  }
  if (options.requireExtraCurrencies) {
    if (!sendTransactionFeature || !sendTransactionFeature.extraCurrencySupported) {
      throw new WalletNotSupportFeatureError(`Wallet is not able to handle such SendTransaction request. Extra currencies support is required.`);
    }
  }
  if (sendTransactionFeature && sendTransactionFeature.maxMessages !== void 0) {
    if (sendTransactionFeature.maxMessages < options.requiredMessagesNumber) {
      throw new WalletNotSupportFeatureError(`Wallet is not able to handle such SendTransaction request. Max support messages number is ${sendTransactionFeature.maxMessages}, but ${options.requiredMessagesNumber} is required.`);
    }
    return;
  }
  logWarning("Connected wallet didn't provide information about max allowed messages in the SendTransaction request. Request may be rejected by the wallet.");
}
function checkRequiredWalletFeatures(features, walletsRequiredFeatures) {
  if (typeof walletsRequiredFeatures !== "object") {
    return true;
  }
  const {
    sendTransaction
  } = walletsRequiredFeatures;
  if (sendTransaction) {
    const feature = findFeature(features, "SendTransaction");
    if (!feature) {
      return false;
    }
    if (!checkSendTransaction(feature, sendTransaction)) {
      return false;
    }
  }
  return true;
}
function findFeature(features, requiredFeatureName) {
  return features.find((f) => f && typeof f === "object" && f.name === requiredFeatureName);
}
function checkSendTransaction(feature, requiredFeature) {
  const correctMessagesNumber = requiredFeature.minMessages === void 0 || requiredFeature.minMessages <= feature.maxMessages;
  const correctExtraCurrency = !requiredFeature.extraCurrencyRequired || feature.extraCurrencySupported;
  return !!(correctMessagesNumber && correctExtraCurrency);
}
function createRequestVersionEvent() {
  return {
    type: "request-version"
  };
}
function createResponseVersionEvent(version) {
  return {
    type: "response-version",
    version
  };
}
function createVersionInfo(version) {
  return {
    ton_connect_sdk_lib: version.ton_connect_sdk_lib,
    ton_connect_ui_lib: version.ton_connect_ui_lib
  };
}
function createConnectionInfo(version, wallet) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const isTonProof = ((_a = wallet === null || wallet === void 0 ? void 0 : wallet.connectItems) === null || _a === void 0 ? void 0 : _a.tonProof) && "proof" in wallet.connectItems.tonProof;
  const authType = isTonProof ? "ton_proof" : "ton_addr";
  return {
    wallet_address: (_c = (_b = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _b === void 0 ? void 0 : _b.address) !== null && _c !== void 0 ? _c : null,
    wallet_type: (_d = wallet === null || wallet === void 0 ? void 0 : wallet.device.appName) !== null && _d !== void 0 ? _d : null,
    wallet_version: (_e = wallet === null || wallet === void 0 ? void 0 : wallet.device.appVersion) !== null && _e !== void 0 ? _e : null,
    auth_type: authType,
    custom_data: Object.assign({
      chain_id: (_g = (_f = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _f === void 0 ? void 0 : _f.chain) !== null && _g !== void 0 ? _g : null,
      provider: (_h = wallet === null || wallet === void 0 ? void 0 : wallet.provider) !== null && _h !== void 0 ? _h : null
    }, createVersionInfo(version))
  };
}
function createConnectionStartedEvent(version) {
  return {
    type: "connection-started",
    custom_data: createVersionInfo(version)
  };
}
function createConnectionCompletedEvent(version, wallet) {
  return Object.assign({
    type: "connection-completed",
    is_success: true
  }, createConnectionInfo(version, wallet));
}
function createConnectionErrorEvent(version, error_message, errorCode) {
  return {
    type: "connection-error",
    is_success: false,
    error_message,
    error_code: errorCode !== null && errorCode !== void 0 ? errorCode : null,
    custom_data: createVersionInfo(version)
  };
}
function createConnectionRestoringStartedEvent(version) {
  return {
    type: "connection-restoring-started",
    custom_data: createVersionInfo(version)
  };
}
function createConnectionRestoringCompletedEvent(version, wallet) {
  return Object.assign({
    type: "connection-restoring-completed",
    is_success: true
  }, createConnectionInfo(version, wallet));
}
function createConnectionRestoringErrorEvent(version, errorMessage) {
  return {
    type: "connection-restoring-error",
    is_success: false,
    error_message: errorMessage,
    custom_data: createVersionInfo(version)
  };
}
function createTransactionInfo(wallet, transaction) {
  var _a, _b, _c, _d;
  return {
    valid_until: (_a = String(transaction.validUntil)) !== null && _a !== void 0 ? _a : null,
    from: (_d = (_b = transaction.from) !== null && _b !== void 0 ? _b : (_c = wallet === null || wallet === void 0 ? void 0 : wallet.account) === null || _c === void 0 ? void 0 : _c.address) !== null && _d !== void 0 ? _d : null,
    messages: transaction.messages.map((message) => {
      var _a2, _b2;
      return {
        address: (_a2 = message.address) !== null && _a2 !== void 0 ? _a2 : null,
        amount: (_b2 = message.amount) !== null && _b2 !== void 0 ? _b2 : null
      };
    })
  };
}
function createTransactionSentForSignatureEvent(version, wallet, transaction) {
  return Object.assign(Object.assign({
    type: "transaction-sent-for-signature"
  }, createConnectionInfo(version, wallet)), createTransactionInfo(wallet, transaction));
}
function createTransactionSignedEvent(version, wallet, transaction, signedTransaction) {
  return Object.assign(Object.assign({
    type: "transaction-signed",
    is_success: true,
    signed_transaction: signedTransaction.boc
  }, createConnectionInfo(version, wallet)), createTransactionInfo(wallet, transaction));
}
function createTransactionSigningFailedEvent(version, wallet, transaction, errorMessage, errorCode) {
  return Object.assign(Object.assign({
    type: "transaction-signing-failed",
    is_success: false,
    error_message: errorMessage,
    error_code: errorCode !== null && errorCode !== void 0 ? errorCode : null
  }, createConnectionInfo(version, wallet)), createTransactionInfo(wallet, transaction));
}
function createDisconnectionEvent(version, wallet, scope) {
  return Object.assign({
    type: "disconnection",
    scope
  }, createConnectionInfo(version, wallet));
}
var BrowserEventDispatcher = class {
  constructor() {
    this.window = getWindow();
  }
  /**
   * Dispatches an event with the given name and details to the browser window.
   * @param eventName - The name of the event to dispatch.
   * @param eventDetails - The details of the event to dispatch.
   * @returns A promise that resolves when the event has been dispatched.
   */
  dispatchEvent(eventName, eventDetails) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const event = new CustomEvent(eventName, {
        detail: eventDetails
      });
      (_a = this.window) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
    });
  }
  /**
   * Adds an event listener to the browser window.
   * @param eventName - The name of the event to listen for.
   * @param listener - The listener to add.
   * @param options - The options for the listener.
   * @returns A function that removes the listener.
   */
  addEventListener(eventName, listener, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      (_a = this.window) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, listener, options);
      return () => {
        var _a2;
        return (_a2 = this.window) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener(eventName, listener);
      };
    });
  }
};
var TonConnectTracker = class {
  constructor(options) {
    var _a;
    this.eventPrefix = "ton-connect-";
    this.tonConnectUiVersion = null;
    this.eventDispatcher = (_a = options === null || options === void 0 ? void 0 : options.eventDispatcher) !== null && _a !== void 0 ? _a : new BrowserEventDispatcher();
    this.tonConnectSdkVersion = options.tonConnectSdkVersion;
    this.init().catch();
  }
  /**
   * Version of the library.
   */
  get version() {
    return createVersionInfo({
      ton_connect_sdk_lib: this.tonConnectSdkVersion,
      ton_connect_ui_lib: this.tonConnectUiVersion
    });
  }
  /**
   * Called once when the tracker is created and request version other libraries.
   */
  init() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this.setRequestVersionHandler();
        this.tonConnectUiVersion = yield this.requestTonConnectUiVersion();
      } catch (e) {
      }
    });
  }
  /**
   * Set request version handler.
   * @private
   */
  setRequestVersionHandler() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.eventDispatcher.addEventListener("ton-connect-request-version", () => __awaiter(this, void 0, void 0, function* () {
        yield this.eventDispatcher.dispatchEvent("ton-connect-response-version", createResponseVersionEvent(this.tonConnectSdkVersion));
      }));
    });
  }
  /**
   * Request TonConnect UI version.
   * @private
   */
  requestTonConnectUiVersion() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
          yield this.eventDispatcher.addEventListener("ton-connect-ui-response-version", (event) => {
            resolve(event.detail.version);
          }, {
            once: true
          });
          yield this.eventDispatcher.dispatchEvent("ton-connect-ui-request-version", createRequestVersionEvent());
        } catch (e) {
          reject(e);
        }
      }));
    });
  }
  /**
   * Emit user action event to the window.
   * @param eventDetails
   * @private
   */
  dispatchUserActionEvent(eventDetails) {
    try {
      this.eventDispatcher.dispatchEvent(`${this.eventPrefix}${eventDetails.type}`, eventDetails).catch();
    } catch (e) {
    }
  }
  /**
   * Track connection init event.
   * @param args
   */
  trackConnectionStarted(...args) {
    try {
      const event = createConnectionStartedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track connection success event.
   * @param args
   */
  trackConnectionCompleted(...args) {
    try {
      const event = createConnectionCompletedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track connection error event.
   * @param args
   */
  trackConnectionError(...args) {
    try {
      const event = createConnectionErrorEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track connection restoring init event.
   * @param args
   */
  trackConnectionRestoringStarted(...args) {
    try {
      const event = createConnectionRestoringStartedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track connection restoring success event.
   * @param args
   */
  trackConnectionRestoringCompleted(...args) {
    try {
      const event = createConnectionRestoringCompletedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track connection restoring error event.
   * @param args
   */
  trackConnectionRestoringError(...args) {
    try {
      const event = createConnectionRestoringErrorEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track disconnect event.
   * @param args
   */
  trackDisconnection(...args) {
    try {
      const event = createDisconnectionEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track transaction init event.
   * @param args
   */
  trackTransactionSentForSignature(...args) {
    try {
      const event = createTransactionSentForSignatureEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track transaction signed event.
   * @param args
   */
  trackTransactionSigned(...args) {
    try {
      const event = createTransactionSignedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
  /**
   * Track transaction error event.
   * @param args
   */
  trackTransactionSigningFailed(...args) {
    try {
      const event = createTransactionSigningFailedEvent(this.version, ...args);
      this.dispatchUserActionEvent(event);
    } catch (e) {
    }
  }
};
var tonConnectSdkVersion = "3.1.0";
var TonConnect = class {
  constructor(options) {
    this.walletsList = new WalletsListManager();
    this._wallet = null;
    this.provider = null;
    this.statusChangeSubscriptions = [];
    this.statusChangeErrorSubscriptions = [];
    this.dappSettings = {
      manifestUrl: (options === null || options === void 0 ? void 0 : options.manifestUrl) || getWebPageManifest(),
      storage: (options === null || options === void 0 ? void 0 : options.storage) || new DefaultStorage()
    };
    this.walletsRequiredFeatures = options === null || options === void 0 ? void 0 : options.walletsRequiredFeatures;
    this.walletsList = new WalletsListManager({
      walletsListSource: options === null || options === void 0 ? void 0 : options.walletsListSource,
      cacheTTLMs: options === null || options === void 0 ? void 0 : options.walletsListCacheTTLMs
    });
    this.tracker = new TonConnectTracker({
      eventDispatcher: options === null || options === void 0 ? void 0 : options.eventDispatcher,
      tonConnectSdkVersion
    });
    if (!this.dappSettings.manifestUrl) {
      throw new DappMetadataError("Dapp tonconnect-manifest.json must be specified if window.location.origin is undefined. See more https://github.com/ton-connect/docs/blob/main/requests-responses.md#app-manifest");
    }
    this.bridgeConnectionStorage = new BridgeConnectionStorage(this.dappSettings.storage);
    if (!(options === null || options === void 0 ? void 0 : options.disableAutoPauseConnection)) {
      this.addWindowFocusAndBlurSubscriptions();
    }
  }
  /**
   * Returns available wallets list.
   */
  static getWallets() {
    return this.walletsList.getWallets();
  }
  /**
   * Shows if the wallet is connected right now.
   */
  get connected() {
    return this._wallet !== null;
  }
  /**
   * Current connected account or null if no account is connected.
   */
  get account() {
    var _a;
    return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.account) || null;
  }
  /**
   * Current connected wallet or null if no account is connected.
   */
  get wallet() {
    return this._wallet;
  }
  set wallet(value) {
    this._wallet = value;
    this.statusChangeSubscriptions.forEach((callback) => callback(this._wallet));
  }
  /**
   * Returns available wallets list.
   */
  getWallets() {
    return this.walletsList.getWallets();
  }
  /**
   * Allows to subscribe to connection status changes and handle connection errors.
   * @param callback will be called after connections status changes with actual wallet or null.
   * @param errorsHandler (optional) will be called with some instance of TonConnectError when connect error is received.
   * @returns unsubscribe callback.
   */
  onStatusChange(callback, errorsHandler) {
    this.statusChangeSubscriptions.push(callback);
    if (errorsHandler) {
      this.statusChangeErrorSubscriptions.push(errorsHandler);
    }
    return () => {
      this.statusChangeSubscriptions = this.statusChangeSubscriptions.filter((item) => item !== callback);
      if (errorsHandler) {
        this.statusChangeErrorSubscriptions = this.statusChangeErrorSubscriptions.filter((item) => item !== errorsHandler);
      }
    };
  }
  connect(wallet, requestOrOptions) {
    var _a, _b;
    const options = {};
    if (typeof requestOrOptions === "object" && "tonProof" in requestOrOptions) {
      options.request = requestOrOptions;
    }
    if (typeof requestOrOptions === "object" && ("openingDeadlineMS" in requestOrOptions || "signal" in requestOrOptions || "request" in requestOrOptions)) {
      options.request = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.request;
      options.openingDeadlineMS = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.openingDeadlineMS;
      options.signal = requestOrOptions === null || requestOrOptions === void 0 ? void 0 : requestOrOptions.signal;
    }
    if (this.connected) {
      throw new WalletAlreadyConnectedError();
    }
    const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
    (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
    this.abortController = abortController;
    if (abortController.signal.aborted) {
      throw new TonConnectError("Connection was aborted");
    }
    (_b = this.provider) === null || _b === void 0 ? void 0 : _b.closeConnection();
    this.provider = this.createProvider(wallet);
    abortController.signal.addEventListener("abort", () => {
      var _a2;
      (_a2 = this.provider) === null || _a2 === void 0 ? void 0 : _a2.closeConnection();
      this.provider = null;
    });
    this.tracker.trackConnectionStarted();
    return this.provider.connect(this.createConnectRequest(options === null || options === void 0 ? void 0 : options.request), {
      openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
      signal: abortController.signal
    });
  }
  /**
   * Try to restore existing session and reconnect to the corresponding wallet. Call it immediately when your app is loaded.
   */
  restoreConnection(options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      this.tracker.trackConnectionRestoringStarted();
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      const [bridgeConnectionType, embeddedWallet] = yield Promise.all([this.bridgeConnectionStorage.storedConnectionType(), this.walletsList.getEmbeddedWallet()]);
      if (abortController.signal.aborted) {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      let provider = null;
      try {
        switch (bridgeConnectionType) {
          case "http":
            provider = yield BridgeProvider.fromStorage(this.dappSettings.storage);
            break;
          case "injected":
            provider = yield InjectedProvider.fromStorage(this.dappSettings.storage);
            break;
          default:
            if (embeddedWallet) {
              provider = this.createProvider(embeddedWallet);
            } else {
              return;
            }
        }
      } catch (_c) {
        this.tracker.trackConnectionRestoringError("Provider is not restored");
        yield this.bridgeConnectionStorage.removeConnection();
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        provider = null;
        return;
      }
      if (abortController.signal.aborted) {
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        return;
      }
      if (!provider) {
        logError("Provider is not restored");
        this.tracker.trackConnectionRestoringError("Provider is not restored");
        return;
      }
      (_b = this.provider) === null || _b === void 0 ? void 0 : _b.closeConnection();
      this.provider = provider;
      provider.listen(this.walletEventsListener.bind(this));
      const onAbortRestore = () => {
        this.tracker.trackConnectionRestoringError("Connection restoring was aborted");
        provider === null || provider === void 0 ? void 0 : provider.closeConnection();
        provider = null;
      };
      abortController.signal.addEventListener("abort", onAbortRestore);
      const restoreConnectionTask = callForSuccess((_options) => __awaiter(this, void 0, void 0, function* () {
        yield provider === null || provider === void 0 ? void 0 : provider.restoreConnection({
          openingDeadlineMS: options === null || options === void 0 ? void 0 : options.openingDeadlineMS,
          signal: _options.signal
        });
        abortController.signal.removeEventListener("abort", onAbortRestore);
        if (this.connected) {
          this.tracker.trackConnectionRestoringCompleted(this.wallet);
        } else {
          this.tracker.trackConnectionRestoringError("Connection restoring failed");
        }
      }), {
        attempts: Number.MAX_SAFE_INTEGER,
        delayMs: 2e3,
        signal: options === null || options === void 0 ? void 0 : options.signal
      });
      const restoreConnectionTimeout = new Promise(
        (resolve) => setTimeout(() => resolve(), 12e3)
        // connection deadline
      );
      return Promise.race([restoreConnectionTask, restoreConnectionTimeout]);
    });
  }
  sendTransaction(transaction, optionsOrOnRequestSent) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = {};
      if (typeof optionsOrOnRequestSent === "function") {
        options.onRequestSent = optionsOrOnRequestSent;
      } else {
        options.onRequestSent = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.onRequestSent;
        options.signal = optionsOrOnRequestSent === null || optionsOrOnRequestSent === void 0 ? void 0 : optionsOrOnRequestSent.signal;
      }
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      if (abortController.signal.aborted) {
        throw new TonConnectError("Transaction sending was aborted");
      }
      this.checkConnection();
      const requiredMessagesNumber = transaction.messages.length;
      const requireExtraCurrencies = transaction.messages.some((m) => m.extraCurrency && Object.keys(m.extraCurrency).length > 0);
      checkSendTransactionSupport(this.wallet.device.features, {
        requiredMessagesNumber,
        requireExtraCurrencies
      });
      this.tracker.trackTransactionSentForSignature(this.wallet, transaction);
      const {
        validUntil,
        messages
      } = transaction, tx = __rest(transaction, ["validUntil", "messages"]);
      const from = transaction.from || this.account.address;
      const network = transaction.network || this.account.chain;
      const response = yield this.provider.sendRequest(sendTransactionParser.convertToRpcRequest(Object.assign(Object.assign({}, tx), {
        from,
        network,
        valid_until: validUntil,
        messages: messages.map((_a) => {
          var {
            extraCurrency
          } = _a, msg = __rest(_a, ["extraCurrency"]);
          return Object.assign(Object.assign({}, msg), {
            extra_currency: extraCurrency
          });
        })
      })), {
        onRequestSent: options.onRequestSent,
        signal: abortController.signal
      });
      if (sendTransactionParser.isError(response)) {
        this.tracker.trackTransactionSigningFailed(this.wallet, transaction, response.error.message, response.error.code);
        return sendTransactionParser.parseAndThrowError(response);
      }
      const result = sendTransactionParser.convertFromRpcResponse(response);
      this.tracker.trackTransactionSigned(this.wallet, transaction, result);
      return result;
    });
  }
  /**
   * Disconnect form thw connected wallet and drop current session.
   */
  disconnect(options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.connected) {
        throw new WalletNotConnectedError();
      }
      const abortController = createAbortController(options === null || options === void 0 ? void 0 : options.signal);
      const prevAbortController = this.abortController;
      this.abortController = abortController;
      if (abortController.signal.aborted) {
        throw new TonConnectError("Disconnect was aborted");
      }
      this.onWalletDisconnected("dapp");
      yield (_a = this.provider) === null || _a === void 0 ? void 0 : _a.disconnect({
        signal: abortController.signal
      });
      prevAbortController === null || prevAbortController === void 0 ? void 0 : prevAbortController.abort();
    });
  }
  /**
   * Pause bridge HTTP connection. Might be helpful, if you want to pause connections while browser tab is unfocused,
   * or if you use SDK with NodeJS and want to save server resources.
   */
  pauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return;
    }
    this.provider.pause();
  }
  /**
   * Unpause bridge HTTP connection if it is paused.
   */
  unPauseConnection() {
    var _a;
    if (((_a = this.provider) === null || _a === void 0 ? void 0 : _a.type) !== "http") {
      return Promise.resolve();
    }
    return this.provider.unPause();
  }
  addWindowFocusAndBlurSubscriptions() {
    const document2 = getDocument();
    if (!document2) {
      return;
    }
    try {
      document2.addEventListener("visibilitychange", () => {
        if (document2.hidden) {
          this.pauseConnection();
        } else {
          this.unPauseConnection().catch();
        }
      });
    } catch (e) {
      logError("Cannot subscribe to the document.visibilitychange: ", e);
    }
  }
  createProvider(wallet) {
    let provider;
    if (!Array.isArray(wallet) && isWalletConnectionSourceJS(wallet)) {
      provider = new InjectedProvider(this.dappSettings.storage, wallet.jsBridgeKey);
    } else {
      provider = new BridgeProvider(this.dappSettings.storage, wallet);
    }
    provider.listen(this.walletEventsListener.bind(this));
    return provider;
  }
  walletEventsListener(e) {
    switch (e.event) {
      case "connect":
        this.onWalletConnected(e.payload);
        break;
      case "connect_error":
        this.tracker.trackConnectionError(e.payload.message, e.payload.code);
        const walletError = connectErrorsParser.parseError(e.payload);
        this.onWalletConnectError(walletError);
        break;
      case "disconnect":
        this.onWalletDisconnected("wallet");
    }
  }
  onWalletConnected(connectEvent) {
    var _a;
    const tonAccountItem = connectEvent.items.find((item) => item.name === "ton_addr");
    const tonProofItem = connectEvent.items.find((item) => item.name === "ton_proof");
    if (!tonAccountItem) {
      throw new TonConnectError("ton_addr connection item was not found");
    }
    const hasRequiredFeatures = checkRequiredWalletFeatures(connectEvent.device.features, this.walletsRequiredFeatures);
    if (!hasRequiredFeatures) {
      (_a = this.provider) === null || _a === void 0 ? void 0 : _a.disconnect();
      this.onWalletConnectError(new WalletMissingRequiredFeaturesError("Wallet does not support required features", {
        cause: {
          connectEvent
        }
      }));
      return;
    }
    const wallet = {
      device: connectEvent.device,
      provider: this.provider.type,
      account: {
        address: tonAccountItem.address,
        chain: tonAccountItem.network,
        walletStateInit: tonAccountItem.walletStateInit,
        publicKey: tonAccountItem.publicKey
      }
    };
    if (tonProofItem) {
      wallet.connectItems = {
        tonProof: tonProofItem
      };
    }
    this.wallet = wallet;
    this.tracker.trackConnectionCompleted(wallet);
  }
  onWalletConnectError(error) {
    this.statusChangeErrorSubscriptions.forEach((errorsHandler) => errorsHandler(error));
    logDebug(error);
    if (error instanceof ManifestNotFoundError || error instanceof ManifestContentErrorError) {
      logError(error);
      throw error;
    }
  }
  onWalletDisconnected(scope) {
    this.tracker.trackDisconnection(this.wallet, scope);
    this.wallet = null;
  }
  checkConnection() {
    if (!this.connected) {
      throw new WalletNotConnectedError();
    }
  }
  createConnectRequest(request) {
    const items = [{
      name: "ton_addr"
    }];
    if (request === null || request === void 0 ? void 0 : request.tonProof) {
      items.push({
        name: "ton_proof",
        payload: request.tonProof
      });
    }
    return {
      manifestUrl: this.dappSettings.manifestUrl,
      items
    };
  }
};
TonConnect.walletsList = new WalletsListManager();
TonConnect.isWalletInjected = (walletJSKey) => InjectedProvider.isWalletInjected(walletJSKey);
TonConnect.isInsideWalletBrowser = (walletJSKey) => InjectedProvider.isInsideWalletBrowser(walletJSKey);
var noBounceableTag = 81;
var testOnlyTag = 128;
function toUserFriendlyAddress(hexAddress, testOnly = false) {
  const {
    wc,
    hex
  } = parseHexAddress(hexAddress);
  let tag = noBounceableTag;
  if (testOnly) {
    tag |= testOnlyTag;
  }
  const addr = new Int8Array(34);
  addr[0] = tag;
  addr[1] = wc;
  addr.set(hex, 2);
  const addressWithChecksum = new Uint8Array(36);
  addressWithChecksum.set(addr);
  addressWithChecksum.set(crc16(addr), 34);
  let addressBase64 = Base64.encode(addressWithChecksum);
  return addressBase64.replace(/\+/g, "-").replace(/\//g, "_");
}
function parseHexAddress(hexAddress) {
  if (!hexAddress.includes(":")) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":".`);
  }
  const parts = hexAddress.split(":");
  if (parts.length !== 2) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Address must include ":" only once.`);
  }
  const wc = parseInt(parts[0]);
  if (wc !== 0 && wc !== -1) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. WC must be eq 0 or -1, but ${wc} received.`);
  }
  const hex = parts[1];
  if ((hex === null || hex === void 0 ? void 0 : hex.length) !== 64) {
    throw new WrongAddressError(`Wrong address ${hexAddress}. Hex part must be 64bytes length, but ${hex === null || hex === void 0 ? void 0 : hex.length} received.`);
  }
  return {
    wc,
    hex: hexToBytes(hex)
  };
}
function crc16(data) {
  const poly = 4129;
  let reg = 0;
  const message = new Uint8Array(data.length + 2);
  message.set(data);
  for (let byte of message) {
    let mask = 128;
    while (mask > 0) {
      reg <<= 1;
      if (byte & mask) {
        reg += 1;
      }
      mask >>= 1;
      if (reg > 65535) {
        reg &= 65535;
        reg ^= poly;
      }
    }
  }
  return new Uint8Array([Math.floor(reg / 256), reg % 256]);
}
var toByteMap = {};
for (let ord = 0; ord <= 255; ord++) {
  let s = ord.toString(16);
  if (s.length < 2) {
    s = "0" + s;
  }
  toByteMap[s] = ord;
}
function hexToBytes(hex) {
  hex = hex.toLowerCase();
  const length2 = hex.length;
  if (length2 % 2 !== 0) {
    throw new ParseHexError("Hex string must have length a multiple of 2: " + hex);
  }
  const length = length2 / 2;
  const result = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    const doubled = i * 2;
    const hexSubstring = hex.substring(doubled, doubled + 2);
    if (!toByteMap.hasOwnProperty(hexSubstring)) {
      throw new ParseHexError("Invalid hex character: " + hexSubstring);
    }
    result[i] = toByteMap[hexSubstring];
  }
  return result;
}

export {
  CONNECT_EVENT_ERROR_CODES,
  CONNECT_ITEM_ERROR_CODES,
  SEND_TRANSACTION_ERROR_CODES,
  CHAIN,
  TonConnectError,
  WalletAlreadyConnectedError,
  WalletNotConnectedError,
  WalletNotInjectedError,
  WalletNotSupportFeatureError,
  WalletMissingRequiredFeaturesError,
  UserRejectsError,
  BadRequestError,
  UnknownAppError,
  LocalstorageNotFoundError,
  FetchWalletsError,
  WrongAddressError,
  ParseHexError,
  UnknownError,
  isTelegramUrl,
  encodeTelegramUrlParameters,
  isWalletInfoCurrentlyInjected,
  isWalletInfoCurrentlyEmbedded,
  isWalletInfoInjectable,
  isWalletInfoRemote,
  isWalletInfoInjected,
  WalletsListManager,
  checkRequiredWalletFeatures,
  createRequestVersionEvent,
  createResponseVersionEvent,
  createVersionInfo,
  createConnectionStartedEvent,
  createConnectionCompletedEvent,
  createConnectionErrorEvent,
  createConnectionRestoringStartedEvent,
  createConnectionRestoringCompletedEvent,
  createConnectionRestoringErrorEvent,
  createTransactionSentForSignatureEvent,
  createTransactionSignedEvent,
  createTransactionSigningFailedEvent,
  createDisconnectionEvent,
  BrowserEventDispatcher,
  TonConnect,
  toUserFriendlyAddress
};
/*! Bundled license information:

@tonconnect/sdk/lib/esm/index.mjs:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=chunk-XIL54JJK.js.map
