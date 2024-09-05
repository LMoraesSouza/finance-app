"use client"

import {useUser} from '@clerk/nextjs'
import { useTranslation } from 'react-i18next'


export function WelcomeMsg(){
    const { t } = useTranslation()
    const {user, isLoaded} = useUser()

    return (
        <div className='space-y-2 mb-4'>
            <h2 className='text-2xp lg: text-4xl text-white font-medium'>
                {t("welcome.back")}
            </h2>
            <p className='text-sm lg:text-base text-[#89B6FD]'>
                {t("welcome.message")}
            </p>
        </div>
    )
}