import React from 'react';
import queryString from "query-string";

const About = ({match, location}) => {
  const query = queryString.parse(location.search);
  console.log(query);
  
  const detail = query.detail === 'true';

  return (
    <div>
      <h2>About</h2>
      {match.params.name} 의 소개
      {detail && 'deatail: blabla'}
    </div>
  );
};

export default About;