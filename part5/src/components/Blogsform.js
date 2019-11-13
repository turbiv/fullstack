import React from 'react'

const BlogForm = (props) =>{
  return(
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          Title: <input value={props.title} type={"text"} onChange={props.handleTitleChange}/>
        </div>
        <div>
          Author: <input value={props.author} type={"text"} onChange={props.handleAuthorChange}/>
        </div>
        <div>
          Url: <input value={props.url} type={"text"} onChange={props.handleUrlChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default BlogForm