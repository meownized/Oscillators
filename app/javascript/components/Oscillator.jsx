import React from 'react'

import WaveButton from '../components/WaveButton'
import Knob from '../components/Knob'
import Slider from '../components/Slider'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    let oscillator =  audioContext.createOscillator()
    oscillator.type = props.wave

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator
    }

    this.handlePlayClick       = this.handlePlayClick.bind(this)
    this.handleStopClick       = this.handleStopClick.bind(this)
    this.changeFrequency       = this.changeFrequency.bind(this)
    this.changeWave            = this.changeWave.bind(this)
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
    this.handleWaveChange      = this.handleWaveChange.bind(this)
    this.handleMouseUp         = this.handleMouseUp.bind(this)
  }

  componentDidUpdate() {
    this.changeFrequency()
    this.changeWave()
  }

  handlePlayClick() {
    this.startOscillator()
    this.props.handlePlayOrStopClick(this.props.index)
  }

  handleStopClick() {
    this.stopOscillator()
    this.props.handlePlayOrStopClick(this.props.index)
  }

  handleFrequencyChange(value) {
    const { index } = this.props
    this.props.handleFrequencyChange(index, value)
  }

  handleWaveChange(value) {
    const { index } = this.props
    this.props.handleWaveChange(index, value)
  }

  handleMouseUp() {
    const { index } = this.props
    this.props.handleMouseUp(index)
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
      oscillator: oscillator
    })
  }

  stopOscillator() {
    let { oscillator } = this.state
    oscillator.stop()
  }

  changeFrequency() {
    const { frequency } = this.props
    const { audioContext, oscillator } = this.state
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  }

  changeWave() {
    const { wave } = this.props
    const { audioContext, oscillator } = this.state
    oscillator.type = wave
  }

  renderPlayButton() {
    return <div className="play" onClick={ this.handlePlayClick } />
  }

  renderStopButton() {
    return <div className="stop" onClick={ this.handleStopClick } />
  }

  render() {
    const { title, wave, frequency, playing } = this.props

    return(
      <div className="Oscillator">
        <h1>{ title }</h1>
        { playing ? this.renderStopButton() : this.renderPlayButton() }

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
        min = "-100"
        max = "100"
        />

        <Slider
          min="0"
          max="1000"
          value={ frequency }
          handleValueChange={ this.handleFrequencyChange }
          handleMouseUp={ this.handleMouseUp}
        />

        <div className="result">
          { frequency }
        </div>
      </div>
    )
  }
}
