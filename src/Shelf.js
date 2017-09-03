import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		category: PropTypes.string,
		showCurrentShelfForBook: PropTypes.bool,
		handleShelfAssignment: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.shelfIsEmtpy = false;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.books.length === 0) this.shelfIsEmtpy = true
		else this.shelfIsEmtpy = false
	}

	render() {
		let { showCurrentShelfForBook } = this.props
		if (showCurrentShelfForBook === undefined) showCurrentShelfForBook = false

		return (
			<div className="bookshelf">
				{this.props.category && (<h2 className="bookshelf-title">{this.props.category}</h2>)}
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.shelfIsEmtpy
							? <li className="book-shelf-empty">Bookshelf is empty.</li>
							: this.props.books.map(book => <Book key={book.id} handleShelfAssignment={this.props.handleShelfAssignment} data={book} showCurrentShelf={showCurrentShelfForBook} />)
						}
					</ol>
				</div>
			</div>
		)
	}
}

export default Shelf
