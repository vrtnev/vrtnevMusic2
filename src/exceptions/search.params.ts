import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams {
  relationsid: number;
  relationsname: string;
  }

export interface SearchParamsa {
  name: string;
  cover: string;
  relationsid: number;

}

export interface SearchParamsb {
  name: string;
  file: string;

}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}

export interface SearchParamsWithErrora {
  data: SearchParamsa;
  message: string;
}

export interface SearchParamsWithErrorb {
  data: SearchParamsb;
  message: string;
}
