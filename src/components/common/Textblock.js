import React from 'react';

const Textblock = (props) => {
  return (
    <div className="textblock" data-block-alias={props.alias}>
      <h3 className="textblock__heading">
        {props.heading}
      </h3>
      {props.children}
    </div>
  );
}
export default Textblock;
