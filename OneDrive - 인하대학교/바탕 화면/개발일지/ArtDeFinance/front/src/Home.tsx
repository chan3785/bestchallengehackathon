import { useCallback, useEffect, useState } from "react";
import {
  useCosmWasmClient,
  useSigningCosmWasmClient,
  useWallet,
  WalletConnectButton,
} from "@sei-js/react";
 
// arctic-1 example contract
const CONTRACT_ADDRESS =
  "sei14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9sh9m79m";
 
function Home() {
  const [count, setCount] = useState<number | undefined>();
  const [error, setError] = useState<string>("");
  const [isIncrementing, setIsIncrementing] = useState<boolean>(false);
 
  // Helpful hook for getting the currently connected wallet and chain info
  const { connectedWallet, accounts } = useWallet();
 
  // For querying cosmwasm smart contracts
  const { cosmWasmClient: queryClient } = useCosmWasmClient();
 
  // For executing messages on cosmwasm smart contracts
  const { signingCosmWasmClient: signingClient } = useSigningCosmWasmClient();
 
  const fetchCount = useCallback(async () => {
    const response = await queryClient?.queryContractSmart(CONTRACT_ADDRESS, {
      get_count: {},
    });
    return response?.count;
  }, [queryClient]);
 
  useEffect(() => {
    fetchCount().then(setCount);
  }, [connectedWallet, fetchCount]);
 
  const incrementCounter = async () => {
    setIsIncrementing(true);
    try {
      const senderAddress = accounts[0].address;
 
      // Build message content
      const msg = { increment: {} };
 
      // Define gas price and limit
      const fee = {
        amount: [{ amount: "20000", denom: "usei" }],
        gas: "200000",
      };
 
      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);
 
      // Updates the counter state again
      const updatedCount = await fetchCount();
      setCount(updatedCount);
 
      setIsIncrementing(false);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("unknown error");
      }
      setIsIncrementing(false);
    }
  };
 
  // Helpful component for wallet connection
  if (!connectedWallet) return <WalletConnectButton />;
 
  return (
    <div>
      <h1>Count is: {count ? count : "---"}</h1>
      <button disabled={isIncrementing} onClick={incrementCounter}>
        {isIncrementing ? "incrementing..." : "increment"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
 
export default Home;