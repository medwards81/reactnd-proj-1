import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Rating from 'react-star-rating-lite'

const modalStyle = {
  content : {
    width: '80%',
    height: '80%',
    position: 'absolute',
    left: '50%',
    top: '90px',
    marginLeft: '-40%'
  }
};

class Book extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		showCurrentShelf: PropTypes.bool,
    handleShelfAssignment: PropTypes.func
	}

	constructor() {
		super()
		this.openModal = this.openModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);
	}

	state = {
		modalIsOpen: false
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // Build the available shelf options, based on current shelf location
	buildSelectList(bookId, currentShelf) {
		const selectOpts = {
			currentlyReading: 'Currently Reading',
			wantToRead: 'Want to Read',
			read: 'Read'
		}

		// remove book's current shelf location from options
		delete selectOpts[currentShelf];

		const opts = Object.keys(selectOpts).map((key, idx) => <option key={idx} value={key}>{selectOpts[key]}</option>)

		return (
			<div onClick={event => event.stopPropagation()} className="book-shelf-changer">
				<select id={bookId} onChange={this.props.handleShelfAssignment}>
					<option value="">Move to...</option>
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
				<div onClick={this.openModal} className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbURL }}></div>
						{this.buildSelectList(bookData.id, currentShelf)}
					</div>
					{showCurrentShelf && bookData.shelf !== 'none' && (<div className="book-current-shelf">{this.mapShelfName(bookData.shelf)}!</div>)}
					<div className="book-title">{bookData.title}</div>
					<div className="book-authors">{bookData.authors.join(', ')}</div>
          <div className="book-rating">
            <Rating value={bookData.averageRating} weight="12" readonly />
          </div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Book Details"
					style={modalStyle}
				>
          <span onClick={this.closeModal} className="book-modal-close" title="Close">&times;</span>
					<div className="book-modal-title">{bookData.title}</div>
          {bookData.subtitle && (<div className="book-modal-subtitle">{bookData.subtitle}</div>)}
					<div className="book-modal-cover" style={{ marginTop: '20px', width: 128, height: 193, backgroundImage: thumbURL }}></div>
          <div className="book-modal-authors">{bookData.authors.join(', ')}</div>
          <div className="book-modal-publish-date">{bookData.publishedDate.split('-')[0]}</div>
          <div className="book-modal-rating">
            <Rating value={bookData.averageRating} weight="16" readonly />
          </div>
          <div className="book-modal-desc">{bookData.description}</div>
				</Modal>
			</li>
		)
	}
}

export default Book
