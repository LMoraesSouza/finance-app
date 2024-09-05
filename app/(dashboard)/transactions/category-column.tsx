import { useOpenCategory } from "@/app/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/app/features/transactions/hooks/use-open-transaction";

import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
    id: string
    category: string | null;
    categoryId: string | null;
}


export function CategoryColumn ({
    id,
    category,
    categoryId
}: Props) {
    const { t } = useTranslation()

    const { onOpen: onOpenCategory } = useOpenCategory()
    const { onOpen: onOpenTransaction } = useOpenTransaction()

    function onClick () {
        categoryId ? onOpenCategory(categoryId) : onOpenTransaction(id)
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                'flex items-center cursor-pointer hover:underline',
                !category && 'text-rose-500'
            )}
        >
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
            {category || t("Uncategorized")}
        </div>
    )
}