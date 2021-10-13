import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./utils/WavePortal.json";
import { Header, MessageModel, Table } from "./components";

import "./App.css";

const App = () => {
  const { ethereum } = window;
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [waveCount, setWaveCount] = useState(0);
  const [spinner, setSpinner] = useState(false);

  const [isMessageModelOpen, setIsMessageModelOpen] = useState(false);
  const contractAddress = "0x8e50CC6674873bb73ff82eD1487ae9cA2E047b09";

  const handleModelClosed = () => {
    setIsMessageModelOpen(false);
  };

  const handleMessageModel = () => {
    setIsMessageModelOpen(true);
  };

  const getAllWaves = async () => {
    if (!ethereum) return;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const waveportalContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
      );
      const waves = await waveportalContract.getAllWaves();
      let wavesCleaned = [];
      waves.forEach((wave) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });
      setAllWaves(wavesCleaned);

      waveportalContract.on("NewWave", (from, timestamp, message) => {
        console.log("NewWave", from, timestamp, message);

        setAllWaves((prevState) => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
      setAllWaves([]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object ", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async (message) => {
    try {
      if (ethereum) {
        setSpinner(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );
        const waveTxn = await waveportalContract.wave(message, {
          gasLimit: 300000,
        });
        await waveTxn.wait();
        getWaveCount();
        getAllWaves();
        setSpinner(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const getWaveCount = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );
        const count = await waveportalContract.getTotalWaves();
        setWaveCount(count.toNumber());
      }
    } catch (error) {
      console.log(error);
      setWaveCount(0);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getWaveCount();
    getAllWaves();
  }, [currentAccount]);

  return (
    <div>
      <Header userAccount={currentAccount} onConnect={connectWallet} />
      <div className="mainContainer">
        <div className="dataContainer container">
          <div className="header">Hey there!</div>
          <div className="header">Total waves: {waveCount}</div>

          <div className="bio">
            I am Aagam and it's my first project so that's pretty cool right?
            Connect your Ethereum wallet and wave at me!
          </div>

          <MessageModel
            open={isMessageModelOpen}
            onClose={handleModelClosed}
            wave={wave}
          />
          {spinner ? (
            <button class="waveButton" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              type="button"
              className="waveButton"
              onClick={handleMessageModel}
            >
              Wave at Me
            </button>
          )}
        </div>
      </div>
      <div className="container mt-5 my-2 bg-light border">
        <Table data={allWaves} />
      </div>
    </div>
  );
};

export default App;
