import { SeiWalletProvider } from "@sei-js/react";
import "./App.css";
import Home from "./Home";
 
function App() {
  return (
    // Set up SeiWalletProvider for easy wallet connection and to use hooks in @sei-js/react
    <SeiWalletProvider
      chainConfiguration={{
        chainId: "arctic-1",
        restUrl: "https://rest.arctic-1.seinetwork.io",
        rpcUrl: "https://rpc.arctic-1.seinetwork.io",
      }}
      wallets={["compass", "fin"]}
    >
      <Home />
    </SeiWalletProvider>
  );
}
 
export default App;