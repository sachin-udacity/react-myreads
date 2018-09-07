import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import SearchBook from './SearchBook.js'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      moveToShelf: 'move',
      selections: {},
      disabled: 'disabled'
    }
  }

  componentDidMount() {
    this.updateBooks();
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      this.updateBooks();
    }).catch(function(err) {
      console.log(err);
    }) 
  }

  onBookSelection = (e) => {
    // don't do anything if <select> is clicked
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'SPAN') {
      return;
    }

    // find the parent of type List Item and return if not found
    let parent = e.target.parentElement;        
    while(parent.tagName !== 'LI') {
        parent = parent.parentElement;
        if (parent === null) {
            return;
        }
    }

    // store selections
    const bookId = parent.id;
    let selections = this.state.selections;
    if (!selections[bookId]) {        
        selections[bookId] = this.state.books.find((book) => book.id === bookId);    
    } else {
        delete selections[bookId];
    }

    // enable/disable the mult-selection button
    let disabled = 'disabled';
    if (Object.keys(selections).length > 0) {
      disabled = '';
    }

    // update the selections and enable/disable state
    this.setState({
      selections: selections,
      disabled: disabled
    })
  }

  handleMultipleShelfChange = (e) => {
    const shelf = e.target.value;
    const selectedBooks = Object.values(this.state.selections);
    if (shelf && selectedBooks && selectedBooks.length > 0) {
      // remove books which don't need updates
      const booksToUpdateShelf = selectedBooks.filter(selectedBook => selectedBook.shelf !== shelf);
      let numOfBooksUpdated = 0;
      booksToUpdateShelf.forEach(selectedBook => {
          BooksAPI.update(selectedBook, shelf).then((result) => {
          // render on last update only
          numOfBooksUpdated++;
          if (numOfBooksUpdated === booksToUpdateShelf.length) {
            this.updateBooks();
          }
        }).catch(function(err) {
          console.log(err);
        })
      })
    }
  }

  changeBookRating = (book, rating) => {
    console.log(`New rating for ${book.title} is ${rating}`);    
    /* TODO: Implement updateBookRating api on server to serialize ratings. 
    BooksAPI.updateBookRating(book, rating).then((result) => {
      this.updateBooks();
    }).catch(function(err) {
      console.log(err);
    })
    */
  }

  updateBooks = () => {
    BooksAPI.getAll().then((booksColl) => {
      this.setState({
        books: booksColl,
        moveToShelf: 'move',
        selections: {},
        disabled: 'disabled'
      })
    }).catch(function(err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render = {() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books= { 
                  this.state.books.filter((book) => book.shelf === "currentlyReading") 
                }
                multiSelectionSupport={true}
                selections= {this.state.selections}
                onBookSelected= {this.onBookSelection}
                onChangeShelf= {this.changeBookShelf}
                canRate= {true}
                onRatingChanged= {this.changeBookRating} />
                <BookShelf title="Want To Read" books= { 
                  this.state.books.filter((book) => book.shelf === "wantToRead")
                }
                multiSelectionSupport={true}
                selections= {this.state.selections}
                onBookSelected= {this.onBookSelection}                                
                onChangeShelf= {this.changeBookShelf}
                canRate= {true}
                onRatingChanged= {this.changeBookRating} />
                <BookShelf title="Read" books= { 
                  this.state.books.filter((book) => book.shelf === "read") 
                }
                multiSelectionSupport={true}
                selections= {this.state.selections}
                onBookSelected= {this.onBookSelection}                
                onChangeShelf= {this.changeBookShelf}
                canRate= {true}
                onRatingChanged= {this.changeBookRating} />
              </div>
            </div>
            <div className="open-search" title='Click to search and add books'>
              <Link to="/search">Add a book</Link>
            </div>
            <div className={"book-shelf-changer multiple " + this.state.disabled}>
              <select id="moveMultipleSelected" value={this.state.moveToShelf} onChange={this.handleMultipleShelfChange} disabled={this.state.disabled}
                  title='Move multiple selected'>
                <option value="move" disabled>Move Selection to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        } />

        <Route exact path="/search" render = {() => 
            <SearchBook myBooks = {this.state.books}
                        selections= {this.state.selections}
                        multiSelectionSupport= {false}
                        onBookSelected= {this.onBookSelection}                        
                        onChangeShelf= {this.changeBookShelf}
                        canRate= {false} />} 
        />
        
      </div>
    )
  }
}

export default BooksApp
