"use client"

import { InferResponseType } from "hono"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {client} from '@/lib/hono'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Actions } from "./actions"
import { DataGridHeaderButton } from "@/components/data-grid-header-button"

export type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>["data"][0]

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
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <DataGridHeaderButton
                label="Name"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </DataGridHeaderButton>
            )
        }
    },
    {
      id: "actions",
      cell: ({row}) => <Actions id={row.original.id}/>
    }
]
