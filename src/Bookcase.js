import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import sortBy from 'sort-by'

class Bookcase extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		handleShelfAssignment: PropTypes.func
	}

	render() {
		const { books } = this.props

		if (! books.length) {
			return (<h2>Loading bookshelves...</h2>)
		}

		const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
		const wantToRead = books.filter(book => book.shelf === 'wantToRead')
		const read = books.filter(book => book.shelf === 'read')

		currentlyReading.sort(sortBy('title'))
		wantToRead.sort(sortBy('title'))
		read.sort(sortBy('title'))

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
						<Shelf handleShelfAssignment={this.props.handleShelfAssignment} books={currentlyReading} category="Currently Reading" />
						<Shelf handleShelfAssignment={this.props.handleShelfAssignment} books={wantToRead} category="Want to Read" />
						<Shelf handleShelfAssignment={this.props.handleShelfAssignment} books={read} category="Read" />
					</div>
				</div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
	}
}

export default Bookcase
