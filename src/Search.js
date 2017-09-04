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
		handleShelfAssignment: PropTypes.func
	}

	state = {
		books: [],
		query: ''
	}

	constructor(props) {
    super(props)

    this.handleShelfAssignment = this.handleShelfAssignment.bind(this)
  }

	componentDidMount() {
		if (this.state.query) {
			const maxResults = 50
			BooksAPI.search(this.state.query, maxResults).then(books => {
				this.setState({ books })
			})
		}
		else {
			BooksAPI.getAll().then(books => {
				this.setState({ books })
			})
		}
	}

	updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
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
				this.props.handleSearchUpate(books)
			})
		}
	}

  render() {

		const { books, query } = this.state

		let showingBooks = books
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter(book => match.test(book.title) || match.test(book.authors.join(',')))
    }

		showingBooks.sort(sortBy('title'))

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
					{showingBooks.length !== books.length && (
	          <div className='showing-books'>
	            <span>Now showing {showingBooks.length} of {books.length} total</span>
	            <button onClick={this.clearQuery}>Show all</button>
	          </div>
	        )}
          <ol className="books-grid">
						<Shelf handleShelfAssignment={this.handleShelfAssignment} books={showingBooks} showCurrentShelfForBook={true} />
					</ol>
        </div>
      </div>
    )
  }
}

export default Search
