import styleLoader from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styleLoader.contenedor}>
      <div className={styleLoader.todo}>
        <div className={styleLoader.dog}>
          <span className={styleLoader.leg3}></span>
          <div className={styleLoader.body}>
            <span className={styleLoader.cola}></span>
            <span className={styleLoader.leg}></span>
          </div>
          <div className={styleLoader.cabezota}>
            <div className={styleLoader.orejas}>
              <span className={styleLoader.orejitas}></span>
            </div>
            <div className={styleLoader.orejas3}>
              <span className={styleLoader.orejitas3}></span>
            </div>
            <div className={styleLoader.cabeza}>
              <span className={styleLoader.cabeza3}></span>
              <span className={styleLoader.ojos}>
                <span className={styleLoader.iris}></span>
              </span>
              <span className={styleLoader.nariz}></span>
              <span className={styleLoader.nariz3}></span>
            </div>
          </div>

          <div className={styleLoader.canasta}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
