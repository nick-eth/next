import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false); // variables for useState
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });


  // function that connects metamask
  async function connect() {
    if (typeof window.ethereum !== "undefined") {// initializes ethers
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum); // uses connection to get provider
        setSigner(provider.getSigner()); // gets signer from connection and provider
      } catch (e) { // error on connection
        console.log(e);
      }
    } else {
      setIsConnected(false); // if window.ethereum IS undefined
    }
  }

  async function executeWithdraw() {// function that talks to the withdraw function from smart contract
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x93823C6E791826fe2E6c61ff5D88612f1fF276D5";
      const abi = [{"inputs":[{"internalType":"address payable","name":"_primaryAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnInvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnReinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"investor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address payable","name":"newAddress","type":"address"}],"name":"changePrimaryBenificiary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInformation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getInvestorRefs","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ref","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"totalDeposit","type":"uint256"},{"internalType":"uint256","name":"totalWithdraw","type":"uint256"},{"internalType":"uint256","name":"totalReinvest","type":"uint256"},{"internalType":"uint256","name":"dividends","type":"uint256"},{"internalType":"uint256","name":"totalRef","type":"uint256"},{"internalType":"uint256","name":"investmentCount","type":"uint256"},{"internalType":"uint256","name":"depositTime","type":"uint256"},{"internalType":"uint256","name":"lastWithdrawDate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"payoutOf","outputs":[{"internalType":"uint256","name":"payout","type":"uint256"},{"internalType":"uint256","name":"max_payout","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primaryBenificiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalInvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReferralReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalReinvested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
      const contract = new ethers.Contract(contractAddress, abi, signer); //signer is used from Connect function
      try {
        await contract.withdraw(); // calls withdraw function from smart contract
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function executeInvest() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await contract.invest(0.3, contractAddress);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
    

 

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (// only shows button when not connected
          "Connected "
        ) : (
          <button onClick={() => connect()}>Connect</button> // Connect button that calls connect() when clicked
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button onClick={() => executeWithdraw()}>Withdraw</button> : ""}
      {isConnected ? <form onSubmit={() => executeInvest()}><input id='setText' type='text'/><button type={"submit"}>Invest</button></form> : ""}
    </div>
  ); 
}