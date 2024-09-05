"use client"
import { useCreateCategory } from "../api/use-create-category"
import { useNewCategory } from "../hooks/use-new-category"
import {
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle
} from "@/components/ui/sheet"
import { CategoryForm } from "./category-form"
import { UseFormGetValues } from "react-hook-form"
import { z } from "zod"
import { insertCategorySchema } from "@/db/schema"
import { useTranslation } from "react-i18next"


const formSchema = insertCategorySchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>;

export function NewCategorySheet() {
    const { t } = useTranslation()

    const {isOpen, onClose} = useNewCategory()
    
    const mutation = useCreateCategory()

    function onSubmit(values: FormValues){
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        {t("sheet.category.new.title")}
                    </SheetTitle>
                    <SheetDescription>
                    {t("sheet.category.new.message")}
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm 
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: ''
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
