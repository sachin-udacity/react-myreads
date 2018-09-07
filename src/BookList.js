import React, { Component } from 'react';
import Book from './Book.js'

class BookList extends Component {
    // select book for multi-move
    handleBookSelChange = (e) => {
        if (this.props.onBookSelected) {
            this.props.onBookSelected(e);
        }
    }

    render() {
        const books = this.props.books;
        return (
        <ol className="books-grid">
            {
                books.map(book => (
                    <li key={book.id} id={book.id} 
                        className={ (this.props.selections[book.id] ? 'book-select ' : '') + 
                                    (this.props.multiSelectionSupport ? 'multi-select' : '')} 
                        onClick= {this.handleBookSelChange}>
                        <Book book= {book} 
                            onChangeShelf= {this.props.onChangeShelf}
                            canRate= {this.props.canRate}
                            onRatingChanged= {this.props.onRatingChanged} />
                    </li>
                ))
            }
        </ol>);         
    }
}

export default BookList;
