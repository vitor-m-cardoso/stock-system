import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // criado o interceptor FileInterceptor() para extrair o file da request usando o decorador @UploadedFile().
  // parâmetro 'image' é o que será passado na request(POST) para inserir a imagem
  @Post()
  @UseInterceptors(FileInterceptor('productImage'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    const { productName, productPrice, productIngredients } = createProductDto;
    const createNewProduct = {
      productName,
      productPrice,
      productIngredients,
      productImage: productImage.originalname,
    };

    return await this.productsService.createProduct(createNewProduct);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return await this.productsService.removeProduct(id);
  }
}
