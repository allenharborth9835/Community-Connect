const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Category } = require('../models');

router.get('/', (req, res) => {
    Event.findAll({
        attributes: [
          'id',  
          'event_name',
          'admin',
          'event_date',
          'event_category',
          'location',
          'zip',
          [sequelize.literal('(SELECT COUNT(*) FROM attending WHERE event.id = attending.event_id)'), 'attending_count'],
          [sequelize.literal('(SELECT COUNT(*) FROM intersed_in WHERE event.id = intersed_in.event_id)'), 'interested_count']
        ],
        include:{
          model:Category,
          attributes:['category']
        },
        include:{
          model:User,
          attributes:['username']
        }
      })
        .then(dbPostData => {
            const events = dbPostData.map(event => event.get({ plain: true }));
            res.render('homepage', { 
                events,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});
  
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Event.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          // added id attribute here
          'id',
          'event_name',
          'admin',
          'event_date',
          'event_category',
          'location',
          'zip',
          [sequelize.literal('(SELECT COUNT(*) FROM attending WHERE event.id = attending.event_id)'), 'attending_count'],
          [sequelize.literal('(SELECT COUNT(*) FROM intersed_in WHERE event.id = intersed_in.event_id)'), 'interested_count']
        ],
        include:{
          model:Category,
          attributes:['category']
        },
        include:{
          model:User,
          attributes:['username']
        }
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
            // serialize the data
            const event = dbPostData.get({ plain: true });

            // pass data to template
            res.render('single-event', { 
                event,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;