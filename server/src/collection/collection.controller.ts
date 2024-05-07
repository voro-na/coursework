import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import {
  CreateCardDto,
  CreateCollectionDto,
} from './dto/create-collection.dto';
import { ObjectId } from 'mongoose';

@Controller('/collections')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Post()
  create(@Body() dto: CreateCollectionDto) {
    return this.collectionService.create(dto);
  }

  @Put(':collectionId')
  async editCollection(
    @Param('collectionId') collectionId: ObjectId,
    @Body() updateDto: CreateCollectionDto,
  ) {
    try {
      return this.collectionService.editCollection(collectionId, updateDto);
    } catch (error) {
      // Handle error (e.g., log, return specific response)
      throw error;
    }
  }

  @Post(':collectionId/card')
  createCard(
    @Body() dto: CreateCardDto,
    @Param('collectionId') collectionId: ObjectId,
  ) {
    return this.collectionService.addCard(dto, collectionId);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.collectionService.getOne(id);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.collectionService.getAll(count, offset);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.collectionService.search(query);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.collectionService.delete(id);
  }

  @Delete(':collectionId/card/:cardId')
  deleteCard(
    @Param('collectionId') collectionId: ObjectId,
    @Param('cardId') cardId: ObjectId,
  ) {
    try {
      return this.collectionService.deleteCard(collectionId, cardId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
