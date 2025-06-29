import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  return (
    <div className="App">
      <h1>RIMed MVP</h1>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p><strong>Wallet Connected:</strong> {walletAddress}</p>
          <button onClick={handleCheckIn}>Check In</button>
          {checkedIn && (
            <div className="info-card">
              <h2>Patient Info</h2>
              <p><strong>Name:</strong> Arshyall Richard</p>
              <p><strong>IC:</strong> 900101-14-1234</p>
              <p><strong>Condition:</strong> Asthma</p>
              <p><strong>Insurance:</strong> AIA Bhd</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
