import React from 'react';
import PropTypes from 'prop-types';
 import Form from './styles/Form';


export default function Questions() {
  return (
  <Form method="POST" > 
  <fieldset style={{paddingBottom:'30px'}}>
  <h2>Ask a Question</h2>
  <label htmlFor="question">Question</label>
  <input type="question" name="password" placeholder="question" autoComplete="question"  style={{width:'500px',height:'100px'}}></input>
  
  <label htmlFor="question">Bounty</label>
  <input type="bounty" name="bounty" placeholder="bounty" autoComplete="bounty" style={{width:'100px'}}></input>
  
  </fieldset>

  <button type="submit">Ask!</button>
</Form>
    
  );
}

