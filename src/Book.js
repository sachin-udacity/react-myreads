import React, { Component } from 'react';

class Book extends Component {
    state = {
        selectedShelf: this.props.book.shelf
    }

    handleShelfChange = (event) => {
        const book = this.props.book;   
        const shelf = event.target.value;
        this.setState({
            selectedShelf: shelf
        })
        this.props.onChangeShelf(book, shelf)
    }
    
    render() {
        const book = this.props.book;
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
        </div>);
    }
}

export default Book;