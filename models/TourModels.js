const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide a name for this tour'],
        trim: true,
        unique: true,
        minLength: [4, 'Name must be at least 4 character']
    },
    image: {
        type: String,
        required: [true, 'Provide a image']
    },
    description: {
        type: String,
        required: [true, 'Provide a description']
    },
    duration: {
        type: String,
        required: [true, 'Provide a duration']
    },
    price: {
        type: Number,
        required: [true, 'Provide a price'],
        min: [0, 'Price can not be negative']
    },
    viewCount: {
        type: Number, default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    {
        categories: [{
            name: {
                type: String,
                required: true
            },
            _id: {
                type: mongoose.Schema.Types.ObjectId
            }
        }]
    },
    {
        timestamps: true
    }

)


const Tours = mongoose.model('Tours', tourSchema)
module.exports = Tours