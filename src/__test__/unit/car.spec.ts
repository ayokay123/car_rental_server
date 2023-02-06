import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CarUseCase } from 'src/application/use_cases/carUseCase';
import { Car } from 'src/domain/entities/car';

describe('CarModule', () => {
  let module: TestingModule;
  let service: CarUseCase;
  const carData: Car = {
    car_id: '1dfsdfsdsdfsd',
    name: 'Audi',
    model: 'A6',
    year: 2019,
    color: 'Black',
    price: 10000,
    doors: 4,
    air_condition: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    if (module != null) {
      module.close();
    }
  });

  beforeEach(async () => {
    service = module.get<CarUseCase>(CarUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cars', async () => {
    const cars = await service.findAll();
    expect(cars.length).toBeGreaterThan(0);
  });

  it('should return a car by id', async () => {
    const car = await service.findById(carData.car_id);
    expect(car).toBeDefined();
  });

  it('should create a car', async () => {
    const car = await service.create(carData);
    expect(car).toBeDefined();
  });

  it('should update a car', async () => {
    const car = await service.update(carData.car_id, {
      ...carData,
      model: 'A6',
    });
    expect(car).toBeDefined();
    expect(car.model).toBe('A6');
  });

  it('should delete a car', async () => {
    const car = await service.delete(carData.car_id);
    expect(car).toBeDefined();
    expect(car.car_id).toBe(carData.car_id);
    const allCars = await service.findAll();
    expect(allCars.filter((car) => car.car_id === carData.car_id).length).toBe(
      0,
    );
  });
});
