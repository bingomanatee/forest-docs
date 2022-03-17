import { useEffect, useState } from 'react'

/**
 * This is a function  that draws an input field based on a field branch.
 *
 * @param branch {Leaf}
 * @returns {JSX.Element|string}
 */
export const LeafInput = ({status, branch}) => {

  function makeState(value = null) {
    if (!value) value = branch.value;
    return {...value, isValid: branch.do.isValid(), errors : branch.do.errors()};
  }
  const [state, setState] = useState(makeState());
  useEffect(() => {
    const sub = branch.subscribe((value) => {
      const state = makeState(value);
      setState(state);
    });

    return () => {
      sub.unsubscribe();
    }
  }, []);
  if (!(state && branch)) return '';
  return  <>
    <h2>{state.title}</h2>
    <input type={state.type} value={state.value}
      disabled={status !== 'entering'}
      onChange={(event) => branch.do.update(event.target.value)} />
    {state.touched && branch.do.errors() ? <div className="message error">{branch.do.errors()}</div> : '' }
  </>
}
