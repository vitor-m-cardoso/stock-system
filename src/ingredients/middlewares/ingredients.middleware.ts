import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { isRegisterValid } from '../../products/validations/isRegisterValid.validation';

// função criada para validar se os campos de numbers foram preenchidos corretamente
async function numbersValidation(quantity: number) {
  if (quantity < 1 || typeof quantity !== 'number') {
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: 'Erro ao processar os valores, tente novamente.',
      },
      HttpStatus.CONFLICT,
    );
  }
}

// função para validar se todos os campos foram preenchidos corretamente
export async function isValidRequest(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name, measuringUnit, unitPrice, quantity } = req.body;

  // caso algum campo não seja informado, retorna uma exceção
  await isRegisterValid([name, measuringUnit, unitPrice, quantity]);

  // caso seja informado algum valor negativo
  // ou algum input diferente de number, retorna uma exceção
  await numbersValidation(unitPrice);
  await numbersValidation(quantity);

  return next();
}
