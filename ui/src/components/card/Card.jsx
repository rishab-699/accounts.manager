import React from 'react'
import './card.css'

export default function Card({
    title, value, description
}) {
  return (
    <div className='Card'>
      <div className="title">
        <span className="title-text">{title}</span>
      </div>
      <div className="value">
        <span className="value-text">&#8377; {value?value:'-'}</span>
      </div>
      <div className="description">
        <span className="description-text">{description}</span>
      </div>
    </div>
  )
}
