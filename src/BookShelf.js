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
                <BookList books= { books }
                    multiSelectionSupport= {this.props.multiSelectionSupport}
                    selections= {this.props.selections}
                    onBookSelected= {this.props.onBookSelected} 
                    onChangeShelf= {this.props.onChangeShelf}
                    canRate= {this.props.canRate}
                    onRatingChanged= {this.props.onRatingChanged} />
            </div>
        </div>);
    }
}

export default BookShelf;