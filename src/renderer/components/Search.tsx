import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type SearchProps = {
  onSearchClick: (value: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ padding: "5px" }}
    >
      <TextField
        variant="outlined"
        label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        size="small"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSearchClick(searchText)}
        sx={{ marginLeft: 1 }}
        size="medium"
      >
        Search
      </Button>
    </Box>
  );
};

export { Search };
