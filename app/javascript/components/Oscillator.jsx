import React from 'react'

import WaveButton from '../components/WaveButton'
import Knob from '../components/Knob'
import Slider from '../components/Slider'
import ToggleSwitch from '../components/ToggleSwitch'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    let oscillator =  audioContext.createOscillator()
    oscillator.type = props.wave

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      playing: false
    }

    this.handlePlayOrStopClick = this.handlePlayOrStopClick.bind(this)
    this.changeFrequency       = this.changeFrequency.bind(this)
    this.handleDetuneChange    = this.handleDetuneChange.bind(this)
    this.changeWave            = this.changeWave.bind(this)
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
    this.handleWaveChange      = this.handleWaveChange.bind(this)
    this.handleMouseUp         = this.handleMouseUp.bind(this)
  }

  componentDidUpdate() {
    const { playing } = this.props

    this.changeFrequency()
    this.changeDetune()
    this.changeWave()

    if (playing && !this.state.playing) {
      this.startOscillator()
    } else if (!playing && this.state.playing) {
      this.stopOscillator()
    }
  }

  handlePlayOrStopClick() {
    const { index, handlePlayOrStopClick } = this.props
    handlePlayOrStopClick(index)
  }

  handleFrequencyChange(value) {
    const { index, handleFrequencyChange } = this.props
    handleFrequencyChange(index, value)
  }

  handleWaveChange(value) {
    const { index, handleWaveChange } = this.props
    handleWaveChange(index, value)
  }

  handleDetuneChange(value) {
    const { index, handleDetuneChange } = this.props
    handleDetuneChange(index, value)
  }

  handleMouseUp(paramName) {
    const { index, handleMouseUp } = this.props
    handleMouseUp(index, paramName)
  }

  startOscillator() {
    const { frequency } = this.props
    const { audioContext } = this.state
    let { oscillator } = this.state

    oscillator = audioContext.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()

    this.setState({
      oscillator: oscillator,
      playing: true
    })
  }

  stopOscillator() {
    let { oscillator } = this.state
    oscillator.stop()

    this.setState({
      playing: false
    })
  }

  changeFrequency() {
    const { frequency } = this.props
    const { audioContext, oscillator } = this.state
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  }

  changeDetune() {
    const { detune } = this.props
    const { audioContext, oscillator } = this.state
    oscillator.detune.setValueAtTime(detune, audioContext.currentTime)
  }

  changeWave() {
    const { wave } = this.props
    const { audioContext, oscillator } = this.state
    oscillator.type = wave
  }

  render() {
    const { title, wave, frequency, detune, playing } = this.props

    return(
      <div className="Oscillator">
        <h1>{ title }</h1>

        <ToggleSwitch
          name="play"
          value={ playing }
          handleToggleClick={ this.handlePlayOrStopClick }
        />

        <WaveButton
          current={ wave }
          value="sine"
          handleClick={ this.handleWaveChange }
        />

        <WaveButton
          current={ wave }
          value="square"
          handleClick={ this.handleWaveChange }
        />

        <WaveButton
          current={ wave }
          value="sawtooth"
          handleClick={ this.handleWaveChange }
        />

        <WaveButton
          current={ wave }
          value="triangle"
          handleClick={ this.handleWaveChange }
        />

        <Knob
          name="detune"
          min = "-100"
          max = "100"
          value = { detune }
          handleValueChange={ this.handleDetuneChange }
          handleMouseUp={ this.handleMouseUp }
        />

        <Slider
          name="frequency"
          min="0"
          max="1000"
          value={ frequency }
          handleValueChange={ this.handleFrequencyChange }
          handleMouseUp={ this.handleMouseUp }
        />

        <div className="result">
          { frequency }
        </div>
      </div>
    )
  }
}
