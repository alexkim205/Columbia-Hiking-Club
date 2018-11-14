// Must have at least one test file in this directory or Mocha will throw an error.
import React from 'react'
import { shallow } from 'enzyme'
import HikeListPage from './HikeListPage'

describe('<HikeListPage />', () => {
  it('should have a header called \'Hike List Page\'', () => {
    const wrapper = shallow(<HikeListPage />)
    const actual = wrapper.find('h4').text()
    const expected = 'Hike List Page'

    expect(actual).toEqual(expected)
  })

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
  //   const actual = wrapper.findWhere(n => n.prop('to') === '/badlink').length;
  //   const expected = 1;
  //
  //   expect(actual).toEqual(expected);
  // });
})
