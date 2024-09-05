"use client"

import { useNewAccount } from '@/app/features/accounts/hooks/use-new-account'
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
import { useGetAccounts } from '@/app/features/accounts/api/use-get-accounts'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteAccount } from '@/app/features/accounts/api/use-bulk-delete-accounts'
import { useTranslation } from 'react-i18next'


export default function AccountsPage() {
    const { t } = useTranslation()

    const newAccount = useNewAccount()
    const deleteAccounts = useBulkDeleteAccount()
    const accountsQuery = useGetAccounts()
    const accounts = accountsQuery.data || []

    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending

    if (accountsQuery.isLoading) {
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
    
    return(
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        {t("accountsPage")}
                    </CardTitle>

                    <Button onClick={newAccount.onOpen} size='sm'>
                        <PlusIcon className='size-4 mr-2'/>
                        {t("addNew")}
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        columns={columns} 
                        data={accounts}
                        filterKey="name"   
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteAccounts.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>

            </Card>
        </div>
    )
}