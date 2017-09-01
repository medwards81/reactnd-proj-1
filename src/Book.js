import React, { Component } from 'react'

class Book extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const bookData = this.props.data
		const thumbURL = `url("${bookData.imageLinks.thumbnail}")`

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbURL }}></div>
						<div className="book-shelf-changer">
							<select>
								<option value="none" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{bookData.title}</div>
					<div className="book-authors">{bookData.authors.join(', ')}</div>
				</div>
			</li>
		)
	}
}

export default Book
