import {
  Body,
  Controller,
  Delete,
  Get,
  Module,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CarRepositoryAbs } from './../../../application/repositories/carRepository';
import { CarUseCase } from './../../../application/use_cases/carUseCase';
import { AppConstants } from './../../../config/appConstants';
import { Car } from './../../../infrasctrucure/orm/entities/car.entity';
import { CarRepository } from './../../../infrasctrucure/repositories/carRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BasicResponseComponent,
  ProcessResultTypeEnum,
} from './../../../interface/dto/basicResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarBodyDTO } from './../../../interface/dto/car.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { Logger } from 'nestjs-pino';

const CONTROLLER = {
  NAME: '/car',
  ENDPOINTS: {
    GET_ALL: '/',
    GET_BY_ID: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
  },
};

@ApiTags(AppConstants.API_TAGS.CAR)
@Controller(CONTROLLER.NAME)
export class CarController {
  constructor(
    private readonly carUseCase: CarUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * CONTROLLER: GET ALL CARS
   */
  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'Get all cars' })
  @Get(CONTROLLER.ENDPOINTS.GET_ALL)
  public async getAllCars(): Promise<BasicResponseComponent> {
    try {
      const cars = await this.carUseCase.findAll();

      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: cars,
      };
    } catch (error) {
      return {
        status: ProcessResultTypeEnum.ERROR,
        code: 500,
        result: error,
      };
    }
  }

  /**
   * CONTROLLER: GET CAR BY ID
   */
  @ApiOperation({ summary: 'Get car by id' })
  @ApiResponse({ status: 200, description: 'Get car by id' })
  @Get(CONTROLLER.ENDPOINTS.GET_BY_ID)
  public async getCarById(@Param('id') id): Promise<BasicResponseComponent> {
    try {
      const car = await this.carUseCase.findById(id);
      if (Object.keys(car).length === 0) {
        return {
          code: 204,
          status: ProcessResultTypeEnum.WARN,
          result: {},
        };
      }
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: car,
      };
    } catch (error) {
      return {
        status: ProcessResultTypeEnum.ERROR,
        code: 500,
        result: error,
      };
    }
  }

  /**
   * CONTROLLER: CREATE CAR
   */
  @ApiOperation({ summary: 'Create car' })
  @ApiResponse({ status: 200, description: 'Create car' })
  @Post(CONTROLLER.ENDPOINTS.CREATE)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp',
        filename: (req, file, cb) => {
          return cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  public async createCar(
    @Body() car: CarBodyDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BasicResponseComponent> {
    try {
      delete car.file;
      console.log('car', car);
      const newCar = await this.carUseCase.create({
        ...car,
        car_image: file ? file.filename : null,
      });
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: newCar,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: ProcessResultTypeEnum.ERROR,
        code: 500,
        result: error,
      };
    }
  }

  /**
   * CONTROLLER: UPDATE CAR
   */
  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ status: 200, description: 'Update car' })
  @Put(CONTROLLER.ENDPOINTS.UPDATE)
  public async updateCar(
    @Param('id') id,
    @Body() car: Car,
  ): Promise<BasicResponseComponent> {
    try {
      const updatedCar = await this.carUseCase.update(id, car);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: updatedCar,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: ProcessResultTypeEnum.ERROR,
        code: 500,
        result: error,
      };
    }
  }

  /**
   * CONTROLLER: DELETE CAR
   */
  @ApiOperation({ summary: 'Delete car' })
  @ApiResponse({ status: 200, description: 'Delete car' })
  @Delete(CONTROLLER.ENDPOINTS.DELETE)
  public async deleteCar(@Param('id') id): Promise<BasicResponseComponent> {
    try {
      const deletedCar = await this.carUseCase.delete(id);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: deletedCar,
      };
    } catch (error) {
      return {
        status: ProcessResultTypeEnum.ERROR,
        code: 500,
        result: error,
      };
    }
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [
    CarUseCase,
    CarRepository,
    {
      provide: CarRepositoryAbs,
      useClass: CarRepository,
    },
  ],
})
export class carControllerModule {}
