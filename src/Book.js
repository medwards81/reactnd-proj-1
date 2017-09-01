import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		showCurrentShelf: PropTypes.bool
	}

	buildSelectList(currentShelf) {
		const selectOpts = {
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		}

		// remove book's current shelf location from options
		delete selectOpts[currentShelf];

		const opts = Object.keys(selectOpts).map((key, idx) => <option key={idx} value={key}>{selectOpts[key]}</option>)

		return (
			<div className="book-shelf-changer">
				<select>
					<option value="none" disabled>Move to...</option>
					{opts}
					<option value="none">None</option>
				</select>
			</div>
		)
	}

	mapShelfName(shelfCategory) {
		const shelfCategories = {
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		}

		return shelfCategories[shelfCategory] || ''
	}

	render() {
		const bookData = this.props.data
		const currentShelf = bookData.shelf
		const thumbURL = `url("${bookData.imageLinks.thumbnail}")`
		const showCurrentShelf = this.props.showCurrentShelf

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbURL }}></div>
						{this.buildSelectList(currentShelf)}
					</div>
					{showCurrentShelf && bookData.shelf !== 'none' && (<div className="book-current-shelf">{this.mapShelfName(bookData.shelf)}!</div>)}
					<div className="book-title">{bookData.title}</div>
					<div className="book-authors">{bookData.authors.join(', ')}</div>
				</div>
			</li>
		)
	}
}

export default Book
