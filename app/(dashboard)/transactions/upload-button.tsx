import { Upload } from "lucide-react";
import {useCSVReader} from 'react-papaparse'

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type Props = {
    onUpload: (results: any) => void
}

export function UploadButton({onUpload}: Props) {
    const { t } = useTranslation()

    const { CSVReader } = useCSVReader()

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {
             ({getRootProps}: any) => (
                <Button
                    size='sm'
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                >
                    <Upload className="size-4 mr-2"/>
                    {t("Import")}
                </Button>
             )   
            }
        </CSVReader>
    )
}