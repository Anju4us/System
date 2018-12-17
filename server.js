
var express  = require('express');

//var app = express();
var cors = require('cors') ;
 app = express();
  app.use(cors()); 

  const pg  = require('pg');
  const config = {
      user: 'postgres',
      database: 'postgres',
      password: 'root',
      port: 5432
  };
  const pool = new pg.Pool(config);
  var stat="Opened";

  //Complaintlist
  app.get('/openComplaint',function(req,res,next){
    pool.connect(function (err, client, done) {
     client.query('select scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."staffStatus"=$1',[stat], function (err, result) {
                done();
                if (err)
                    res.send(err)
                    console.log("result ghfghfghgfhfgh: "+result);
               console.log("table-----"+result.rows[0]);
               console.log("table-----"+result.rows);
                    res.json(result.rows);
   });
 
   })
 });
//Module List
 app.get('/modulelist',function(req,res,next){
    pool.connect(function (err, client, done) {
     client.query('SELECT "moduleId", "moduleType" FROM public."ssSoftwareModules"', function (err, result) {
                done();
                if (err)
                    res.send(err)
                    console.log(result);
               console.log(result.rows);
                    res.json(result.rows);
   });
 
   })
 });
 
 
 //Complaint lists
 
 app.get('/complaintlist',function(req,res,next){
    pool.connect(function (err, client, done) {
     client.query('SELECT "complaintTypeId", "complaintType" FROM public."ssSoftwareComplaint"', function (err, result) {
                done();
                if (err)
                    res.send(err)
                    console.log(result);
               console.log(result.rows);
                    res.json(result.rows);
   });
 
   })
 });
 
 //delete_id
 app.delete('/deleteCon:complaintId', function(req, res,next) {
    var id=req.params.complaintId;
      console.log("iddd=="+id);
         pool.connect(function (err, client, done) {
           client.query('delete from public."ssComplaintMaster" where "complaintId"=$1',[id], function (err, result) {
                           done();
                           if (err)
                               res.send(err)
                               console.log(result);
                          console.log(result.rows);
                               res.json(result.rows);
});
});

console.log("deleting..........");

 });

app.listen(3000);
console.log('Listening on port 3000...');