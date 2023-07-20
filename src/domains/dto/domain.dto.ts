import { IsNotEmpty } from 'class-validator';

export class DomainDto {
  @IsNotEmpty()
  name!: string;
}
