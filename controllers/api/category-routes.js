const router = require('express').Router();
const { Category } = require('../../models');

// get all users
router.get('/', (req, res) => {
  Category.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include:[
      {
        module:Event,
        attributes:['event_name', 'location',  'zip', 'event_category' ],
        include:{
          model:Category,
          attributes:['category_name']
        }
      }
    ]
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