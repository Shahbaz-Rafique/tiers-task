const mysql=require('mysql');

const connection= mysql.createConnection({
    host:'brlt7tl9rmb6x9twdyad-mysql.services.clever-cloud.com',
    user:'ukpvxefwrhvd4p3l',
    password:'mbYL2Jiv91FomQ2mnU9n',
    database:'brlt7tl9rmb6x9twdyad',
    port:'3306',
})

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database Connected');
})

module.exports={connection};