import React, { Children } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/styles';
import Button from '../../atoms/Button';
import { Close, Check } from '@material-ui/icons';

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
    minWidth = "320px", 
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
            <DialogContent style={{ minWidth }}>
                {children}
            </DialogContent>
            <DialogActions 
                className={classes.bottom}
            >
                <Button
                    icon={<Check />}
                    onClick={onPositive}
                    content="Ok"
                />
                <Button
                    icon={<Close />}
                    color="default"
                    onClick={onClose}
                    content="Cancel"
                />
            </DialogActions>
        </Dialog>
    );
}
