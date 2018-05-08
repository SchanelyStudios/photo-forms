import React from 'react';

const DropdownList = (props) => {
  let key = props.index;

  let other = (props.showOther)
    ? (
      <option key={key}>Other</option>
    ) : '';

  return (
    <select
      name={props.name}
      onChange={(e) => props.onChange(e.target.value)}
      className="field-list field-list--dropdown"
      value={props.selectedItem}
    >
      {props.items.map(item => {
        key++;
        return (
          <option key={key}>{item}</option>
        );
      })}
      {other}
    </select>
  );
}
export default DropdownList;
