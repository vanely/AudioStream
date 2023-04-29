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
masterVolume.gain.value = .1

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
      selectedWaveform = waveform
    }
  })
}

volumeCtrl.addEventListener('input', changeVolume)

startBtn.addEventListener('click', function(event) {
  oscillator = context.createOscillator()
  // setValueAtTime allows to set the frequency in Hz and start delay
  oscillator.frequency.setValueAtTime(260, 0)
  oscillator.connect(masterVolume)

  oscillator.start(0)
  oscillator.type = selectedWaveform
})

stopBtn.addEventListener('click', function(event) {
  oscillator.stop(1)
  delete oscillator
})

// waveform selection not working
waveforms.forEach((waveform) => {
  console.log(['Current Waveform', waveform])
  waveform.addEventListener('change', function(event) {
    setWaveform(event)
    oscillator.type = selectedWaveform
  })
})