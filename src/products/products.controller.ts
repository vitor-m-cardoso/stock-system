import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { Roles } from 'src/utils/roles/roles.decorator';
import { Role } from 'src/utils/roles/roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // criado o interceptor FileInterceptor() para extrair o file da request usando o decorador @UploadedFile().
  // parâmetro 'image' é o que será passado na request(POST) para inserir a imagem
  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('productImage'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    const { productName, productPrice, productIngredients, quantity } =
      createProductDto;
    const createNewProduct = {
      productName,
      productPrice,
      productIngredients,
      productImage: productImage.originalname,
      quantity,
    };

    return await this.productsService.createProduct(createNewProduct);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  async findById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(Role.ADMIN)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeProduct(@Param('id') id: string) {
    return await this.productsService.removeProduct(id);
  }
}
