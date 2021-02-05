const fs = require("fs");

let read = filename => {
  return fs.readFileSync(filename, {encoding:'utf8'});
};


exports.qtlist= read('./queries/quotationlist.sql');
exports.qotlist=read('./queries/qtlist.sql');
exports.qotprint=read('./queries/quotationprint.sql');