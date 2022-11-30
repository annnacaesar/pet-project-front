import { useTranslation } from 'react-i18next';
import scss from './ChangeLanguage.module.scss';

const options = [
  {
    label: 'EN',
    value: 'en'
  },
  {
    label: 'UA',
    value: 'ua'
  }
];

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  function changeLanguage(e) {
    const whatLanguage = e.target.value;
    localStorage.setItem('whatLanguage', whatLanguage);
    const language = localStorage.getItem('whatLanguage');

    i18n.changeLanguage(language);
  }
  const language = localStorage.getItem('whatLanguage');

  return (
    <div className={scss.buttonLanguage}>
      <select className={scss.changeLang} value={language || ''} onChange={changeLanguage}>
        {options.map((option, idx) => (
          <option key={idx} className={scss.changeLangItem} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeLanguage;
