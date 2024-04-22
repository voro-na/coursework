
import * as React from 'react';
import { FC } from 'react';
import { Box, Card, CardContent, IconButton, Stack, TextField, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardSchema, NewMCollectionSchema } from '@/types/collection';
import { FormikErrors, FormikTouched } from 'formik';

type ICardCreateProps = {
    termin: string,
    description: string,
    handleCardChange: (index: number, fieldName: keyof CardSchema, value: string) => void
    onRemove?: () => void,
    index: number,
    touched: FormikTouched<NewMCollectionSchema>,
    errors: FormikErrors<NewMCollectionSchema>,
}


export const CardCreate: FC<ICardCreateProps> = ({ termin, description, index, handleCardChange, touched, errors }) => {

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent >
                    <Stack direction="row" spacing={2} justifyContent={'space-between'} >
                        <TextField
                            id={`card-termin-${index}`}
                            label="Термин"
                            variant="standard"
                            name={`cards[${index}].termin`}
                            value={termin} 
                            fullWidth
                            onChange={(e) => handleCardChange(index, 'termin', e.target.value)}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}/>
                            
                        <TextField
                            id={`card-description-${index}`}
                            label="Описание"
                            variant="standard"
                            name={`cards[${index}].description`}
                            value={description} 
                            fullWidth
                            onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}/>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
        </Box >
    );
}