import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import './App.css'
// import 'semantic-ui-css/semantic.min.css'
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
import Setting from './components/pages/Setting';
import UserProfile from './components/organisms/Setting/UserProfile';
import ChangePassword from './components/organisms/Setting/ChangePassword';
import { Login } from './components/organisms/Login';

class App extends React.Component {
	componentDidCatch(error) {
		console.log(error)
	}

	render() {
		return !cookie.get("USER_TOKEN") ? <Login /> : (
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
					<Route path="/sale">
						<SaleManagement />
					</Route>
					<Route exact path="/post">
						<Post />
					</Route>
					<Route path="/post/type">
						<PostType />
					</Route>
					<Route exact path="/setting">
						<Setting />
					</Route>
					<Route path="/setting/profile">
						<Setting>
							<UserProfile />
						</Setting>
					</Route>
					<Route path="/setting/change-password">
						<Setting>
							<ChangePassword />
						</Setting>
					</Route>
					<Route exact path="/">
						<h2>Main</h2>
					</Route>
				</Switch>
			</Main>
		);
	}
}

function mapStateToProps(state) {
	const { rootReducer: { userAuth } } = state
	return { userAuth }
}

export default connect(mapStateToProps)(App);
