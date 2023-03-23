import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [db, setDB] = useState(null);
  const [userPrice, setUserPrice] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const priceList = [3000, 4000, 5000, 6000, 7000, 8000, 9000];
  const onUserPriceChange = useCallback(e => {
    setUserPrice(e.target.value);
  });

  useEffect(()=>{
    if(userPrice === null){
      //Do Something...
    } else{
      axios.post("http://localhost:3000/getStore", {
        priceInterval: userPrice
      }).then((res)=>{
        const data = res.data;
        const random = Math.floor(Math.random() * data.length);
        const randomData = data[random];

        const lis = [];   
        lis.push(<div className='randomRecommend'>오늘은 {randomData.price}원 {randomData.store} {randomData.menu} 어때요?</div>)

        if(searchCount > 0){
          data.forEach((e)=>{
            lis.push(<div className='storeBox'><div className='storeBoxMenuInfo'><div className='storeName'>{e.store}</div><div>{e.menu}</div></div><div className='storeBoxPriceInfo'>{e.price} 원</div><div className='storeBoxMapInfo'><a href={e.url}>위치 보러가기</a></div></div>);
          });
        }
        setDB(lis);
      });
    }
  }, [searchCount]);

  return (
    <div className="App">
      <div className='headerText'>낙성대역 주변 1만원 이하 식당</div>
      <div className='optionFlex'>
        <div className='optionItems'>
          <select className="optionItem" onChange={onUserPriceChange} value={userPrice}>
            <option value="" selected disabled hidden >가격대를 선택해주세요!</option>
            {priceList.map((item) => (
              <option value={item} key={item}>
                {item}원대
              </option>
            ))}
          </select>
        </div>
        <div className='searchButton' onClick={()=>{
          setSearchCount(searchCount+1);
        }}>
          <img src="img/magnifying-glass.png" />
        </div>
      </div>
      <div className='storeInfos'>
        {db}
      </div>
    </div>
  );
}

export default App;
