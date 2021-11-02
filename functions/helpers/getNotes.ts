// @ts-ignore
import { ResponsePrinterType } from '../../src/components/Printer/types';

const { table } = require('./airtable');
// @ts-ignore
const formattedReturn = require('./formattedReturn');

module.exports = async (event: any) => {
  try {
    const notes: ResponsePrinterType[] = await table.select().firstPage();
    const formattedNotes = notes.map((note) => ({
      id: note.id,
      fields: { ...note.fields },
    }));
    return formattedReturn(200, formattedNotes);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {msg: 'Something went wrong'});
  }
};
