import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import Fieldset from '../../../atoms/Fieldset'
import { ACTIVE, HIDDEN, DELETED } from '../../../../constants/entites';
import MultipleExecute from '../../../molecules/MultipleExecute';
import { doMultipleExecute } from '../../../../redux/reducers/userReducer';

const options = [
    { key: ACTIVE, text: "Display", value: ACTIVE },
    { key: HIDDEN, text: "Hidden", value: HIDDEN },
    { key: DELETED, text: "Delete", value: DELETED }
];

const Render = ({ multipleExecuteLoading, checkedItems = [], onExecuteMultiple }) => (
        <Fieldset icon="hand point down outline" title="Actions">
        <div style={{ display: "flex", justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <MultipleExecute
                loading={multipleExecuteLoading}
                disabled={checkedItems.length <= 0}
                options={options}
                onExecute={onExecuteMultiple} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button primary>
                    <Icon name="cloud upload" inverted />Import
                </Button>
                <Button primary>
                    <Icon name="cloud download" inverted />Export
                </Button>
            </div>
        </div>
    </Fieldset>
)

const UserAction = () => {
    const selector = useSelector(({ 
        userReducer: { multipleExecuteLoading, checkedItems } }) => ({ multipleExecuteLoading, checkedItems })
    , shallowEqual)

    const dispatch = useDispatch()

    const renderProps = {
        ...selector,
        onExecuteMultiple: actionValue => dispatch(doMultipleExecute(selector.checkedItems, actionValue))
    }

    return <Render {...renderProps} />
}

export default UserAction