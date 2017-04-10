import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import caretPos from './util/caret';

import Input from './Input';

class ComboboxInput extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    suggest: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown:  PropTypes.func,
  };

  static defaultProps = {
    value: '',
  };

  componentDidUpdate() {
    var input = findDOMNode(this)
      , val = this.props.value;

    if (this.isSuggesting()) {
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
        , end   = val.length - start

      if ( start >= 0) {
        caretPos(input, start, start + end)
      }
    }
  }

  handleChange = (e) => {
    let { placeholder, value, onChange } = this.props;

    var stringValue = e.target.value
      , hasPlaceholder = !!placeholder

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if (hasPlaceholder && !stringValue && stringValue === (value || ''))
      return

    this._last = stringValue;
    onChange(e, stringValue)
  };

  render() {
    let { onKeyDown, ...props } = this.props;

    delete props.suggest;

    return (
      <Input
        {...props}
        className="rw-widget-input"
        onKeyDown={onKeyDown}
        onChange={this.handleChange}
      />
    )
  }

  isSuggesting() {
    let { value, suggest } = this.props;

    if (!suggest) return false;

    return (
      this._last != null &&
      value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1
    )
  }

  accept() {
    var value = findDOMNode(this).value || ''
      , end = value.length;

    this._last = null
    caretPos(findDOMNode(this), end, end)
  }


  focus() {
    findDOMNode(this).focus()
  }
}

export default ComboboxInput
