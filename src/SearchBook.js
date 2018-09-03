import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import BookList from './BookList.js'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
    state = { 
      books: []
    }

    handleSearchTextChange = (event) => {
      let searchSucceeded = false;
      const keywordToSearch = event.target.value.trim();
      if (keywordToSearch !== '') { 
        BooksAPI.search(keywordToSearch).then((searchResult) => {
          if (searchResult.error && searchResult.error === 'empty query') {
            searchSucceeded = false;      
          } else {
            searchSucceeded = true;
            this.setState({
              books: searchResult
            })
          }
        }).catch(function(err) {
          searchSucceeded = false;
        }) 
      }

      if (!searchSucceeded) {
        this.setState({
          books: []
        })
      }
    }

    render() {
      return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.keywordToSearch} 
                            onChange={this.handleSearchTextChange} placeholder="Search by title or author" />

              </div>
          </div>
          <div className="search-books-results">
            <BookList books= { this.state.books } onChangeShelf= {this.props.onChangeShelf} />
          </div>
        </div>
      );         
    }
}

export default SearchBook;