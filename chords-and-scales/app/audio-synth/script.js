const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const volumeCtrl = document.querySelector('.volume-ctrl')
const waveforms = document.getElementsByName('waveform')
let selectedWaveform


///////////////////////////// Setup Oscillator Synth /////////////////////////////
const AudioContext = window.AudioContext
const context = new AudioContext

console.log(['Audio Context Object: ', AudioContext])
console.log(['Audio Context Instance: ', context])

// connect our context instance gain(volume control)
// think of the connect method in the same way that modules are being connected to in modular synthesis
const masterVolume = context.createGain()
masterVolume.connect(context.destination)
// starting volume
masterVolume.gain.value = .4

let oscillator

///////////////////////////// Setup Event Listeners /////////////////////////////
function changeVolume(event) {
  // 'this' is the element responsible for volume control
  masterVolume.gain.value = this.value
}

function setWaveform(event) {
  // waveform selected from DOM to be set in oscillator
  waveforms.forEach((waveform) => {
    if (waveform.checked) {
      selectedWaveform = waveform.value
    }
  })
}

volumeCtrl.addEventListener('input', changeVolume)

startBtn.addEventListener('mousedown', function(event) {
  oscillator = context.createOscillator()
  // setValueAtTime allows to set the frequency in Hz and start delay
  oscillator.frequency.setValueAtTime(260, 0)
  oscillator.connect(masterVolume)

  oscillator.start(0)
  oscillator.type = selectedWaveform
})

startBtn.addEventListener('mouseup', function(event) {
  oscillator.stop(0)
  delete oscillator
})

// waveform selection not working
console.log(['Waveforms out of listener: ', waveforms])
waveforms.forEach((waveform) => {
  waveform.addEventListener('change', function(event) {
    console.log(['Current Waveform', waveform, `value: ${waveform.value}`])
    setWaveform(event)
    if (oscillator) {
      oscillator.type = selectedWaveform
    }
  })
})
