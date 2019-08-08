import React from 'react'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'

import style from './styles.module.scss'

const TableBody = ({children, loading, ...rest}) => {
    return (
        <Dimmer.Dimmable
            className={`${style.root}`}
        >
            <Dimmer
                active={loading}
                inverted
                className={`${style.dimmer}`}
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