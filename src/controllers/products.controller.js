import { productService } from "../repositories/index.js";
import { DuplicateCode, IncompleteFields, NotFound } from "../test/customError.js";
import { generateProducts } from "../utils.js";
export async function getProducts(req, res) {
  try {
    const products = await productService.get(req.query);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(`Hubo un error obteniendo los productos: ${error.message}`);
  }
}

export async function getProductById(req, res) {
  try {
    const product = await productService.getById(req.params.pid);
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof NotFound) {
      res.status(404).send(`Error al encontrar el producto`);
    } else {
      res.status(500).send(`Error al obtener el producto: ${error.message}`);
    }
  }
}

export async function addProduct(req, res) {
  try {
    const product = await productService.add(req.body);
    res.status(201).send(`Se agregó el producto ${product.title}`);
  } catch (error) {
    if (error instanceof IncompleteFields) {
      res.status(400).send(`Debe completar todos los campos: ${error.message}`);
    } else {
      if (error instanceof DuplicateCode) {
        res.status(400).send(`Ya existe un producto con el código proporcionado`);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}

export async function updateProduct(req, res) {
  try {
    await productService.update(req.params.pid, req.body);
    res.status(200).send(`Producto actualizado`);
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(`No se encontró el producto a actualizar`);
    } else {
      if (error instanceof IncompleteFields) {
        res.status(400).send(`Debe completar todos los campos`);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}

export async function deleteProduct(req, res) {
  try {
    await productService.delete(req.params.pid);
    res.status(200).send(`Producto eliminado`);
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(`No se encontró el producto a actualizar`);
    } else {
      res.status(500).send(`Error al eliminar producto`);
    }
  }
}

export function mockingProducts(req, res) {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts());
  }
  res.status(200).send(products);
}
