import {  FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { BarVariant } from "./bar-variant"
import { useState } from "react"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select"
import { PieVariant } from "./pie-variant"
import { RadarVariant } from "./radar-variant"
import { RadialVariant } from "./radial-variant"
import { Skeleton } from "./ui/skeleton"
import { useTranslation } from "react-i18next"


type Props = {
    data?: {
        name: string,
        value: number
    } []
}

export function SpendingPie({
    data = []
}: Props) {
    const { t } = useTranslation()
    const [chartType, setChartType] = useState("pie")

    function onTypeChange(type: string) {
        setChartType(type)
    }

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lgspace-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-cl line-clamp-1">
                    {t("Categories")}
                </CardTitle>

                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center">
                                <PieChart className="size-4 mr-2 shrink-0"/>

                                <p className="line-clamp-1">
                                    {t("chart.pie")}
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center">
                                <Radar className="size-4 mr-2 shrink-0"/>
                                
                                <p className="line-clamp-1">
                                    {t("chart.radar")}
                                </p>
                            </div>
                        </SelectItem>

                        <SelectItem value="radial">
                            <div className="flex items-center">
                                <Target className="size-4 mr-2 shrink-0"/>
                                
                                <p className="line-clamp-1">
                                    {t("chart.radial")}
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent >
                {data.length === 0 ?
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className='size-6 text-muted-foreground'/>
                        <p className="text-muted-foreground text-sm">
                            {t("chart.noData")}
                        </p>
                    </div>    
                    :
                    <>
                        {chartType === "pie" && <PieVariant data={data} />}
                        {chartType === "radar" && <RadarVariant data={data} />}
                        {chartType === "radial" && <RadialVariant data={data} />}
                    </>
                    
                }
            </CardContent>
        </Card>
    )
}

export function SpendingPieLoading() {
    return (
        <Card className="border-none drop-shadow-ms">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <Skeleton className="h-8 w-48"/>
                <Skeleton className="h-8 lg:-[120px] w-full"/>
            </CardHeader>

            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-slate-300 animate-spin"/>
                </div>
            </CardContent>

        </Card>
    )
}