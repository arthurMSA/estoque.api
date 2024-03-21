import { ApiProperty } from '@nestjs/swagger'

export class SearchProductDto {
  @ApiProperty({ required: false })
  name: string

  @ApiProperty({ required: false, default: 1 })
  page: number
}
