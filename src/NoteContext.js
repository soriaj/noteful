import React from 'react';

const NotesContext = React.createContext({
   notes: [],
   folders: [],
   addFolder: () => {},
   addNote: () => {},
   deleteNotes: () => {},
});

export default NotesContext;