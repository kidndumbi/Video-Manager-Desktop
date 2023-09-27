import React, { useState, ChangeEvent } from "react";
import { TextField, Button, Box } from "@mui/material";

type SearchProps = {
  onSearchClick: (value: string) => void;
};

const Search = ({ onSearchClick }: SearchProps) => {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchClick(searchText);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ p: 1 }}
    >
      <TextField
        variant="outlined"
        label="Search"
        value={searchText}
        onChange={handleTextChange}
        size="small"
      />
      <Box sx={{ ml: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
          size="medium"
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export { Search };
