import React from 'react'
import classnames from 'classnames'

export default class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props)
    }

  render() {
    const { name, value, handleToggleClick } = this.props

    const classes = classnames({
      "ToggleSwitch": true,
      [`${ name }`]: true,
      "switchOn": !value, //! means false
      "switchOff": value
    })

    return (
      <div
        className={ classes }
        onClick={ handleToggleClick }
      />
    )
  }
}
