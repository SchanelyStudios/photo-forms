import React from 'react';

const DropdownList = (props) => {
  let key = props.index;

  return (
    <select
      name={props.name}
      onChange={props.onChange}
      className="field-list field-list--dropdown"
      value={props.selectedItem}
    >
      {props.items.map(item => {
        key++;
        return (
          <option key={key}>{item}</option>
        );
      })}
    </select>
  );
}
export default DropdownList;
