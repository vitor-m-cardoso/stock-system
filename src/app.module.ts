import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IngredientsModule } from './ingredients/ingredients.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // ConfigModule importado para ser possivel utilizar variáveis de ambiente corretamente
  // O método forRoot() registra o 'provider' ConfigService, que fornece um método get() para ler essas as variáveis
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/StockSystem'),
    IngredientsModule,
    ProductsModule,
    UsersModule,
    LoginModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
