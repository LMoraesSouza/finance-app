"use client"

import { useGetSummary } from "@/app/features/summary/api/use-get-summary"
import { formatDateRange } from "@/lib/utils"
import  {FaPiggyBank} from 'react-icons/fa'
import  {FaArrowTrendDown,  FaArrowTrendUp, } from 'react-icons/fa6'
import { useSearchParams } from "next/navigation"
import { DataCard, DataCardLoading } from "./data-card"
import { useTranslation } from "react-i18next"

export function DataGrid(){
    const { t } = useTranslation()
    
    const {data, isLoading } = useGetSummary()

    const params = useSearchParams()
    const to = params.get("to") || undefined
    const from = params.get("from") || undefined

    const dateRangeLabel = formatDateRange({to, from})

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard 
                title={t("Balance")}
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard 
                title={t("Income")}
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard 
                title={t("Expenses")}
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
        </div>
    )
}