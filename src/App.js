import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

import ProductCategory from './components/pages/ProductCategory'

import Swal from 'sweetalert2'
import Main from './components/templates/layouts/Main';


class App extends React.Component {

	componentDidCatch(error, info) {
		Swal.fire(
			'Có lỗi',
			error.message,
			'error'
		)
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
					<Route path="/">
						<h1>Main</h1>
					</Route>
				</Switch>
			</Main>
		);
	}
}

export default App;
