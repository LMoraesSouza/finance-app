"use client"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

type Props = {
    children: React.ReactNode
}

export function LocalizationProvider({children}: Props) {
    const { i18n } = useTranslation()
    
    useEffect(() => {
        i18n.changeLanguage(navigator.language)
    }, [i18n])

    return (
        <>
            {children}
        </>
    )
}