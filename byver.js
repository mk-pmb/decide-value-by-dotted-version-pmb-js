// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

/* eslint-disable
    no-var,
    no-param-reassign,
    one-var,
    one-var-declaration-per-line,
    prefer-destructuring,
*/

var EX = function decideValueByDottedVersion(ver, choices) {
  var f = EX.prepareForVersion(ver);
  return (choices ? f(choices) : f);
};


EX.prepareForVersion = function prepareForVersion(ver) {
  if (ver === 'node') { ver = EX.nodeVerNums(); }
  if (ver === 'node.major') { ver = EX.nodeVerNums()[0]; }
  if (Number.isFinite(ver)) { return EX.serialModeSelect.bind(null, ver); }
  return EX.prepareForDottedVersion(ver);
};


EX.serialModeSelect = function serialModeSelect(refVer, choices) {
  var latestMatchingVer = 0, bestVal = choices[refVer];
  if (bestVal !== undefined) { return bestVal; }
  Object.entries(choices).forEach(function check(ent) {
    var chVer = EX.segmentToNumber(ent[0]), chVal = ent[1];
    if (chVer < latestMatchingVer) { return; }
    if (refVer < chVer) { return; }
    latestMatchingVer = chVer;
    bestVal = chVal;
  });
  return bestVal;
};


EX.prepareForDottedVersion = function prepareForDottedVersion() {
  // refVerNums = EX.splitVersion(refVer);
  throw new Error('Stub! Actual dotted notatin is not yet supported.');
};


EX.versionSpecRgx = /^(\^|[<>]=?)(\d+(?:\.\d+)*)$/;


EX.parseVersionSpec = function parseVersionSpec(x) {
  var m = EX.versionSpecRgx.match(x), v;
  if (!m) { throw new Error('Unsupported version specification: ' + x); }
  v = m[2].split('.');
  v.oper = m[1];
  return v;
};


EX.segmentToNumber = function segmentToNumber(x) {
  var n = (+x || 0);
  if (n === x) { return n; }
  if (n.toFixed(0) === x) { return n; }
  throw new Error('Dotted segment is not a number: ' + x);
};


EX.splitVersion = function splitVersion(x) {
  return String(x).split('.').map(EX.segmentToNumber);
};


EX.nodeVerNums = function nodeVerNums() {
  return EX.splitVersion(process.versions.node);
};



module.exports = EX;
