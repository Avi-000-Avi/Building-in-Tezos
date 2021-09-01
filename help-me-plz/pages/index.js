import Header from '../components/Header';
import Page from '../components/Page';
import Questions from '../components/Question';
import { TezosToolkit } from '@taquito/taquito'
import { importKey } from "@taquito/signer"


export default function Home() {
  return (
      <div>
      <Header/>
      <Questions/>
      </div>
  )
}
