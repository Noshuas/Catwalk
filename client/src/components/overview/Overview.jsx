/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line import/no-unresolved
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import ProductStyles from './ProductStyles';
import ProductFinalSelect from './ProductFinalSelect';
import ProductCarousel from './ProductCarousel';
import ThemeContext from '../context/Theme';

// eslint-disable-next-line object-curly-newline
const Overview = ({
  Name, Category, Description, Slogan, Price, ReviewsRatings, Features, Styles,
  CurrentStyle, setCurrentStyle, SalePrice,
}) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="full-view">
      <div className="row justify-content-around" style={{ position: 'relative' }} id="carousel-and-info">
        {CurrentStyle.photos && CurrentStyle.photos.length > 0
          ? (<ProductCarousel Photos={CurrentStyle.photos} />)
          : null}
        <div className={`col overview-product-info px-2 py-4 mr-auto mb-4 ${themeMode === 'Light' ? 'bg-light' : 'bg-dark'}`}>
          <div className="d-flex flex-column h-100">
            <ProductInfo
              Name={Name}
              Category={Category}
              Price={Price}
              ReviewsRatings={ReviewsRatings}
              SalePrice={SalePrice}
            />
            <ProductStyles
              Styles={Styles}
              CurrentStyle={CurrentStyle}
              setCurrentStyle={setCurrentStyle}
            />
            { CurrentStyle.skus ? <ProductFinalSelect SizeInformation={CurrentStyle.skus} /> : null}
          </div>
        </div>
      </div>
      <div className={`row align-items-center justify-content-center mx-auto py-3 px-3 overview-description mb-4 ${themeMode === 'Light' ? 'bg-light' : 'bg-dark'}`}>
        <ProductDescription
          Description={Description}
          Slogan={Slogan}
          Features={Features}
        />
      </div>
    </div>
  );
};
Overview.propTypes = {
  Name: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Slogan: PropTypes.string.isRequired,
  Price: PropTypes.string.isRequired,
  ReviewsRatings: PropTypes.object.isRequired,
  Features: PropTypes.array.isRequired,
  Styles: PropTypes.array.isRequired,
  CurrentStyle: PropTypes.object.isRequired,
  setCurrentStyle: PropTypes.func.isRequired,
  SalePrice: PropTypes.string.isRequired,
};

export default Overview;
