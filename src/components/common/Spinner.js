import React from 'react';

const Spinner = (props) => {
  return (
    <p className="loading-text">
      <i className="icon icon--spinner" />&nbsp;
      {props.children}
    </p>
  );
}
export default Spinner;
