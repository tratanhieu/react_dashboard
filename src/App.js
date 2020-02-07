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
import AuthRoute, { isAuthenticated } from './routes/AuthRoute';

const routes = [
	{
		path: '',
		component: <Login />,
	}
]

class App extends React.Component {
	componentDidCatch(error) {
		console.log(error)
	}

	render = () => (
		<Switch>
			<Route path="/login">
				<Login />
			</Route>
			<AuthRoute exact path="/product">
				<Product />
			</AuthRoute>
			<AuthRoute path="/product/category">
				<ProductCategory />
			</AuthRoute>
			<AuthRoute path="/product/type_group">
				<ProductTypeGroup />
			</AuthRoute>
			<AuthRoute path="/product/type">
				<ProductType />
			</AuthRoute>
			<AuthRoute path="/product/brand">
				<ProductBrand />
			</AuthRoute>
			<AuthRoute exact path="/user">
				<Main>
					<User />
				</Main>
			</AuthRoute>
			<AuthRoute path="/user/group">
				<Main>
					<UserGroup />
				</Main>
			</AuthRoute>
			<AuthRoute path="/sale">
				<SaleManagement />
			</AuthRoute>
			<AuthRoute exact path="/post">
				<Post />
			</AuthRoute>
			<AuthRoute path="/post/type">
				<PostType />
			</AuthRoute>
			<AuthRoute exact path="/setting">
				<Setting />
			</AuthRoute>
			<AuthRoute path="/setting/profile">
				<Main>
					<Setting>
						<UserProfile />
					</Setting>
				</Main>
			</AuthRoute>
			<AuthRoute path="/setting/change-password">
				<Main>
					<Setting>
						<ChangePassword />
					</Setting>
				</Main>
			</AuthRoute>
			<AuthRoute exact path="/">
				<h2>Main</h2>
			</AuthRoute>
		</Switch>
	)
}

function mapStateToProps(state) {
	const { rootReducer: { userAuth } } = state
	return { userAuth }
}

export default connect(mapStateToProps)(App);
