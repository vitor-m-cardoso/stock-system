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
import { Roles } from 'src/utils/roles/roles.decorator';
import { Role } from 'src/utils/roles/roles.enum';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-user-dto';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './schemas/ingredient.schema';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.createIngredient(createIngredientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.ADMIN, Role.USER)
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  async findById(@Param('id') id: string) {
    return await this.ingredientsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(Role.ADMIN)
  async updateIngedient(
    @Param('id') id: string,
    @Body() updateIngedientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.updateIngredient(id, updateIngedientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeIngredient(@Param('id') id: string) {
    return await this.ingredientsService.removeIngredient(id);
  }
}
