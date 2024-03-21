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

  async findAll(searchProductDto: SearchProductDto) {
    const productPerPage = 5
    const currentPage = searchProductDto.page
    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: searchProductDto.name,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      orderBy: {
        name: 'asc',
      },
      take: productPerPage,
      skip: productPerPage * (currentPage - 1),
    })
    const count = await this.prisma.product.count({
      where: {
        name: {
          contains: searchProductDto.name,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
    })
    return {
      products,
      count,
    }
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
