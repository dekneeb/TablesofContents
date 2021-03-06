const express = require('express')
const Category = require('../models/Category')
// router stores an instance of the express router class

const router = express.Router()
// router intercepts the request object and checks all routes beneath it



// Index route
router.get('/', (req, res) => {
        Category.find({}, (err, foundCategory) => {       
        res.render('category/index.ejs', {category: foundCategory})
    })
})

// New route
router.get('/new', (req, res) => {
    Category.find({}, (err, foundCategory) => {       
    res.render('category/new.ejs', {category: foundCategory})
    })
})

// Show route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id).populate('recipes').exec( (err, foundCategory) => {
        res.render('category/show.ejs', {category: foundCategory}) 
        console.log(foundCategory)       
    })
})

// Create route
router.post('/', (req, res) => { 
    Category.create(req.body, (err, createdCategory) => {
        console.log(createdCategory)
        res.redirect('/category')
    })
})

// Edit route
router.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        if (err) {
            res.send(err)
        } else {
            res.render('category/edit.ejs', 
            {category: foundCategory, id: req.params.id })
        }
    })
})

// Delete Route
router.delete('/:id', (req, res)=>{
    Category.findByIdAndDelete({_id : req.params.id}, (err, deleteMsg)=>{
        res.redirect('/category')
    })
})

// Update route
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCategory)=>{
        if(err){
          res.send(err)
        }else{
            res.redirect('/category/'+req.params.id)
            console.log(updatedCategory)
        }
       
    })
    // res.send(req.body)
})

module.exports = router