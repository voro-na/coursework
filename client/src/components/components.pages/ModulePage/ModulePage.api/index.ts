import { createRequestFx } from "@/shared/api-request/request";
import { ICollection } from "@/types/collection";
import { ICollectionDetails } from "@/types/module";

export const fetchCollectionFx = createRequestFx<{ id: string }, ICollectionDetails>(({ id }) => ({
    url: `http://localhost:3001/collections/${id}`,
    method: 'GET',
}));

export const removeCardFx = createRequestFx<{ collectionId: string, cardId: string }, void>(({ cardId, collectionId }) => ({
    url: `http://localhost:3001/collections/${collectionId}/card/${cardId}`,
    method: 'DELETE',
}));
