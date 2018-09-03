import React, { Component } from 'react';
import Book from './Book.js'

class BookList extends Component {
    render() {
        const books = this.props.books;

        return (
        <ol className="books-grid">
            {
                books.map(book => (
                    <li key={book.id}><Book book= {book} onChangeShelf= {this.props.onChangeShelf} /></li>
                ))
            }
        </ol>);         
    }
}

export default BookList;