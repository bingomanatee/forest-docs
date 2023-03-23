import style from './BeatingUpOnRedux.module.css';

const BeatingUpOnRedux = ({ children }) => (
  <section className={style.container}>
    <header>
      <img src="/img/kicking-redux.svg" />
    </header>
    {children}
  </section>
)

export default BeatingUpOnRedux
