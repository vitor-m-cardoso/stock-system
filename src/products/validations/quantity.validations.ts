import { HttpException, HttpStatus } from '@nestjs/common';

// função criada para validar se ainda contém o produto em estoque
export async function quantityValidation(quantity: number) {
  if (quantity < 1) {
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: 'Não temos mais o produto em nosso estoque.',
      },
      HttpStatus.CONFLICT,
    );
  }
}
