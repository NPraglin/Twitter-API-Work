const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet('15goTyNsD2Owm_vPRD3nZ9ktnH1ciD81WKXInsuCmhBw');

  }
  async load() {
    await this.doc.useServiceAccountAuth(require('./credentials.json'));
    await this.doc.loadInfo(); 
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; 
    await sheet.addRows(rows);
  }
  async getRows() {
    // read rows
    const sheet = this.doc.sheetsByIndex[0];
    return await sheet.getRows();
  }
    
}