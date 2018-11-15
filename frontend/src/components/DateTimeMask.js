import MaskedInput                 from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import PropTypes                   from 'prop-types';
import React                       from 'react';

function DateTimeMask (props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        ':',
        /\d/,
        /\d/]}
      guide={true}
      pipe={createAutoCorrectedDatePipe('mm/dd/yyyy HH:MM')}
      placeholderChar={'\u2000'}
      keepCharPositions={true}
      // showMask
    />
  );
}

DateTimeMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default DateTimeMask;
