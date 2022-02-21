import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-user-dto';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './schemas/ingredient.schema';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateIngedient(
    @Param('id') id: string,
    @Body() updateIngedientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.updateIngredient(id, updateIngedientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeIngredient(@Param('id') id: string) {
    return await this.ingredientsService.removeIngredient(id);
  }
}
