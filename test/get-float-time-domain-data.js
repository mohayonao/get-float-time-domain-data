"use strict";

var assert = require("assert");
var sinon = require("sinon");

require("../");

describe("AnalyserNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("#getFloatTimeDomainData", function() {
    it("(array: Float32Array): void", function() {
      var node = audioContext.createAnalyser();

      node.fftSize = 256;

      sinon.stub(node, "getByteTimeDomainData", function(array) {
        for (var i = 0; i < array.length; i++) {
          array[i] = i % 256;
        }
      });

      var array = new Float32Array(node.fftSize);

      node.getFloatTimeDomainData(array);

      for (var i = 0; i < node.fftSize; i++) {
        assert(array[i] === (i - 128) / 128, i);
      }
    });
  });
});
