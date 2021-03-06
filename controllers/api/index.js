const router = require('express').Router();

const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const categoryRoutes = require('./category-routes');
const attendingRoutes = require('./attending-routes');
const interestedRoutes = require('./interested_in-routes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/categories', categoryRoutes);
router.use('/attending', attendingRoutes);
router.use('/categories', interestedRoutes);

module.exports = router;