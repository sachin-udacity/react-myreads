import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookList from './BookList.js'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
    state = { 
      books: []
    }

    handleSearchTextChange = (event) => {
      /*Reset search*/
      this.setState({
        books: []
      })
      const keywordToSearch = event.target.value.trim();
      if (keywordToSearch !== '') { 
        BooksAPI.search(keywordToSearch).then((searchResult) => {
          if (!(searchResult.error && searchResult.error === 'empty query')) {
            this.setState({
              books: searchResult
            })
          } else {
            this.setState({
              books: []
            })
          }
        }).catch(function(err) {
          console.log(err);
        }) 
      }
    }

    render() {
      return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.keywordToSearch} 
                            onChange={this.handleSearchTextChange} placeholder="Search by title or author" />

              </div>
          </div>
          <div className="search-books-results">
            <BookList books= { this.state.books.map(book => {
                                const bookFound = this.props.myBooks.find(myBook => myBook.id === book.id)
                                if (bookFound) {
                                  book.shelf = bookFound.shelf;
                                }
                                return book;
                              })}
                            multiSelectionSupport= {this.props.multiSelectionSupport}
                            selections= {this.props.selections} 
                            onChangeShelf= {this.props.onChangeShelf}
                            canRate={this.props.canRate} />
          </div>
        </div>
      );         
    }
}

export default SearchBook;