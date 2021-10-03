const router = require('express').Router();;
const { Event, Intersed_in } = require('../../models');

router.get('/', (req, res) => {
  Intersed_in.findAll({
    where:{
      user_id: req.session.user_id
    },
    attributes: [],
    include:{
      model:Event,
      attributes:[
      'event_name',
      'location',
      'zip',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE event.id = vote.event_id)'), 'vote_count']]
    },
    include:{
      model:Category,
      attributes:['category']
    },
    include:{
      model:User,
      attributes:['username']
    }
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;