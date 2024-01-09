import { useLocation } from "react-router-dom"
import html2canvas from "html2canvas"
import {jsPDF} from "jspdf"
import { useEffect, useState } from "react"
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

            <div id="printableBlock">
                <div className="row m-0 text-center pt-3 pb-5">
                    <h3>Invoice - #{stateData.number}</h3>
                </div>
                <div className="row m-0">
                    <div className="col-8">
                        <h5>{stateData.name}</h5>
                        <div style={{display:'flex'}} className="company-name-block">
                            <div style={{flex: "1"}} className="company-name-block-sub one">
                                {stateData.address}<br/>
                                
                            </div>
                            <div style={{flex: "1"}} className="company-name-block-sub">
                                Ph: 987374856.<br/>
                                test@example.com<br/>
                                http://website.com
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="col-4">
                        <img src="https://placehold.co/200x100" />
                    </div>
                </div>
                <div className="row m-0 pt-3">
                    <h5>Bill to:</h5>
                    <span id="name">Client name</span>
                    <span id="address">1234 Street</span>
                    <span id="phone">Phone: 5478937845</span>
                </div>
                <div className="row m-0 pt-5">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Tax</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row m-0">
                    <div className="col-4">
                        Terms: 
                    </div>
                    <div className="col-4">
                        Notes:
                    </div>
                    <div className="col-4 text-end p-3">
                        <span>Subtotal: </span>1234<br />
                        <span>Tax: </span>1234<br />
                        <span>Discount: </span>1234<br />
                        <span><hr/><strong>Total Due:</strong></span>1234<br />
                    </div>
                </div>
            </div>


        </div>
    </>
}