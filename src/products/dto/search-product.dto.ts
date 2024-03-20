import { ApiProperty } from '@nestjs/swagger'

export class SearchProductDto {
  @ApiProperty({ required: false })
  name: string
}
