import React from 'react'
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
				<ProductCategory />
			</Main>
		);
	}
}

export default App;
