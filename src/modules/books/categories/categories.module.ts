import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
