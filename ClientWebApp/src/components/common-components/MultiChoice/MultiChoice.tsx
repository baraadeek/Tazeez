import { IChoice } from "common/sharedInterfaces/modelsInterfaces";
import * as React from "react";
import { Checkbox, FormControlLabel, FormGroup, Radio } from "@mui/material";
import {
  Dictionary,
} from "common/sharedInterfaces/GenericInterfaces";

export interface IMultiChoiceProps {
  choices?: IChoice[];
  className?: string;
  singleAnswer: boolean;
  onChange: (checked: boolean, choiceId: string) => void;
  selectedChoices?: Dictionary<boolean>;
}

export default function MultiChoice(props: IMultiChoiceProps) {
  const { choices, singleAnswer, className, selectedChoices, onChange } = props;

  const Control = singleAnswer ? Radio : Checkbox;
  return (
    <FormGroup>
      {choices?.map((c) => (
        <FormControlLabel
          key={c.id}
          control={
            <Control
              onChange={(_, checked) => onChange(checked, c.id.toString())}
              checked={selectedChoices?.[c.id.toString()] || false}
            />
          }
          label={c.choice}
          className={className}
        />
      ))}
    </FormGroup>
  );
}
