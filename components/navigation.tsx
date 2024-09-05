"use client"

import { useMedia } from 'react-use'
import { usePathname, useRouter } from "next/navigation"
import { NavButton } from "./nav-button"
import { Sheet, SheetContent, SheetTrigger} from  './ui/sheet'
import { useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'


export function Navigation(){
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMedia("(max-width: 1024px", false)

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    const routes =[
        {
            href: '/',
            label: t("Overview")
        },
        {
            href: '/transactions',
            label: t("Transactions")
        },
        {
            href: '/accounts',
            label: t("Accounts")
        },
        {
            href: '/categories',
            label: t("Categories")
        },
        {
            href: '/settings',
            label: t("Settings")
        },
    ]

    if(isMobile){
        return(
           <Sheet open={isOpen} onOpenChange={setIsOpen} >
                <SheetTrigger>
                    <Button
                        variant='outline'
                        size='sm'
                        className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white30 transition'
                    >
                        <Menu className='size-4'/>    
                    </Button>

                </SheetTrigger>

                <SheetContent side='left' className='px-2'>
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {routes.map(route => {
                            return (
                                <Button
                                    key={route.href}
                                    className='w-full justify-start'
                                    variant={route.href === pathname ? "secondary" : "ghost" }
                                    onClick={() => onClick(route.href)}
                                >
                                    {(route.label)}
                                </Button>
                            )
                        })}
                    </nav>

                </SheetContent>
           </Sheet> 
        )
    }

    return(
        <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
           {routes.map(route=>{
                return <NavButton 
                            key={route.href} 
                            href={route.href} 
                            label={route.label} 
                            isActive={pathname === route.href}
                        />
           })}
        </nav>
    )
}