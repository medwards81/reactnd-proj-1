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

    let prevBooks = [ ...this.state.books ]

    const updatedBooks = this.state.books.filter(book => book.id === bookId)
    if (updatedBooks.length) {
      let updatedBook = updatedBooks[0]
      updatedBook.shelf = shelf

      const updatedBookRemoved = _.remove(prevBooks, function(book) {
        return book.id !== bookId
      })
      updatedBookRemoved.push(updatedBook)
      this.setState({ books: updatedBookRemoved })
    }
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
              <Search handleShelfAssignment={this.handleShelfAssignment} books={books} />
            )}/>
            <Route component={PageNotFound} />
          </Switch>
				</div>
      </div>
    )
  }
}

export default BooksApp
