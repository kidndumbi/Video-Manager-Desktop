// import React, { useState } from "react";
// import { NoteModel } from "../../../models/note.model";
// import Chip from "@mui/material/Chip";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Box from "@mui/material/Box";
// import { secondsTohhmmss } from "../../../util/helperFunctions";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { NoteTextEditor } from "../NoteTextEditor";
// import Moment from "react-moment";
// import { AlertDialog } from "../AlertDialog";
// import { Button, DialogContentText } from "@mui/material";

// type NoteProps = {
//   note: NoteModel;
//   onVideoSeek: (seekTime: number) => void;
//   onNoteSave: (note: NoteModel) => void;
//   onNoteDelete: (note: NoteModel) => void;
// };

// const Note = ({ note, onVideoSeek, onNoteSave, onNoteDelete }: NoteProps) => {
//   const [edit, setEdit] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   const handleClick = () => {
//     console.log("You clicked the Chip.");
//     onVideoSeek(note.videoTimeStamp);
//   };

//   const onEditNote = () => {
//     setEdit(true);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           minHeight: "40.28px",
//         }}
//       >
//         <Box>
//           <Chip
//             label={secondsTohhmmss(note.videoTimeStamp)}
//             icon={<AccessTimeIcon />}
//             color="secondary"
//             variant="filled"
//             onClick={handleClick}
//             size="small"
//           />
//           <small>
//             {note.createdAt ? (
//               <Moment format="dddd Do MMMM YYYY h:mm A">
//                 {note?.createdAt}
//               </Moment>
//             ) : null}
//           </small>
//         </Box>

//         {!edit ? (
//           <Box>
//             <IconButton aria-label="edut" size="medium" onClick={onEditNote}>
//               <EditIcon fontSize="small" />
//             </IconButton>
//             <IconButton
//               aria-label="delete"
//               size="medium"
//               onClick={() => {
//                 setShowDialog(true);
//               }}
//             >
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         ) : null}
//       </Box>

//       {!edit ? (
//         <Box
//           sx={{
//             width: "100%",
//             height: "auto",
//             padding: "20px",
//             backgroundColor: "whitesmoke",
//             marginTop: "5px",
//             marginBottom: "5px",
//             borderRadius: "5px",
//             color: "#6a6f73",
//           }}
//         >
//           <Box dangerouslySetInnerHTML={{ __html: note.content }}></Box>
//         </Box>
//       ) : null}

//       {edit ? (
//         <Box
//           sx={{
//             paddingBottom: "10px",
//             height: "150px",
//             marginBottom: "100px",
//           }}
//         >
//           <NoteTextEditor
//             onSaveNoteClick={(value: string) => {
//               if (value === "") {
//                 return;
//               }
//               onNoteSave({ ...note, content: value });
//               setEdit(false);
//             }}
//             onCancelClick={() => {
//               setEdit(false);
//             }}
//             text={note.content}
//           ></NoteTextEditor>
//         </Box>
//       ) : null}
//       <Box>
//         <AlertDialog
//           onClose={() => setShowDialog(false)}
//           showDialog={showDialog}
//           dialogContent={
//             <DialogContentText id="alert-dialog-description">
//               Are you sure you want to delete?
//             </DialogContentText>
//           }
//           dialogActions={
//             <>
//               <Button
//                 onClick={() => {
//                   setShowDialog(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => {
//                   setShowDialog(false);
//                   onNoteDelete(note);
//                 }}
//                 autoFocus
//               >
//                 Ok
//               </Button>
//             </>
//           }
//         ></AlertDialog>
//       </Box>
//     </>
//   );
// };

// export { Note };
import React, { useState } from "react";
import { NoteModel } from "../../../../models/note.model";
import { NoteHeader } from "./NoteHeader";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { NoteContent } from "./NoteContent";

type NoteProps = {
  note: NoteModel;
  onVideoSeek: (seekTime: number) => void;
  onNoteSave: (note: NoteModel) => void;
  onNoteDelete: (note: NoteModel) => void;
};

const Note = ({ note, onVideoSeek, onNoteSave, onNoteDelete }: NoteProps) => {
  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    onVideoSeek(note.videoTimeStamp);
  };

  const toggleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleNoteDelete = () => {
    handleCloseDialog();
    onNoteDelete(note);
  };

  return (
    <>
      <NoteHeader
        edit={edit}
        note={note}
        onClickChip={handleClick}
        onClickEdit={toggleEdit}
        onClickDelete={() => setShowDialog(true)}
      />
      <NoteContent
        edit={edit}
        note={note}
        onSave={onNoteSave}
        onCancel={toggleEdit}
      />
      <ConfirmationDialog
        open={showDialog}
        onClose={handleCloseDialog}
        onConfirm={handleNoteDelete}
      />
    </>
  );
};

export { Note };
