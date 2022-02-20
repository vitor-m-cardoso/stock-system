import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop()
  productName: string;

  @Prop()
  productImage: string;

  @Prop()
  productPrice: number;

  @Prop()
  productIngredients: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
