const express = require("express")
const Bug = require("../models/Bug.js");


getBugs = async (req, res) => {
  try {
    const { status, severity, search } = req.query;
    const query = {};

    // Apply role-based filtering first
    if (req.user.role === 'reporter') {
      query.reporterId = req.user.id;
    }

    // Apply filters for both roles
    if (status) {
      query.status = status;
    }
    if (severity) {
      query.severity = severity;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch bugs using the combined query
    const bugs = await Bug.find(query).populate('reporterId', 'username');

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Create bug
createBug = async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    
    const bug = await Bug.create({
      title,
      description,
      severity,
      status: 'Open',
      reporterId: req.user.id
    });
    
    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update bug status
updateBug = async (req,res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const bug = await Bug.findById(id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    
    // Check permissions
    if (req.user.role === 'reporter' && bug.reporterId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedBug = await Bug.update(id, { status });
    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {getBugs, createBug, updateBug} 