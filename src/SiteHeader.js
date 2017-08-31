import React from 'react'

const Header = (props) => {
	return (
		<div className="site-header">
			<h1><img className="logo" src={require('./images/logo-50x50.png')} alt="" aria-hidden="true"/>&nbsp;MyReads</h1>
		</div>
	)
}

export default Header
