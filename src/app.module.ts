import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  // ConfigModule importado para ser possivel utilizar variáveis de ambiente corretamente
  // O método forRoot() registra o 'provider' ConfigService, que fornece um método get() para ler essas as variáveis
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/StockSystem'),
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
