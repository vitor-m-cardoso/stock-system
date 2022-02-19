import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, NextFunction } from 'express';

// função para validar se todos os campos foram preenchidos corretamente
export function isValidRequest(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name, measuringUnit, unitPrice } = req.body;

  // caso algum campo não seja informado, retorna uma exceção
  if (!name || !measuringUnit || !unitPrice) {
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
  if (unitPrice < 0 || typeof unitPrice !== 'number') {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Erro ao processar os valores, tente novamente.',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  return next();
}
