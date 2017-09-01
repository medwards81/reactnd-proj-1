import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './SiteHeader'
import Bookcase from './Bookcase'
import Search from './Search'
import PageNotFound from './PageNotFound'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
		books: [],
  }

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			this.setState({ books })
		})
	}

  render() {
		const { books } = this.state;

    return (
      <div className="app">
				<Header />
				<div className="main">
          <Switch>
            <Route exact path='/' render={() => (
              <Bookcase books={books}	/>
            )}/>
            <Route path="/search" render={() => (
              <Search books={books} />
            )}/>
            <Route component={PageNotFound} />
          </Switch>
				</div>
      </div>
    )
  }
}

export default BooksApp
