import {React,useState} from 'react';
import {ethers} from 'ethers';
const WalletCard =() =>{
	var id=3;
	var nom="amor";
	var email="abc@gmail.com";
	var mobilenumber=23455788;
	var statut ="ok";
	var banked={"id":1};
     var typeajout;
	 var idbank=1;
	 var nombank="abes";
	 var statutbank=1;
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
	const contractaddresscustomer="0x6682e854877235dd42d63aef1afc14e5d0339c77";
    const contractaddressbank="0x6bc3e393b2ab466c4daf6e051124237e42f293a1";

	const [connButtonText,setConnButtonText]=useState("Connect Wallet");

	const connectwallethandler2=(event)=>{
		event.preventDefault();
		
        idbank=document.getElementById("idbank").value;
		nombank=document.getElementById("nombank").value;
		statutbank=document.getElementById("statutbank").value;
	if (window.ethereum)
	{
	window.ethereum.request({method:"eth_requestAccounts"})
	.then (result=>{
	accountChangedHandler(result[0],"bank");
	
	})
	}
	else 
	{
		setErrorMessage("vous n'avez pas metamask")
	}
	}

	const connectwallethandler1=(event)=>{
		event.preventDefault();
		nom=document.getElementById("nom").value;
		email=document.getElementById("email").value;
		mobilenumber=document.getElementById("mobilenumber").value;
		statut=document.getElementById("statut").value;
		id=document.getElementById("id").value;
	if (window.ethereum)
	{
	window.ethereum.request({method:"eth_requestAccounts"})
	.then (result=>{
	accountChangedHandler(result[0],"customer");
	
	})
	}
	else 
	{
		setErrorMessage("vous n'avez pas metamask")
	}
	}
const accountChangedHandler=(newAccount,type)=>
{
setDefaultAccount(newAccount);
getUserBalance(newAccount,type);

}
const getUserBalance=(address,type) =>
{
	
window.ethereum.request({method:"eth_getBalance",params:[address,'latest']}).then(balance=>{
setUserBalance(ethers.utils.formatEther (balance));
//const abicustomer= require("./abicustomer.json");
//const abiint=require ("./abiint.json");
if (type=="customer"){
	const abicustomer2=require("./abicustomerfonctionnel.json");	
	const provider=new ethers.providers.Web3Provider(window.ethereum);
	const signer=provider.getSigner();
	const contratcustomer=new ethers.Contract(contractaddresscustomer,abicustomer2,signer);
contratcustomer.functions.retrieve().then (result=>{
	alert(result);
	});
	var customersave ={"id":id,"name":nom,"email":email,"mobileNumber":mobilenumber,"statut":statut};


	contratcustomer.functions.store(customersave).send().then (result=>{	
		alert (result);
		});

}
else {
		const abibank = require ("./abibank.json");
		const provider=new ethers.providers.Web3Provider(window.ethereum);
		const signer=provider.getSigner();
		const contratbank=new ethers.Contract(contractaddressbank,abibank,signer);
	contratbank.functions.retrieve().then( async(result)=>{
	banked=result;
	alert(result);
	
	});	
	var banksave ={"id":idbank,"name":nombank,"status":statutbank};
	
	contratbank.functions.store(banksave).send().then (result=>{
		alert (result);
		});
	}

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
 <h1> partie customer insert </h1>
<form onSubmit ={connectwallethandler1}> 
<div>
<label for  ="id">id:</label>
<input type ="text"  id="id"/>


</div>
<div>
<label for  ="nom">nom :</label>
<input type ="text"  id="nom"/>
</div>
<div>
<label for  ="email">email :</label>
<input type ="email"  id="email"/>
</div>
<div>
<label for  ="mobilenumber"> mobileNumber:</label>
<input type ="tel"  id="mobilenumber"/>
</div>
<div>
<label for  ="statut"> statut:</label>
<input type ="text"  id="statut"/>
</div>


<input type="submit" value ="savecustomer"/>
	</form>
	
<h1> partie bank insert </h1>
<form onSubmit ={connectwallethandler2}> 
<div>
<label for  ="id">id:</label>
<input type ="text"  id="idbank"/>
</div>
<div>
<label for  ="nom">nom :</label>
<input type ="text"  id="nombank"/>
</div>

<div>
<label for  ="statut"> statut:</label>
<input type ="text"  id="statutbank"/>
</div>


<input type="submit" value ="savecustomer"/>
	</form>
	{banked.id}

		</div>
	)
}
export default WalletCard;