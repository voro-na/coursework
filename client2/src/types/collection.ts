import * as yup from 'yup';

export interface ICollection {
    title: string,
    description: string,
    _id: string,
    author: string,
    cards: string[] 
}

export const validationCardSchema = yup.object({
    termin: yup.string().required(),
    description: yup.string().required(),
});

export const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    author: yup.string().required(),
    cards: yup.array().of(validationCardSchema).required(),
});

export type NewMCollectionSchema = yup.InferType<typeof validationSchema>

export type CardSchema = yup.InferType<typeof validationCardSchema>