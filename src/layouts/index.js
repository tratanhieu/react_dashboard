import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Segment,
    Sidebar,
} from 'semantic-ui-react'

import HorizontalSidebar from '../components/organisms/HorizontalSidebar'

export default class SidebarExampleTransitions extends Component {
    state = {
        animation: 'push',
        direction: 'left',
        dimmed: false,
        visible: false,
    }

    handleAnimationChange = animation => () =>
        this.setState(prevState => ({ animation, visible: !prevState.visible }))

    handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

    handleDirectionChange = direction => () => this.setState({ direction, visible: false })

    render() {
        const { animation, dimmed, direction, visible } = this.state

    return (
        <div>
            <Button onClick={this.handleAnimationChange('push')}>Push</Button>
            <Sidebar.Pushable as={Segment}>
                <HorizontalSidebar animation={animation} direction={direction} visible={visible} />
                <Sidebar.Pusher dimmed={dimmed && visible}>
                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                        
                        <Button primary>Primary</Button>
                        <Button secondary>Secondary</Button>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
        )
    }
}