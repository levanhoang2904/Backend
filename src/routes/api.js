const express = require('express');
const {GetUsers,  GetCards, GetCPUs, GetCPUIs, GetCPUAs, GetCart}= require('../controllers/homeController');
const router = express.Router();
const connection = require('../config/database');
const { Router } = require('express');

router.get('/api/users', GetUsers) // Lấy data Usêrs
router.get('/api/Cards', GetCards) // Lấy data Card theo maloai
router.get('/api/cpus', GetCPUs) // Lay cpu theo maloai
router.get('/api/cpuis', GetCPUIs) // Lấy cpu theo maloai va hang INTEL
router.get('/api/cpuas', GetCPUAs) //Lấy cpu theo maloai va hang AMD
// router.get('/api/Cart', GetCart)
router.get('/api/getcart', GetCart)
module.exports = router;