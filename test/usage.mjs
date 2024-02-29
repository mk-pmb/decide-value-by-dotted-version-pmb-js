// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert';

import 'p-fatal';

// ¦mjsUsageDemo¦+
import decideValueByVersion from '../byver.js';
// ¦mjsUsageDemo¦- importPkgName

const equal = assert.strictEqual;

(function serialModeTest() {
  const c247 = { 2: 'two', 4: 'four', 7: 'seven' };
  const evolution = [
    /* v0 */ undefined,
    /* v1 */ undefined,
    /* v2 */ 'two',
    /* v3 */ 'two',
    /* v4 */ 'four',
    /* v5 */ 'four',
    /* v6 */ 'four',
    /* v7 */ 'seven',
    /* v8 */ 'seven',
    /* v9 */ 'seven',
  ];
  evolution.forEach(function verify(wantVal, inputVer) {
    equal(decideValueByVersion(inputVer)(c247), wantVal);
  });
}());


console.info('+OK usage test passed.');
