import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import HeaderBar from '../../../organisms/HeaderBar';
import HorizontalSidebar from '../../../organisms/HorizontalSidebar';
// import Footer from '../../../organisms/Footer';

const Main = ({ children, ...rest}) => {
    return(
        <>
            <HeaderBar />
            <Grid style={{marginTop: 54}}>
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

export default Main