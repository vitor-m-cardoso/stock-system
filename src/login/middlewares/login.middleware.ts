import { Request, NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

export function isValidLogin(req: Request, _res: Response, next: NextFunction) {
  const { email, password } = req.body;

  // caso algum campo não seja informado, retorna uma exceção
  if (!email || !password) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Todos os campos devem ser preenchidos.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  next();
}
