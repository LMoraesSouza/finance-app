"use client"
import { useGetTransaction } from "../api/use-get-transaction"
import {
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle
} from "@/components/ui/sheet"
import { TransactionForm } from "./transaction-form"
import { z } from "zod"
import { insertTransactionSchema } from "@/db/schema"
import { useOpenTransaction } from "../hooks/use-open-transaction"
import { Loader2 } from "lucide-react"
import { useEditTransaction } from "../api/use-edit-transaction"
import { useDeleteTransaction } from "../api/use-delete-transaction"
import { useConfirm } from "@/hooks/use-confirm"
import { useCreateAccount } from "../../accounts/api/use-create-account"
import { useGetAccounts } from "../../accounts/api/use-get-accounts"
import { useCreateCategory } from "../../categories/api/use-create-category"
import { useGetCategories } from "../../categories/api/use-get-categories"
import { useTranslation } from "react-i18next"


const formSchema = insertTransactionSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>;

export function EditTransactionSheet() {
    const { t } = useTranslation()

    const {isOpen, onClose, id} = useOpenTransaction()
    const [ConfirmDialog, confirm] = useConfirm(
        t("confirm.sure"),
        t("confirm.delete.transaction")
    )

    const transactionQuery = useGetTransaction(id)
    const editMutation = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)

    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()
    function onCreateCategory(name: string){ 
        categoryMutation.mutate({
            name
        })
    }
    const categoryOptions = (categoryQuery.data??[]).map((category) => ({
        label: category.name,
        value: category.id
    }))

    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
    function onCreateAccount(name: string){ 
        accountMutation.mutate({
            name
        })
    }
    const accountOptions = (accountQuery.data??[]).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending = 
        editMutation.isPending || 
        deleteMutation.isPending ||
        transactionQuery.isLoading ||
        categoryMutation.isPending ||
        accountMutation.isPending 

    const isLoading = 
        transactionQuery.isLoading ||
        categoryQuery.isPending ||
        accountQuery.isPending 

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

    const defaultValues = transactionQuery.data ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date
            ? new Date(transactionQuery.data.date)
            : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes
    } :
    {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: ""
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>
                            {t("sheet.transaction.edit.title")}
                        </SheetTitle>
                        <SheetDescription>
                        {t("sheet.transaction.new.title")}
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
                            <TransactionForm 
                                id={id}
                                defaultValues={defaultValues}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions={accountOptions}
                                onCreateAccount={onCreateAccount}
                            />

                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}
