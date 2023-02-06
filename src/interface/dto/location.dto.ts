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

export class LocationBodyDTO {
  @ApiProperty({
    description: 'latitude',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'longitude',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'latitude dms',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  lat_dms: string;

  @ApiProperty({
    description: 'longitude dms',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  lng_dms: string;

  @ApiProperty({
    description: 'address',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  address: string;

  @ApiProperty({
    description: 'city',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  city: string;

  @ApiProperty({
    description: 'state',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  state: string;

  @ApiProperty({
    description: 'zip',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  zip: string;

  @ApiProperty({
    description: 'country',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  country: string;
}
