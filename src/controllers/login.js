const { create } = require('handlebars');
const { json } = require('express');  
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser')
const connection = require('../config/database')
const dotenv = require('dotenv')
const saltRounds = 10;  


const dangnhap= async(req, res) => {
    let username = req.body.email;
   // let password = await hashUserPassword();
    //const password = bcrypt.hashSync(req.body.pass, saltRounds);
    //bcrypt.compareSync(req.body.pass, password); 
    console.log(username)
    console.log(req.body.password);
    //console.log(password);
    connection.query(
        'select matkhau from Users where email = ?', [username],
        function(err, Results) {    
            if(err) {
            console.error('Loi dang nhap', err)
            res.status(500).json({success: false, message: 'Da xay ra loi'})
        }
        
        else {

        if(Results.length>0 && bcrypt.compareSync(req.body.password, Results[0].matkhau)) {
            console.log(Results);
            connection.query('select * from Users where email =?',[username], function(err, ketqua){
                res.status(200).json({success: true, message: 'Dang nhap thanh cong', ketqua})
            })
        }
        else res.status(500).json({success: false, message: 'Sai tai khoan hoac mk'})

    }
}
     );
  }

 

 module.exports = {
    dangnhap
 }