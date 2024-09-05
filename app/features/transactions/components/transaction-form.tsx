import {z} from 'zod'
import { Trash } from 'lucide-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { insertAccountSchema, insertTransactionSchema } from '@/db/schema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Select } from '@/components/select'
import { DatePicker } from '@/components/date-picker'
import { Textarea } from '@/components/ui/textarea'
import { AmountInput } from '@/components/input-amount'
import { convertAmountToMiliUnits } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionSchema.omit({
    id: true
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: {label: string, value: string}[],
    categoryOptions: {label: string, value: string}[],
    onCreateAccount: (name: string) => void,
    onCreateCategory: (name: string) => void,
}

export function TransactionForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    onCreateAccount,
    categoryOptions,
    onCreateCategory
}: Props) {
    const { t } = useTranslation()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    function handleSubmit(values: FormValues){
        const amount = parseFloat(values.amount)
        const amountInMiliUnits = convertAmountToMiliUnits(amount)

        
        onSubmit({
            ...values,
            amount: amountInMiliUnits
        })
    }

    function handleDelete(){
        onDelete?.()
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
                <FormField 
                    name="date"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <DatePicker 
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <FormField 
                    name="accountId"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Account")}
                                </FormLabel>
                                <FormControl>
                                    <Select 
                                        placeholder={t("sheet.transaction.accountPlaceholder")}
                                        options={accountOptions}
                                        onCreate={onCreateAccount}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <FormField 
                    name="categoryId"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Category")}
                                </FormLabel>
                                <FormControl>
                                    <Select 
                                        placeholder={t("sheet.transaction.categoryPlaceholder")}
                                        options={categoryOptions}
                                        onCreate={onCreateCategory}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <FormField 
                    name="payee"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Payee")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disabled}
                                        placeholder={t("sheet.transaction.payeePlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <FormField 
                    name="amount"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Amount")}
                                </FormLabel>
                                <FormControl>
                                    <AmountInput
                                        {...field}
                                        disabled={disabled}
                                        placeholder='0.00'
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <FormField 
                    name="notes"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Notes")}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        value={field.value || ''}
                                        placeholder={t("sheet.transaction.notesPlaceholder")}
                                        disabled={disabled}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                
                <Button 
                    disabled={disabled} 
                    className='w-full'
                >
                    {id? t("sheet.transaction.edit.confirmButton") : t("sheet.transaction.new.confirmButton")}
                </Button>
                {!!id &&
                    <Button 
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className='w-full'
                        variant='outline'
                    >
                        <Trash className='size-4 mr-2'/>
                        {t("sheet.transaction.edit.deleteButton")}
                    </Button>

                }
            </form>

        </Form>
    )
}