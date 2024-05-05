import React, { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { ListItem } from '@/components/components.common/ListItem';
import Typography from '@mui/material/Typography';
import { useGate, useUnit } from 'effector-react';
import { moduleModel } from './ModulePage.model/page-model';

interface IModulePageProps {
    module: string,
}

export const ModulePage = ({ params }: { params: IModulePageProps }) => {
    useGate(moduleModel.SelectionPageGate);

    const [collection, onRemove] = useUnit([moduleModel.$collection, moduleModel.removeCard])

    console.log(collection)

    return (
        <>
            <Grid xs={12} md={8} style={{ margin: '20px 50px' }}>
                <Typography variant="h5" gutterBottom>
                    Карточек в модуле: {collection.cards.length}
                </Typography>
                {collection.cards.map((item, index) =>
                    <ListItem key={index} {...item} onRemove={onRemove} />)}
            </Grid>
        </>
    );
};

