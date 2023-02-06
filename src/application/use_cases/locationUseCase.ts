import { Injectable } from '@nestjs/common';
import { Location } from 'src/domain/entities/location';
import { LocationRepositoryAbs } from './../repositories/locationRepository';

@Injectable()
export class LocationUseCase {
  constructor(private readonly locationRepository: LocationRepositoryAbs) {}

  public async findAll(): Promise<Location[]> {
    return await this.locationRepository.getAllLocations();
  }

  public async findById(id: string): Promise<Location> {
    return await this.locationRepository.getLocationById(id);
  }

  public async create(location: Location): Promise<Location> {
    return await this.locationRepository.createLocation(location);
  }

  public async update(id: string, location: Location): Promise<Location> {
    return await this.locationRepository.updateLocation(id, location);
  }

  public async delete(id: string): Promise<Location> {
    return await this.locationRepository.deleteLocation(id);
  }
}
