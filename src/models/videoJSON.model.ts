import { NoteModel } from "./note.model";
import { OverviewModel } from "./overview.model";
export interface VideoJsonModel {
  overview: OverviewModel;
  notes: NoteModel[];
  mustWatch?: boolean;
  lastWatched?: number;
  watched?: boolean;
  like?: boolean;
}
