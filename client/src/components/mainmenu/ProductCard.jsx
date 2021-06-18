/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/forbid-prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Connect from '../Connect';
import ThemeContext from '../context/Theme';

const ProductCard = ({ Product }) => {
  const [productPicture, setProductPicture] = useState();
  const [valid, setValid] = useState(true);
  const { themeMode } = useContext(ThemeContext);
  useEffect(async () => {
    const pictureUrl = await Connect.getProductStyles(Product.id);
    if (!pictureUrl.data.results || pictureUrl.data.results.length === 0) {
      setValid(false);
      return;
    }
    const thumbnail = pictureUrl.data.results[0].photos[0].url;
    if (!thumbnail || thumbnail === null || thumbnail === undefined) {
      setValid(false);
    }
    setProductPicture(thumbnail);
  }, []);
  return (
    <>
      { valid === true ? (
        <Link to={`/products/${Product.id}`} className="flex-basis-40 flex-grow w-100" style={{ minWidth: '10rem', maxWidth: '20rem' }}>
          <div
            className={`text-center transition-transform pt-2 my-2 d-flex flex-column rounded-sm shadow-sm ${themeMode === 'Light' ? 'bg-light' : 'bg-dark-light'}`}
            style={{ minWidth: '10rem', maxWidth: '20rem', minHeight: '30rem' }}
            onMouseEnter={(event) => {
              event.target.classList.add('filter-brightness-10');
              event.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(event) => {
              event.target.classList.remove('filter-brightness-10');
              event.target.style.transform = 'scale(1)';
            }}
          >
            <div
              className={`no-cursor rounded-no flex-basis-50 flex-grow ${themeMode === 'Light' ? 'bg-light' : 'bg-dark-light'}`}
              style={{
                backgroundImage: `url(${productPicture})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
              }}
            />
            <div className="bg-light-dark no-cursor">
              <div className="rounded-no no-cursor text-muted bg-light-dark pt-2">{Product.category}</div>
              <div className="rounded-no no-cursor h3 text-bold bg-light-dark pb-2 text-dark" style={{ borderBottomLeftRadius: '.25rem', borderBottomRightRadius: '.25rem' }}>{Product.name}</div>
            </div>
          </div>
        </Link>
      ) : null}
    </>
  );
};

ProductCard.propTypes = {
  Product: PropTypes.object.isRequired,
};

export default ProductCard;
