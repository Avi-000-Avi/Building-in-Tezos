import { useState } from 'react';
import Header from '../components/Header';
import Form from '../components/styles/Form';



export default function Home() {
  return (
      <div>
      <Header/>
      <Form method="POST" > 
  <fieldset style={{paddingBottom:'30px'}}>
  <h2>What is Cardano?</h2>
  <input type="answer" name="answer" placeholder="answer" autoComplete="answer"  style={{width:'1000px',height:'100px'}}></input>
  
  <label htmlFor="question"></label>  
  </fieldset>

  <button type="submit">Answer</button>
</Form>
      </div>
  )
}
