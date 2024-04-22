import React, { FC, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button, Snackbar, Stack, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { useUnit } from 'effector-react';
import { collectionModel } from './CreateEditPage.model/create-model';
import { CardCreate } from '@/components/components.common/CardCreate/CardCreate';
import { NewMCollectionSchema, CardSchema, validationSchema } from '@/types/collection';


export const CreateEditPage: FC = () => {

    const [isNotifyOpen, setIsNotifyOpen] = useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsNotifyOpen(false);
    };

    const [createCollection, notifyMessage] = useUnit([
        collectionModel.createCollectionFx,
        collectionModel.$notifyMessage])

    const onSubmit = async (values: NewMCollectionSchema, { resetForm }: FormikHelpers<NewMCollectionSchema>) => {
        try {
            await createCollection(values)
            resetForm();
        } catch (_e) { }
        setIsNotifyOpen(true);
    };

    const addCard = () => {
        setValues({
            ...values,
            cards: [
                ...values.cards,
                {
                    termin: '',
                    description: '',
                },
            ],
        });
    };

    const handleCardChange = (index: number, fieldName: keyof CardSchema, value: string) => {
        const updatedCards = [...values.cards];
        updatedCards[index][fieldName] = value;
        setValues({
            ...values,
            cards: updatedCards,
        });
    };

    const { handleSubmit, handleBlur, handleChange, values, errors, setValues, touched } = useFormik<NewMCollectionSchema>({
        initialValues: {
            title: '',
            description: '',
            author: 'me',
            cards: [],
        },
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <>
            <Grid xs={12} md={8} style={{ margin: '20px 50px' }}>
                <form onSubmit={handleSubmit}>

                    <Stack direction={'row'} justifyContent='space-between' mb={2}>
                        <Typography variant="h4" gutterBottom>
                            Cоздание подборки
                        </Typography>
                        <div>
                            <Button variant="contained" type='submit' >Cоздать</Button>
                        </div>
                    </Stack>

                    <Stack spacing={2}>
                        <TextField
                            id="title"
                            name='title'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Название"
                            variant="outlined"
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />

                        <TextField
                            id="description"
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Описание"
                            variant="outlined"
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description} />

                        {values.cards.map((card, index) => (
                            <div key={index}>
                                <CardCreate
                                    termin={card.termin}
                                    description={card.description}
                                    index={index}
                                    handleCardChange={handleCardChange}
                                    touched={touched}
                                    errors={errors} />
                            </div>
                        ))}
                    </Stack>
                </form>

                <Button variant="outlined" onClick={addCard}>
                    Добавить карту
                </Button>

                <Snackbar
                    open={isNotifyOpen}
                    autoHideDuration={3000}
                    message={notifyMessage}
                    onClose={handleClose}
                />
            </Grid>
        </>
    );
};
