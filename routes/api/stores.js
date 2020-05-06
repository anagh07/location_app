const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../../controllers/stores');

// Use controller for routes
router.route('/').get(getStores).post(addStore);

module.exports = router;
