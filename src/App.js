import './App.css';
import Mynavbar from './layout/Mynavbar';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';

function App() {
	
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

  	return (
    	<div className="">
			<Mynavbar />
			<div className="container">
				<div className="form-group">
					<input placeholder='description' className='form-control' />
				</div>
				<div className="form-group col-4 pt-3">
					<input placeholder='#Invoice number' className='form-control' />
				</div>
				<div className="form-group pt-3">
					<div className='row'>
						<div className='col-4'>
							<input placeholder='Invoice Date' className='form-control' />
						</div>
						<div className='col-4'>
							<input placeholder='Due Date' className='form-control' />
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
							<textarea rows={5} cols={40}></textarea>
						</div>
					</div>
					<div className='col-4'></div>
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
			

			</div>
    	</div>
  	);
}

export default App;
