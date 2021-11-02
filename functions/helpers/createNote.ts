// @ts-ignore
const { table } = require('./airtable');
// @ts-ignore
const formattedReturn = require('./formattedReturn');

module.exports = async (event: any) => {
  const fields = JSON.parse(event.body);
  try {
    const createdNote = await table.create([{ fields }]);
    return formattedReturn(200, createdNote);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
