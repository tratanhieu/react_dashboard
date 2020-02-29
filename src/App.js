import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import './App.css'
// import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

import ProductCategory from './components/pages/ProductCategory'
import Main from './components/templates/layouts/Main';
import User from './components/pages/User';
import ProductBrand from './components/pages/ProductBrand';
import Provider from './components/pages/Provider';
import UserGroup from './components/pages/UserGroup';
import ProductTypeGroup from './components/pages/ProductTypeGroup';
import ProductType from './components/pages/ProductType';
import Product from './components/pages/Product';
import Promotion from './components/pages/Promotion';
import Post from './components/pages/Post';
import PostType from './components/pages/PostType';
import Setting from './components/pages/Setting';
import UserProfile from './components/organisms/Setting/UserProfile';
import ChangePassword from './components/organisms/Setting/ChangePassword';
import { Login } from './components/organisms/Login';
import AuthRoute, { isAuthenticated } from './routes/AuthRoute';

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
				<Main>
					<Product />
				</Main>
			</AuthRoute>
			<AuthRoute path="/product/category">
				<Main>
					<ProductCategory />
				</Main>
			</AuthRoute>
			<AuthRoute path="/product/type_group">
				<Main>
					<ProductTypeGroup />
				</Main>
			</AuthRoute>
			<AuthRoute path="/product/type">
				<Main>
					<ProductType />
				</Main>
			</AuthRoute>
			<AuthRoute path="/product/brand">
				<Main>
					<ProductBrand />
				</Main>
			</AuthRoute>
			<AuthRoute path="/product/provider">
				<Main>
					<Provider />
				</Main>
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
			<AuthRoute path="/promotion">
				<Main>
				<Promotion />
				</Main>
			</AuthRoute>
			<AuthRoute exact path="/post">
				<Main>
					<Post />
				</Main>
			</AuthRoute>
			<AuthRoute path="/post/type">
				<Main>
					<PostType />
				</Main>
			</AuthRoute>
			<AuthRoute exact path="/setting">
				<Redirect to="/setting/profile" />
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
				<Main>
					<h2>Main</h2>
				</Main>
			</AuthRoute>
		</Switch>
	)
}

function mapStateToProps(state) {
	const { rootReducer: { userAuth } } = state
	return { userAuth }
}

export default connect(mapStateToProps)(App);
