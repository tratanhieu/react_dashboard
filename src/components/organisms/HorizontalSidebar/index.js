import React, { useState, useEffect } from 'react'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const HorizontalSidebar = ({ ...rest }) => {

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
        }
    ])

    return (
        <div className={styles.mainSidebarMenu} {...rest}>
            <ul>
            { 
                menu.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <Icon name={item.icon} />
                            {item.text}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default HorizontalSidebar