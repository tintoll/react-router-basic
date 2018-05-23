import React from 'react';

const Post = ({match, location}) => {
  return (
    <div>
      posts id : {match.params.id}

      <p>location.pathname : {location.pathname}</p>
      <p>match.path : {match.path}</p>
      <p>match.url : {match.url}</p>
    </div>
  );
};

export default Post;