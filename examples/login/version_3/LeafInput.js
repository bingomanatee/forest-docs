import { useEffect, useState } from 'react'

/**
 * This is a function  that draws an input field based on a field branch.
 *
 * @param branch {Leaf}
 * @returns {JSX.Element|string}
 */
export const LeafInput = ({status, branch}) => {
  const [state, setState] = useState(branch.value);
  useEffect(() => {
    const sub = branch.subscribe((value) => {
      setState(branch.value);
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
    {branch.$$.get('$errors') ? <div className="message error">{branch.$$.get('$errors')}</div> : '' }
  </>
}
