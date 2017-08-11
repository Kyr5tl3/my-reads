import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    query: "",
    queriedBooks: []
  };

  queryBooks = query => {
    let queriedBooks = [];

    if (query) {
      let queryResults = [];

      BooksAPI.search(query).then(results => {
        if (results && results.length) {
          queryResults = results;

          this.setState({
            queriedBooks: queryResults
          });
        } else {
          this.setState({
            queriedBooks: []
          });
        }
      });
    } else {
      this.setState({
        queriedBooks: []
      });
    }
    this.setState({
      query: query.trim()
    });
  };

  render() {
    const { books } = this.props;
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            &gt;
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                                    
                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                                  */}
            <input
              onChange={event => this.queryBooks(event.target.value)}
              placeholder="Search by title or author"
              type="text"
            />

          </div>
        </div>
        <div className="search-books-results">
          {this.state.queriedBooks.length > 0 &&
            <Book
              filteredBooks={this.state.queriedBooks}
              changeShelf={this.props.changeShelf}
            />}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
