import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

import { Ingredient, IngredientSchema } from './schemas/ingredient.schema';

@Module({
  imports: [
    // método forFeature() configura o módulo, incluindo a definição de
    // quais models devem ser registrados no escopo atual.
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
