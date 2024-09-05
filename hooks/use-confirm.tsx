import {useState} from 'react'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'

export const useConfirm = (
    title: string,
    message: string
) : [() => JSX.Element, () => Promise<unknown>] => {
    const { t } = useTranslation()

    const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='pt2'>
                    <Button
                        onClick={handleCancel}
                        variant='outline'
                    >
                        {t("Cancel")}
                    </Button>
                    <Button onClick={handleConfirm}>
                        {t("Confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmationDialog, confirm]


}