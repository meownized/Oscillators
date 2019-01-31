import React from 'react'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      area: {
        left:  0,
        right: 0,
        width: 0
      },
      thumb: {
        left: 0
      }
    }

    this.slideArea = React.createRef()

    this.handleMouseMove     = this.handleMouseMove.bind(this)
    this.handleMouseDown     = this.handleMouseDown.bind(this)
    this.handleMouseUp       = this.handleMouseUp.bind(this)
    // this.handleValueChange = this.handleValueChange.bind(this)
    this.moveThumb           = this.moveThumb.bind(this)
    this.calculateLeft       = this.calculateLeft.bind(this)
    this.calculateValue      = this.сalculateValue.bind(this)
  }

  componentDidMount() {
    const { x, width } = this.slideArea.current.getBoundingClientRect()

    this.setState({
      area: {
        left:  x,
        right: x + width,
        width: width
      },
      thumb: {
        left: this.calculateLeft(width)
      }
    })

    document.addEventListener("mouseup",   this.handleMouseUp)
    document.addEventListener("mousemove", this.handleMouseMove)
  }

  componentDidUpdate() {

  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleDrop() {
    // console.log('Drop')
  }

  handleDragStart() {
    // console.log('Started')
  }

  handleMouseDown(e) {
    // console.log('Mouse Down')
    e.preventDefault()

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp() {
    if (this.state.mouseDown) {
      this.props.handleMouseUp()

      this.setState({
        mouseDown: false
      })
    }
  }

  handleMouseMove(e) {
    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveThumb(e.screenX)
    }
  }

  moveThumb(screenX) {
    const { min, max } = this.props
    const areaLeft = this.state.area.left
    const areaRight = this.state.area.right
    const thumbLeft = screenX - areaLeft

    if (thumbLeft >= 0 && screenX <= areaRight) {
      const value = this.calculateValue(thumbLeft)
      console.log(value)
      this.props.handleValueChange(value)

      this.setState({
        thumb: {
          left: thumbLeft
        }
      })
    }
  }

  calculateLeft(width) {
    // console.log("calculateLeft", this.state, this.state.thumb)
    const { min, max } = this.props
    const { value } = this.props

    const range = max - min
    const coef = range / width

    const left = value / coef

    // console.log(min, max, value, width, range, coef, left)

    return left
  }

  сalculateValue(thumbLeft) {
    // console.log("сalculateValue", this.state, this.state.thumb)
    const { min, max } = this.props
    const { width } = this.state.area

    const range = max - min
    const coef = range / width

    const value = thumbLeft * coef

    // console.log(thumbLeft, min, max, value, width, range, coef)

    return Math.round(value)
  }

  // handleValueChange(value) {
  //   this.handleValueChange(value)
  // }

  render() {
    const { left } = this.state.thumb

    const style = {
      transform: `translateX(${left}px)`
    }

    return (
      <div className="Slider" ref={ this.slideArea } onDragOver={ this.handleDragOver } onDrop={ this.handleDrop }>
        <div className="thumb" style={ style } onMouseDown={ this.handleMouseDown } />
      </div>
    )
  }
}
