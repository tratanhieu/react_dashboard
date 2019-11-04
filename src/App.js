import React from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

import ProductCategory from './components/pages/ProductCategory'

import Swal from 'sweetalert2'


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
			<ProductCategory />
		);
	}
}

export default App;
