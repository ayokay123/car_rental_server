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

export class ReservationBodyDTO {
  @ApiProperty({
    description: 'pickup_day',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  pickup_day: string;

  @ApiProperty({
    description: 'return_day',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  return_day: string;

  @ApiProperty({
    description: 'first_name',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'last_name',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  email: string;

  @ApiProperty({
    description: 'phone',
  })
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'age',
  })
  @IsNotEmpty()
  @IsString()
  age: number;

  @ApiProperty({
    description: 'driver_license',
  })
  @IsNotEmpty()
  @IsString()
  driver_license: string;

  @ApiProperty({
    description: 'address',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'city',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'state',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'country',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'zip',
  })
  @IsNotEmpty()
  @IsString()
  zip: string;

  @ApiProperty({
    description: 'car_id',
  })
  @IsNotEmpty()
  @IsString()
  car_id: string;

  @ApiProperty({
    description: 'location_id',
  })
  @IsNotEmpty()
  @IsString()
  location_id: string;
}
