import {React,useState} from 'react';
import {ethers} from 'ethers';
const WalletCard =() =>{
	const Bank = {
		name: "alie",
		email: "salah",
		id_: "2",
		ifscCode: "a",
		kycCount: "e",
		status:"active",
	  };
	
	const [errorMessage,setErrorMessage]=useState(null);
	const [defaultAccount,setDefaultAccount]=useState(null);
	const [UserBalance,setUserBalance]=useState(null);
	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const contractaddress="0x5e96189B017D9e88eC05134d54A055B3BAF0EdC0";
	//const contractaddress="0xe9846938c929ff21b8c9da194ec507c442445383";

	const [connButtonText,setConnButtonText]=useState("Connect Wallet");
	const connectwallethandler=()=>{
	if (window.ethereum)
	{
	window.ethereum.request({method:"eth_requestAccounts"})
	.then (result=>{
	accountChangedHandler(result[0]);
	
	})
	}
	else 
	{
		setErrorMessage("vous n'avez pas metamask")
	}
	}
const accountChangedHandler=(newAccount)=>
{
setDefaultAccount(newAccount);
getUserBalance(newAccount);

}
const getUserBalance=(address) =>
{
window.ethereum.request({method:"eth_getBalance",params:[address,'latest']}).then(balance=>{
setUserBalance(ethers.utils.formatEther (balance));
const abicustomer= require("./abicustomer.json");
const provider=new ethers.providers.Web3Provider(window.ethereum);
const signer=provider.getSigner();

const customer=new ethers.Contract(contractaddress,abicustomer,signer);
setContract(customer);

customer.functions.customerExists(address).then (result=>{
	alert (result);
	});
	


})
}

const setHandler = (event) => {
	event.preventDefault();
	console.log('sending ' + event.target.setText.value + ' to the contract');
	contract.set(event.target.setText.value);
}
 
const getCurrentVal = async () => {
	let val = await contract.get();
	setCurrentContractVal(val);
}

return (
		<div className="walletCard">
		<h4> {"connection to metamask"}
		</h4>
		<button onClick ={connectwallethandler}>
			{connButtonText} 
		</button>
		<div className="accountDisplay">
		<h3> Address {defaultAccount} </h3>
		</div>
       <div className="balanceDisplay">
		<h3> Balance {UserBalance} </h3>
			{errorMessage}
	   </div>
	   <form onSubmit={setHandler}>
				<input id="setText" type="text"/>
				<button type={"submit"}> Update Contract </button>
			</form>
			<button onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>		
			{currentContractVal}
			{signer}
		</div>
		
	)
	
}
export default WalletCard;