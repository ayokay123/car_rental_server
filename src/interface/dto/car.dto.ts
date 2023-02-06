import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Express } from 'express';

export class CarBodyDTO {
  @ApiProperty({
    description: 'name',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'model',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  model: string;

  @ApiProperty({
    description: 'color',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  color: string;

  @ApiProperty({
    description: 'doors',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  doors: number;

  @ApiProperty({
    description: 'year',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'price',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'air condition',
  })
  @IsNotEmpty()
  @IsBoolean()
  air_condition: boolean;

  @ApiProperty({
    description: 'car image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  file: Express.Multer.File;
}
