import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './SiteHeader'
import Bookcase from './Bookcase'
import Search from './Search'
import PageNotFound from './PageNotFound'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import _ from 'lodash'

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.handleShelfAssignment = this.handleShelfAssignment.bind(this)
    this.handleSearchUpate = this.handleSearchUpate.bind(this)
  }

  state = {
		books: [],
  }

  refreshBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

	componentDidMount() {
    this.refreshBooks()
	}

  // Take the event object passed up from Book component and update book state
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
  		})
    }
  }

  // Retrieve updated books list after updating a search-results book
  handleSearchUpate() {
    this.refreshBooks()
  }

  render() {
		const { books } = this.state
    const booksMap = _.mapKeys(books, 'id');

    return (
      <div className="app">
				<Header />
				<div className="main">
          <Switch>
            <Route exact path='/' render={() => (
              <Bookcase handleShelfAssignment={this.handleShelfAssignment} books={books}	/>
            )}/>
            <Route path="/search" render={() => (
              <Search currentBooks={booksMap} handleSearchUpate={this.handleSearchUpate} />
            )}/>
            <Route component={PageNotFound} />
          </Switch>
				</div>
      </div>
    )
  }
}

export default BooksApp
