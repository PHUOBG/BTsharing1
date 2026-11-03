import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Tên công việc (1 - 255 ký tự)',
    example: 'Học NestJS cơ bản',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiPropertyOptional({
    description: 'Chủ đề của công việc',
    example: 'Backend',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  category?: string;

  @ApiPropertyOptional({
    description: 'Mô tả chi tiết nội dung công việc',
    example: 'Tìm hiểu về DTO, Controller, Service và Module',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
