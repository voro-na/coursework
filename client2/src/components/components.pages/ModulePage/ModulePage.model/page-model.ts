import { createEvent, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { atom } from '@/shared/atom';
import { fetchCollectionFx } from '../ModulePage.api';
import { ICollectionDetails } from '@/types/module';

export const moduleModel = atom(() => {
    const SelectionPageGate = createGate();
    const pageStarted = createEvent<ICollectionDetails>();

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

    return {
        pageStarted,
        $collection,
        SelectionPageGate
    }
})