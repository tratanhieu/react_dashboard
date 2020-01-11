import React, { useState, useEffect } from 'react'
import faker from "faker";
import Pusher from 'pusher-js'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Icon, Image, Dropdown } from 'semantic-ui-react'
import HorizontalSidebar from '../../../organisms/HorizontalSidebar';
import { reload, resetSystemErrors } from '../../../../redux/reducers/rootReducer';

const trigger = (
    <span>
        <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
    </span>
);

const options = [
    { key: "user", text: "Account", icon: "user" },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "sign-out", text: "Sign Out", icon: "sign out" }
];

const DropdownUser = props => (
    <Dropdown
        trigger={trigger}
        options={options}
        pointing="top left"
        icon={null}
        {...props}
    />
);

const Render = ({ navOpen, setNavOpen, children, systemErrors, onCloseSystemErrors, ...rest}) => {
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
                        <Image
                            src="http://localhost:3000/images/logo.png"
                            alt="logo"
                            style={{ height: 36 }}
                        />
                        <DropdownUser />
                    </div>
                    <div className="main-layout--body---content">
                        <div className="main-layout--body---main-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {
                systemErrors.message ?
                    <div className="error-system">
                        <span>
                            <Icon name="warning sign" />
                            &nbsp;{systemErrors.message}
                        </span>
                        <Icon name="close" className="error-system--close-icon" onClick={onCloseSystemErrors} />
                    </div> : null
            }
        </>
    )
}

const Main = ({ children }) => {
    const selector = useSelector(({
        rootReducer: { systemErrors } 
    }) => ({ systemErrors }), shallowEqual)

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
        onCloseSystemErrors: () => dispatch(resetSystemErrors())
    }

    return <Render {...renderProps} />
}

export default Main