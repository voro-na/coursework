import * as yup from 'yup';

export interface ICollection {
    title: string,
    description: string,
    _id: string,
    author: string,
    cards: string[] 
}

const validationErrors = {
    title: 'Название не указано',
    description: 'Описание не указано',
    termin: 'Термин не указан',
}

export const validationCardSchema = yup.object({
    termin: yup.string().required(validationErrors.termin),
    description: yup.string().required(validationErrors.description),
});

export const validationSchema = yup.object({
    title: yup.string().required(validationErrors.title),
    description: yup.string().required(validationErrors.description),
    author: yup.string().required(),
    cards: yup.array().of(validationCardSchema).required(),
});

export type NewMCollectionSchema = yup.InferType<typeof validationSchema>

export type CardSchema = yup.InferType<typeof validationCardSchema>