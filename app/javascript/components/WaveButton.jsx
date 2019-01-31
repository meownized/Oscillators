import React from 'react'
import classnames from 'classnames'

export default class WaveButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { value } = this.props
    this.props.handleClick(value)
  }

  render() {
    const { current, value } = this.props
    
    const classes = classnames({
      "WaveButton": true,
      "on": current == value,
      [`${ value }`]: true
    })

    return (
      <div className={ classes } onClick={ this.handleClick}>
        { value }
      </div>
    )
  }
}
