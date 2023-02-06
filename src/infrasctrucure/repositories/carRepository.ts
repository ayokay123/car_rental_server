import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { Car } from '../orm/entities/car.entity';

@Injectable()
export class CarRepository {
  constructor(
    @InjectRepository(Car) private readonly repository: Repository<Car>,
    private readonly logger: Logger,
  ) {}

  public async getAllCars(): Promise<Car[]> {
    return await this.repository.find();
  }

  public async getCarById(id: string): Promise<Car> {
    return await this.repository.findOne({ where: { car_id: id } });
  }

  public async createCar(car: Car): Promise<Car> {
    try {
      return await this.repository.save(car);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async updateCar(id: string, car: Car): Promise<Car> {
    const carToUpdate = await this.repository.findOne({
      where: { car_id: id },
    });

    if (carToUpdate) {
      // get the carToUpdate and update it with the new values
      await this.repository
        .createQueryBuilder()
        .update()
        .set(Object.assign(carToUpdate, car))
        .where('car_id = :id', { id: id })
        .execute();
    }
    return await this.repository.findOne({ where: { car_id: id } });
  }

  public async deleteCar(id: string): Promise<Car> {
    const carToDelete = await this.repository.findOne({
      where: { car_id: id },
    });
    if (carToDelete) {
      await this.repository.delete({ car_id: id });
    }
    return carToDelete;
  }
}
