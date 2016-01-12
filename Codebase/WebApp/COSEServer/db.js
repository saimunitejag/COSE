var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : '128.107.13.232',
   user     : 'ta_user',
   password : 'Y26bw@-Z',
   database : 'tiger_analytics_db',
   port 	: '3306'
 });
 
 connection.connect(function(err){
	 if(!err) {
	     console.log("Database is connected ... \n\n");  
	 } else {
	     console.log("Error connecting database ... \n\n");  
	 }
 });

 module.exports = connection; 