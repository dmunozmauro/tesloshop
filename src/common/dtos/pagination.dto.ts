import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @ApiProperty({ default: 10, description: 'Cuantas filas se necesiten', required: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ default: 10, description: 'Cuantas filas se omiten', required: false })
    @IsOptional()
    @Type(() => Number)
    offset?: number;
}