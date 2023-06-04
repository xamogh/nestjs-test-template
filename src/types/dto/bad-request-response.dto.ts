import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | [string];

  @ApiProperty()
  error: string;
}
