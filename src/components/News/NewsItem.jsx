import scss from './News.module.scss';
import { useTranslation } from 'react-i18next';

export const NewsItem = ({ url, title, description, date}) => {
const { t } = useTranslation();
    return (
        <li className={scss.item}>
            <h3 className={scss.titleList}>{title}</h3>
            <p className={scss.dataNews}>{description}</p>
            <div className={scss.dateAndLink}>
            <p className={scss.dateNews}>{date}</p>
            <a href={url} className={scss.linkNews} target="_blank" rel="noreferrer noopener">{t('read')}</a>
            </div>
        </li>
    )
}


export default NewsItem;
