const { isValidObjectId } = require("mongoose")
const { createTourService, getTourService, getSingleTourService, updateSingleTourService, trendingTourService, cheapestTourService } = require("../services/tours.service")

// GET TOUR
exports.getAllTour = async (req, res) => {
    try {
        //    console.log(req.query);
        const quires = {}
        if (req.query.field) {
            const filed = req.query.field.split(',').join(' ')
            quires.field = filed
        }

        if (req.query.sort) {
            const sort = req.query.sort
            quires.sort = sort
        }

        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query
            let skip = (page - 1) * limit
            quires.skip = skip
            quires.limit = parseInt(limit)
        }

        const result = await getTourService(quires)
        if (!result) {
            res.status(400).json({ success: false, message: 'Data is not found' })
        }
        res.status(200).json({ success: true, message: 'Data found successfully', data: result })
    }

    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not found', error: error.message })
    }



}


// POST TOUR
exports.createNewTour = async (req, res, next) => {
    const body = req.body
    try {
        const tours = await createTourService(body)
        if (!tours) {
            res.status(400).json({ success: false, message: 'Data is not inserted successfully' })
        }
        res.status(200).json({ success: true, message: 'Data inserted successfully' })
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not inserted successfully', error: error.message })
    }
}

// GET SINGLE TOUR

exports.getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const result = await getSingleTourService(id)
        if (!result) {
            res.status(400).json({ success: false, message: 'Data is not found' })
        }
        res.status(200).json({ success: true, message: 'Data found successfully', data: result })
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not found', error: error.message })
    }
}

// UPDATE TOUR

exports.updateSingleTour = async (req, res) => {
    try {
        const id = req.params.id
        const body =req.body
        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, error: "Not a valid id" });
          }
        const result = await updateSingleTourService(id,body)
        if (!result) {
            res.status(400).json({ success: false, message: 'Data is not updated' })
        }
        res.status(200).json({ success: true, message: 'Data updated successfully', data: result })
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not updated', error: error.message })
    }
}


//  GET TOP 3 TRENDING TOUR

exports.getTopTrendingTour = async (req, res) => {
   
    try {
        const result = await trendingTourService()
        if (!result) {
            res.status(400).json({ success: false, message: 'Data is not found' })
        }
        res.status(200).json({ success: true, message: 'Data found successfully', data: result })
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not found', error: error.message })
    }
}

//  GET TOP 3 CHEAPEST TOUR

exports.getCheapestTour = async (req, res) => {
   
    try {
        const result = await cheapestTourService()
        if (!result) {
            res.status(400).json({ success: false, message: 'Data is not found' })
        }
        res.status(200).json({ success: true, message: 'Data found successfully', data: result })
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Data is not found', error: error.message })
    }
}