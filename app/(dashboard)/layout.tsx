import { Header } from "@/components/header"

type Props = {
    children: React.ReactNode
}
export default function DashboardLayout(props: Props) {
    return(
        <>
            <Header />
            <main className='px-3 lg:px-14'>
                {props.children}
            </main>
        </>
        
    )
}