export class CreateCollectionDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly cards?: CreateCardDto[];
}

export class CreateCardDto {
  readonly termin: string;
  readonly description: string;
}

export class updatedCollectionDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly newCards?: CreateCardDto[];
  readonly cardIds?: string[];
}
