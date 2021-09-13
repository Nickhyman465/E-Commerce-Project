const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // finds all categories
  // includes its associated Products
try {
  const categoryData = await Category.findAll({
    include: [Product]
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value
  //includes its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      }, { where: { id: req.params.id}}
      );
      res.status(201).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // deletes a category by its `id` value
  try {
    const deletedCategory = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'That is not the category you are looking for. No tag by that ID'});
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
