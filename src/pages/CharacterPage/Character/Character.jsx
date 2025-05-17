import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router"
import s from './Character.module.css'
 
export const Character = () => {
  const { id } = useParams()
 
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
      setCharacter(res.data);
    })
}, [])

    const getStatusClassName = (status) => {
    let characterStatus
    switch (status) {
      case "Alive":
        characterStatus = s.aliveStatus
        break
 
      case "Dead":
        characterStatus = s.deadStatus
        break
 
      case "unknown":
        characterStatus = s.unknownStatus
        break
 
      default:
        characterStatus = ""
    }
 
    return `${s.status} ${characterStatus}`
  }

    return (
    <div className="pageContainer">
      {character !== null && (
        <div className={s.container}>
          <h1 className="pageTitle">{character.name}</h1>
          <div className={s.content}>
            <img className={s.img} src={character.image} alt="character" />
            <div className={s.description}>
              <div className={s.statusContainer}>
              <div className={getStatusClassName(character.status)}></div>
                <div>
                  {character.status} - {character.species}
                </div>
              </div>
              <div className={s.info}>
                <p className={s.subTitle}>Last known location:</p>
                <p className={s.subTitleResult}>{character.location.name}</p>
              </div>
              <div className={s.info}>
                <p className={s.subTitle}>Episode count:</p>
                <p className={s.subTitleResult}>{character.episode.length}</p>
              </div>
            </div>
          </div>
          <Link to={"/characters"} className={"linkButton"}>
            Go back
          </Link>
        </div>
      )}
    </div>
  )
}
