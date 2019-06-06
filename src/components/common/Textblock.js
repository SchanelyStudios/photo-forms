import React from 'react';
import ReactMarkdown from 'react-markdown';

const Textblock = (props) => {
  console.log(props);
  return (
    <div className="textblock" data-block-alias={props.alias}>
      <h3 className="textblock__heading">
        {props.heading}
      </h3>
      <ReactMarkdown source={props.children} />
    </div>
  );
}
export default Textblock;
