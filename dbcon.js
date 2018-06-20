var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_wongcal',
  password        : '0229',
  database        : 'cs340_wongcal'
});
module.exports.pool = pool;
