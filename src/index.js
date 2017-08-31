import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, browserHistory } from 'react-router';
import App from './App'
import './index.css'

ReactDOM.render(
	<BrowserRouter history={browserHistory}>
		<Route path="/" component={App}>
		</Route>
	</BrowserRouter>
	, document.getElementById('root')
)
