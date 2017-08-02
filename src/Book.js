import React, { Component } from "react";

class Book extends Component {
  render() {
    const { filteredBooks } = this.props;

    return (
      <div>
        {filteredBooks.map(filteredBook => (
          <div key={filteredBook.id}>{filteredBook.title}</div>
        ))}
      </div>
    );
  }
}

export default Book;
