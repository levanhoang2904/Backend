 const { create } = require('handlebars');
const connection = require('../config/database');
const { json } = require('express');

const bcrypt = require('bcrypt');
const saltRounds = 10;


 const POSTcreateUsers = async(req, res) => {
   let hoten = req.body.name;
   let email = req.body.email;
   let matkhau = await hashUserPassword(req.body.password);
   console.log('req body: ', 'hoten: ', hoten, 'email: ', email, 'matkhau: ', matkhau)
   if(hoten && email && matkhau) {
      connection.query(
         'Select * from Users where email = ?',[email],
         function(err, results){
            if(results.length>0) {
               res.status(500).json('Email da ton tai')
            }
            else {
               connection.query(
                  'Insert into Users (hoten, email, matkhau) values (?, ?, ?) ', [hoten, email, matkhau],
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

let hashUserPassword = (password) => {
   return new Promise(async(resolve, reject) => {
       try {
           var hashPassword = await bcrypt.hashSync(password, saltRounds);
           resolve(hashPassword);
       } catch (e) {
           reject(e);
       }
   })
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

 const GetRams = (req, res) => {
   connection.query(
      'select * from Products where Maloai = "RAM"',
      function(err, results) {
         console.log("Results = ", results); // results contains rows returned by server
         // console.log("Fields = ",fields); // fields contains extra meta data about results, if available
         
          res.status(200).json(results)
       }
   );
 }

 const GetCart = (req, res) => {
   const id = req.query.id
   connection.query(
      'select * from Cart where id = ?',[id],
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
   let img = req.body.imageLink
  
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
                   'INSERT INTO cart (id, idProduct, title, quantity, price, Thanhtien, img) VALUES (?,?,?,1,?,price * 1, ?)',
                   [IdUser, Idpro, title, price, img],
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


const UpdateCong = (req, res) =>{
   let idcart = req.query.idcart
   let quantity = req.query.quantity
   connection.query('UPDATE cart set quantity = quantity + 1, thanhtien = price * quantity where idcart = ?',[idcart],
    function(err, results){
      if(err) throw err;

      res.status(200).json(results)
      // res.status(200).json(results)
   })
 }

 const UpdateTru = (req, res) =>{
   let idcart = req.query.idcart
   
   
      console.log(1)
   connection.query('UPDATE cart set quantity = quantity - 1, thanhtien = price * quantity where idcart = ?',[idcart],
    function(err, results){
      if(err) throw err;

      res.status(200).json(results)
      // res.status(200).json(results)
   })

 }

 const InseretHD = (req, res) =>{
   console.log('====================================');
   console.log(req.query.date);
   console.log('====================================');
   connection.query('Insert into HoaDon(id, ngaymua, tinhtrang)  values(?, CURDATE(), 0)',[req.query.id],
    function(err, results){
      if(err) throw err;

      res.status(200).json(results)
      // res.status(200).json(results)
   })
}

 module.exports = {
   getHome, POSTcreateUsers, CreateAccount, GetUsers, login, Getall, GetCards, GetCPUIs,
    GetCPUAs, addCard, ADDCARDS, HomeCards, GetCart, ADDCART, tkiem, deleteItem, UpdateCong, UpdateTru, 
    InseretHD, GetRams
 };