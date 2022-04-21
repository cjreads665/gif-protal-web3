import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react'

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
let TEST_GIF = ['https://media.giphy.com/media/2ISXFYCjXQEBW/giphy.gif',
          'https://media.giphy.com/media/l9jykc3oRi91u/giphy.gif',
          'https://media.giphy.com/media/Mx8elxpYeWezisxxwr/giphy.gif',
          'https://media.giphy.com/media/YOl02tQfTbzaCNuj3I/giphy.gif'
]

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

    const renderConnectedContainer =()=>{
      return <div className="connected-container">
          <div className="grid-cols-4 grid gap-2">
            {TEST_GIF.map(gif=>{
              return <div className="gif-item">
                <img src={gif} alt={gif}/>
              </div>     
            })}
          </div>
      </div>
    }

    useEffect(() => {
      const onLoad = async()=> await checkIfWalletConnected()
      window.addEventListener('load',onLoad)
    }, [])


  return (
    <div className="App">
      <div className="container">
        <div className={walletAddress? "authed-container" : "header-container"}>
          <p className="header">EncoVerse GIFs</p>
          <p className="sub-text mb-4">
            GIFs to lift your spirits and brighten your day
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
