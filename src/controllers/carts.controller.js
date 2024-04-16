import CartManager from "../dao/manager_mongo/cartsManager.js";
import { NotFound } from "../test/customError.js";

const cm = new CartManager();
export async function getCarts(req, res) {
  try {
    const carts = await cm.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCartById(req, res) {
  try {
    const cart = await cm.getCartById(req.params.cid);
    res.status(200).send(cart);
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(`No se encontró el carrito`);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function addCart(req, res) {
  try {
    await cm.addCart();
    res.status(200).send("Se agregó correctamente el carrito");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addProductInCart(req, res) {
  try {
    await cm.updateCart(req.params.cid, req.params.pid);
    res.status(200).send("Producto añadido al carrito");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function deleteProduct(req, res) {
  try {
    await cm.deleteProduct(req.params.cid, req.params.pid);
    res.status(200).send("Producto eliminado del carrito");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function cleanCartById(req, res) {
  try {
    await cm.cleanCartById(req.params.cid);
    res.status(200).send("Se vació el carrito");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function updateProductsInCart(req, res) {
  try {
    await cm.updateProductsInCart(req.params.cid, req.body);
    res.status(200).send("Carrito actualizado");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function updateProductsQuantityInCart(req, res) {
  try {
    await cm.updateProductsQuantityInCart(req.params.cid, req.params.pid, req.body);
    res.status(200).send("Cantidad de productos actualizados en el carrito");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}

export async function purchase(req, res) {
  try {
    await cm.purchase(req.params.cid);
    res.status(200).send("Compra realizada con éxito");
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
}
