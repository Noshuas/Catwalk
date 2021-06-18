/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrackerContext from '../context/Tracker';
import ThemeContext from '../context/Theme';

const ProductFinalSelect = ({ SizeInformation = {} }) => {
  const [currentSize, setCurrentSize] = useState();
  const [quantity, setQuantity] = useState();
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [error, setError] = useState(false);
  const { tracking, setTracking } = useContext(TrackerContext);
  const { themeMode } = useContext(ThemeContext);
  useEffect(() => {
    if (currentSize) {
      setQuantity(parseInt(currentSize.split(',')[1], 10));
      setSelectedQuantity(1);
      setError(false);
    }
  }, [currentSize]);

  useEffect(() => {
    const qOpts = [];
    let max = quantity;
    if (max > 15) {
      max = 15;
    }
    for (let i = 0; i < max; i += 1) {
      qOpts.push(i + 1);
    }
    setQuantityOptions(qOpts);
  }, [quantity]);

  const onClickValidator = (event) => {
    const tracked = { element: event.target, time: new Date(), module: 'Add to Cart' };
    setTracking([...tracking, tracked]);
    if (!currentSize && !selectedQuantity) {
      setError(true);
    } else {
      // do positive stuff, like hey they go the cart!
      setError(false);
    }
  };

  return (
    <div className="flex-basis-30">
      { !SizeInformation.null ? (
        <>
          {error ? (
            <div className="row">
              <div className="col text-center text-light text-bold bg-warn-light py-2">
                Please Select Size
              </div>
            </div>
          ) : null}
          <div className="row justify-content-between">
            <select
              className={`select-size text-size-2 rounded-sm pl-4 hover-outline my-2 flex-basis-50 btn shadow my-2 border-transparent ${themeMode === 'Light' ? 'bg-light btn-focus text-dark' : 'bg-dark-light btn-focus-dark text-light'}`}
              onChange={(event) => {
                setCurrentSize(event.target.value);
                const tracked = { element: event.target, time: new Date(), module: `Size Selector. Size Selected: ${event.target.value}` };
                setTracking([...tracking, tracked]);
              }}
              value={currentSize || ''}
            >
              <option value="">Select size</option>
              {Object.keys(SizeInformation).map((key) => (
                <option
                  value={`${SizeInformation[key].size},${SizeInformation[key].quantity}`}
                  className="text-size-1"
                  key={`SelectSize-${key}`}
                >
                  {SizeInformation[key].size}
                </option>
              ))}
            </select>
            <select
              className={`select-size text-size-2 rounded-sm pl-4 my-2 mr-2 flex-basis-30 btn shadow my-2 border-transparent ${themeMode === 'Light' ? 'bg-light btn-focus text-dark' : 'bg-dark-light btn-focus-dark text-light'}`}
              value={`${currentSize ? selectedQuantity : null}` || ''}
              onChange={(event) => {
                setSelectedQuantity(event.target.value);
                const tracked = { element: event.target, time: new Date(), module: `Quantity Selector. Quantity Selected: ${event.target.value}` };
                setTracking([...tracking, tracked]);
              }}
            >
              <option value="">-</option>
              {quantityOptions.map((value) => (
                <option value={value} key={`Quantity-${value}`}>{value}</option>
              ))}
            </select>
          </div>
          <div className="row justify-content-between">
            <button
              type="button"
              aria-label="add to cart"
              className={`select-size text-size-2 btn shadow my-2 rounded-sm flex-basis-60 border-transparent ${themeMode === 'Light' ? 'bg-light btn-focus text-dark' : 'bg-dark-light btn-focus-dark text-light'}`}
              onClick={onClickValidator}
            >
              <span className={`${themeMode === 'Light' ? 'text-dark' : 'text-light'}`}> Add to Bag </span>
              <i className={`fas fa-plus ${themeMode === 'Light' ? 'text-dark' : 'text-light'}`} style={{ float: 'right', marginRight: '10%' }} />
            </button>
            <button
              type="button"
              aria-label="favourite the product"
              className={`text-size-2 d-flex justify-content-center my-2 btn shadow rounded-sm flex-basis-25 mr-2 select-size border-transparent ${themeMode === 'Light' ? 'bg-light btn-focus text-dark' : 'bg-dark-light btn-focus-dark text-light'}`}
              onClick={(event) => {
                const tracked = { element: event.target, time: new Date(), module: 'Add to favourites' };
                setTracking([...tracking, tracked]);
              }}
            >
              <i className={`far fa-star align-self-center ${themeMode === 'Light' ? 'text-dark' : 'text-light'}`} />
            </button>
          </div>
        </>
      )
        : (
          <>
            <div className={` text-bold text-size-4 ${themeMode === 'Light' ? 'text-muted' : 'text-muted-light'}`}>OUT OF STOCK</div>
            <button
              type="button"
              className={`select-size text-size-2 d-flex justify-content-center my-2 shadow rounded-sm border-transparent ${themeMode === 'Light' ? 'bg-light text-dark btn-focus' : 'bg-dark-light text-light btn-focus-dark'}`}
              onClick={(event) => {
                const tracked = { element: event.target, time: new Date(), module: 'Add to favourites' };
                setTracking([...tracking, tracked]);
              }}
            >
              <i className={`far fa-star align-self-center ${themeMode === 'Light' ? 'text-dark' : 'text-light'}`} />
            </button>
          </>
        )}
    </div>
  );
};

ProductFinalSelect.propTypes = {
  SizeInformation: PropTypes.object.isRequired,
};

export default ProductFinalSelect;
