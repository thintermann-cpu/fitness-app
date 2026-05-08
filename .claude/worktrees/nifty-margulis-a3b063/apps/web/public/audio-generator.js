/**
 * CarveOut Audio Generator
 * Standalone Web Audio API utilities for meditation sounds.
 * All synthesis is done in-browser – no external audio files required.
 */

;(function (global) {
  'use strict'

  /** @returns {AudioContext} */
  function createCtx() {
    return new (global.AudioContext || global.webkitAudioContext)()
  }

  /**
   * Synthetic gong / singing bowl hit.
   * @param {AudioContext} ctx
   * @param {number} [freq=432]   fundamental frequency in Hz
   * @param {number} [decay=4]    decay time in seconds
   * @param {number} [gain=0.7]
   */
  function playGong(ctx, freq, decay, gain) {
    freq  = freq  || 432
    decay = decay || 4
    gain  = gain  || 0.7

    var osc = ctx.createOscillator()
    var g   = ctx.createGain()
    osc.connect(g)
    g.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.42, ctx.currentTime + decay * 0.8)

    g.gain.setValueAtTime(gain, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + decay)
  }

  /**
   * Short interval beep.
   * @param {AudioContext} ctx
   */
  function playBeep(ctx) {
    var osc = ctx.createOscillator()
    var g   = ctx.createGain()
    osc.connect(g)
    g.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.value = 660
    g.gain.setValueAtTime(0.25, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  }

  /**
   * Three descending tones for session completion.
   * @param {AudioContext} ctx
   */
  function playComplete(ctx) {
    var notes = [880, 698, 523]
    notes.forEach(function (freq, i) {
      var osc = ctx.createOscillator()
      var g   = ctx.createGain()
      osc.connect(g)
      g.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.value = freq

      var t = ctx.currentTime + i * 0.45
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.4, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.2)

      osc.start(t)
      osc.stop(t + 1.2)
    })
  }

  /**
   * Generate a looping noise buffer.
   * @param {AudioContext} ctx
   * @param {'white_noise'|'rain'|'forest'|'waves'} kind
   * @param {number} [seconds=15]  buffer length before looping
   * @returns {{ source: AudioBufferSourceNode, gain: GainNode, stop: Function }}
   */
  function createNoise(ctx, kind, seconds) {
    seconds = seconds || 15
    var sr         = ctx.sampleRate
    var bufferSize = sr * seconds
    var buffer     = ctx.createBuffer(1, bufferSize, sr)
    var data       = buffer.getChannelData(0)

    if (kind === 'white_noise') {
      for (var i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }
    } else if (kind === 'rain' || kind === 'forest') {
      // Pink noise via Paul Kellett's filtered white noise
      var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
      for (var i = 0; i < bufferSize; i++) {
        var w = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + w * 0.0555179
        b1 = 0.99332 * b1 + w * 0.0750759
        b2 = 0.96900 * b2 + w * 0.1538520
        b3 = 0.86650 * b3 + w * 0.3104856
        b4 = 0.55000 * b4 + w * 0.5329522
        b5 = -0.7616 * b5 - w * 0.0168980
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
        b6 = w * 0.115926
      }
    } else if (kind === 'waves') {
      for (var i = 0; i < bufferSize; i++) {
        var wave = Math.sin(2 * Math.PI * 0.08 * i / sr)
        data[i] = (Math.random() * 2 - 1) * (0.4 + 0.6 * Math.max(0, wave)) * 0.25
      }
    }

    var source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop   = true

    var gainNode = ctx.createGain()
    gainNode.gain.value = kind === 'white_noise' ? 0.12 : 0.18

    source.connect(gainNode)
    gainNode.connect(ctx.destination)
    source.start()

    return {
      source: source,
      gain:   gainNode,
      stop: function () {
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
        source.stop(ctx.currentTime + 1)
      },
    }
  }

  global.AudioGenerator = { playGong: playGong, playBeep: playBeep, playComplete: playComplete, createNoise: createNoise, createCtx: createCtx }
})(typeof window !== 'undefined' ? window : this)
