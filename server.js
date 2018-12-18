
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
//INSERT-REGISTER COMPLAINT

app.post('/tsInsertDummySample',urlencodedParser,function(req,res,next){

  console.log("testhhgjhgjhg");

  console.log("test req : "+JSON.stringify(req.body));
  var data=JSON.stringify(req.body);

  dataKey=JSON.parse(data);
  console.log(dataKey["module_type"]);

  pool.connect(function(err,client,done){


    var mid=dataKey["module_type"];
    var pid="p1";//dataKey["personalId"];
    var comid=dataKey["complaint_type"];
    var comp_des=dataKey["description"];
    
    var err_path=dataKey["error_path"];
    var img="img1";
    var ad_stat="Unread";
    var stf_stat="Opened";
    var lvl="0";
    var rmks="By sir";

    var currentdate = new Date();
    //comp_date=currentdate.getDate()+'-'+(currentdate.getMonth())+'-'+(currentdate.getFullYear());
    comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth())+'-'+currentdate.getDate();
    console.log("date : "+comp_date);

// //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////
cid;
client.query('SELECT * from compl_id()',function(err,result){
  if (err) {
                console.log(err);
                return;
            } else {
              //console.log("select compid : "+JSON.stringify(result.rows[0]["compl_id"]));
              cid="comp";
              cid+=JSON.stringify(result.rows[0]["compl_id"]);
              console.log("cid : "+cid);
              return cid;
                //console.log('row inserted with id: ' + result.rows[0].id);
            }
})

// //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////


  mid1;
    client.query('select "moduleId" from public."ssSoftwareModules" where "moduleType"=$1',[mid],function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  console.log("select mid : "+JSON.stringify(result.rows[0]["moduleId"]));
                  mid1=JSON.stringify(result.rows[0]["moduleId"]);
                  mid1 = mid1.replace(/^"(.*)"$/, '$1');
                  return mid1;
                }
    })

    client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  console.log("select compid : "+JSON.stringify(result.rows[0]["complaintTypeId"]));
                  comid1=JSON.stringify(result.rows[0]["complaintTypeId"]);
                  comid1 = comid1.replace(/^"(.*)"$/, '$1');
                  return comid1;
                }
    })

    client.query('select current_date',function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  console.log("select date : "+JSON.stringify(result.rows[0]));


                  val.push(cid,mid1,pid,comid1,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);

                  return val;
                }
    })


    client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
      if (err) {
              console.log(err);
        return;
        } else {
                    console.log("success");
                    val=[];

                }
    })

  })//pool.connect
})








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
