import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import UpdateCustomerUseCase from "../../../usecase/customer/update/update.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        city: req.body.address.city,
        number: req.body.address.number,
        street: req.body.address.street,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDTO);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await usecase.execute();
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.put("/", async (req: Request, res: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());
  try {
    const customerDTO = {
      id: req.body.id,
      name: req.body.name,
      address: {
        city: req.body.address.city,
        number: req.body.address.number,
        street: req.body.address.street,
        zip: req.body.address.zip,
      },
    };

    const output = await usecase.execute(customerDTO);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());

  try {
    const output = await usecase.execute({ id: req.params.id as string });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
