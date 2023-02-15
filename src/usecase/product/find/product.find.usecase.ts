import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./product.find.dto";

export default class ProductFindUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
