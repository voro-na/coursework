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
  UseGuards,
  Request
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import {
  CreateCardDto,
  CreateCollectionDto,
} from './dto/create-collection.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/collections')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCollectionDto, @Request() req) {
    const userId = req.user.sub;
    return this.collectionService.create(dto, userId);
  }

  @Put(':collectionId')
  async editCollection(
    @Param('collectionId') collectionId: ObjectId,
    @Body() updateDto: CreateCollectionDto,
  ) {
    try {
      return this.collectionService.editCollection(collectionId, updateDto);
    } catch (error) {
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
  
  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.collectionService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number, @Request() req) {
    const userId = req.user.sub;
    return this.collectionService.getAll(count, offset, userId);
  }

  // @UseGuards(AuthGuard)
  // @Get()
  // getProfile(@Request() req) {
  //   return this.authService.getCards(req.user.username);
  // }

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
