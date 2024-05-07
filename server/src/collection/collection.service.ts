import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from './schemas/collection.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import {
  CreateCardDto,
  CreateCollectionDto,
  updatedCollectionDto,
} from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private CollectionModel: Model<Collection>,
    @InjectModel(Card.name) private cardModel: Model<Card>,
  ) {}

  async create(dto: CreateCollectionDto): Promise<Collection> {
    const createdAt = new Date();

    const cards = [];

    for (const cardDto of dto.cards) {
      const card = await this.cardModel.create({
        ...cardDto,
        collection: null,
      });
      cards.push(card);
    }

    const collection = await this.CollectionModel.create({
      ...dto,
      cards: cards,
      createdAt,
      editAt: createdAt,
    });

    if (cards.length > 0) {
      await this.cardModel.updateMany(
        { _id: { $in: cards } },
        { $set: { collection: collection._id } },
      );
    }

    return collection;
  }

  async editCollection(
    collectionId: ObjectId,
    updateDto: CreateCollectionDto,
  ): Promise<Collection> {
    const collection = await this.CollectionModel.findById(collectionId);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    if (updateDto.title) {
      collection.title = updateDto.title;
    }

    if (updateDto.description) {
      collection.description = updateDto.description;
    }

    if (updateDto.author) {
      collection.author = updateDto.author;
    }

    const cardsIds = collection.cards.map((card) => '' + card);

    cardsIds.forEach((id) => this.deleteCard(collectionId, id));

    if (updateDto.cards && updateDto.cards.length > 0) {
      for (const cardDto of updateDto.cards) {
        this.addCard(cardDto, collectionId);
      }
    }
    const updatedCollection = await collection.save();

    return updatedCollection;
  }

  async addCard(dto: CreateCardDto, collectionId: ObjectId): Promise<Card> {
    const card = await this.cardModel.create({
      description: dto.description,
      termin: dto.termin,
      collection: collectionId,
    });

    const collection = await this.CollectionModel.findById(collectionId);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    collection.cards.push(card);

    await collection.save();

    return card;
  }

  async getOne(id: ObjectId): Promise<Collection> {
    const collection = await this.CollectionModel.findById(id)
      .populate({ path: 'cards' })
      .exec();
    return collection;
  }

  async getAll(count = 10, offset = 0): Promise<Collection[]> {
    return await this.CollectionModel.find().skip(offset).limit(count);
  }

  async search(query: string): Promise<Collection[]> {
    const collections = await this.CollectionModel.find({
      title: { $regex: new RegExp(query, 'i') },
    });

    return collections;
  }

  async delete(id: ObjectId): Promise<Types.ObjectId> {
    const collection = await this.CollectionModel.findByIdAndDelete(id);
    return collection._id;
  }

  async deleteCard(
    collectionId: ObjectId,
    cardId: ObjectId | string,
  ): Promise<Types.ObjectId> {
    const collection = await this.CollectionModel.findById(collectionId);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    collection.cards = collection.cards.filter(
      (card) => '' + card !== String(cardId),
    );

    const card = await this.cardModel.findByIdAndDelete(cardId);
    await collection.save();

    return card._id;
  }
}
