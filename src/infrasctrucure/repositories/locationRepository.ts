import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { Location } from '../orm/entities/location.entity';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
    private readonly logger: Logger,
  ) {}

  public async getAllLocations(): Promise<Location[]> {
    return await this.repository.find();
  }

  public async getLocationById(id: string): Promise<Location> {
    return await this.repository.findOne({ where: { location_id: id } });
  }

  public async createLocation(location: Location): Promise<Location> {
    try {
      return await this.repository.save(location);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async updateLocation(
    id: string,
    location: Location,
  ): Promise<Location> {
    const locationToUpdate = await this.repository.findOne({
      where: { location_id: id },
    });
    if (locationToUpdate) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set(Object.assign(locationToUpdate, location))
        .where('location_id = :id', { id: id })
        .execute();
    }
    return await this.repository.findOne({ where: { location_id: id } });
  }

  public async deleteLocation(id: string): Promise<Location> {
    const locationToDelete = await this.repository.findOne({
      where: { location_id: id },
    });
    if (locationToDelete) {
      await this.repository.delete({ location_id: id });
    }
    return locationToDelete;
  }
}
