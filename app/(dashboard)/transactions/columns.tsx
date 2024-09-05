"use client"

import { InferResponseType } from "hono"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { client } from '@/lib/hono'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"
import { format } from "date-fns"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AccountColumn } from "./account-column"
import { CategoryColumn } from "./category-column"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0]

export const columns: ColumnDef<ResponseType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },  
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Date"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
              
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        },
        cell: ({row}) => {
          const date = row.getValue("date") as Date

          return (
            <span>
              {format(date, 'dd MMMM, yyyy')}
            </span>
          )
        }
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
          return (
            <DataGridHeaderButton
              label="Category"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </DataGridHeaderButton>
          )
      },
      cell: ({row}) => {
        const date = row.getValue("date") as Date

        return (
          <CategoryColumn 
            id={row.original.id}
            category={row.original.category}
            categoryId={row.original.categoryId}
          />
        )
      }
    },
    {
      accessorKey: "payee",
      header: ({ column }) => {
          return (
            <DataGridHeaderButton
              label="Payee"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </DataGridHeaderButton>
          )
      },
      
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
          return (
            <DataGridHeaderButton
              label="Amount"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </DataGridHeaderButton>
          )
      },
      cell: ({row}) => {
        const amount = parseFloat(row.getValue("amount"))

        return (
          <Badge 
            variant={amount < 0 ? "destructive" : "primary"}
            className='text-xs font-medium ´x-3.5 py-2.5'
          >
            {formatCurrency(amount)}
          </Badge>
        )
      }
    },
    {
      accessorKey: "account",
      header: ({ column }) => {
          return (
            <DataGridHeaderButton
              label="Account"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </DataGridHeaderButton>
          )
      },
      cell: ({row}) => {
        const amount = parseFloat(row.getValue("account"))

        return (
          <AccountColumn
            account={row.original.account}
            accountId={row.original.accountId}
          />
        )
      }
    },
    {
      id: "actions",
      cell: ({row}) => <Actions id={row.original.id}/>
    }
]
