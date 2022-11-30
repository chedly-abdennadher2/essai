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
      //customer erroné
	//const contractaddress="0x8EBA552F705AF635a7152161696323D22E0503dC";
	//contrat int 
	//const contractaddress="0xe9846938c929ff21b8c9da194ec507c442445383";
	//contract personalisé client
	const contractaddress="0x6682e854877235dd42d63aef1afc14e5d0339c77";


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
//const abicustomer= require("./abicustomer.json");
//const abiint=require ("./abiint.json");
const abicustomer2=require("./abiobjet.json");

const provider=new ethers.providers.Web3Provider(window.ethereum);
const signer=provider.getSigner();

/*const customer=new ethers.Contract(contractaddress,abicustomer,signer);
setContract(customer);

customer.functions.customerExists(address).then (result=>{
	alert (result);
	});
*/	
/*	const contrat1=new ethers.Contract(contractaddress,abiint,signer);
	contrat1.functions.retrieve().then (result=>{
		alert (result);
		});		contrat1.functions.store(2).send().then (result=>{
			alert (result);
			});
*/
const contrat1=new ethers.Contract(contractaddress,abicustomer2,signer);
contrat1.functions.retrieve().then (result=>{
	alert (result);
	});		
	contrat1.functions.store({"id":2,'name':'ali','email':'e','mobileNumber':345,"statut":"1"}).send().then (result=>{
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
	

		</div>
		
	)
	
}
export default WalletCard;