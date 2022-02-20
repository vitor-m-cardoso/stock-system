import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // função criada para validar o ID passado por parâmetro nas requisições
  async isValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Por favor, insira um id válido.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return id;
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findById(id: string) {
    await this.isValidId(id);

    return await this.productModel.findById(id).exec();
  }

  async createProduct(product: CreateProductDto) {
    const createdProduct = new this.productModel(product);
    const { productName } = createdProduct;
    const dbProducts = await this.findAll();

    if (dbProducts.some((item) => item.productName === productName)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Produto já cadastrado no sistema.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await createdProduct.save();
  }

  async updateProduct(id: string, updateProduct: UpdateProductDto) {
    await this.isValidId(id);

    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProduct },
      { new: true },
    );
  }

  async removeProduct(id: string) {
    await this.isValidId(id);
    const deletedProduct = await this.productModel
      .deleteOne({ _id: id })
      .exec();
    const { deletedCount } = deletedProduct;

    if (deletedCount === 1) {
      return {
        success: 'Produto deletado com sucesso.',
      };
    } else {
      return {
        erro: 'Produto não existe no sistema.',
      };
    }
  }
}
