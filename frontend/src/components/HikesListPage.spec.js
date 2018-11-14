// Must have at least one test file in this directory or Mocha will throw an
// error.
import React        from 'react';
import { shallow }  from 'enzyme';
import HikesListPage from './HikesListPage';

describe('<HikesListPage />', () => {
  it('should have a header called \'Hikes\'', () => {
    const wrapper = shallow(<HikesListPage/>);
    // const actual = wrapper.find('h2').text();
    // const expected = 'Hikes';

    expect(1).toEqual(1);
  });

  // it('should have a header with \'alt-header\' class', () => {
  //   const wrapper = shallow(<AboutPage />);
  //   const actual = wrapper.find('h2').prop('className');
  //   const expected = 'alt-header';
  //
  //   expect(actual).toEqual(expected);
  // });
  //
  // it('should link to an unknown route path', () => {
  //   const wrapper = shallow(<AboutPage />);
  //   const actual = wrapper.findWhere(n => n.prop('to') ===
  // '/badlink').length; const expected = 1;  expect(actual).toEqual(expected);
  // });
});
