import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const modalStyle = {
  content : {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		width: '80%',
		maxWidth: '800px'
  }
};

class Book extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		showCurrentShelf: PropTypes.bool
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
		this.setState( {modalIsOpen: true} );
	}

	closeModal() {
    this.setState( {modalIsOpen: false} );
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
			<div onClick={event => event.stopPropagation()} className="book-shelf-changer">
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
				<div onClick={this.openModal} className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbURL }}></div>
						{this.buildSelectList(currentShelf)}
					</div>
					{showCurrentShelf && bookData.shelf !== 'none' && (<div className="book-current-shelf">{this.mapShelfName(bookData.shelf)}!</div>)}
					<div className="book-title">{bookData.title}</div>
					<div className="book-authors">{bookData.authors.join(', ')}</div>
				</div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Book Details"
					style={modalStyle}
				>
					<h2 className="book-modal-title">{bookData.title}</h2>
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbURL }}></div>
					<span onClick={this.closeModal} className="book-modal-close" title="close">&times;</span>
					<div className="book-modal-desc">{bookData.description}</div>
				</Modal>
			</li>
		)
	}
}

export default Book
