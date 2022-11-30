import stylesLoader from './LoaderBear.module.scss';

const LoaderBear = () => {
  return (
    <div className={stylesLoader.body}>
      <div className={stylesLoader.container}>
        <div className={stylesLoader.bear}>
          <div className={stylesLoader.bear__ears}>
            <div className={`${stylesLoader.bear__ears__left} ${stylesLoader.ear}`}></div>
            <div className={`${stylesLoader.bear__ears__right} ${stylesLoader.ear}`}></div>
          </div>
          <div className={stylesLoader.bear__body}>
            <div className={stylesLoader.bear__eyes}>
              <div className={`${stylesLoader.bear__eyes__lefts} ${stylesLoader.eye}`}></div>
              <div className={`${stylesLoader.bear__eyes__rights} ${stylesLoader.eye}`}></div>
            </div>
            <div className={stylesLoader.bear__nose}>
              <div className={stylesLoader.bear__nose__inner}></div>
            </div>
          </div>
        </div>
        <div className={stylesLoader.shadow}></div>
      </div>
    </div>
  );
};

export default LoaderBear;
