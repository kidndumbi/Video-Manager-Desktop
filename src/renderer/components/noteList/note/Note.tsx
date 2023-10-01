import React, { useState } from "react";
import { NoteModel } from "../../../../models/note.model";
import { NoteHeader } from "./NoteHeader";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { NoteContent } from "./NoteContent";

export type NoteProps = {
  note: NoteModel;
  onVideoSeek: (seekTime: number) => void;
  onNoteSave: (note: NoteModel) => void;
  onNoteDelete: (note: NoteModel) => void;
};

const Note = ({ note, onVideoSeek, onNoteSave, onNoteDelete }: NoteProps) => {
  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleClickChip = () => {
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
        onClickChip={handleClickChip}
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
