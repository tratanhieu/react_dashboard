import React, { useState, useEffect } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HorizontalSidebar = ({ navOpen, statusNav, setNavOpen, ...rest }) => {

    const [menu, setMenu] = useState([
        {
            path: '/',
            icon: 'home',
            text: 'Dashboard',
            active: true
        },
        {
            path: '/product/category',
            icon: 'grid layout',
            text: 'Product Category',
            active: false
        },
        {
            path: '/user',
            icon: 'user group',
            text: 'User',
            active: false
        },
        {
            path: '/user/group',
            icon: 'user',
            text: 'User Group',
            active: false
        }
    ])

    return (
        <div className={`main-layout--sidebar ${statusNav}`}>
            <Icon
                name="bars"
                className={`open-close-icon ${statusNav}-nav`}
                size="large"
                inverted
                onClick={() => setNavOpen(!navOpen)}
            />
            <ul style={{ textAlign: `${navOpen ? "left" : "center"}` }}>
            { 
                menu.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <Icon name={item.icon} />                        
                            {navOpen ? <span> {item.text}</span> : null}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default HorizontalSidebar