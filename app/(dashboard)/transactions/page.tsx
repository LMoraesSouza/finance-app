"use client"

import {  useNewTransaction } from '@/app/features/transactions/hooks/use-new-transaction'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Loader2, PlusIcon } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useGetTransactions } from '@/app/features/transactions/api/use-get-transactions'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteTransaction } from '@/app/features/transactions/api/use-bulk-delete-transactions'
import { useState } from 'react'
import { UploadButton } from './upload-button'
import { ImportCard } from './import-card'
import { transactions as transactionSchema } from '@/db/schema'
import { useSelectAccount } from '@/app/features/accounts/hooks/use-select-account'
import { toast } from 'sonner'
import { useBulkCreateTransaction } from '@/app/features/transactions/api/use-bulk-create-transactions copy'
import { useTranslation } from 'react-i18next'

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS ={
    data: [],
    errors: [],
    meta: {}
}

export default function TransactionsPage() {
    const { t } = useTranslation()

    const [AccountDialog, confirm] = useSelectAccount()
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

    const newTransaction = useNewTransaction()
    const createTransactions = useBulkCreateTransaction()
    const deleteTransactions = useBulkDeleteTransaction()
    const transactionsQuery = useGetTransactions()
    const transactions = transactionsQuery.data || []

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

    function onUpload(results: typeof INITIAL_IMPORT_RESULTS){
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    function onCancelImport(){
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }

    async function onSubmitImport(
        values: typeof transactionSchema.$inferInsert[],
    ){
        const accountId = await confirm()

        if(!accountId){
            return toast.error(t("selectAccountToContinue"))
        }

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }))

        createTransactions.mutate(data, {
            onSuccess: () => {
                onCancelImport()
            }
        })

    }

    if (transactionsQuery.isLoading) {
        return (
            <div className='mas-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48'/>
                    </CardHeader>

                    <CardContent>
                        <div className='h-[500px] w-full flex items-center justify-center'>
                            <Loader2 className='size-6 text-slate-300 animate-spin'/>
                        </div>
                    </CardContent>
                </Card>

            </div>
        )
    }

    if (variant === VARIANTS.IMPORT ){
        return (
            <>
                <AccountDialog />
                <ImportCard 
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                />
            </>
        )
    }
    
    return(
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        {t("transactionsHistory")}
                    </CardTitle>
                    <div className='flex flex-col lg:flex-row gap-y-2 items-center gap-2'>
                        <Button 
                            className='w-full lg:w-auto'
                            onClick={newTransaction.onOpen} 
                            size='sm'
                        >
                            <PlusIcon className='size-4 mr-2'/>
                            {t("addNew")}
                        </Button>
                        <UploadButton 
                            onUpload={onUpload} 
                        />

                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        columns={columns} 
                        data={transactions}
                        filterKey="payee"   
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteTransactions.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>

            </Card>
        </div>
    )
}