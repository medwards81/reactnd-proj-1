import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class Search extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
						<Shelf books={this.props.books} showCurrentShelfForBook={true} />
					</ol>
        </div>
      </div>
    )
  }
}

export default Search
