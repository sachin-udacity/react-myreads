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
      books: []
    }
  }

  componentDidMount() {
    this.updateBooks();
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((result) => {
      this.updateBooks();
    }).catch(function(err) {
    }) 
  }

  updateBooks = () => {
    BooksAPI.getAll().then((booksColl) => {
      this.setState({
        books: booksColl
      })
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
                } onChangeShelf= {this.changeBookShelf} />
                <BookShelf title="Want To Read" books= { 
                  this.state.books.filter((book) => book.shelf === "wantToRead")
                } onChangeShelf= {this.changeBookShelf} />
                <BookShelf title="Read" books= { 
                  this.state.books.filter((book) => book.shelf === "read") 
                } onChangeShelf= {this.changeBookShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />

        <Route exact path="/search" render = {() => <SearchBook onChangeShelf= {this.changeBookShelf} />} />
        
      </div>
    )
  }
}

export default BooksApp
