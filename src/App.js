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

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({ books })
		})
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
  		})
    }
  }

  handleSearchUpate(books) {
    this.setState({ books })
  }

  render() {
		const { books } = this.state

    return (
      <div className="app">
				<Header />
				<div className="main">
          <Switch>
            <Route exact path='/' render={() => (
              <Bookcase handleShelfAssignment={this.handleShelfAssignment} books={books}	/>
            )}/>
            <Route path="/search" render={() => (
              <Search handleSearchUpate={this.handleSearchUpate} />
            )}/>
            <Route component={PageNotFound} />
          </Switch>
				</div>
      </div>
    )
  }
}

export default BooksApp
