import { useEffect, useState } from "react";
import s from "./CharacterPage.module.css";
import axios from "axios";
import { Link } from "react-router";

export const CharacterPage = () => {
  const [characters, setCharacters] = useState([]); //useState возвр массив, setCharacters- функция, с пом кот мы данные можем изменять, useState хранит персонажей

const [error, setError] = useState(null); //useState хранит ошибку

  const [info, setInfo] = useState({ //useState хранит информацию, нужную для пагинации
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })

  const fetchData = (url)=> {
    axios.get(url).then((res) => {
      //делаем побочный эффект,делаем запрос, получаем данные, кладем в state
      setCharacters(res.data.results); //вызываем функцию, изменяем данные,отрисовываем персонажа ниже img
      setInfo(res.data.info); //вызываем функцию для хранения информации
      setError(null); //зануляем ошибку, когда необходимый результат выводится
    })
    .catch( (err) => {
      setError(err.response.data.error);
    })
  }

  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character')
  }, []);

  
  const previousPageHandler = () => {
    fetchData(info.prev) //при получении данных будем их устанавливать в info state
  }

  const nextPageHandler = () => {
    fetchData(info.next) //при получении данных будем их устанавливать в info state
  }

  const searchHandler = (event) => {

    const value = event.currentTarget.value;
    fetchData(`https://rickandmortyapi.com/api/character?name=${value}`)
  }
  
  return (
    <div className={'pageContainer'}>
      <h1 className={"pageTitle"}>CharacterPage</h1>
      {/* <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." /> */}
      <input type="search" className={s.search} onChange={searchHandler} placeholder="Search..." />
      {error && <div className="errorMessage">{error}</div>}
      {!error && characters.length && (

        <>
          {
            <div className={s.characters}>
                      {characters.map((character) => {
                        return (
                          <div key={character.id} className={s.character}>
                            <Link to={`/characters/${character.id}`} className={s.characterLink}>{character.name}</Link>
                            <img src={character.image} alt={`${character.name} avatar`} />
                          </div>
                        );
                      })
                      }
            </div>          
          }
          <div className={s.buttonContainer}>
            <button className="linkButton" disabled={info.prev === null} onClick={previousPageHandler}>
              Назад
            </button>
            <button className="linkButton" disabled={info.next === null} onClick={nextPageHandler}>
              Вперед
            </button>
          </div>
        
        </>
      )}
    </div>
  );
};
