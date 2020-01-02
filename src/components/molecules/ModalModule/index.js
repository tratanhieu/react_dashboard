import React, { Children } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    bottom: {
        padding: "16px 24px"
    }
}));

export default function ModalModule({
    title,
    children,
    onPositive,
    onClose,
    ...rest
}) {
    const classes = useStyles()

    return (
        <Dialog
            TransitionComponent={Transition}
            onClose={onClose}
            {...rest}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions 
                className={classes.bottom}
            >
                <Button variant="contained" color="primary" onClick={onPositive} >
                    Ok
                </Button>
                <Button variant="contained" color="default" onClick={onClose} >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
