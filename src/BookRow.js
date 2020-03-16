import React from "react";

const BookRow = props => {
  const book = props.book;
  const authorName = book.authors.map(author => (
    <p key={author.id}>{author.name}</p>
  ));
  return (
    <tr>
      <td>{book.title}</td>
      <td>{authorName}</td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
};

export default BookRow;
