import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  car_id: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  model: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  color: string;

  @Column({
    type: 'int',
    width: 1,
    nullable: true,
  })
  doors: number;

  @Column({
    type: 'int',
    width: 4,
    nullable: true,
  })
  year: number;

  @Column({
    type: 'int',
    width: 4,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'bool',
    default: false,
  })
  air_condition: boolean;

  @Column({
    type: 'varchar',
    default: null,
  })
  car_image: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @OneToMany((type) => Reservation, (reservation) => reservation.car_id)
  reservations: Reservation[];
}
