import React from 'react';

const CheckboxList = (props) => {
  let key = props.index;

  return (
    <ul className="field-list field-list--checkbox">
      {props.items.map(item => {
        key++;
        let checked = (props.checkedItems.indexOf(item) >= 0) ? true : false;
        return (
          <li key={key}>
            <input
              checked={checked}
              onChange={props.onChange}
              type="checkbox"
              name={props.name}
              value={item}
            />
            <span className="input-label input-label__checkbox">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
export default CheckboxList;
