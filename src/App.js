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
import ProductTypeGroup from './components/pages/ProductTypeGroup';
import ProductType from './components/pages/ProductType';
import Product from './components/pages/Product';
import SaleManagement from './components/pages/SaleManagement';
import Post from './components/pages/Post';
import PostType from './components/pages/PostType';
import Guest from './components/pages/Guest';


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
					<Route exact path="/product">
						<Product />
					</Route>
					<Route path="/product/category">
						<ProductCategory />
					</Route>
					<Route path="/product/type_group">
						<ProductTypeGroup />
					</Route>
					<Route path="/product/type">
						<ProductType />
					</Route>
					<Route path="/product/brand">
						<ProductBrand />
					</Route>
					<Route exact path="/user">
						<User />
					</Route>
					<Route path="/user/group">
						<UserGroup />
					</Route>
					<Route path="/promotion">
						<Promotion />
					</Route>
					<Route exact path="/">
						<h2>Main</h2>
					</Route>
				</Switch>
			</Main>
		);
	}
}

export default App;
