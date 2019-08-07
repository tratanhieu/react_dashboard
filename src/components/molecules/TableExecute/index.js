import React, { useState } from 'react'
import { Grid, Button, Icon, Dropdown } from 'semantic-ui-react'

// import style from './style.module.scss'

const TableExecute = ({stateOptions, onExecute, loading, ...rest}) => {

    const [dropDownValue, setDropDownValue] = useState(null)

    const handleExecute = () => {
        onExecute(dropDownValue)
    }

    const handleSelectAction = (e, dropdown) => {
        setDropDownValue(dropdown.value)
    }

    return (
        <Grid padded="vertically">
            <Grid.Row>
                <Grid.Column verticalAlign="middle" width={16}>
                <Dropdown
                    placeholder="Hành động"
                    search
                    selection
                    options={stateOptions}
                    floated="left"
                    disabled={loading}
                    onChange={handleSelectAction}
                    {...rest}
                />
                &nbsp;&nbsp;
                <Button icon primary disabled={loading} onClick={handleExecute}>
                    {(loading) ? (<><Icon loading name="spinner" />&nbsp;&nbsp;</>) : null} Thực hiện
                </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default TableExecute