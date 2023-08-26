const { create } = require('handlebars');
const { json } = require('express');  
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser')
const connection = require('../config/database')
const dotenv = require('dotenv')
// const mongoose = require('mongoose')

// dotenv.config()
// mongoose.connect(process.env.moongodb_url, ()=>{
//     console.log('connect to mongoose')
// })

const dangnhap= (req, res) => {
   const {email, password} = req.body
    connection.query(
        'select * from Users where email = ? and matkhau = ?', [email, password],
        function(err, Results) {    
            if(err) {
            console.error('Loi dang nhap', err)
            res.status(500).json({success: false, message: 'Da xay ra loi'})
        }
     else {
        if(Results.length>0) {
            
            connection.query('select Hoten from Users where email = ? and matkhau = ?', [email, password], function(err, ketqua){
                res.status(200).json({success: true, message: 'Dang nhap thanh cong', name: ketqua})
             })
        }
        else res.status(500).json({success: false, message: 'Sai tai khoan hoac mk'})

    }
}
        
        
           
         
         
     );
        
            //  const username = req.body.taikhoan; 
            //  console.log(username)
            //  if(username !== email) {
            //     res.send('TB')
            //  }
 
            //  const validPassword = bcrypt.compare(
            //      req.body.pass,
            //      connection.Users.matkhau
            //  )
            //  if(!validPassword) {return res.status(401).send('Wrong Pass'), alert('Sai thogn tin')}
            //  if(username && validPassword) {return res.status(200).send('dang nhap thanh cong'), alert('TC')}
              
  
  }
 // }

 module.exports = {
    dangnhap
 }