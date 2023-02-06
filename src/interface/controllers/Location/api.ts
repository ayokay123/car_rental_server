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
import { AppConstants } from './../../../config/appConstants';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BasicResponseComponent,
  ProcessResultTypeEnum,
} from './../../../interface/dto/basicResponse';
import { Logger } from 'nestjs-pino';
import { Location } from './../../../infrasctrucure/orm/entities/location.entity';
import { LocationUseCase } from './../../../application/use_cases/locationUseCase';
import { LocationBodyDTO } from './../../../interface/dto/location.dto';
import { LocationRepository } from './../../../infrasctrucure/repositories/locationRepository';
import { LocationRepositoryAbs } from './../../../application/repositories/locationRepository';

const CONTROLLER = {
  NAME: '/location',
  ENDPOINTS: {
    GET_ALL: '/',
    GET_BY_ID: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
  },
};

@ApiTags(AppConstants.API_TAGS.LOCATION)
@Controller(CONTROLLER.NAME)
export class LocationController {
  constructor(
    private readonly locationUseCase: LocationUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * CONTROLLER: GET ALL LOCATIONS
   */
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, description: 'Get all locations' })
  @Get(CONTROLLER.ENDPOINTS.GET_ALL)
  public async getAllLocations(): Promise<BasicResponseComponent> {
    try {
      const locations = await this.locationUseCase.findAll();

      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: locations,
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
   * CONTROLLER: GET LOCATION BY ID
   */
  @ApiOperation({ summary: 'Get location by id' })
  @ApiResponse({ status: 200, description: 'Get location by id' })
  @Get(CONTROLLER.ENDPOINTS.GET_BY_ID)
  public async getLocationById(
    @Param('id') id,
  ): Promise<BasicResponseComponent> {
    try {
      const location = await this.locationUseCase.findById(id);
      if (Object.keys(location).length === 0) {
        return {
          code: 204,
          status: ProcessResultTypeEnum.WARN,
          result: {},
        };
      }
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: location,
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
   * CONTROLLER: CREATE LOCATION
   */
  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({ status: 200, description: 'Create location' })
  @Post(CONTROLLER.ENDPOINTS.CREATE)
  public async createLocation(
    @Body() location: LocationBodyDTO,
  ): Promise<BasicResponseComponent> {
    try {
      const newLocation = await this.locationUseCase.create(location);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: newLocation,
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
   * CONTROLLER: UPDATE LOCATION
   */
  @ApiOperation({ summary: 'Update location' })
  @ApiResponse({ status: 200, description: 'Update location' })
  @Put(CONTROLLER.ENDPOINTS.UPDATE)
  public async updateLocation(
    @Param('id') id,
    @Body() location: Location,
  ): Promise<BasicResponseComponent> {
    try {
      const updatedLocation = await this.locationUseCase.update(id, location);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: updatedLocation,
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
   * CONTROLLER: DELETE LOCATION
   */
  @ApiOperation({ summary: 'Delete location' })
  @ApiResponse({ status: 200, description: 'Delete location' })
  @Delete(CONTROLLER.ENDPOINTS.DELETE)
  public async deleteLocation(
    @Param('id') id,
  ): Promise<BasicResponseComponent> {
    try {
      const deletedLocation = await this.locationUseCase.delete(id);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: deletedLocation,
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
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [
    LocationUseCase,
    LocationRepository,
    {
      provide: LocationRepositoryAbs,
      useClass: LocationRepository,
    },
  ],
})
export class locationControllerModule {}
