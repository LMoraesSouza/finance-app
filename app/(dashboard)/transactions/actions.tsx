"use client"

import { useDeleteTransaction } from '@/app/features/transactions/api/use-delete-transaction'
import { useOpenTransaction } from '@/app/features/transactions/hooks/use-open-transaction'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

type Props = {
    id: string
}

export function Actions({id}: Props) {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    )
    
    const deleteMutation = useDeleteTransaction(id)    
    const {onOpen} = useOpenTransaction()

    async function handleDelete() {
        const ok = await confirm()
        
        if (ok) {
            deleteMutation.mutate()
        }

    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant='ghost' 
                        className='size-8 p-0'
                    >
                        <MoreHorizontal className='size-4'/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem 
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className='size-4 mr-2'/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                        className='text-red-500 hover:text-red-700 focus:text-red-700'
                    >
                        <Trash className='size-4 mr-2 '/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}