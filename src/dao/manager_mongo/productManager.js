import { port } from "../../app.js";
import ProductSchema from "../models/product.schema.js";

class ProductManager {
  getProducts = async (data) => {
    try {
      let { limit, page, sort, category, stock } = data;
      limit ? limit : (limit = 10);
      page ? page : (page = 1);
      let query = {};
      if (category && stock) {
        query = { $and: [{ category: category }, { stock: { $gt: 0 } }] };
      } else if (category) {
        query = { category: category };
      } else if (stock) {
        query = { stock: { $gt: 0 } };
      }

      let sortQuery = {};
      if (sort === "asc" || sort === "desc") {
        sortQuery = { price: sort === "asc" ? 1 : -1 };
      }

      const result = await ProductSchema.paginate(query, {
        limit: limit,
        page: page,
        lean: true,
        sort: sortQuery,
      });

      result.prevLink = result.hasPrevPage
        ? `http://localhost:${port}/api/products?page=${result.prevPage}`
        : null;
      result.nextLink = result.hasNextPage
        ? `http://localhost:${port}/api/products?page=${result.nextPage}`
        : null;
      result.status = "success";
      result.payload = result.docs;
      delete result.docs;
      delete result.pagingCounter;
      return result;
    } catch (error) {
      throw new Error(`Hubo un error obteniendo los productos: ${error.message}`);
    }
  };

  getProductById = async (productId) => {
    try {
      return await ProductSchema.findById(productId);
    } catch (error) {
      throw new Error(`Error al encontrar el producto`);
    }
  };

  addProduct = async (product) => {
    if (!product) {
      throw new Error(`Debe tener todos los campos completos`);
    }
    let exists = await ProductSchema.findOne({ code: product.code });
    if (exists) {
      throw new Error(`Ya existe un producto con el código ${product.code}`);
    }
    try {
      return new ProductSchema(product).save();
    } catch (error) {
      throw new Error(`Error al agregar producto: ${error.message}`);
    }
  };

  updateProduct = async (productId, updates) => {
    try {
      await ProductSchema.updateOne({ _id: productId }, updates);
      return ProductSchema.findById(productId);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  deleteProduct = async (productId) => {
    try {
      return await ProductSchema.deleteOne({ _id: productId });
    } catch (error) {
      throw new Error(`Error al eliminar producto `);
    }
  };
}

export default ProductManager;
