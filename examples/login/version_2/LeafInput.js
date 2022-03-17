import { useEffect, useState } from 'react'

export const LeafInput = ({branch}) => {

  function makeState(value = null) {
    if (!value) value = branch.value;
    return {...value, isValid: branch.do.isValid(), errors : branch.do.errors()};
  }
  const [state, setState] = useState(makeState());
  useEffect(() => {
    const sub = branch.subscribe((value) => {
      const state = makeState(value);
      setState(state);
      console.log('branch update from ', branch.value.title, state)
    });

    return () => {
      sub.unsubscribe();
    }
  }, []);
  if (!(state && branch)) return '';
  return  <>
    <h2>{state.title}</h2>
    <input type={state.type} value={state.value}
      onChange={(event) => branch.do.update(event.target.value)} />
    {state.touched && branch.do.errors() ? <div className="error">{branch.do.errors()}</div> : '' }
  </>
}
