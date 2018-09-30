import Types from 'prop-types';

const Error = ({ message }) => message;

Error.propTypes = {
  message: Types.string.isRequired,
};

export default Error;
