import { Model, Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-user-dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
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

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientModel.find().exec();
  }

  async findById(id: string) {
    await this.isValidId(id);

    return await this.ingredientModel.findById(id).exec();
  }

  async createIngredient(ingredient: CreateIngredientDto) {
    const createdIngredient = new this.ingredientModel(ingredient);
    const { name } = createdIngredient;
    const dbIngredients = await this.findAll();

    if (dbIngredients.some((item) => item.name === name)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Ingrediente já cadastrado no sistema.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await createdIngredient.save();
  }

  async updateIngredient(id: string, updateIngredient: UpdateIngredientDto) {
    await this.isValidId(id);

    return await this.ingredientModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateIngredient },
      { new: true },
    );
  }

  async removeIngredient(id: string) {
    await this.isValidId(id);
    const deletedProduct = await this.ingredientModel
      .deleteOne({ _id: id })
      .exec();
    const { deletedCount } = deletedProduct;

    // condição criada apenas para retornar um output personalizado e mais visual.
    if (deletedCount === 1) {
      return {
        success: 'Ingrediente deletado com sucesso.',
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ingrediente não existe no sistema.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
