const express=require('express')
const router =express.Router()

const tourController=require('../../../controllers/tours.controller')
router.route('/')
.get(tourController.getAllTour)
.post(tourController.createNewTour)

router.route('/trending')
.get(tourController.getTopTrendingTour)

router.route('/cheapest')
.get(tourController.getCheapestTour)


router.route('/:id')
.get(tourController.getSingleTour)
.patch(tourController.updateSingleTour)

module.exports=router