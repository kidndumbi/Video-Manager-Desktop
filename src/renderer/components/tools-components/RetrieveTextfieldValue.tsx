import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { ChangeEvent, useState } from "react";

type RetrieveTextfieldValueProps = {
  value: string;
  onCancel: () => void;
  onSave: (updatedPlaylistName: string) => void;
  label: string;
};

const RetrieveTextfieldValue = ({
  value,
  onCancel,
  onSave,
  label,
}: RetrieveTextfieldValueProps) => {
  const [textValue, setTextValue] = useState(value);
  return (
    <div>
      <Stack direction="row" spacing={1}>
        <TextField
          value={textValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTextValue(e.target.value);
          }}
          label={label}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title="save" placement="bottom-start">
          <IconButton
            aria-label="save"
            color="secondary"
            size="small"
            onClick={() => {
              setTextValue("");
              onSave(textValue);
            }}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="cancel" placement="bottom-start">
          <IconButton
            aria-label="cancel"
            color="secondary"
            size="small"
            onClick={() => {
              setTextValue(value);
              onCancel();
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
};

export { RetrieveTextfieldValue };
