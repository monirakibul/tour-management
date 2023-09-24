const existTourById = require('../common/existTourById')
const Tours = require('../models/TourModels')

// GET ALL TOURS
exports.getTourService = async (quires) => {
    const tours = await Tours.find({}, quires.field).sort(quires.sort).skip(quires.skip).limit(quires.limit)
    const totalTours = await Tours.countDocuments()
    const totalPage = Math.ceil(totalTours / quires.limit)
    return { totalPage, tours }
}

// POST NEW TOUR 
exports.createTourService = async (body) => {
    const tour = new Tours(body)
    const result = await tour.save()
    return result
}

// GET SINGLE TOUR 
exports.getSingleTourService = async (id) => {
    const tour = await Tours.findById(id)
    tour.viewCount++
    await tour.save()
    return tour
}

// UPDATE TOUR

exports.updateSingleTourService = async (id, body) => {
    const existTour = await existTourById(id)
    console.log(existTour);
    if (existTour) {
        const result = await existTour.set(body).save()
        return result
    }
}

// GET TRENDING TOUR
exports.trendingTourService = async () => {
    const trendingTour = await Tours.find({}).sort({ viewCount: -1 }).limit(3)
    return trendingTour
}

// GET cheapest TOUR
exports.cheapestTourService = async () => {
    const trendingTour = await Tours.find({}).sort({ viewCount: 1 }).limit(3)
    return trendingTour
}