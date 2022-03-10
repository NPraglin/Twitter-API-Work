const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet('1o2tY664ccOSfBVG5IAgvcwbcCbBQaMykt_KY4gpkFbA');

  }
  async load() {
    await this.doc.useServiceAccountAuth(require('./credentials.json'));
    await this.doc.loadInfo(); // loads document properties and worksheets
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    await sheet.addRows(rows);
  }
  async getRows() {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    return await sheet.getRows();
  }
}