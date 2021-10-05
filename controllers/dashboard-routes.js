const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Event.findAll({
        where: {
            // use the ID from the session
            admin: req.session.user_id
        },
        attributes: [
          'event_name',
          'location',
          'zip',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE event.id = vote.event_id)'), 'vote_count']
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
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        }) 
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Event.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'event_name',
          'location',
          'zip',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE event.id = vote.event_id)'), 'vote_count']
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
            res.render('edit-post', { 
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