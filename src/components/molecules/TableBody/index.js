import React from 'react'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'

import style from './styles.module.scss'

const TableBody = ({children, loading, ...rest}) => {
    return (
        <Dimmer.Dimmable
            style={{
                marginTop: 8
            }}
            >
            <Dimmer
                active={loading}
                inverted
                style={{
                borderColor: "#eee",
                borderWidth: 1,
                borderStyle: "solid"
                }}
            >
                <Loader size="medium">Vui lòng đợi</Loader>
            </Dimmer>
            <Grid columns="equal" padded {...rest}>
                {children}
            </Grid>
        </Dimmer.Dimmable>
    )
}

export default TableBody