import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Shelf from './Shelf'

class Search extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

		const { books } = this.props
		const { query } = this.state

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
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
						<Shelf books={showingBooks} showCurrentShelfForBook={true} />
					</ol>
        </div>
      </div>
    )
  }
}

export default Search
