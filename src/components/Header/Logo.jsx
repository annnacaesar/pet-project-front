import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const logo = ['p', 'e', 't', 'l', 'y'];

const Logo = ({ styleProp }) => {
  const variant = {
    visible: (i) => ({
      opacity: 1,
      y: 100,
      transition: {
        delay: i * 0.5
      }
    }),
    hidden: {
      opacity: 0,
      y: 0
    }
  };

  return (
    <div className={styleProp}>
      <Link to='/'>
      {logo.map((letter, i) => {
        if (letter === 't') {
          return (
            <motion.span key={Math.random()} style={{ color: '#F59256' }} variants={variant} initial="hidden" animate="visible" custom={i}>
              {letter}
            </motion.span>
          );
        }
        return (
          <motion.span key={Math.random()} variants={variant} initial="hidden" animate="visible" custom={i}>
            {letter}
          </motion.span>
        );
      })}
      </Link>
    </div>
  );
};

export default Logo;
