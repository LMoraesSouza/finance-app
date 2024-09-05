"use client"
import { useGetCategory } from "../api/use-get-category"
import {
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle
} from "@/components/ui/sheet"
import { CategoryForm } from "./category-form"
import { z } from "zod"
import { insertCategorySchema } from "@/db/schema"
import { useOpenCategory } from "../hooks/use-open-category"
import { Loader2 } from "lucide-react"
import { useEditCategory } from "../api/use-edit-category"
import { useDeleteCategory } from "../api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm"
import { useTranslation } from "react-i18next"


const formSchema = insertCategorySchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>;

export function EditCategorySheet() {
    const { t } = useTranslation()

    const {isOpen, onClose, id} = useOpenCategory()
    const [ConfirmDialog, confirm] = useConfirm(
        t("confirm.sure"),
        t("confirm.delete.category")
    )

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = categoryQuery.isLoading

    function onSubmit(values: FormValues){
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    async function onDelete() {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } :
    {
        name: ''
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>
                            {t("sheet.category.edit.title")}
                        </SheetTitle>
                        <SheetDescription>
                            {t("sheet.category.edit.message")}
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ?
                        (
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <Loader2 className='size-4 text-muted-foreground animate-spin'/>
                            </div>
                        )
                        :
                        (
                            <CategoryForm 
                                id={id}
                                onSubmit={onSubmit}
                                disabled={isPending}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />

                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}
