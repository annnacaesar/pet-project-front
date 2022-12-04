import scss from './ModalContainer.module.scss';

const ModalContainer = ({ customStyle, children }) => {
  return (
    <div className={scss.container_modal + ' ' + customStyle}>
      {children}
    </div>
  );
};

export default ModalContainer;
