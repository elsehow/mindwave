var Mindwave = require('./index.js');
var kefir = require('kefir')
var mw = new Mindwave();
var fftjs = require('fft-js').fft
var fftUtil = require('fft-js').util

function fft (signal) {
  var phasors= fftjs(signal)
  var magnitudes = fftUtil.fftMag(phasors)
  return magnitudes
}

var waveS = kefir
    .fromEvents(mw, 'wave')
    .bufferWithCount(512)
    .map(fft)

waveS.onValue(magnitudes => {
  require('fs').appendFile('out.csv', magnitudes.join(',')+'\n', err => console.log(err))
})

console.log('connecting')
mw.connect('/dev/cu.MindWaveMobile-DevA');
