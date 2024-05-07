import { createRequestFx } from '@/shared/api-request/request'
import { ICollection } from '@/types/collection'

export const fetchCollectionsFx = createRequestFx<void, ICollection[]>(() => ({
    url: 'http://localhost:3001/collections',
    method: 'GET',
}))

export const removeCollectionFx = createRequestFx<{ id: string }, {}>(
    ({ id }) => ({
        url: `http://localhost:3001/collections/${id}`,
        method: 'DELETE',
    })
)
