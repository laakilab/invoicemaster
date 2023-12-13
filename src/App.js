import './App.css';
import Mynavbar from './layout/Mynavbar';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import InvoiceTemplate from './component/InvoiceTemplate';
import { Routes, Link, Route } from 'react-router-dom';

function App() {
	
	const [invoice, setInvoice] = useState({
		description: '',
		number: '',
		date: '',
		due_date: ''
	})
	
	const itemData = {
		description: '',
		quantity: '',
		unit_price: '',
		tax: '',
		total: ''		
	}

	const [items, setItems] = useState([itemData])

	const handleAddItem = (event) => {
		setItems([...items, itemData])
	}

	const handleDeleteItem = i => {
		if ( items.length === 1 )
		{
			alert('At least one item needed')
			return
		}else {
			const newItems = items.filter((_, index) => index !== i)
			setItems(newItems)
		}
		
	}	

	const [uploadedFileName, setUploadedFileName] = useState('')

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		// Get the temporary path of the uploaded file
		const tempFilePath = URL.createObjectURL(file);
		setUploadedFileName(tempFilePath)
	}

	const handleSubmit = () => {
		console.log(invoice)
	}

	const handleInvoiceInputChange = event => {
		setInvoice({...invoice, [event.target.name]:event.target.value})
	}

  	return (
    	<div className="">
			<Mynavbar />
			<div className="container">				
				<div className="form-group">
					<input 
						placeholder='description' 
						name='description' 
						className='form-control' 
						value={invoice.description}
						onChange={handleInvoiceInputChange}
					/>
				</div>
				<div className="form-group col-4 pt-3">
					<input 
						placeholder='#Invoice number' 
						name='number' 
						className='form-control'
						value={invoice.number} 
						onChange={handleInvoiceInputChange}
					/>
				</div>
				<div className="form-group pt-3">
					<div className='row'>
						<div className='col-4'>
							<input 
								placeholder='Invoice Date' 
								type='date'
								name='date' 
								className='form-control' 
								value={invoice.date}
								onChange={handleInvoiceInputChange}
							/>
						</div>
						<div className='col-4'>
							<input 
								placeholder='Due Date' 
								type='date'
								name='due_date' 
								className='form-control' 
								value={invoice.due_date}
								onChange={handleInvoiceInputChange}
							/>
						</div>
					</div>						
				</div>
				<div className='pt-5'>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Description</th>
								<th>Quantity</th>
								<th>Unit Price</th>
								<th>Tax</th>
								<th>Total </th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								items.map((item, index) => 
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.description}</td>
										<td>{item.quantity}</td>
										<td>{item.unit_price}</td>
										<td>{item.tax}</td>
										<td>{item.total}</td>
										<td 
											style={{cursor:'pointer'}} 
											onClick={() => handleDeleteItem(index)}>
											<Trash size={20} />											
										</td>
									</tr>			
								)
							}				
						</tbody>
					</Table>
				</div>
				<div className='pb-5'>
					<button onClick={handleAddItem}>+ Add Item</button>
				</div>
				<div className='row pb-5'>
					<div className='col-4'>
						<div>
							<h6>Payment Terms & Methods:</h6>
							<textarea rows={5} cols={30}></textarea>
						</div>
					</div>
					<div className='col-4'>
						<div>
							<h6>Notes:</h6>
							<textarea rows={5} cols={30}></textarea>
						</div>
					</div>
					<div className='col-4' >
						<div style={{background: '#eee', padding: '15px', border: '1px solid #ccc'}}>
							<div className='d-flex pt-2 pb-2'>
								<div className='flex-fill'><b>Subtotal</b></div>
								<div className=''>9678</div>
							</div>
							<div className='d-flex pb-2'>
								<div className='flex-fill'>Additional Charges</div>
								<div>9678</div>
							</div>
							<div className='d-flex pb-2'>
								<div className='flex-fill'>Discount</div>
								<div>9678</div>
							</div>
							<div className='d-flex'>
								<div className='flex-fill'>
									<b>Total Amount Due</b>
								</div>
								<div>9678</div>
							</div>
						</div>
						
					</div>
				</div>				
				<div className='row pb-5'>
					<div className='col-4'>
						<div>
							<h6>From:</h6>
							<div className='form-group'>
								<input className='form-control' placeholder='Seller Name / Business Name' />								
							</div>
							<div className='form-group pt-3'>								
								<textarea className='form-control' placeholder='Address' ></textarea>
							</div>
							<div className='form-group pt-3'>
								<input className='form-control' placeholder='Phone' />								
							</div>
							<div className='form-group pt-3'>
								<input className='form-control' placeholder='Email' />								
							</div>

							<div className='form-group pt-3'>			
								Upload Logo:			
								<input id="files" type="file" onChange={handleFileChange} />	
								<span className='pt-3' style={{display:'block'}}><img src={uploadedFileName} /></span>						
							</div>

						</div>
					</div>
					<div className='col-4'>
						<div>
							<h6>Bill To:</h6>
							<div className='form-group'>
								<input className='form-control' placeholder='Client Name' />								
							</div>
							<div className='form-group pt-3'>								
								<textarea className='form-control' placeholder='Address' ></textarea>
							</div>
							<div className='form-group pt-3'>
								<input className='form-control' placeholder='Phone' />								
							</div>
							<div className='form-group pt-3'>
								<input className='form-control' placeholder='Email' />								
							</div>
						</div>
					</div>					
					<div className='col-4'>						
					</div>
				</div>	
				<div className='text-center pt-3 pb-5'>
					<hr/>
					<button className='btn btn-primary btn-lg' onClick={handleSubmit}>Generate Invoice</button>
				</div>

			</div>
    	</div>
  	);
}

export default App;
