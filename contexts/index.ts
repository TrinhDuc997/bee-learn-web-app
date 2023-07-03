import { IDashBoardVocabularyContext } from "pages/dashboard/learning/vocabulary";
import { INoteBooksContext } from "pages/learning/vocabulary/note-book";
import React from "react";

export const DashBoardVocabulryContext =
  React.createContext<IDashBoardVocabularyContext>({});

export const NoteBookContext = React.createContext<INoteBooksContext>({});
