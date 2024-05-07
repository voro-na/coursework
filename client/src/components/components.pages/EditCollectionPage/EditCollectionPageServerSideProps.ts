import { fork, allSettled, serialize } from 'effector'
import { collectionModel } from './EditCollectionPage.model/edit-model'
import { fetchCollectionFx } from './EditCollectionPage.api'
import { GetServerSideProps } from 'next'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export const getEditEditPageServerSideProps: GetServerSideProps<
    any,
    Params
> = async (context) => {
    const { params } = context
    const collection = await fetchCollectionFx({
        id: params?.collectionId || '',
    })

    const scope = fork()
    await allSettled(collectionModel.pageStarted, { scope, params: collection })

    return {
        props: {
            title: 'edit',
            page: 'edit',
            values: serialize(scope),
        },
    }
}
