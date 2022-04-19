import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react'

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

    const [walletAddress, setWalletAddress] = useState(null)


    //check if phantom wallet connected or not
    const checkIfWalletConnected = async ()=>{
      try{
        const {solana} = window;
        if(solana){
          if(solana.isPhantom) {
            console.log('wallet is phantom')
            console.log(solana)
            const response = await solana.connect({onlyIfTrusted : true})
            console.log(response)
            console.log(
              'connected with public key', response.publicKey.toString()
              )
            setWalletAddress(response.publicKey.toString())
          }
        }
      else{
        alert('no solana found')
      }

      }
      catch(error){
        console.log(error)
      }
    }

    const connectWallet = async ()=>{
      const {solana} =window
      if(solana){
        const response = await solana.connect()
        console.log('connected with public key', response.publicKey.toString())
        setWalletAddress(response.publicKey.toString())
      }
    }

    const renderNotConnectedContainer =()=>{
      return <button
        className='cta-button connect-wallet-button'
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    }

    useEffect(() => {
      const onLoad = async()=> await checkIfWalletConnected()
      window.addEventListener('load',onLoad)
    }, [])


  return (
    <div className="App">
      <div className="container">
        <div className={walletAddress? "authed-container" : "header-container"}>
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
