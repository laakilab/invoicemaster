import { useLocation } from "react-router-dom"
import html2canvas from "html2canvas"
import {jsPDF} from "jspdf"
import { useEffect, useState } from "react"
import Main from "./templates/Main"
import Basic from "./templates/Basic"
export default function InvoiceTemplate () {
    const location = useLocation()
    const stateData = location.state

    const [invoiceData, setInvoiceData] = useState()

    useEffect(() => {
        //
    }, [])

 
    const handleDownload = () => {

        const input = document.getElementById('printableBlock')        
        
        html2canvas(input)
        .then( canvas => {
            
            const imgData = canvas.toDataURL('image/jpeg')
            const pdf = new jsPDF('l', 'mm', 'letter')

            var pdfWidth = pdf.internal.pageSize.getWidth();
            var pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('download-invoice.pdf')
            
           /*
            canvas.toBlob( blob => {
                saveAs(blob, 'myimage.png')
            })
            */ 
            
        })
       
    }

    const saveAs = (blob, filename) => {
        const link = document.createElement('a')
        link.download = filename
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
    }

    const handlePrint = () => {
        const printContent = document.getElementById('printableBlock').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    }

    /* invoice, seller, client, items */

    return <>

        {JSON.stringify(stateData)}

        <div className="container">
            <div className="row m-0 text-end pt-3">
                <div>
                    <button className="btn btn-primary" onClick={handleDownload}>Download</button>
                    <button className="btn btn-primary" onClick={handlePrint}>Print</button>
                    <hr />

                </div> 
            </div>

            <Basic stateData={stateData} />

        </div>
    </>
}