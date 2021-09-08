import { TezosToolkit,Signer } from '@taquito/taquito'
import { importKey } from "@taquito/signer"
import { useCallback,Component } from 'react'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TempleWallet }from '@temple-wallet/dapp'

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

    const contractAddress = 'KT1HycCwmhmtqzvXwzPReXFNLEakU7wh7vLN'
    const Tezos = new TezosToolkit('https://rpc.florence.tzstats.com')
    const contract = await Tezos.contract.at(contractAddress)
    console.log(contract)
    const storage = await contract.storage()
    console.log(storage)

    const isAvailable = await TempleWallet.isAvailable();
    if (!isAvailable) {
      alert("you need to install Temple Wallet");
      return;
    }
    const permission = await TempleWallet.getCurrentPermission();
    /*if(!permission){
      await TempleWallet.requestPermission('florencenet','')
    }*/
    console.info(permission);

    const wallet = new TempleWallet("help-me-plz", permission);

    if (!wallet.connected)
      await wallet.connect("florencenet");
    console.info(wallet.connected);


    const tezos = wallet.toTezos();
    const { pkh, publicKey } = wallet.permission;
    Tezos.setProvider({ wallet });
    Tezos.setWalletProvider(wallet);
    tezos.setSignerProvider(pkh, publicKey);
    /*setConnection({ tezos, accountPkh: await tezos.wallet.pkh() });*/

    const operation = await (contract.methods.default(
      // parameter order should match the entrypoint in the smart contract
      this.state.value
    ).send())
    await operation.confirmation()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Forum;
