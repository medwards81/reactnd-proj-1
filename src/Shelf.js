import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		category: PropTypes.string,
		showCurrentShelfForBook: PropTypes.bool
	}

	render() {

		let { showCurrentShelfForBook } = this.props
		if (showCurrentShelfForBook === undefined) showCurrentShelfForBook = false

		return (
			<div className="bookshelf">
				{this.props.category && (<h2 className="bookshelf-title">{this.props.category}</h2>)}
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map(book => <Book key={book.id} data={book} showCurrentShelf={showCurrentShelfForBook} />)}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf
