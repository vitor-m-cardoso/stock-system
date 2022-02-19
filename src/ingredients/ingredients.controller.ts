import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-user-dto';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './schemas/ingredient.schema';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.createIngredient(createIngredientDto);
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.ingredientsService.findById(id);
  }

  @Put(':id')
  async updateIngedient(
    @Param('id') id: string,
    @Body() updateIngedientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.updateIngredient(id, updateIngedientDto);
  }

  @Delete(':id')
  async removeIngredient(@Param('id') id: string) {
    return await this.ingredientsService.removeIngredient(id);
  }
}
