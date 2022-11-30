import scss from './News.module.scss';
import { Input } from 'components/Input';
import Scss from 'components/Input/Input.module.scss'
import sprite from 'images/symbol-defs.svg';
import { useDispatch } from 'react-redux';
import { setFilterNews } from 'redux/sliceNews';
import { toast } from 'react-toastify';
import { toastMainOptions } from 'config';
import { useState } from "react";
import { useTranslation } from 'react-i18next';


const FormSearchNews = () => {
  const [valueIn, setValueIn] = useState('');
  
    const { t } = useTranslation();

   const dispatch = useDispatch();
  // toast.info('Please login first.', toastMainOptions);
  // toast.error(`Bad request`, toastMainOptions);

  const onChangeNews = (e) => {
    if (e.currentTarget.value === " ") {
      toast.error(`Bad request`, toastMainOptions);
    }else{
      setValueIn(e.currentTarget.value);
    }
    
}

const onClickNews = (e) => {
  e.preventDefault();
  dispatch(setFilterNews(valueIn));
  setValueIn('')
  
}

  return (
    <div className={scss.container}>
      <h2 className={scss.title}>{t('news')}</h2>
      <div className={scss.position}>
        <form onSubmit={onClickNews}>
          <Input
          customStyle={Scss.InputNews}
          placeholder={'Search'}
          onChange={onChangeNews}
          value={valueIn}
          label={ 
            <button className={scss.buttonSearch} type="submit"
            >
              <svg className={scss.search_icon}>
                <use href={sprite + '#icon-loupe'} />
              </svg>
            </button>
        }/>
           </form>
      </div>
        
    </div>
  );
};

export default FormSearchNews;
