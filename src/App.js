import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import Pusher from 'pusher-js'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

import ProductCategory from './components/pages/ProductCategory'

import Swal from 'sweetalert2'
import Main from './components/templates/layouts/Main';
import User from './components/pages/User';
import UserGroup from './components/pages/UserGroup';


class App extends React.Component {

	componentDidCatch(error) {
		console.log(error)
	}

	componentDidMount() {
		const pusher = new Pusher('7853616a98fac75c9b66', {
			cluster: 'ap3',
			encrypted: true
		});
		const channel = pusher.subscribe('spring_reactjs-development');
		channel.bind('UPDATE_DATA', data => {
			console.log(data)
		});
	}

	render() {
		return (
			<Main>
				<Switch>
					<Route path="/product/category">
						<ProductCategory />
					</Route>
					<Route path="/product">
						<h2>OK</h2>
					</Route>
					<Route path="/user">
						<User />
					</Route>
					<Route path="/user/group">
						<UserGroup />
					</Route>
					<Route path="/">
						<h2>Main</h2>
					</Route>
				</Switch>
			</Main>
		);
	}
}

export default App;
