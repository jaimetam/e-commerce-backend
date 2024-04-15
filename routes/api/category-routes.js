const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include:[{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});
// find one category by its `id` value
// be sure to include its associated Products

router.get('/:id',async  (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model:Product }],
    });
    if(!categoryData){
      resizeBy.status(404).jason({ message :'no Category was found with this id'});
     return; 
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData)
  } catch (err){
    res.status(400).json(err);
  }
});


  // update a category by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryName } = req.body; // Destructure category name and other updates
  
      const categoryData = await Category.findByPk(id);
  
      if (!categoryData) {
        return res.status(404).json({ message: 'No Category found with this id!' });
      }
  
      // Update category name and potentially other fields
      categoryData.category_name = categoryName;
      // Update other fields based on "otherUpdates" object properties
  
      await categoryData.save(); // Save the updated category
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id',  async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.category_id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
