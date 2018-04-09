import React from 'react';

const RadioList = (props) => {
  let key = props.index;

  return (
    <ul className="field-list field-list--radio">
      {props.items.map(item => {
        let checked = item === props.checkedItem ? true : false;
        key++;
        return (
          <li key={key}>
            <input
              type="radio"
              checked={checked}
              onChange={props.onChange}
              name={props.name}
              value={item}
            />
            <span className="input-label input-label__radio">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
export default RadioList;
