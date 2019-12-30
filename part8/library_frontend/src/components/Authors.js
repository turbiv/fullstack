import React, { useState } from 'react'
import {gql} from "apollo-boost";
import {useQuery, useMutation} from "@apollo/react-hooks"

const ALLAUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`;

const EDITAUTHOR = gql`  
mutation editAuthor($name: String!, $setBornTo: Int!){
 editAuthor(name: $name, setBornTo: $setBornTo){
   name
   born
   bookCount
   id
 }
}
`;


const Authors = (props) => {
  const {loading, data} = useQuery(ALLAUTHORS);

  //WHY DOESNT CACHE WORK
  const [editAuthor] = useMutation(EDITAUTHOR);
  const [newAuthor, setNewAuthor] = useState("");
  const [newYear, setNewYear] = useState("");

  if (!props.show) {
    return null
  }

  if(loading){
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  const handleEditAuthor = (e) =>{
    e.preventDefault();

    editAuthor({variables: {name: newAuthor, setBornTo: Number(newYear)}});
    setNewYear("");
    setNewAuthor("");
  };


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={handleEditAuthor}>
        <div>
          <select value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}>
            {data.allAuthors.map(author =>
              <option>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          Born: <input value={newYear} onChange={({ target }) => setNewYear(target.value)}/>
        </div>
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  )
};

export default Authors