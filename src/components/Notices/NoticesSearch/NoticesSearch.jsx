import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../../Input';
import css from './NoticesSearch.module.scss';
import sprite from 'images/symbol-defs.svg';
import { useTranslation } from 'react-i18next';

const NoticesSearch = () => {
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const handleInput = (event) => {
    const newQuery = event.target.value.toLowerCase().trim();
    setQuery(newQuery);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setQuery(event.target[0].value.toLowerCase().trim());

    if (query === '') {
      toast.warn(`Type something to search.`);
      return;
    }
    setSearchParams({ search: query });
    // event.target.reset();
  };

  const handleResetQuery = () => {
    setQuery('');
    setSearchParams({ search: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.searchBar__input_wrap}>
        <Input name="findpet" type="text" value={query} placeholder={t('Search')} customStyle={css.searchBar__input} onChange={handleInput} />
        <button className={css.searchBar__input_button} type="submit">
          <svg className={css.iconHeart + ' ' + css.searchBar__input_icon}>
            <use href={sprite + '#icon-loupe'} />
          </svg>
        </button>
        {query !== '' && (
          <button className={css.searchBar__input_button_delete} type="submit" onClick={handleResetQuery}>
            <svg className={css.iconDelete + ' ' + css.searchBar__input_icon}>
              <use href={sprite + '#icon-blackCross'} />
            </svg>
          </button>
        )}
      </form>
    </>
  );
};

export default NoticesSearch;
