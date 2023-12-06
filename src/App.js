import './App.css';
import Mynavbar from './layout/Mynavbar';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

function App() {
	
	const itemData = {
		description: 'NA',
		quantity: '',
		unit_price: '',
		tax: '',
		total: ''		
	}

	const [items, setItems] = useState([itemData])

  	return (
    	<div className="App">
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
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								items.map((item, index) => 
									<tr>
										<td>{item.description}</td>
										<td>{item.quantity}</td>
										<td>{item.unit_price}</td>
										<td>{item.tax}</td>
										<td>{item.total}</td>
									</tr>			
								)
							}				
						</tbody>
					</Table>
				</div>
			

			</div>
    	</div>
  	);
}

export default App;
