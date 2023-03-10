import React from 'react'

const Button = ({ children, click, styles, disabled }) => {
  return (
    <button onClick={click} className={`btn ${styles}`} disabled={disabled} >
        {children}
    </button>
  )
}

export default Button