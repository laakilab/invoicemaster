import '../App.css';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {getGlobalValidationError, setGlobalValidationError} from './globalValidationError.js'

export default function Home() {


	const navigate = useNavigate()

    const [invoice, setInvoice] = useState({
		title: '',
		number: '',
		date: '',
		due_date: '',
		payment_terms: '',
		notes: ''
	})

	const [seller, setSeller] = useState({
		name: '',
		address: '',
		phone: '',
		email: '',
		website: '',
		logo_path: ''
	})

	const [client, setClient] = useState({
		name: '',
		address: '',
		phone: '',
		email: ''
	})

	const formRef = useRef(null)

	const handleSellerInputChange = event => {
		setSeller({...seller, [event.target.name]: event.target.value})
	}

	const handleClientInputChange = event => {
		setClient({...client, [event.target.name]: event.target.value})
	}
	
	const itemData = {
		description: '',
		quantity: '',
		unit_price: '',
		tax: '',
		total: ''		
	}

	const [items, setItems] = useState([itemData])

	const handleAddItem = (event) => {
		event.preventDefault()
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

	
	const handleItemInputChange = (event, index) => {
		const updatedItems = [...items]
		updatedItems[index][event.target.name] = event.target.value
		setItems(updatedItems)
	}

	const [uploadedFileName, setUploadedFileName] = useState('')

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		// Get the temporary path of the uploaded file
		const tempFilePath = URL.createObjectURL(file);
		setUploadedFileName(tempFilePath)
	}	

	const handleSubmit = event => {
		event.preventDefault()			
		console.log(items)
		validate()		
		if ( ! getGlobalValidationError() )
		submitForm()	  
	
	}

	const submitForm = () => {
		const data = seller
       	navigate(
          	'/preview',
            {state: data}
        );
	}

	const removeValidationMessage = input => {
		if ( input ) {
			var dynamicSibling = input.nextSibling

			if ( dynamicSibling ) {
				dynamicSibling.remove()				
			}	
			input.style.border = ''
		}
		
	}

	const validate = () => {

		const elementsArray = Array.from(formRef.current.elements)

		elementsArray
		.filter((element) => element.type !== "submit") // Filter out the submit button
		.forEach((element) => {	

			var formInput = document.getElementById(element.id)
			removeValidationMessage(formInput)
			
			validateInput(element)

		})
	}

	const validateInput = (element) => {

		if ( element.required && element.value === '' ) {
			setValidationMessages(element, element.id)				
		}

		else if ( element.type === 'phone' && element.value !== '' ) {
	
			const phoneRegex = /^\d{10}$/

			if ( ! phoneRegex.test(element.value)) 
			{
				setValidationMessages(element, element.id)
			}
		}

		else if ( element.type === 'date' && element.value !== '' ) {				
			
			const dateRegex = /^\d{4}-\d{2}-\d{2}$/

			if (! dateRegex.test(element.value)) 
			{
				setValidationMessages(element, element.id)
			}
		}

		else if ( element.type === 'email' && element.value !== '' ) {

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

			if ( ! emailRegex.test(element.value) )
			{
				setValidationMessages(element, element.id)
			}
		}

		else if ( element.type === 'website' && element.value !== '' ) {
				
			const domainRegex = /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/
			
			if ( ! domainRegex.test(element.value) )
			{
				setValidationMessages(element, element.id)
			}
		}

	}
	const setValidationMessages = (element, id, msg = null) => {
		var input = document.getElementById(id)
		var txt = document.createTextNode(element.getAttribute('errormessage'))
		var span = document.createElement("span")
		span.appendChild(txt)
		span.style.color = "red"
		input.parentNode.insertBefore(span, input.nextSibling)
		input.style.border = "1px solid red"	
		setGlobalValidationError(true)
	}

	const handleInvoiceInputChange = event => {
		setInvoice({...invoice, [event.target.name]:event.target.value})
	}

	const handleInputOnBlur = (event, id) => {
		var input = document.getElementById(id)		
		removeValidationMessage(input)	
		validateInput(input)
	}	


  	return (
		<form ref={formRef} className='pt-5' >
			<div className="">
					<div className="container">				
					<div className="form-group">
						<label htmlFor='invoice_title'>Invoice Title:</label>
						<input 
							required
							type='text'
							errormessage='Title required' 
							name='title' 
							id='invoice_title'
							className='form-control' 
							value={invoice.title}
							onChange={handleInvoiceInputChange}
							onBlur={ event => handleInputOnBlur(event, 'invoice_title')}
						/>
					</div>
					<div className="form-group col-4 pt-3">
						<label htmlFor='number'>Invoice Number:</label>
						<input 
							required
							type='text'
							name='number' 
							id='number'
							errormessage='Invoice number needed'
							className='form-control'
							value={invoice.number} 
							onChange={handleInvoiceInputChange}
							onBlur={ event => handleInputOnBlur(event, 'number')}
						/>
					</div>
					<div className="form-group pt-3">
						<div className='row'>
							<div className='col-4'>
								<label htmlFor='date'>Current Date:</label>
								<input 				
									required				
									type='date'
									name='date' 
									id='date'
									errormessage='Invoice date needed'
									className='form-control' 
									value={invoice.date}
									onChange={handleInvoiceInputChange}
									onBlur={ event => handleInputOnBlur(event, 'date')}
								/>
							</div>
							<div className='col-4'>
								<label htmlFor='due_date'>Due Date:</label>
								<input 			
									required 
									id='due_date'	
									type='date'
									name='due_date' 
									errormessage='Due date needed'
									className='form-control' 
									value={invoice.due_date}
									onChange={handleInvoiceInputChange}
									onBlur={ event => handleInputOnBlur(event, 'due_date')}
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
											<td>
												<input 
													name = 'description'
													value={item.description} 
													className='form-control'
													onChange={(event) => handleItemInputChange(event, index)}
													/>												
											</td>
											<td>
												<input 
													name = 'quantity'
													type='number'
													min='0'
													value={item.quantity} 
													className='form-control'
													onChange={(event) => handleItemInputChange(event, index)}
													/>			
											</td>
											<td>
												<input 
													name = 'unit_price' 
													type='number'
													min='0'
													value={item.unit_price}
													className='form-control'
													onChange={(event) => handleItemInputChange(event, index)}
													/>												
											</td>
											<td>
												<input 
													name='tax'
													type='number'
													min='0'
													value={item.tax}
													className='form-control'
													onChange={(event) => handleItemInputChange(event, index)}
													/>
											</td>
											<td>
												<input 
													name='total'
													type='number'
													min='0'
													value={item.total}
													className='form-control'
													onChange={(event) => handleItemInputChange(event, index)}
													/>									
											</td>
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
								<textarea 
									name='payment_terms'
									id='payment_terms'
									type='text'
									value={invoice.payment_terms}
									onChange={handleInvoiceInputChange}
									rows={5} 
									cols={30}></textarea>
							</div>
						</div>
						<div className='col-4'>
							<div>
								<h6>Notes:</h6>
								<textarea 
									name='notes'
									id='notes'
									type='text'
									value={invoice.notes}
									onChange={handleInvoiceInputChange}
									rows={5} 
									cols={30}></textarea>
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
									<input 
										required
										name='name' 
										id='seller_name'
										type='text'
										errormessage="Seller Name Required"										
										className='form-control' 
										value={seller.name}
										onBlur={ event => handleInputOnBlur(event, 'seller_name')}
										onChange={handleSellerInputChange}
										placeholder='Seller Name / Business Name' />	
										<label htmlFor='seller_name'></label>							
								</div>
								<div className='form-group pt-3'>								
									<textarea 
										required
										name='address' 
										id='seller_address'
										type='text'
										className='form-control' 
										value={seller.address}
										errormessage="Seller Address Required"
										onBlur={ event => handleInputOnBlur(event, 'seller_address')}
										onChange={handleSellerInputChange}
										placeholder='Address' ></textarea>
										<label htmlFor='seller_address'></label>
								</div>
								<div className='form-group pt-3'>
									<input 
										required
										name='phone' 
										id='seller_phone'
										type='phone'
										value={seller.phone}
										errormessage="Seller Phone Required"
										className='form-control' 
										onBlur={ event => handleInputOnBlur(event, 'seller_phone')}									
										onChange={handleSellerInputChange}
										placeholder='Phone' />		
										<label htmlFor='seller_phone'></label>						
								</div>
								<div className='form-group pt-3'>
									<input 
										name='email' 
										id='seller_email'
										type='email'
										value={seller.email}
										className='form-control' 
										errormessage='Valid email required'
										onChange={handleSellerInputChange}
										onBlur={ event => handleInputOnBlur(event, 'seller_email')}
										placeholder='Email' />								
								</div>
								<div className='form-group pt-3'>
									<input 
										name='website' 
										id='seller_website'
										type='website'
										value={seller.website}
										className='form-control' 
										errormessage='Valid website address required'
										onChange={handleSellerInputChange}
										onBlur={ event => handleInputOnBlur(event, 'seller_website')}
										placeholder='Website' />								
								</div>

								<div className='form-group pt-3'>			
									Upload Logo:			
									<input id="files" type="file" onChange={handleFileChange} />	
									<span className='pt-3' style={{display:'block'}}><img src={uploadedFileName} alt='' /></span>						
								</div>

							</div>
						</div>
						<div className='col-4'>
							<div>
								<h6>Bill To:</h6>
								<div className='form-group'>
									<input 
										required
										name='name'
										id='client_name'
										type='text'
										onChange={handleClientInputChange}
										value={client.name}
										errormessage="Client Name Required"
										onBlur={ event => handleInputOnBlur(event, 'client_name')}
										className='form-control' 
										placeholder='Client Name' />	
										<label htmlFor='client_name'></label>							
								</div>
								<div className='form-group pt-3'>								
									<textarea 
										required
										name='address'
										id='client_address'
										type='text'
										onChange={handleClientInputChange}
										value={client.address}
										errormessage="Client Address Required"
										onBlur={ event => handleInputOnBlur(event, 'client_address')}
										className='form-control' 
										placeholder='Address' ></textarea>
										<label htmlFor='client_address'></label>
								</div>
								<div className='form-group pt-3'>
									<input 
										required
										name='phone'
										id='client_phone'
										type='phone'
										onChange={handleClientInputChange}
										onBlur={ event => handleInputOnBlur(event, 'client_phone')}
										value={client.phone}
										errormessage="Client Phone Required"
										className='form-control' 
										placeholder='Phone' />		
										<label htmlFor='client_phone'></label>						
								</div>
								<div className='form-group pt-3'>
									<input 
										name='email'
										id='client_email'
										type='email'
										errormessage='Valid email required'
										onChange={handleClientInputChange}
										onBlur={ event => handleInputOnBlur(event, 'client_email')}
										value={client.email}
										className='form-control' 
										placeholder='Email' />								
								</div>
							</div>
						</div>					
						<div className='col-4'>	
								
						</div>
					</div>	
					<div>
						<hr/>
						<h3>Choose template:</h3>
					</div>
					<div className='text-center pt-3 pb-5'>
						<hr/>
					
						<button className='btn btn-primary btn-lg' onClick={handleSubmit}>
							Generate Invoice
						</button>
					</div>

				</div>
			</div>
		</form>
  	);
}