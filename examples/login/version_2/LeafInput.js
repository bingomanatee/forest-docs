import { useEffect, useState } from 'react'

/**
 * This is a function  that draws an input field based on a field branch.
 *
 * @param branch {Leaf}
 * @returns {JSX.Element|string}
 */
export const LeafInput = ({branch}) => {
  const [state, setState] = useState(branch? branch.value : null);
  useEffect(() => {
    const sub = branch.subscribe(setState);

    return () => {
      sub.unsubscribe();
    }
  }, []);
  if (!(state && branch)) return '';

  return  <>
    <h2>[{state.title}</h2>
    <input type={state.type} value={state.value}
      onChange={(event) => {
        branch.do.update(event.target.value);
      }} />
    {state.touched && state.$errors ? <div className="error">{state.$errors}</div> : '' }
  </>
}
