import React from 'react';

const NotesContext = React.createContext({
   notes: [],
   folders: [],
   addFolders: () => {},
   addNotes: () => {},
   deleteNotes: () => {},
});

export default NotesContext;