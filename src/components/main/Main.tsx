import { Printer } from '../Printer';
import { useEffect, useState } from 'react';
import { ResponsePrinterType } from '../Printer/types';
import { List, ListItemButton } from '@mui/material';

export function Main() {
  const [notes, setNotes] = useState<ResponsePrinterType[]>([]);

  const loadNotes = async () => {
    try {
      const res = await fetch('/.netlify/functions/notes');
      const notes = await res.json();
      setNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const [isShowNotes, setIsShowNotes] = useState(true);
  const [currentNote, setCurrentNote] = useState<ResponsePrinterType | undefined>(undefined);

  const editNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    note && setCurrentNote(note);
    setIsShowNotes(false);
  };
  const createNewNote = () => {
    setCurrentNote(undefined);
    setIsShowNotes(false);
  };

  return (<div>
      {isShowNotes && <List>
          <ListItemButton onClick={createNewNote}>Новая запись</ListItemButton>
        {notes.map(note => (<ListItemButton key={note.id} onClick={() => editNote(note.id)}>
          {note.fields.MFDModel}
        </ListItemButton>))}
      </List>}
      {!isShowNotes && <Printer note={currentNote} />}
    </div>);
}
