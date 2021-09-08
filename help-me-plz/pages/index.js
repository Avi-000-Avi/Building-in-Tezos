import React, { useState } from "react";
import Header from '../components/Header';
import Page from '../components/Page';
import Questions from '../components/Question';
import { TezosToolkit } from '@taquito/taquito'
import { importKey } from "@taquito/signer"

const tezos = new TezosToolkit('');



export default function Home() {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://api.tez.ie/rpc/granadanet")
  );

  const contractAddress = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";


  return (
      <div>
      <Header/>
      <Questions/>
      </div>
  )
}
