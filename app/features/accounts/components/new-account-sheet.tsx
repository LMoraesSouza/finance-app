"use client"
import { useCreateAccount } from "../api/use-create-account"
import { useNewAccount } from "../hooks/use-new-account"
import {
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetHeader, 
    SheetTitle
} from "@/components/ui/sheet"
import { AccountForm } from "./account-form"
import { UseFormGetValues } from "react-hook-form"
import { z } from "zod"
import { insertAccountSchema } from "@/db/schema"


const formSchema = insertAccountSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>;

export function NewAccountSheet() {
    const {isOpen, onClose} = useNewAccount()
    
    const mutation = useCreateAccount()

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
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
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
