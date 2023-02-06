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
import { Reservation } from './../../../infrasctrucure/orm/entities/reservation.entity';
import { ReservationUseCase } from './../../../application/use_cases/reservationUseCase';
import { ReservationRepository } from './../../../infrasctrucure/repositories/reservationRepository';
import { ReservationRepositoryAbs } from './../../../application/repositories/reservationRepository';
import { ReservationBodyDTO } from './../../../interface/dto/reservation.dto';

const CONTROLLER = {
  NAME: '/reservation',
  ENDPOINTS: {
    GET_ALL: '/',
    GET_BY_ID: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
  },
};

@ApiTags(AppConstants.API_TAGS.RESERVATION)
@Controller(CONTROLLER.NAME)
export class ReservationController {
  constructor(
    private readonly reservationUseCase: ReservationUseCase,
    private readonly logger: Logger,
  ) {}

  /**
   * CONTROLLER: GET ALL RESERVATIONS
   */
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Get all reservations' })
  @Get(CONTROLLER.ENDPOINTS.GET_ALL)
  public async getAllReservations(): Promise<BasicResponseComponent> {
    try {
      const reservations = await this.reservationUseCase.findAll();

      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: reservations,
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
   * CONTROLLER: GET RESERVATION BY ID
   */
  @ApiOperation({ summary: 'Get reservation by id' })
  @ApiResponse({ status: 200, description: 'Get reservation by id' })
  @Get(CONTROLLER.ENDPOINTS.GET_BY_ID)
  public async getReservationById(
    @Param('id') id,
  ): Promise<BasicResponseComponent> {
    try {
      const reservation = await this.reservationUseCase.findById(id);
      if (Object.keys(reservation).length === 0) {
        return {
          code: 204,
          status: ProcessResultTypeEnum.WARN,
          result: {},
        };
      }
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: reservation,
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
   * CONTROLLER: CREATE RESERVATION
   */
  @ApiOperation({ summary: 'Create reservation' })
  @ApiResponse({ status: 200, description: 'Create reservation' })
  @Post(CONTROLLER.ENDPOINTS.CREATE)
  public async createReservation(
    @Body() reservation: ReservationBodyDTO,
  ): Promise<BasicResponseComponent> {
    try {
      const newReservation = await this.reservationUseCase.create(reservation);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: newReservation,
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
   * CONTROLLER: UPDATE RESERVATION
   */
  @ApiOperation({ summary: 'Update reservation' })
  @ApiResponse({ status: 200, description: 'Update reservation' })
  @Put(CONTROLLER.ENDPOINTS.UPDATE)
  public async updateReservation(
    @Param('id') id,
    @Body() reservation: Reservation,
  ): Promise<BasicResponseComponent> {
    try {
      const updatedReservation = await this.reservationUseCase.update(
        id,
        reservation,
      );
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: updatedReservation,
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
   * CONTROLLER: DELETE RESERVATION
   */
  @ApiOperation({ summary: 'Delete reservation' })
  @ApiResponse({ status: 200, description: 'Delete reservation' })
  @Delete(CONTROLLER.ENDPOINTS.DELETE)
  public async deleteReservation(
    @Param('id') id,
  ): Promise<BasicResponseComponent> {
    try {
      const deletedReservation = await this.reservationUseCase.delete(id);
      return {
        code: 200,
        status: ProcessResultTypeEnum.NORMAL,
        result: deletedReservation,
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
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [
    ReservationUseCase,
    ReservationRepository,
    {
      provide: ReservationRepositoryAbs,
      useClass: ReservationRepository,
    },
  ],
})
export class reservationControllerModule {}
