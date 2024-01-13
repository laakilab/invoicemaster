export default function Main (props) {
    const stateData = props.stateData
    return <>
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
    </>
}