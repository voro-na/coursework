import { GetServerSidePropsContext } from 'next'
import { HttpError } from './application-error'

export interface IBackendError {
    code: string
    details: string
}

export interface IResponse<TResult = {}, TError = HttpError> {
    result: TResult
    error: TError | null
}

export type IErrorResponse<TError = HttpError> = Omit<IResponse, 'error'> & {
    error: TError
}

export function isErrorResponse<TError>(
    response: IResponse<unknown, TError>
): response is IErrorResponse<TError> {
    return response?.error != null
}

export type TRequest = GetServerSidePropsContext['req'] & Record<string, any>
