import React from 'react'

function Cards({label,value,icon,bgColor,iconColor}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-text">
          <p className="label">{label}</p>
          <p className="value">{value }</p>
        </div>
        <div className="card-icon" style={{ backgroundColor: bgColor, color: iconColor }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Cards;