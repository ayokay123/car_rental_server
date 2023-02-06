import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  location_id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  lat: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  lng: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lat_dms: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  lng_dms: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  state: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  country: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  zip: string;

  @OneToMany((type) => Reservation, (reservation) => reservation.location_id)
  reservations: Reservation[];
}
