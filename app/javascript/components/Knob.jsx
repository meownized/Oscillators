import React from 'react'

export default class Knob extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      value: 0,
      deg: -90,
      screenY: 0
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp   = this.handleMouseUp.bind(this)
    this.moveKnob        = this.moveKnob.bind(this)
    this.calculateDeg    = this.calculateDeg.bind(this)
  }

  componentDidMount() {
    document.addEventListener("mouseup",   this.handleMouseUp)
    document.addEventListener("mousemove", this.handleMouseMove)
  }

  handleMouseDown(e) {
    console.log("Mouse Down")
    e.preventDefault()

    this.setState({
      mouseDown: true,
      screenY: e.screenY
    })
  }

  handleMouseMove(e) {
    console.log("Mouse Move")

    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveKnob(e.screenY)
    }
  }

  handleMouseUp() {
    if (this.state.mouseDown) {
      // this.props.handleMouseUp()

      this.setState({
        mouseDown: false
      })
    }
  }

  moveKnob(screenY) {
    const min = parseInt(this.props.min)
    const max = parseInt(this.props.max)
    const oldScreenY = this.state.screenY
    const { deg } = this.state
    const difference = screenY - oldScreenY
    let { value } = this.state

    value += difference

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    this.setState({
      screenY: screenY,
      value: value,
      deg: -90 + this.calculateDeg(value)
    })
  }

  calculateDeg(value) {
    const { max } = this.props
    const coef = 120 / max
    const deg = value * coef
    return deg
  }

  render() {
    const { deg } = this.state

    const style = {
      transform: `rotate(${ -deg }deg)`
    }

    return (
      <div className="Knob" style={ style } onMouseDown={ this.handleMouseDown } onMouseMove={ this.handleMouseMove }>
      </div>
    )
  }
}
