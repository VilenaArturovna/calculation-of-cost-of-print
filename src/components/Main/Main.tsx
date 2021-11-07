import { Printer } from '../Printer';
import { useEffect, useState } from 'react';
import { ResponsePrinterType } from '../Printer/types';
import { IconButton, List, ListItem, ListItemButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import styled from 'styled-components';

export function Main() {
  const [notes, setNotes] = useState<ResponsePrinterType[]>([]);

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

  //запрос данных из БД
  const loadNotes = async () => {
    try {
      const res = await fetch('/.netlify/functions/notes');
      const notes = await res.json();
      setNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };

  //удаление записи из БД
  const deleteNote = async (id: string) => {
    try {
      await fetch('/.netlify/functions/notes', {
        method: 'DELETE', body: JSON.stringify({ id })
      });
      await setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  //возврат к списку записей со страницы расчета
  const returnToListNotes = () => {
    setIsShowNotes(true);
  };

  //загрузка записей при первом рендеринге
  useEffect(() => {
    loadNotes();
  }, []);
  //загрузка записей при возврате со страницы расчета
  useEffect(() => {
    loadNotes();
  }, [isShowNotes]);
  //перерисовка при удалении записей
  useEffect(() => {
  }, [notes]);

  return (<Root>
    {isShowNotes && <List>
        <ListItemButton onClick={createNewNote}>Новая запись</ListItemButton>
      {notes.map(note => (
        <ListItem key={note.id} secondaryAction={<IconButton edge="end" onClick={() => deleteNote(note.id)}>
          <Delete/>
        </IconButton>}>
          <ListItemButton onClick={() => editNote(note.id)}>
            {note.fields.MFDModel}
          </ListItemButton>
        </ListItem>))}
    </List>}
    {!isShowNotes && <Printer note={currentNote} returnToListNotes={returnToListNotes}/>}
  </Root>);
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
