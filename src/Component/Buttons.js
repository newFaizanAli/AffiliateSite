import React from 'react'

const Buttons = ({color, name, func}) => {
  return (
     <div>
        <button className={`btn btn-${color} rounded-0 shadow-sm`} onClick={func}>{name}</button>
     </div>
  )
}

export {Buttons}