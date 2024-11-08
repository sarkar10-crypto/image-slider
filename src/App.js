import './App.css';
import { IoArrowBack } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { useEffect, useState } from 'react';


function App() {

  const [images, setimages] = useState([]);
  const [index, setindex] = useState(0);
  const [Loading, setLoading] = useState(false);
  
  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    try {
      const res = await fetch(url);
      const result = await res.json();
      // hum ko childremn ka data chahiye toh uske liye result se children ko extract kar rahe hai
      const data = result.data.children;
      console.log(data);

      const list = data.filter(
        (item) => item.data.url_overridden_by_dest.includes('.jpg'))
        // ab filter hone ke bad hum ko sirf ye (url_overridden_by_dest) chahiye toh uske liye map karenge
        .map((item) => item.data.url_overridden_by_dest);
      console.log(list);
      // list ko handle karne ke liye ek state variable create karenge 
      setimages(list);
      //list ke index maintain karne ke liye or images ko swap karne ke liye ek state variable create kar lenge
      setLoading(false)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    
    fetchImages();
    
  }, [])

  const handleClick = (dir) => {
    console.log('current index', index);

    const lastidx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        console.log('last index', lastidx);
        setindex(lastidx);
      }
      else {
        setindex((idx) => idx - 1)
      }
    }
    else if (dir === "right") {
      if (lastidx === index) {
        //8 === 8 ,index-> 0
        setindex(0);
      }
      else {
        setindex((idx) => idx + 1)
      }
    }
  }

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 3000)
    return () => {
      clearInterval(tid);
    }
  }, [index]);
  

  return (
    <div className="App">
      {
        Loading ? <div className='loading'>Loading....</div> : <>
        <button className='left' onClick={()=>handleClick("left")}><IoArrowBack /></button>
      <img src={images[index]} alt='Image-Not-Found'/>
      <button onClick={()=>handleClick("right")} className='right'><GrFormNextLink /></button>
          
        </>
      }
      
    </div>
  );
}

export default App;
