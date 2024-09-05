import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";


type Props = {
    label: string
    children?: React.ReactNode
    onClick?: () => void   
}

export function DataGridHeaderButton({
    label,
    children,
    onClick,
}: Props) {
    const { t } = useTranslation()
    
    return (
        <Button
            variant="ghost"
            onClick={onClick}
        >
            
            {t(label)}
            {children}
        </Button>
    )
}