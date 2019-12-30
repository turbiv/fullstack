import React, { useState } from 'react'
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks"

//These should be made into a constants file
const ALLAUTHORS = gql`
  {
    allAuthors {
        name
        born
        bookCount
    }
  }
`;

const ALLBOOKS = gql`
  {
    allBooks{
      title
      author
      published
    }
  }
`;

const ADDBOOK = gql`  
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
      addBook(title: $title, published: $published, author: $author, genres: $genres){
          title
          published
          author
          genres
      }
  }
`;

const NewBook = (props) => {

  const [newBook] = useMutation(ADDBOOK, {
    refetchQueries: [{query: ALLAUTHORS}, {query: ALLBOOKS}]
  });

  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault();

    newBook({
      variables: {title, author, published: Number(published), genres}
    });

    /*
    Easier for debugging
    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
     */
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('')
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
};

export default NewBook