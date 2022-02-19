import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientModel.find().exec();
  }

  async findById(id: string) {
    return await this.ingredientModel.findById(id).exec();
  }

  async createIngredient(ingredient: CreateIngredientDto) {
    const createdIngredient = new this.ingredientModel(ingredient);
    return await createdIngredient.save();
  }

  async updateIngredient(id: string, updateIngredient: UpdateIngredientDto) {
    return await this.ingredientModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateIngredient },
      { new: true },
    );
  }

  async removeIngredient(id: string) {
    return await this.ingredientModel.deleteOne({ _id: id }).exec();
  }
}
