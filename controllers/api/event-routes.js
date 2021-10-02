const router = require('express').Router();;
const sequelize = require('../../config/connection');
const { Event, User, Vote } = require('../../models');
const withAuth = require('../../utils');

// get all users
router.get('/', (req, res) => {
  Event.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Post.create(req.body,{
    admin: req.session.user_id 
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Event.js
  Post.upvote(req.body, {}, { Vote, Event, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/interested', withAuth, (req, res) => {
  // custom static method created in models/Event.js
  Post.interest(req.body, {}, { Vote, Event, User })
    .then(updatedData => res.json(updatedData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/attending', withAuth, (req, res) => {
  // custom static method created in models/Event.js
  Post.attend(req.body, {}, { Vote, Event, User })
    .then(updatedData => res.json(updatedData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;