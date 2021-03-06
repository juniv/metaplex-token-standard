// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import { CreateAccountError } from "../../components/CreateAccountError";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
// import { CreateToken } from 'components/CreateToken';
import { CreateToken } from "components/TestCreateToken";
// import { UploadMetadata } from "components/TestUploadMetaData";
import { UploadMetadata } from "components/TestCreateForm";

export const HomeView: FC = ({}) => {
  const [metadataUrlIndexPage, setMetadataUrlIndexPage] = useState(null);

  console.log("Index Page", metadataUrlIndexPage);

  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Token Creator
        </h1>
        <div className="text-center">
          {/* <RequestAirdrop my-2 /> */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
          <UploadMetadata />
          {/* <UploadMetadata
            setMetadataUrlIndexPage={(URL) => setMetadataUrlIndexPage(URL)}
          /> */}
          {/* <CreateToken metadataUrlIndexPage={metadataUrlIndexPage} /> */}
        </div>
      </div>
    </div>
  );
};
