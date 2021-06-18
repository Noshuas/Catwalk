/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import supertest from 'supertest';
import renderer from 'react-test-renderer';
import AppRouter from './client/src/components/AppRouter';
import Overview from './client/src/components/overview/Overview';
import server from './server/router';

const request = supertest(server);

describe('Start Jest', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Jest test', () => {
    function sum(a, b) {
      return a + b;
    }
    test('two plus two is four', () => {
      expect(sum(2, 2)).toBe(4);
    });
  });

  describe('Connect to server', () => {
    test('Gets the test endpoint', async () => {
      const response = await request.get('/test');
      expect(response.status).toBe(200);
      expect(response.text).toBe('hello from test!');
    });
  });

  describe('Basic React actions', () => {
    describe('React Check', () => {
      it('renders App without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppRouter />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
    });
  });

  describe('React Components', () => {
    let productInfo;
    let reviewMeta;
    // let productStyles;
    // let salesPrice;
    beforeEach(async () => {
      productInfo = {
        id: 17071,
        campus: 'hr-rfp',
        name: 'Heir Force Ones',
        slogan: 'A sneaker dynasty',
        description: 'Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I\'m just a sneaker pro, I love Pumas and shell toes, but can\'t nothin compare to a fresh crispy white pearl',
        category: 'Kicks',
        default_price: '99.00',
        created_at: '2021-02-23T04:22:44.728Z',
        updated_at: '2021-02-23T04:22:44.728Z',
        features: [
          {
            feature: 'Sole',
            value: 'Rubber',
          },
          {
            feature: 'Material',
            value: 'FullControlSkin',
          },
          {
            feature: 'Mid-Sole',
            value: 'ControlSupport Arch Bridge',
          },
          {
            feature: 'Stitching',
            value: 'Double Stitch',
          },
        ],
      };
      reviewMeta = {
        product_id: 17071,
        ratings: {
          1: 7,
          2: 7,
          3: 12,
          4: 9,
          5: 14,
        },
        recommended: {
          false: 14,
          true: 35,
        },
        characteristics: {
          Size: {
            id: 57235,
            value: 3.0000000000000000,
          },
          Width: {
            id: 57236,
            value: 3.1363636363636364,
          },
          Comfort: {
            id: 57237,
            value: 3.1363636363636364,
          },
          Quality: {
            id: 57238,
            value: 3.2608695652173913,
          },
        },
      };
    });
    describe('Overview', () => {
      test('productInfo', () => {
        expect(productInfo.id).toBe(17071);
      });
    });
  });
});
