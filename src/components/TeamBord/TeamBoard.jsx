import CardMember from './CardMember';
import styleBord from './TeamBoard.module.scss';
import { arr } from './team.js';
import { useEffect } from 'react';

const TeamBoard = ({ isOpen }) => {
  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.code !== 'Escape') return;
      isOpen((prev) => !prev);
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [isOpen]);

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      isOpen((prev) => !prev);
    }
  };

  return (
    <div className={styleBord.bodyBord} onClick={handleClose}>
      {arr.map((el) => (
        <CardMember
          key={el.name}
          styleProp={styleBord}
          title={el.title}
          parg={el.par}
          alt={el.alt}
          image={el.img}
          name={el.name}
          desc={el.desccription}
          price={el.price}
          git={el.git}
        />
      ))}
    </div>
  );
};

export default TeamBoard;
