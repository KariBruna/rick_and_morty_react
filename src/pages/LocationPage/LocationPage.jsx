import { useEffect, useState } from "react";
import axios from "axios";

export const LocationPage = () => {


    const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location`)
      .then((res) => 
      setLocations(res.data.results))
      .catch((error) => console.error("Ошибка загрузки:", error));
    
}, []);


  return (
    <div className="pageContainer">
      <h1 className={'pageTitle'}>LocationPage</h1>

      <div >
          {locations.map((location) => (
              <div key={location.id}>
                <ul>
                  <li>Название локации: <b>{location.name}</b></li>
                  <li>Тип локации: <b>{location.type}</b></li>
                  <li>Измерение, в котором находится местоположение: <b>{location.dimension}</b></li>
                  <li>Количество персонажей, которых видели в данной локации: <b>{location.residents.length}</b></li>
                </ul>
                  <hr/>
              </div>
          ))}                  
      </div>                 
   </div>
  );
};
