import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { SearchProductDto } from './dto/search-product.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto })
  }

  findAll(searchProductDto: SearchProductDto) {
    return this.prisma.product.findMany({
      where: {
        name: searchProductDto.name,
        deletedAt: null,
      },
    })
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  remove(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
