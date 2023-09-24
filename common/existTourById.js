const Tours = require("../models/TourModels")

const existTourById=async(id)=>{
const tour=await Tours.findById(id)
return tour
}

module.exports=existTourById