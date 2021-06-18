/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ThemeContext from './context/Theme';

const NavigationBar = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [dayMode, setDayMode] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (themeMode === 'Light') {
      setDayMode(true);
    } else {
      setDayMode(false);
    }
  }, [themeMode]);

  const ToggleMode = () => {
    const newMode = !dayMode;
    if (newMode) {
      setThemeMode('Light');
    } else {
      setThemeMode('Dark');
    }
  };

  const searchProduct = (event) => {
    if (event.keyCode === 13 || event.key === 'Enter') {
      if (event.target.value >= 17067 && event.target.value <= 18076) {
        history.push(`/products/${event.target.value}`);
      } else {
        alert('Enter ID within 17067 and 18076');
      }
    }
  };
  return (
    <header className="shadow rounded">
      <Link className="logo text-primary cursor-pointer h1 text-secondary" to="/"><i className="fas fa-store" /></Link>
      <input type="checkbox" id="nav-toggle" className="nav-toggle bg" />
      <nav id="navigation" className={themeMode === 'Light' ? 'bg-lighter' : 'bg-darker'}>
        <ul>
          <li>
            <label className="switch">
              <input id="themeSwitch" type="checkbox" checked={dayMode} onChange={ToggleMode} />
              <span htmlFor="themeSwitch" className="slider" />
              <span htmlFor="themeSwitch" className="slider-icons" />
            </label>
          </li>
          <li>
            <Link to="/" className={`text-secondary cursor-pointer ${themeMode === 'Light' ? 'hover-outline' : 'hover-outline-light'}`}>Home</Link>
          </li>
          <li className="user-input-form text-secondary">
            <input
              type="number"
              id="nav-search"
              className="user-input text-light cursor-pointer"
              placeholder=" "
              onKeyDown={searchProduct}
            />
            <div htmlFor="nav-search" className="user-line bg-secondary cursor-pointer" />
            <label htmlFor="nav-search" className="text-secondary cursor-pointer">Search (17067 - 18076)</label>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span />
      </label>
    </header>
  );
};

export default NavigationBar;
