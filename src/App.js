import logo from './logo.svg';
import './App.css';
import WalletCard from './WalletCard';
import {
      BrowserRouter as Router,
      Routes,
      Route,
      Link
  } from 'react-router-dom';
function App() {
  return (
<div className="App">
  <WalletCard></WalletCard>
  
</div>
  );
}

export default App;
