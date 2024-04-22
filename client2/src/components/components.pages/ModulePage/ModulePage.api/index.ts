import { createRequestFx } from "@/shared/api-request/request";
import { ICollection } from "@/types/collection";

export const fetchCollectionFx = createRequestFx<{ id: string }, ICollection>(({ id }) => ({
    url: `http://localhost:3001/collections/${id}`,
    method: 'GET',
}));
