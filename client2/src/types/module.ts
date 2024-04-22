
export interface ICollectionItem {
    termin: string;
    description: string,
    isLiked: boolean,
    id: string,
}

export interface ICollectionDetails {
    title: string,
    description: string,
    _id: string,
    author: string,
    cards: ICollectionItem[] 
}