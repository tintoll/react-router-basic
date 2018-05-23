import React from 'react';

const About = ({match}) => {
  return (
    <div>
      <h2>About</h2>
      {match.params.name} 의 소개
    </div>
  );
};

export default About;