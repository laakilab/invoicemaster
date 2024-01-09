import './App.css';
import { Routes, Route } from 'react-router-dom';
import InvoiceTemplate from './component/InvoiceTemplate';
import Home from './component/Home';

function App() {	
	return <>
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/preview" element={<InvoiceTemplate />}></Route>
		</Routes>
	</>
}

export default App;
