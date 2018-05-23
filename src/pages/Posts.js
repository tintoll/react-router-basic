import React from 'react';
import { Link, Route } from "react-router-dom";
import { Post } from "pages";

const Posts = ({match, location}) => {
  return <div>
      <ul>
        <li>
          <Link to={`${match.url}/1`}>Post 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/2`}>Post 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/3`}>Post 3</Link>
        </li>
        <li>
          <Link to={`${match.url}/4`}>Post 4</Link>
        </li>

        <Route exact path={`${match.url}`} render={() => <h3>
              post is not selected
            </h3>} />
        <Route path={`${match.url}/:id`} component={Post} />
      </ul>

      <p>location.pathname : {location.pathname}</p>
      <p>match.path : {match.path}</p>
      <p>match.url : {match.url}</p>
    </div>;
};

export default Posts;