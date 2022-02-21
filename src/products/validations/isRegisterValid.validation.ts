import { HttpException, HttpStatus } from '@nestjs/common';

// função auxiliar criada para verificar se todos os campos foram informados
export async function isRegisterValid(dataArray: any[]) {
  const arr = dataArray.every((param) => param);
  if (!arr) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Todos os campos devem ser preenchidos.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return arr;
}
