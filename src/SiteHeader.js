import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
	return (
		<div className="site-header">
			<Link to="/"><h1><img className="logo" src={require('./images/logo-50x50.png')} alt="" aria-hidden="true"/>&nbsp;MyReads</h1></Link>
		</div>
	)
}

export default Header
