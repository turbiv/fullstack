import anecdotesService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const vote = (anecdotes) => {
  return async dispatch => {
    await anecdotesService.vote(anecdotes);
    dispatch({
      type: "VOTE",
      data: {
        id: anecdotes.id
      }
    })
  }
};

export const create = (anecdote) =>{
  return async dispatch =>{
    const newAnecdote = {
      content: anecdote,
      id: getId(),
      votes: 0
    };
    await anecdotesService.createAnecdote(newAnecdote);
    dispatch({
      type:"CREATE",
      data: newAnecdote
    })
  }
};

export const initialize = () =>{
  return async dispatch =>{
    const content = await anecdotesService.getAll();
    dispatch({
      type: "INIT",
      data: content
    })
  }
};

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch(action.type){
    case "VOTE":
      const anecdoteToChange = state.find(i => i.id === action.data.id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(i => i.id === action.data.id ? changedAnecdote : i);
    case "CREATE":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
  }

  return state
};

export default reducer