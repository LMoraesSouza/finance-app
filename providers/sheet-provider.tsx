"use client"

import { useMountedState } from "react-use"
import { NewAccountSheet } from "@/app/features/accounts/components/new-account-sheet"
import { NewCategorySheet } from "@/app/features/categories/components/new-account-sheet"
import { NewTransactionSheet } from "@/app/features/transactions/components/new-transaction-sheet"
import { EditAccountSheet } from "@/app/features/accounts/components/edit-account-sheet"
import { EditCategorySheet } from "@/app/features/categories/components/edit-category-sheet"
import { EditTransactionSheet } from "@/app/features/transactions/components/edit-transaction-sheet"

export function SheetProvider() {3
    const isMounted = useMountedState()

    if (!isMounted){
        return null
    }
    
    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />

            <NewCategorySheet />
            <EditCategorySheet />

            <NewTransactionSheet />
            <EditTransactionSheet />
        </>
    )

}