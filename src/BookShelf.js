import React, { Component } from 'react';
import BookList from './BookList.js'

class BookShelf extends Component {
    render() {
        const title = this.props.title;
        const books = this.props.books;        
        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BookList books= { books } onChangeShelf= {this.props.onChangeShelf} />
            </div>
        </div>);
    }
}

export default BookShelf;