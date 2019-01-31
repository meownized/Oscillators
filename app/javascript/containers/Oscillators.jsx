import React from 'react'
import $ from 'jquery'

import Oscillator from '../components/Oscillator'
import ToggleSwitch from '../components/ToggleSwitch'

export default class Oscillators extends React.Component {
  constructor(props) {
    super(props)

    let oscillators = []

    props.oscillators.map(oscillator => {
      oscillator.playing = false
      oscillators.push(oscillator)
    })

    this.state = {
      playing: false,
      oscillators: oscillators
    }

    this.handlePlayOrStopClick       = this.handlePlayOrStopClick.bind(this)
    this.handleFrequencyChange       = this.handleFrequencyChange.bind(this)
    this.handlePlayOrStopAllClick    = this.handlePlayOrStopAllClick.bind(this)
    this.handleWaveChange            = this.handleWaveChange.bind(this)
    this.handleDetuneChange          = this.handleDetuneChange.bind(this)
    this.handleMouseUp               = this.handleMouseUp.bind(this)
    this.isPlaying                   = this.isPlaying.bind(this)
  }

  isPlaying(oscillators) {
    let playing = false

    oscillators.map ((oscillator, i) => {
      if (oscillator.playing) {
        playing = true
      }
    })
    return playing
  }

  handlePlayOrStopClick(index) {
    let { playing, oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        oscillator.playing = !oscillator.playing
      }
    })

    playing = this.isPlaying(oscillators)

    this.setState({
      playing: playing,
      oscillators: oscillators
    })
  }

  handlePlayOrStopAllClick() {
    const { playing }  = this.state
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
        oscillator.playing = !playing
    })

    this.setState({
      playing: !playing,
      oscillators: oscillators
    })
  }


  handleWaveChange(index, value) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        oscillator.wave = value
      }
    })

    this.setState({
      oscillators: oscillators
    })

    this.updateOscillator(index, "wave", value)
  }

  handleFrequencyChange(index, value) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        oscillator.frequency = value
      }
    })

    this.setState({
      oscillators: oscillators
    })
  }

  handleDetuneChange(index, value) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        oscillator.detune = value
      }
    })

    this.setState({
      oscillators: oscillators
    })
  }

  handleMouseUp(index, paramName) {
    const value = this.state.oscillators[index][`${paramName}`]
    this.updateOscillator(index, paramName, value)
  }

  updateOscillator(index, paramName, value) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {

        const { id } = oscillator

        $.ajax({
          dataType: "json",
          method: "POST",
          url: "/oscillators/tune",
          data: { id: id, param_name: paramName, value: value }
        }).done(function() {
          console.log("success")
        }).fail(function(jqXHR, textStatus) {
          console.log("error")
        }).always(function() {
          console.log("complete")
        })
      }
    })
  }

  render() {
    const { playing, oscillators } = this.state
    let oscillatorElements = []

    oscillators.map((oscillator, i) => {
      oscillatorElements.push(
        <Oscillator
          {...oscillator}
          handleMouseUp={ this.handleMouseUp }
          handlePlayOrStopClick={ this.handlePlayOrStopClick }
          handleFrequencyChange={ this.handleFrequencyChange }
          handleWaveChange={ this.handleWaveChange }
          handleDetuneChange={ this.handleDetuneChange }
          index= { i }
          key={ i }
        />
      )
    })

    return (
      <div className="Oscillators">
      <ToggleSwitch
        name="play"
        value={ playing }
        handleToggleClick={ this.handlePlayOrStopAllClick }
      />

        { oscillatorElements }
      </div>
    )
  }
}
