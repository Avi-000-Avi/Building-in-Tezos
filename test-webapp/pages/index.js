import { TezosToolkit,Signer } from '@taquito/taquito'
import { importKey } from "@taquito/signer"
import { useCallback,Component } from 'react'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TempleWallet }from '@temple-wallet/dapp'
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks
} from "@airgap/beacon-sdk";

class Forum extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    //alert('A question was submitted: ' + this.state.value);
    event.preventDefault();

    const contractAddress = 'KT1CTCf789bvC3ewbgLphn6N8UdYog8zwBSH'
    //const Tezos = new TezosToolkit('https://florencenet.smartpy.io')
    const Tezos = new TezosToolkit('https://rpc.florence.tzstats.com')
    const contract = await Tezos.contract.at(contractAddress)
    console.log(contract)
    const storage = await contract.storage()
    console.log(storage)

    const wallet = new BeaconWallet({
      name: "help-me-plz",
      preferredNetwork: NetworkType.FLORENCENET,
      disableDefaultEvents: true,
      eventHandlers: {
        [BeaconEvent.PAIR_INIT]: {
          handler: defaultEventCallbacks.PAIR_INIT
        },
        [BeaconEvent.PAIR_SUCCESS]: {
          handler: data => setPublicToken(data.publicKey)
        }
      }
    });

    Tezos.setWalletProvider(wallet);
    await wallet.requestPermissions({
      network: {
        type: NetworkType.FLORENCENET,
        rpcUrl: "https://rpc.florence.tzstats.com"
      }
    });

    try {
      const op = await contract.methods.putQuestion(this.state.value).send();
      await op.confirmation();
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Forum;
