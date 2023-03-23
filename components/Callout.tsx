import style from './Callout.module.css';

const Callout = ({ className = '', children }) => (
  <section className={`${className? style[className] : ''} ${style.container}`}>
    {children}
  </section>
)

export default Callout
