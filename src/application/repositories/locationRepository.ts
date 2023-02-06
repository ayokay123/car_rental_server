import { Location } from 'src/domain/entities/location';

export abstract class LocationRepositoryAbs {
  abstract getAllLocations(): Promise<Location[]>;
  abstract getLocationById(id: string): Promise<Location>;
  abstract createLocation(location: Location): Promise<Location>;
  abstract updateLocation(id: string, location: Location): Promise<Location>;
  abstract deleteLocation(id: string): Promise<Location>;
}
