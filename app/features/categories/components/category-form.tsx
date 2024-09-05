import {z} from 'zod'
import { Trash } from 'lucide-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { insertCategorySchema } from '@/db/schema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useTranslation } from 'react-i18next'

const formSchema = insertCategorySchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>;

type Props ={
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
}

export function CategoryForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: Props) {
    const { t } = useTranslation()
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    function handleSubmit(values: FormValues){
        onSubmit(values)
    }

    function handleDelete(){
        onDelete?.()
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
                <FormField 
                    name="name"
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("Name")}
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={disabled}
                                        placeholder={t("sheet.category.inputPlaceholder")}
                                        {...field}
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
                    {id? t("sheet.category.edit.confirmButton") : t("sheet.category.new.confirmButton")}
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
                        {t("sheet.category.edit.deleteButton")}
                    </Button>

                }
            </form>

        </Form>
    )
}