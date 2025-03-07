import React, { useState } from "react";
import './suggestioninput.css'

export default function BookInput({ bookDetails, setBook }) {
  const [bookName, setBookName] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBookInput = (e) => {
    const inputValue = e.target.value;
    setBookName(inputValue);

    if (!inputValue) {
      setFilteredBooks([]);
      setShowSuggestions(false);
      return;
    }

    const matches = bookDetails.filter(
      (book) =>
        book.bookname &&
        book.bookname.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredBooks(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSelectBook = (book) => {
    setBookName(book.bookname);
    setBook(book)
    setShowSuggestions(false);
  };

  return (
    <>
      <input
        type="text"
        value={bookName}
        onChange={handleBookInput}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search book"
      />
      {showSuggestions && (
        <ul className="suggestions">
          {filteredBooks.map((book) => (
            <li key={book._id} onMouseDown={() => handleSelectBook(book)}>
              {book.bookname}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
