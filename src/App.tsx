import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from '@twa-dev/sdk'

function App() {
  const {
    contractAddress,
    balance,
    counterValue,
    mostRecentSender,
    ownerAddress,
    sendIncrement,
    sendDeposit,
    sendWithdraw,
  } = useMainContract();

  const incrementBy = 5;
  const depositAmount = 1;

  const { connected } = useTonConnect();
  const showAlert = () => {
    WebApp.showAlert('Hey there!');
  }
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <b>Our contract address</b>
      <div className="Hint">{contractAddress?.slice(0, 30) + "..."}</div>
      <b>Balance</b>
      <div className="Hint">{balance} TON</div>

      <div className="Card">
        <div><b>Your platform is {WebApp.platform}</b></div>
        <b>Counter Value</b>
        <div className="Hint">{counterValue ?? "Loading..."}</div>
        <b>Most Recent Sender</b>
        <div className="Hint">
          {mostRecentSender?.toString() ?? "Loading..."}
        </div>
        <b>Owner Address</b>
        <div className="Hint">{ownerAddress?.toString() ?? "Loading..."}</div>
      </div>
      <div>
        {
            <button onClick={() => {showAlert();}}>Show Alert</button>
        }
      </div>
      <div>
        {
          // if connected, show button to send increment
          connected && (
            <button onClick={() => sendIncrement(incrementBy)}>Increment by {incrementBy}</button>
          )
        }
      </div>
      <div>
        {
          connected && (
            <button onClick={() => sendDeposit(depositAmount)}>Deposit {depositAmount} TON</button>
          )
        }
      </div>
      <div>
        {
          connected && (
            <button onClick={() => sendWithdraw(depositAmount)}>Withdraw {depositAmount} TON</button>
          )
        }
      </div>
    </div>
  );
}

export default App;
