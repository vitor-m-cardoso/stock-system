import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { isValidId } from './validations/isValidId.validation';
import { isRegisterValid } from './validations/isRegisterValid.validation';
import { imageFileFilter } from './validations/imageFileFilter.validation';
import { quantityValidation } from './validations/quantity.validations';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findById(id: string) {
    await isValidId(id);

    return await this.productModel.findById(id).exec();
  }

  async createProduct(product: CreateProductDto) {
    const createdProduct = new this.productModel(product);
    const {
      productName,
      productImage,
      productPrice,
      productIngredients,
      quantity,
    } = createdProduct;
    const dbProducts = await this.findAll();

    // caso algum campo não seja informado, retorna uma exceção
    await isRegisterValid([
      productName,
      productImage,
      productPrice,
      productIngredients,
      quantity,
    ]);

    // verifica se o produto já esta cadastrado no sistema
    if (dbProducts.some((item) => item.productName === productName)) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Produto já cadastrado no sistema.',
        },
        HttpStatus.CONFLICT,
      );
    }

    // caso não tenha o produto no estoque, retorna uma exceção
    await quantityValidation(quantity);
    // caso a imagem não esteja no padrão correto, retorna uma exceção
    await imageFileFilter(productImage);

    return await createdProduct.save();
  }

  async updateProduct(id: string, updateProduct: UpdateProductDto) {
    await isValidId(id);

    return await this.productModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateProduct },
      { new: true },
    );
  }

  async removeProduct(id: string) {
    await isValidId(id);
    const deletedProduct = await this.productModel
      .deleteOne({ _id: id })
      .exec();
    const { deletedCount } = deletedProduct;

    if (deletedCount === 1) {
      return {
        success: 'Produto deletado com sucesso.',
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Produto não existe no sistema.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
