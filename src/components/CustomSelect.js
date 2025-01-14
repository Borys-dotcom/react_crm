import { useEffect, useState } from "react";

const CustomSelect = (props) => {

  return (
    <select
      name={props.name}
      id={props.id}
      defaultValue={props.defaultSelection}
      disabled = {props.disabled}
      onChange={props.onChange}
      value={props.value}
    >
      {props.selectOptions.map((selectOption, index) => {
        return (
          <option value={selectOption.key} key={index}>
            {selectOption.value}
          </option>
        );
      })}
    </select>
  );
};

export default CustomSelect;
