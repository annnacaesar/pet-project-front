import React from "react";
import { NewsItem } from './NewsItem.jsx';
import scss from './News.module.scss'
import { useGetNewsListQuery } from 'redux/fetchNews'
import{ useSelector } from 'react-redux';
import { selectors } from 'redux/selectors';



export const NewsList = () => {
    const { data } = useGetNewsListQuery();

    const onFilter = useSelector(selectors.getNews);
    
    const getVisibleNews = () => {
        const normalizedFil = onFilter.toLocaleLowerCase()
        return data.filter(news =>
            news.title.toLocaleLowerCase().includes(normalizedFil)) 
    };

    
    return (
        <>
            {!data ? (
                <div className={scss.notNewsFound}>
                    <h3 className={scss.notNewsFoundText}>Waiting pleas...</h3>
                </div>
            ) : (
               <ul className={scss.newsList}>
                        {(getVisibleNews().length === 0) ? (
                            <div className={scss.notNewsFound}>
                    <h3 className={scss.notNewsFoundText}>Sorry, your search did not match any results.</h3>
                </div>
                            ) : (
                                getVisibleNews().map(({ url, title, description, date, linkNews }) => {
                    return (
                        <NewsItem
                            key={url}
                            url={url}
                            title={title}
                            description={description}
                            date={date}
                        />
                    )
                }
                ))
            }
        </ul>     
            )
            }
        </>
        
    )
};

export default NewsList;