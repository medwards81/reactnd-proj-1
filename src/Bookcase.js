import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class Bookcase extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { books } = this.props
		const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
		const wantToRead = books.filter(book => book.shelf === 'wantToRead')
		const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
						<Shelf books={currentlyReading} category="Currently Reading" />
						<Shelf books={wantToRead} category="Want to Read" />
						<Shelf books={read} category="Read" />
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
