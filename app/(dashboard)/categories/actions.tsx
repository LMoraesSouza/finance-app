"use client"

import { useDeleteCategory } from '@/app/features/categories/api/use-delete-category'
import { useOpenCategory } from '@/app/features/categories/hooks/use-open-category'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Props = {
    id: string
}

export function Actions({id}: Props) {
    const { t } = useTranslation()

    const [ConfirmDialog, confirm] = useConfirm(
        t("confirm.sure"),
        t("confirm.delete.category")
    )
    
    const deleteMutation = useDeleteCategory(id)    
    const {onOpen} = useOpenCategory()

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
                        {t("Edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                        className='text-red-500 hover:text-red-700 focus:text-red-700'
                    >
                        <Trash className='size-4 mr-2 '/>
                        {t("Delete")}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}