import { createEvent, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { atom } from '@/shared/atom';
import { fetchCollectionFx, removeCardFx } from '../ModulePage.api';
import { ICollectionDetails } from '@/types/module';

export const moduleModel = atom(() => {
    const SelectionPageGate = createGate();
    const pageStarted = createEvent<ICollectionDetails>();
    const removeCard = createEvent<{ cardId: string }>();

    const $collection = restore(
        pageStarted,
        {
            title: '',
            description: '',
            author: 'me',
            cards: [],
            _id: '',
        },
    );

    sample({
        clock: fetchCollectionFx.doneData,
        target: $collection,
    });

    sample({
        clock: removeCard,
        fn: ({ cardId }) => ({ cardId, collectionId: $collection.map(r => r._id).getState() }),
        target: removeCardFx
    })

    sample({
        clock: removeCardFx.done,
        fn: () => ({ id: $collection.map(r => r._id).getState() }),
        target: fetchCollectionFx,
    })

    return {
        pageStarted,
        $collection,
        SelectionPageGate,
        removeCard,
    }
})