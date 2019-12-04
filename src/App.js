import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

import ProductCategory from './components/pages/ProductCategory'
import Main from './components/templates/layouts/Main';
import User from './components/pages/User';
import ProductBrand from './components/pages/ProductBrand';
import UserGroup from './components/pages/UserGroup';


class App extends React.Component {

	componentDidCatch(error) {
		console.log(error)
	}

	// componentDidMount() {
		
	// }

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
					<Route path="/brand">
						<ProductBrand />
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
