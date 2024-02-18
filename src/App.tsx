import React, {useCallback, useState} from 'react';
import {Owners} from "./components/owners/owners";
import {Ships} from "./components/ships";

const App = () => {
  const [state, setState] = useState(false);
  const toggleState = useCallback(() => {
    setState((prevState) => !prevState);
  }, [state]);
  return (
    <div>
        <Owners state={state} setState={toggleState}/>
        <Ships state={state} setState={toggleState}/>
    </div>
  );
};

export default App;
