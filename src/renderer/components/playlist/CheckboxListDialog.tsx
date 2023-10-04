import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import theme from "../../theme";

type CheckboxListDialogProps = {
  checkboxList: CheckboxListModel[];
  title: string;
  open: boolean;
  onClose: () => void;
  onCheckboxClick: (item: CheckboxListModel) => void; // Add this line
};

export type CheckboxListModel = {
  name: string;
  selected: boolean;
  id: string;
};

const CheckboxListDialog: React.FC<CheckboxListDialogProps> = ({
  checkboxList,
  title,
  open,
  onClose,
  onCheckboxClick,
}) => {
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CheckboxListModel
  ) => {
    e.stopPropagation(); // Prevent event from bubbling up
    // Notify parent component
    onCheckboxClick(item);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="checkbox-list-dialog"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle
        style={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          cursor: "move",
        }}
        id="checkbox-list-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          {checkboxList.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Checkbox
                checked={item.selected}
                onChange={(e) => handleCheckboxChange(e, item)}
                color="primary"
              />
              <span>{item.name}</span>
            </div>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckboxListDialog;
