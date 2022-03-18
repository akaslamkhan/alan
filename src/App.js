import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards.js';
import useStyles from './styles.js'

const alanKey = 'ab4ef64f42b671c07cfa6f370532ca1c2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticles] = useState(-1);
    const classes = useStyles();

    useEffect(()=>
    {
        alanBtn({
            key: alanKey,
            onCommand:({command, articles, number})=>{
                if(command === 'newHeadLines'){
                    setNewsArticles(articles);
                    setActiveArticles(-1);
                }else if(command === 'highlight'){
                    setActiveArticles((prev)=> prev+1);
                }else if(command === 'open'){
                    const parse = number.length > 2 ? wordsToNumbers(number,{ fuzzy: true}) : number;
                    const article = articles[parse - 1];
                    if(parse>20){
                        alanBtn().playText('please try again');
                    }else if(article){
                        window.open(article.url, '_blank')
                        alanBtn.playText('Opening');
                    }

                }
            }
        })
    },[])
  return (
      <>
    <div className={classes.logoContainer}>
    {newsArticles.length ? (
      <div className={classes.infoContainer}>
        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [2,4,5]</Typography></div>
      </div>
    ) : null}
    <img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
  </div>
  <NewsCards articles={newsArticles} activeArticle={activeArticle} />
  </>
  )
}

export default App