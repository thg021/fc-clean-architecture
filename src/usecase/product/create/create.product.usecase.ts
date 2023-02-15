import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputProductDto, OutputProductDto } from "./create.product.dto";

export default class ProductCreateUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputProductDto): Promise<OutputProductDto> {
    const product = ProductFactory.create(input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
