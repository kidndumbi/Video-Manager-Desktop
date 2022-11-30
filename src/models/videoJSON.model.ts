import { NoteModel } from "./note.model";
export interface VideoJsonModel {
  overview: {
    createdAt?: number;
    updatedDat?: number;
    body?: string;
  };
  notes: NoteModel[];
}
