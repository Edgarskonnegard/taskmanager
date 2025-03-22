import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';

function MenuList( {isMenuOpen, toggleMenu, categories, onSelectedCategory} ) {
  return (
    <div className='menu-list'>
        {!isMenuOpen && (
            <div className='menu-icon'>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={toggleMenu}
                    className="menu-icon"
                />
                
            </div>

        )}
        {isMenuOpen && (
            <div className='category-menu'>
                <FontAwesomeIcon
                    icon={faTimes}
                    className="close-btn"
                    onClick={toggleMenu}
                />
                <div className='category-menu-p'>
                    <p><strong>Categories</strong></p>

                </div>
                <MenuItem
                category='All'
                onSelectedCategory={onSelectedCategory}
                />
                {
                    categories.map(category => (
                    <MenuItem
                    category={category}
                    onSelectedCategory={onSelectedCategory}
                    />
                ))}
            </div>
        )}
    </div>
  )
}

export default MenuList