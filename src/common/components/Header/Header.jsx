import logo from "../../../assets/img/logo.png";
import { NavLink } from "react-router";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <nav className={s.container}>
      <NavLink to={"/"} className={({ isActive }) => `${isActive ? s.isActive : ""}`}>
          <img src={logo} alt="logotype" className={s.logo} />
      </NavLink>

      <NavLink to={"/"} className={({ isActive }) => `${s.headerLink} ${isActive ? s.isActive : ""}`}>
          Home
      </NavLink>
      <NavLink to={"/characters"} className={({ isActive }) => `${s.headerLink} ${isActive ? s.isActive : ""}`}>Characters</NavLink>
      <NavLink to={"/locations"} className={({ isActive }) => `${s.headerLink} ${isActive ? s.isActive : ""}`}>Locations</NavLink>
      <NavLink to={"/episodes"} className={({ isActive }) => `${s.headerLink} ${isActive ? s.isActive : ""}`}>Episodes</NavLink>
    </nav>
  );
};
