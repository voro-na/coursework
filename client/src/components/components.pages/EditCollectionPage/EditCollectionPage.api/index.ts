import { createRequestFx } from "@/shared/api-request/request";
import { ICollection, ICollectionDetails } from "@/types/collection";

interface CreateCollection {
  title: string;
  description: string;
  author: string;
  cards: any[];
}

export const fetchCollectionFx = createRequestFx<
  { id: string },
  ICollectionDetails
>(({ id }) => ({
  url: `http://localhost:3001/collections/${id}`,
  method: "GET",
}));

export const updateCollectionFx = createRequestFx<
  { id: string; data: CreateCollection },
  ICollection
>(({ id, data }) => ({
  url: `http://localhost:3001/collections/${id}`,
  method: "PUT",
  body: { json: data },
}));
