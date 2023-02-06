import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { Reservation } from '../orm/entities/reservation.entity';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
    private readonly logger: Logger,
  ) {}

  public async getAllReservations(): Promise<Reservation[]> {
    return await this.repository.find();
  }

  public async getReservationById(id: string): Promise<Reservation> {
    return await this.repository.findOne({ where: { reservation_id: id } });
  }

  public async createReservation(
    reservation: Reservation,
  ): Promise<Reservation> {
    try {
      return await this.repository.save(reservation);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async updateReservation(
    id: string,
    reservation: Reservation,
  ): Promise<Reservation> {
    const reservationToUpdate = await this.repository.findOne({
      where: { reservation_id: id },
    });
    if (reservationToUpdate) {
      await this.repository.update(
        {
          reservation_id: id,
        },
        reservation,
      );
    }
    return await this.repository.findOne({ where: { reservation_id: id } });
  }

  public async deleteReservation(id: string): Promise<Reservation> {
    const reservationToDelete = await this.repository.findOne({
      where: { reservation_id: id },
    });
    if (reservationToDelete) {
      await this.repository.delete({ reservation_id: id });
    }
    return reservationToDelete;
  }
}
