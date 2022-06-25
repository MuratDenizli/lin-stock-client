import * as React from 'react';
import './App.css';
import Box from './Components/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
  const [error, setError] = useState(null);
  const [homepageList, setHomepageList] = useState([]);

  useEffect(() => {
    console.log("url",process.env.API_URL);
    axios
      .get(`https://lin-stock-app.herokuapp.com/api/homepages`)
      .then(({ data }) => {
        setHomepageList(data.data)
      })
      .catch((error) => setError(error))
  }, [])

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App">
      <div className='layout'>
        <div className='box-list'>
          {homepageList.map((item) =>
            <Box key={item.id} id={item.attributes.url} title={item.attributes.Baslik} imgurl={item.attributes.resim_url} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
