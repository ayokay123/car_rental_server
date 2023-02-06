import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { Location } from './location.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  reservation_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  pickup_day: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  return_day: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  driver_license: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  zip: string;

  @ManyToOne((type) => Car, (car) => car.reservations)
  @JoinColumn({ name: 'car_id' })
  car_id: string;

  @ManyToOne((type) => Location, (location) => location.reservations)
  @JoinColumn({ name: 'location_id' })
  location_id: string;
}
