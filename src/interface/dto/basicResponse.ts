import { ApiProperty } from '@nestjs/swagger';

export enum ProcessResultTypeEnum {
  NORMAL = 'NORMAL',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class BasicResponseComponent<T = any> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  status: ProcessResultTypeEnum;

  @ApiProperty()
  result?: T;
}

export class ErrorResponseComponent {
  message: string;
  detail: any;
}
