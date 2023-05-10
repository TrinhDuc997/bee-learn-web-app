import { IWord } from "@interfaces";
import { Box, TextField } from "@mui/material";
import { px } from "framer-motion";
import * as React from "react";

export interface ISpellWordProps {
  data: IWord;
}

export default function SpellWord(props: ISpellWordProps) {
  const { word = "" } = props.data || {};
  const numberLetter = word.length;
  const [value, setValue] = React.useState<string>("_".repeat(numberLetter));
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    setValue("_".repeat(numberLetter));
  }, [word, numberLetter]);
  const handleInputChange = (event: any) => {
    const inputValue = event.nativeEvent.data;
    const index = event.target.selectionStart;
    const newValue = value.split("");
    if (inputValue && inputValue.trim() !== "") {
      const limitIndex =
        event.target.selectionStart >= numberLetter
          ? numberLetter
          : event.target.selectionStart;
      newValue[limitIndex - 1] = inputValue.toUpperCase();
      setValue(newValue.join(""));

      // Đặt con trỏ vào vị trí kế tiếp của ký tự vừa nhập vào
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = index;
          inputRef.current.selectionEnd = index;
        }
      }, 0);
    } else {
      // Xóa ký tự trước đó nếu có
      newValue[index] = "_";
      setValue(newValue.join(""));

      // Đặt con trỏ vào vị trí trước ký tự bị xóa
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = index;
          inputRef.current.selectionEnd = index;
        }
      }, 0);
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      inputProps={{ style: { letterSpacing: "1em", textAlignLast: "center" } }}
      sx={{ width: word.length * 2 + "em" }}
      value={value}
      inputRef={inputRef}
      autoComplete="off"
      onChange={handleInputChange}
    />
  );
}
