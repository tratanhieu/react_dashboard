import React, { useState, useEffect } from 'react'
// import faker from "faker";
import Pusher from 'pusher-js'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import HorizontalSidebar from '../../../organisms/HorizontalSidebar';
import { reload, resetSystemErrors, openSystemPopup } from '../../../../redux/reducers/rootReducer';
import { ReportProblemOutlined, Close } from '@material-ui/icons';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// const trigger = (
//     <span>
//         <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
//     </span>
// )

const Render = ({ navOpen, setNavOpen, children, systemPopup = {}, systemErrors, onCloseSystemErrors, onSystemPopupClose, ...rest}) => {
    const statusNav = navOpen ? "open" : "close";
    return(
        <>
            <div className="main-layout">
                <HorizontalSidebar
                    navOpen={navOpen}
                    setNavOpen={setNavOpen}
                    statusNav={statusNav} />
                <div className={`main-layout--body ${statusNav}-nav`}>
                    <div className="main-layout--body---header">
                        <img
                            src="http://localhost:3000/images/logo.png"
                            alt="logo"
                            style={{ height: 36 }}
                        />
                        {/* <DropdownUser /> */}
                    </div>
                    <div className="main-layout--body---content">
                        <div className="main-layout--body---main-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {
                systemErrors.message &&
                <div className="error-system">
                    <span>
                        <ReportProblemOutlined />
                        &nbsp;{systemErrors.message}
                    </span>
                    <Close name="close" className="error-system--close-icon" onClick={onCloseSystemErrors} />
                </div>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key="top,center"
                autoHideDuration={3000}
                open={systemPopup.open}
                TransitionComponent={Slide}
                onClose={onSystemPopupClose}
            >
                <Alert
                    variant="filled"
                    severity={systemPopup.type}
                    onClose={onSystemPopupClose} 
                >{systemPopup.message}</Alert>
            </Snackbar>
        </>
    )
}

const Main = ({ children }) => {
    const selector = useSelector(({
        rootReducer: { systemPopup, systemErrors } 
    }) => ({ systemPopup, systemErrors }), shallowEqual)

    const [navOpen, setNavOpen] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const pusher = new Pusher('7853616a98fac75c9b66', {
			cluster: 'ap3',
			encrypted: true
		});
		const channel = pusher.subscribe('spring_reactjs-development');
		channel.bind('RELOAD', pageName => {
			dispatch(reload(pageName))
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        navOpen,
        setNavOpen,
        children,
        ...selector,
        onCloseSystemErrors: () => dispatch(resetSystemErrors()),
        onSystemPopupClose: () => dispatch(openSystemPopup(false))
    }

    return <Render {...renderProps} />
}

export default Main