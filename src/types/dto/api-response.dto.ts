import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class ApiResponseDtoInternalServerError extends ApiResponseDto {
  @ApiProperty({ example: 500 })
  declare statusCode: number;
}

export class ApiResponseDtoUnauthorized extends ApiResponseDto {
  @ApiProperty({ example: 401 })
  declare statusCode: number;
}

export class ApiResponseDtoNotFound extends ApiResponseDto {
  @ApiProperty({ example: 404 })
  declare statusCode: number;
}
