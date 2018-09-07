import React, { Component } from 'react';

class Book extends Component {
    state = {
        selectedShelf: this.props.book.shelf,
        rating: parseInt(this.props.book.ratingsCount, 10) || 0 // temp storing rating into ratingsCount
    }

    handleShelfChange = (event) => {
        const book = this.props.book;   
        const shelf = event.target.value;
        this.setState({
            selectedShelf: shelf
        })
        this.props.onChangeShelf(book, shelf)
    }
    
    onRatingChanged = (book, rating) => {
        this.setState({
            rating: rating
        })
        if (this.props.onRatingChanged) {
            this.props.onRatingChanged(book, rating);
        }
    }

    render() {
        const book = this.props.book;
        const starRating = (this.state.rating > 5 ? 5 : this.state.rating); // temp fix
        return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{    width: 128, 
                                                    height: 193, 
                                                    backgroundImage: book.imageLinks && book.imageLinks.thumbnail ? 
                                                        `url("${book.imageLinks.thumbnail}")` :
                                                        "url('./images/no-image-available.png')" }}>
            </div>
            <div className="book-shelf-changer">
                <select defaultValue={this.state.selectedShelf || 'none'} onChange={this.handleShelfChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            <ol className="book-authors">
                {
                    book.authors !== undefined ?
                    book.authors.map(author => (
                        <li key={author.split(' ').join('')}>{author}</li>
                    )) : 
                    <div className="">{book.authors}</div>
                }
            </ol>
            <ol className="book-rating">
                {
                    <div className="book-star-rating">
                        <span className={starRating >= 1 ? "book-star" : "book-star-empty"} onClick={() => this.onRatingChanged(book, 1)}></span>
                        <span className={starRating >= 2 ? "book-star" : "book-star-empty"} onClick={() => this.onRatingChanged(book, 2)}></span>
                        <span className={starRating >= 3 ? "book-star" : "book-star-empty"} onClick={() => this.onRatingChanged(book, 3)}></span>
                        <span className={starRating >= 4 ? "book-star" : "book-star-empty"} onClick={() => this.onRatingChanged(book, 4)}></span>
                        <span className={starRating >= 5 ? "book-star" : "book-star-empty"} onClick={() => this.onRatingChanged(book, 5)}></span>
                    </div>
                }
            </ol>
        </div>);
    }
}

export default Book;
