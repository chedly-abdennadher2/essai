import {React,useState} from 'react';
import {ethers} from 'ethers';
const WalletCard =() =>{
	const [errorMessage,setErrorMessage]=useState(null);
	const [defaultAccount,setDefaultAccount]=useState(null);
	const [UserBalance,setUserBalance]=useState(null);
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
const customer=new ethers.Contract(contractaddress,abicustomer,provider);
customer.functions.customerExists(address).then (result=>{
	alert (result);
	});
	customer.events.CustomerAdded({"id_":address,"name":"ali",email:"salah"}
	, (error, data) => {
alert (error);
alert(data);			}		);
		

})
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
		</div>
		
	)
	
}
export default WalletCard;