

import { allSettled, fork, serialize } from 'effector';
import { fetchCollectionFx } from './ModulePage.api';
import { moduleModel } from './ModulePage.model/page-model';
import { GetServerSideProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const getModulePageServerSideProps: GetServerSideProps<any, Params> = async (context) => {
    const { params } = context;
    const collection = await fetchCollectionFx({id: params?.module || ''})

    const scope = fork();

    await allSettled(moduleModel.pageStarted, { scope, params: collection});

    return {
        props: {
            title: 'collection',
            page: 'collection',
            values: serialize(scope),
        }
    };
};
