// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignkey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignkey: "category_id",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignkey: "product_id",
  as: "taggedProducts",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignkey: "tag_id",
  as: "productTags",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
