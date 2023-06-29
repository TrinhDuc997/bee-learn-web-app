import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { IExampleOfWord } from "@interfaces";

interface DataImporterProps {
  onImport: (importedData: any) => void;
}

const DataImporter: React.FC<DataImporterProps> = ({ onImport }) => {
  const [data, setData] = useState("[]");

  const [rowsInput, setRowsInput] = React.useState(1);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleImportClick = () => {
    try {
      // const convertContent: IExampleOfWord[] = await JSON.parse(jsonData);
      const parsedData: IExampleOfWord[] = JSON.parse(data);
      console.log(
        "🚀 ~ file: DataImportComponent.tsx:27 ~ handleImportClick ~ parsedData:",
        parsedData.length
      );
      onImport(parsedData);
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  };
  React.useEffect(() => {
    if (document) {
      const hightGrid =
        (
          document.querySelector("#gridTextFieldImport>.MuiFormControl-root") ||
          {}
        ).clientHeight || 0;
      const row = hightGrid / 24;
      setRowsInput(row);
    }
  }, []);
  return (
    <Grid
      item
      container
      direction={"column"}
      alignItems={"center"}
      height={"100%"}
    >
      <Grid
        item
        xs={11}
        width={"100%"}
        padding={"1rem"}
        id="gridTextFieldImport"
      >
        <TextField
          label="Data"
          multiline
          //   minRows={10}
          rows={rowsInput}
          size="small"
          sx={{ width: "100%", height: "100%" }}
          value={data}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained" onClick={handleImportClick}>
          Import
        </Button>
      </Grid>
    </Grid>
  );
};

export default DataImporter;
