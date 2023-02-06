import { Injectable } from '@nestjs/common';
import { Reservation } from 'src/domain/entities/reservation';
import { ReservationRepositoryAbs } from '../repositories/reservationRepository';

@Injectable()
export class ReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepositoryAbs,
  ) {}

  public async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.getAllReservations();
  }

  public async findById(id: string): Promise<Reservation> {
    return await this.reservationRepository.getReservationById(id);
  }

  public async create(reservation: Reservation): Promise<Reservation> {
    return await this.reservationRepository.createReservation(reservation);
  }

  public async update(
    id: string,
    reservation: Reservation,
  ): Promise<Reservation> {
    return await this.reservationRepository.updateReservation(id, reservation);
  }

  public async delete(id: string): Promise<Reservation> {
    return await this.reservationRepository.deleteReservation(id);
  }
}
