import { useEffect, useMemo, useState } from "react"
import { Forest } from "@wonderlandlabs/forest"
import styles from './Counter.module.scss';

export const CounterComponent = () => {
  // pushing subscription to local state hooks
  // ensures the component re-renders when the state changes
  const [value, setValue] = useState(0);

  const state = useMemo(() => {
    return new Forest({
      $value: 0, actions: {
        increase(leaf) {
          leaf.value = leaf.value + 1;
        }
      }});
  }, []);

  useEffect(() => {
    const sub = state.subscribe(setValue);
    // when the document is done, unsubscribing should prevent
    // unnecessary memory leaks
    return () => sub.unsubscribe();
  }, [state, setValue]);

  return (
    <div className={styles['counter']}>
      Count: {value} <button type="button" onClick={state.do.increase}>Add</button>
    </div>
  )
}
