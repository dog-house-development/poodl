import React from 'react';
import PropTypes from 'prop-types';

const CommentForm = props => (
  <form onSubmit={props.handleSubmit}>
    <input
      type="text"
      name="author"
      placeholder="Your name…"
      value={props.author}
      onChange={props.handleChangeText}
    />
    <input
      type="text"
      name="text"
      placeholder="Say something..."
      value={props.text}
      onChange={props.handleChangeText}
    />
    <button type="submit">Submit</button>
  </form>
);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

CommentForm.defaultProps = {
  text: '',
  author: '',
};

export default CommentForm;
