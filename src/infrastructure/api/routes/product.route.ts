import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/product.find.usecase";
import ListProductUseCase from "../../../usecase/product/list/product.list.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDTO = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDTO);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute();
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.put("/", async (req: Request, res: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());
  try {
    const productDTO = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDTO);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({ id: req.params.id as string });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
