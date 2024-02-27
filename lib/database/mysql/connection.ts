/**
 * @author A.Sivatharan
 * created on 15.12.2021
 */

 var mysql  = require('mysql');
 const db_config = {
    host: 'db-mysql-reload-do-user-10517478-0.b.db.ondigitalocean.com',
    port: 25060,
    user: 'doadmin',
    password: 'AVNS_NQrBSkNpcG32EecKBAW',
    database: 'reloadApp'
} 

// const db_config = {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'servo'
// } 

 const pool  = mysql.createPool(db_config);

 export default class Mysql{
     public static connct(query:string, data:any, cb:any){
         
          pool.getConnection( (err, connect)=>{ 
              console.log(err);
              
              if(err){ 
                // console.log('2');
                return cb(true, err, data); }

                 connect.query(query, (err, result) =>{
                    //  console.log('3');
                     
                 connect.release();

              console.log(err);

                 if(err){
                    //  console.log('4');
                     
                    return cb(true, err, data);
                }else{
                    // console.log(data[0]);
                    return  cb(false,result, data);
                }
            });
        });
    }
}

