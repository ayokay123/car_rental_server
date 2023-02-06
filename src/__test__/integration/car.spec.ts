import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CarUseCase } from 'src/application/use_cases/carUseCase';
import { Car } from 'src/domain/entities/car';

describe('CarModule', () => {
  let app: INestApplication;
  let module: TestingModule;
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

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/car (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/car').send();
    expect(res.status).toBe(200);
    expect(res.body.result.length).toEqual(1);
  });

  it('/api/car (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/car').send(carData);
    expect(res.status).toBe(201);
    expect(res.body.result).toBeDefined();
  });

  it('/api/car (PUT)', async () => {
    const res = await request(app.getHttpServer())
      .put('/car/' + carData.car_id)
      .send({ ...carData, model: 'A6' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeDefined();
  });

  it('/api/car (DELETE)', async () => {
    const res = await request(app.getHttpServer())
      .delete('/car/' + carData.car_id)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.result).toBeDefined();
  });
});
