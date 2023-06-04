import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

import { CreateAuthorDto } from './create-author.dto';

export class PersistedAuthorDto extends CreateAuthorDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ type: Date })
  @IsDateString()
  createdAt: Date;
}
