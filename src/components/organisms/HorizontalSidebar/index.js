import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default class HorizontalSidebar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu vertical {...this.props}>
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='home' />
                    Dashboard
                </Menu.Item>
                <Menu.Item
                    name='browse'
                    active={activeItem === 'browse'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='grid layout' />
                    Đơn hàng
                </Menu.Item>
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={this.handleItemClick}
                >
                    Loại sản phẩm
                </Menu.Item>

                <Dropdown item text='Cài đặt'>
                <Dropdown.Menu>
                    <Dropdown.Item icon='edit' text='Edit Profile' />
                    <Dropdown.Item icon='globe' text='Choose Language' />
                    <Dropdown.Item icon='settings' text='Account Settings' />
                </Dropdown.Menu>
                </Dropdown>
            </Menu>
        )
    }
}