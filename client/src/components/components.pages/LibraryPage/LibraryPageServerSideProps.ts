import { allSettled, fork, serialize } from 'effector'
import { fetchCollectionsFx } from './LibraryPage.api'
import { libraryModel } from './LibraryPage.model/page-model'

export const getLibraryPageServerSideProps = async () => {
    const cards = await fetchCollectionsFx()

    const scope = fork()

    await allSettled(libraryModel.pageStarted, {
        scope,
        params: { cards: cards },
    })

    return {
        props: {
            title: 'library',
            page: 'library',
            values: serialize(scope),
        },
    }
}
