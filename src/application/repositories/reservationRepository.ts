import { Reservation } from 'src/domain/entities/reservation';

export abstract class ReservationRepositoryAbs {
  abstract getAllReservations(): Promise<Reservation[]>;
  abstract getReservationById(id: string): Promise<Reservation>;
  abstract createReservation(reservation: Reservation): Promise<Reservation>;
  abstract updateReservation(
    id: string,
    reservation: Reservation,
  ): Promise<Reservation>;
  abstract deleteReservation(id: string): Promise<Reservation>;
}
