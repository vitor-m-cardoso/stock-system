import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

// função criada para validar o ID passado por parâmetro nas requisições
export async function isValidId(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Por favor, insira um id válido.',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  return id;
}
