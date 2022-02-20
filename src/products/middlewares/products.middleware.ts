import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, NextFunction } from 'express';

export function isValidProduct(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { productName, poductImage, productPrice, productIngredients } =
    req.body;

  // caso algum campo não seja informado, retorna uma exceção
  if (!productName || !poductImage || !productPrice || !productIngredients) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Todos os campos devem ser preenchidos.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  // caso seja informado algum valor negativo
  // ou algum input diferente de number, retorna uma exceção
  if (productPrice < 0 || typeof productPrice !== 'number') {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Erro ao processar os valores, tente novamente.',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  next();
}
