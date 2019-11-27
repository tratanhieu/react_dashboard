import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Grid, Segment, Message } from 'semantic-ui-react'
import HeaderBar from '../../../organisms/HeaderBar';
import HorizontalSidebar from '../../../organisms/HorizontalSidebar';
// import Footer from '../../../organisms/Footer';

const Render = ({ children, systemErrors, ...rest}) => {
    return(
        <>
            <HeaderBar />
            <Grid style={{marginTop: 54}}>
                <Message error>{systemErrors.message}</Message>
                <Grid.Row style={{padding: 0}}>
                    <Grid.Column style={{width: 230, padding: 0, backgroundColor: '#1b1c1d'}}>
                        <HorizontalSidebar />
                    </Grid.Column>
                    <Grid.Column style={{width: 'calc(100% - 230px)', paddingTop: 16, paddingBottom: 16}}>
                        <Segment>
                            {children}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {/* <Footer /> */}
        </>
    )
}

const Main = ({ children }) => {
    const selector = useSelector(({
        rootReducer: { systemErrors } 
    }) => ({ systemErrors }), shallowEqual)

    const renderProps = {
        children,
        ...selector
    }

    return <Render {...renderProps} />
}

export default Main