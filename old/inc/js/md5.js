/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <mo@goice.co.jp>
 * Version: 2.0.1
 * LastModified: Dec 07 2004
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */

/* Interface:
 * md5_128bits = MD5_hash(data);
 * md5_hexstr = MD5_hexhash(data);
 */

/* ChangeLog
 * 2004/12/07: Removed/optimized code for size and speed - fidian
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */

var MD5_T = new Array(65);
for (i = 0; i < 65; i ++)
{
    MD5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0)
}

var MD5_round1 = new Array(16);
var MD5_round2 = new Array(16);
var MD5_round3 = new Array(16);
var MD5_round4 = new Array(16);
var j = new Array(7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21);
for (i = 0; i < 16; i ++)
{
   MD5_round1[i] = new Array(i, j[i&0x03], i+1);
   MD5_round2[i] = new Array((1+(i*5))%16, j[(i&0x03)+4], i+17);
   MD5_round3[i] = new Array((5+(i*3))%16, j[(i&0x03)+8], i+33);
   MD5_round4[i] = new Array((i*7)%16, j[(i&0x03)+12], i+49);
}

function MD5_F(x, y, z) { return (x & y) | (~x & z); }
function MD5_G(x, y, z) { return (x & z) | (y & ~z); }
function MD5_H(x, y, z) { return x ^ y ^ z;          }
function MD5_I(x, y, z) { return y ^ (x | ~z);       }

var MD5_round = new Array(new Array(MD5_F, MD5_round1),
			  new Array(MD5_G, MD5_round2),
			  new Array(MD5_H, MD5_round3),
			  new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) +
	 String.fromCharCode((n32 >>> 8) & 0xff) +
	 String.fromCharCode((n32 >>> 16) & 0xff) +
	 String.fromCharCode((n32 >>> 24) & 0xff);
}

function MD5_number(n) {
  while (n < 0)
    n += 4294967296;
  while (n > 4294967295)
    n -= 4294967296;
  return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
  var t;

  t = MD5_number(s[abcd[0]] + 
                 f(s[abcd[1]], s[abcd[2]], s[abcd[3]]) + 
		 x[r[0]] + MD5_T[r[2]]);
  s[abcd[0]] = MD5_number(((t<<r[1]) | (t>>>(32-r[1]))) + s[abcd[1]]);
}

function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;

  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = (index < 56) ? (56 - index) : (120 - index);
  if(padLen > 0) {
    data += "\x80";
    for(i = 0; i < padLen - 1; i++)
      data += "\x00";
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len  += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x    = new Array(16);
  s    = new Array(4);

  for(k = 0; k < len; k += 64) {
    for(i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) |
	    (data.charCodeAt(j + 1) <<  8) |
	    (data.charCodeAt(j + 2) << 16) |
	    (data.charCodeAt(j + 3) << 24);
    }
    s[0] = state[0];
    s[1] = state[1];
    s[2] = state[2];
    s[3] = state[3];
    for(i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for(j = 0; j < 16; j++) {
	MD5_apply_round(x, s, f, abcd, r[j]);
	tmp = abcd[0];
	abcd[0] = abcd[3];
	abcd[3] = abcd[2];
	abcd[2] = abcd[1];
	abcd[1] = tmp;
      }
    }

    state[0] = MD5_number(state[0] + s[0]);
    state[1] = MD5_number(state[1] + s[1]);
    state[2] = MD5_number(state[2] + s[2]);
    state[3] = MD5_number(state[3] + s[3]);
  }

  return MD5_pack(state[0]) +
	 MD5_pack(state[1]) +
	 MD5_pack(state[2]) +
	 MD5_pack(state[3]);
}

function md5(data) {
    var i, out, c;
    var bit128;

    bit128 = MD5_hash(data);
    out = "";
    for(i = 0; i < 16; i++) {
	c = bit128.charCodeAt(i);
	out += "0123456789abcdef".charAt((c>>4) & 0xf);
	out += "0123456789abcdef".charAt(c & 0xf);
    }
    return out;
}
