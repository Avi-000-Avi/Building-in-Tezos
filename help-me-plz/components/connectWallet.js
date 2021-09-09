import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";ledgerhq
import TransportU2F from "@/hw-transport-u2f";
import { LedgerSigner } from "@taquito/ledger-signer";


export default function connectWallet() {
    useEffect(() => {
        (async () => {
          // creates a wallet instance
          const wallet = new BeaconWallet({
            name: "Taquito Boilerplate",
            preferredNetwork: NetworkType.GRANADANET,
            disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
            eventHandlers: {
              // To keep the pairing alert, we have to add the following default event handlers back
              [BeaconEvent.PAIR_INIT]: {
                handler: defaultEventCallbacks.PAIR_INIT
              },
              [BeaconEvent.PAIR_SUCCESS]: {
                handler: data => setPublicToken(data.publicKey)
              }
            }
          });
          Tezos.setWalletProvider(wallet);
          setWallet(wallet);
          // checks if wallet was connected before
          const activeAccount = await wallet.client.getActiveAccount();
          if (activeAccount) {
            const userAddress = await wallet.getPKH();
            await setup(userAddress);
            setBeaconConnection(true);
          }
        })();
      }, []);

    return (
        <div className="buttons">
      <button className="button" onClick={connectWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect with wallet
        </span>
      </button>
    </div>
    )
  }