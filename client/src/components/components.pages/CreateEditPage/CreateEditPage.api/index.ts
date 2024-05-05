import { createRequestFx } from "@/shared/api-request/request";
import { ICollection } from "@/types/collection";

interface CreateCollection {
    title: string, 
    description: string,
    author: string,
}

export const createCollectionFx = createRequestFx<CreateCollection, ICollection>((collection) => ({
    url: 'http://localhost:3001/collections',
    method: 'POST',
    body: { json: collection }
}));
