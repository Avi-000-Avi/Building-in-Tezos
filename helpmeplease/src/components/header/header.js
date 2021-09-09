import React,{useEffect,useState} from 'react';
import { Container } from 'react-bootstrap';
import {TezosToolkit} from '@taquito/taquito';
import {importKey} from '@taquito/signer';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';
import { BeaconWallet } from "@taquito/beacon-wallet";


function Header(){
  const Tezos = new TezosToolkit('https://granadanet.smartpy.io/');
  const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  Tezos.setWalletProvider(wallet);

try {
  console.log("Requesting permissions...");
  const permissions = await wallet.client.requestPermissions();
  console.log("Got permissions:", permissions.address);
} catch (error) {
  console.log("Got error:", error);
}

  Tezos.setProvider({signer: new TezBridgeSigner()});

  const FAUCET_KEY = {
    "mnemonic": [
      "essence",
      "involve",
      "output",
      "ship",
      "addict",
      "trouble",
      "cause",
      "unusual",
      "window",
      "follow",
      "wink",
      "spirit",
      "vendor",
      "giant",
      "top"
    ],
    "secret": "6b90a487c699755f38a04c0ceb5b271efbe34444",
    "amount": "72747082862",
    "pkh": "tz1YjEhxqPRkuQq3xfEUR3JqtSWpRzC7jo8y",
    "password": "joMeN96BGG",
    "email": "siwhkoeg.mvptwvov@tezos.example.org"
  }

  importKey(
    Tezos,
    FAUCET_KEY.email,
    FAUCET_KEY.password,
    FAUCET_KEY.mnemonic.join(' '),
    FAUCET_KEY.secret
  ).catch((e)=> console.error(e));

  return (
    <div >
        <Container>
        Help Me Please
        </Container>
    </div>
  );
}

export default Header;
