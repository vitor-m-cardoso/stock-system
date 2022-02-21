import { HttpException, HttpStatus } from '@nestjs/common';

//  função auxiliar para filtrar imagens permitindo somente PNG e JPG
export async function imageFileFilter(file: string) {
  if (!file.match(/\.(png|jpg)$/)) {
    throw new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Permitido apenas imagens no formato PNG ou JPG.',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  return file;
}
