import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import "../css/radioButtons.css";

type Props = {
  classData: string;
  checked?: boolean;
  radioClick: (charClass: string) => void;
};

const CreationRadio = (props: Props) => {
  let checked = props.checked;
  const [isSelected, setIsSelected] = useState(checked);

  const withoutPrice = props.classData.split(" ");
  const charClass = withoutPrice[0].toLowerCase();

  const idStr = charClass + "CreationClass";

  return (
    <Form.Check
      type="radio"
      id={idStr}
      checked={isSelected}
      label={props.classData}
      onChange={() => {
        setIsSelected(true);
        props.radioClick(charClass);
      }}
    />
  );
};

export default CreationRadio;
