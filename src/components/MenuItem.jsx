import React from 'react'

function MenuItem( {category, onSelectedCategory} ) {
  return (
    <button
    className='menu-item'
    key={category}
    onClick={() => onSelectedCategory(category)}
    >
        {category}
    </button>
  )
}

export default MenuItem