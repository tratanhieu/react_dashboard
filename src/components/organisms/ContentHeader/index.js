import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "16px 0px"
    }
}));

const ContentHeader = ({ children }) => {
    const classes = useStyles()

    const [leftBlock, rightBlock] = children
    return (
        <div className={classes.root}>
            <div>
                {leftBlock}
            </div>
            <div>
                {rightBlock}
            </div>
        </div>
    )
}

export default ContentHeader