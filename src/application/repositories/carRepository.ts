import { Car } from 'src/domain/entities/car';

export abstract class CarRepositoryAbs {
  abstract getAllCars(): Promise<Car[]>;
  abstract getCarById(id: string): Promise<Car>;
  abstract createCar(car: Car): Promise<Car>;
  abstract updateCar(id: string, car: Car): Promise<Car>;
  abstract deleteCar(id: string): Promise<Car>;
}
