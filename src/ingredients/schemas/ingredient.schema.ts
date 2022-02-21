import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

// o decorador '@Schema' marca uma classe como uma definição de esquema.
// Ele mapeia a class para uma coleção do MongoDB com o mesmo nome, mas com um 's' no final
@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  measuringUnit: string;

  @Prop()
  unitPrice: number;

  @Prop()
  quantity: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
