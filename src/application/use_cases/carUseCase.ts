import { Injectable } from '@nestjs/common';
import { Car } from 'src/domain/entities/car';
import { CarRepositoryAbs } from '../repositories/carRepository';

@Injectable()
export class CarUseCase {
  constructor(private readonly carRepository: CarRepositoryAbs) {}

  public async findAll(): Promise<Car[]> {
    return await this.carRepository.getAllCars();
  }

  public async findById(id: string): Promise<Car> {
    return await this.carRepository.getCarById(id);
  }

  public async create(car: Car): Promise<Car> {
    return await this.carRepository.createCar(car);
  }

  public async update(id: string, car: Car): Promise<Car> {
    return await this.carRepository.updateCar(id, car);
  }

  public async delete(id: string): Promise<Car> {
    return await this.carRepository.deleteCar(id);
  }
}
