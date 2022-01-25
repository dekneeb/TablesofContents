const mongoose = require ('mongoose')

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: {
        type: [String],
        lowercase: true
    },
    instructions: {
        type: String
    },
    category: {
        type: String
    },
    time: {
        type: String
    },
    foodType: {
        type: String,
        default: 'Entree'
    }
})

const Recipe = mongoose.model('Recipe', recipesSchema)

module.exports = Recipe

//enum