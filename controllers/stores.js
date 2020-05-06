const express = require('express');
const Store = require('../models/Store');

// @route   GET /api/stores
// @desc    Get list of stores
// @access  Public
exports.getStores = async (req, res, next) => {
  console.log('DEBUG: GET /api/stores');
  try {
    const stores = await Store.find();

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @route   POST /api/stores
// @desc    Add a new store
// @access  Public
exports.addStore = async (req, res, next) => {
  console.log('DEBUG: POST /api/stores');
  try {
    const store = await Store.create(req.body);

    return res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000)
      return res.status(400).json({ error: 'Store already exists' });
    return res.status(500).json({ error: 'Server error' });
  }
};
