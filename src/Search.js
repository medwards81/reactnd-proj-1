import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Shelf from './Shelf'
import * as BooksAPI from './utils/BooksAPI'
import _ from 'lodash'

class Search extends Component {
	static propTypes = {
		currentBooks: PropTypes.object,
		handleShelfAssignment: PropTypes.func
	}

	state = {
		query: '',
		books: []
	}

	constructor(props) {
    super(props)

    this.handleShelfAssignment = this.handleShelfAssignment.bind(this)
  }

	updateQuery = (query) => {
		if (query) {
			const maxResults = 20
			BooksAPI.search(query, maxResults).then(books => {
				if (books.error || ! books) {
					books = []
				}
				else {
					const { currentBooks } = this.props
					// check to see if any of the searched books matches the user's
					// current books, and if so, add the shelf property to the searched book
					books.forEach(function (book) {
					  if (currentBooks[book.id]) book.shelf = currentBooks[book.id].shelf
					});
				}
				this.setState({ books, query: query.trim() })
			})
		}
		else {
			this.setState({ query: '', books: [] })
		}
  }

  clearQuery = () => {
    this.setState({ query: '', books: [] })
  }

	handleShelfAssignment(event) {
		const bookId = event.target.id
		const shelf = event.target.value

		let books = [ ...this.state.books ];
		var bookToUpdateIdx = _.findIndex(books, function(book) { return book.id === bookId })
		if (bookToUpdateIdx !== -1) {
			const bookToUpdate = books[bookToUpdateIdx]
			BooksAPI.update(bookToUpdate, shelf).then(resp => {
				bookToUpdate.shelf = shelf
				this.setState({ books })
				this.props.handleSearchUpate()
			})
		}
	}

  render() {
		const { books, query } = this.state
		//const updateQuery = _.debounce((query) => { this.updateQuery(query) }, 300);

		let showingBooks = books;
    if (query && books.length) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter(book => match.test(book.title) || (book.authors ? match.test(book.authors.join(',')) : false))
			showingBooks.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={event => this.updateQuery(event.target.value)}
						/>
          </div>
        </div>
      	<div className="search-books-results">
					{showingBooks.length !== 0 && (
	          <div className='showing-books'>
	            <span className="search-result-msg">{showingBooks.length} matches found.</span>
	            <button onClick={this.clearQuery}>Clear Search</button>
	          </div>
	        )}
          <ol className="books-grid">
						<Shelf
							handleShelfAssignment={this.handleShelfAssignment}
							books={showingBooks}
							showCurrentShelfForBook={true}
							disableShelfEmptyMessage={true}
							bookModalTop={150}
						/>
					</ol>
        </div>
      </div>
    )
  }
}

export default Search
