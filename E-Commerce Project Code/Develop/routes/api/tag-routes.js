const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // finds all tags
  // includes its associated Product data
  try {
    const tagData = await Tag.findAll({
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: "productTags" }]
    });

    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // finds a single tag by its `id`
  // includes its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: "productTags" }]
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // creates a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // updates a tag's name by its `id` value
  try {
    const updatedTagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      { where: {id: req.params.id} }
    );
    res.status(201).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // deletes tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'That is not the tag you are looking for. No tag by that ID'});
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
