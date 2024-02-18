import { useEffect, useState } from "react";
import PreEventAbi from "../abis/PreEventAbi.json";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { Web3 } from "web3";

const AdminFilter = () => {
  const [transferEvent, setTransferEvent] = useState();

  useEffect(() => {
    if (!wssWeb3) return;

    const wssWeb3 = new Web3(
      new Web3.providers.WebsocketProvider(
        process.env.REACT_APP_INFURA_WSS_SEPOLIA
      )
    );

    const wssContract = new wssWeb3.eth.Contract(
      PreEventAbi,
      PRE_EVENT_CONTRACT
    );

    console.log(wssWeb3);
    const subscribeEvent = () => {
      wssContract.events
        .Approval({
          fromBlock: "latest",
        })
        .on("data", (event) => {
          setTransferEvent(event);
        })
        .on("error", console.error);
    };

    subscribeEvent();

    return () => {
      if (subscribeEvent.currentProvider.connect) {
        subscribeEvent.currentProvider.disconnect();
      }
      console.log("Websocket disconnect");
    };
  }, []);

  return (
    <div className="w-[425px] min-h-screen mx-auto z-10">
      {transferEvent ? JSON.stringify(transferEvent) : "no data"}
    </div>
  );
};

export default AdminFilter;
