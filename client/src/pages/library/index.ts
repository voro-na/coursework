import { LibraryPage } from '@/components/components.pages/LibraryPage'
import { getLibraryPageServerSideProps } from '@/components/components.pages/LibraryPage/LibraryPageServerSideProps'
import { GetServerSideProps } from 'next'

export const getServerSideProps =
    getLibraryPageServerSideProps satisfies GetServerSideProps

export default LibraryPage
