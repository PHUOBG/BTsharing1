import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterTaskDto {
  @ApiPropertyOptional({
    description: 'Lọc công việc theo trạng thái hoàn thành',
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (['true', true, '1', 1].includes(value)) return true;
    if (['false', false, '0', 0].includes(value)) return false;
    return value;
  })
  @IsBoolean()
  isCompleted?: boolean;

  @ApiPropertyOptional({
    description: 'Lọc công việc theo chủ đề (category)',
    example: 'Backend',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
