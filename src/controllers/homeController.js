 const { create } = require('handlebars');
const connection = require('../config/database');
const { json } = require('express');

 const POSTcreateUsers = (req, res) => {
   let name = req.body.name;
   let email = req.body.email;
   let password = req.body.password;
   console.log('req body: ', 'hoten: ', name, 'email: ', email, 'matkhau: ', password)
   if(name && email && password) {
      connection.query(
         'Select * from Users where email = ?',[email],
         function(err, results){
            if(results.length>0) {
               res.status(500).json('Email da ton tai')
            }
            else {
               connection.query(
                  'Insert into Users (hoten, email, matkhau) values (?, ?, ?) ', [name, email, password],
                  function(err, results){
                     if(err){
                        console.error('Loi he thong', err)
                        res.status(404).json({success: false, message: 'Da xay ra loi'})
                     }
                     else {
                        res.status(200).json('TC')
                     }
                     
                  }
               )
            }
         }
      )
   }
   else {
      res.status(501).json('Vui long nhap thong tin')
   }
}
            
const GetCards = (req, res) => {
   connection.query(
      'select * from Products where Maloai = "VGA"',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }

 const GetCart = (req, res) => {
   connection.query(
      'select * from Cart',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }



 
 const ADDCARDS = (req, res) => {
   let TenCard = req.body.name;
   let SoLuong = req.body.SL;
   let GiaBan = req.body.GB;
   let HinhAnh = req.body.HA;


   connection.query(`Insert into Products (TenCard, SoLuong, GiaBan, HinhAnh) 
   values (?, ?, ?, ?)`,[TenCard, SoLuong, GiaBan, HinhAnh],
   function(err, results){
      console.log("Results = ", results);
      if(err) res.status(500).json('Loi he thong')
      res.status(200).json('TC');
   }
   )
 }

 
 const ADDCART = (req, res) => {
   let Idpro = req.body.Idpro;
   let IdUser = req.body.IdUser;
   let title = req.body.title;
   let price = req.body.price;

   console.log('====================================');
   console.log('sp:', Idpro, IdUser, title, price);
   console.log('====================================');

   connection.query(
       'SELECT * FROM cart WHERE idProduct = ? AND id = ?', [Idpro, IdUser],
       function(err, results) {
           if (err) {
               console.error(err);
               return res.status(500).json('Lỗi hệ thống');
           }

           if (results.length > 0) {
               connection.query(
                   'UPDATE cart SET quantity = quantity + 1, Thanhtien = quantity * price WHERE idProduct = ? AND id = ?', [Idpro, IdUser],
                   function(updateErr, updateResults) {
                       if (updateErr) {
                           console.error(updateErr);
                           return res.status(500).json('Lỗi hệ thống');
                       }

               
                       
                       return res.status(200).json('Thành công');
                   }
               );
           } else {
               // If no existing cart entry, you might want to insert a new row
               connection.query(
                   'INSERT INTO cart (id, idProduct, title, quantity, price, Thanhtien) VALUES (?,?,?,1,?,price * 1)',
                   [IdUser, Idpro, title, price, price],
                   function(insertErr, insertResults) {
                       if (insertErr) {
                           console.error(insertErr);
                           return res.status(500).json('Lỗi hệ thống');
                       }
                       
                       return res.status(200).json('Thành công');
                   }
               );
           }
       }
   );
}
 
 const HomeCards = (req, res) =>{
   connection.query(`Select * from Products`, function(err, results){
      if(err) throw err;
      res.render('table.ejs', ({data: results}))
      // res.status(200).json(results)
   })
 }

 const Getall = (req, res) =>{
   connection.query(`Select * from Products`, function(err, results){
      console.log("Results = ", results);
      if(err) res.status(500).json('Loi he thong')
      res.status(200).json(results);
   })
 }







 const GetCPUs = (req, res) => {
   connection.query(
      'select * from Products where MaLoai = "CPU"',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }

 const GetCPUAs = (req, res) => {
   connection.query(
      'select * from Products where MaLoai = "CPU" and Hang = "AMD"',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }

 const GetCPUIs = (req, res) => {
   connection.query(
      'select * from Products where MaLoai = "CPU" and Hang = "Intel"',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }

 const GetUsers = (req, res) => {
   connection.query(
      'select * from Users',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }



 const getHome = (req, res)=>{
   
   return res.render('home.ejs')
}

 const CreateAccount = (req, res) => {
   res.render('create.ejs')
 }

 const login = (req, res) =>{
   res.render('login.ejs')
 }
const addCard = (req, res)=> {
   res.render('addCard.ejs')
}

const tkiem = (req, res) =>{
   let key = req.body.key;
   connection.query(
      'select * from Products where title like "%"?"%"',[key],
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }

   );
 }

 const deleteItem = (req, res) => {
    const id = req.body.id
   connection.query(
      'delete from cart where idCart = ?',[id],
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         console.log(id)   
          res.status(200).json(results)
       }
   );
 }



 module.exports = {
   getHome, POSTcreateUsers, CreateAccount, GetUsers, login, Getall, GetCards, GetCPUIs,
    GetCPUAs, addCard, ADDCARDS, HomeCards, GetCart, ADDCART, tkiem, deleteItem
 };