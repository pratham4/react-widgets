import React from 'react'
import PropTypes from 'prop-types';
import MenuItem from 'react-bootstrap/lib/MenuItem'

import propId from './propId'


const propTypes = {
  divider: PropTypes.bool,
};

const contextTypes = {
  prefix: PropTypes.string.isRequired,
};

function ApiMenuItem({ divider, children }, { prefix }) {
  if (divider)
    return <MenuItem divider={true}></MenuItem>

  return (
     <MenuItem className="prop-item" href={'#' + propId(prefix, children)}>
      {children}
     </MenuItem>
  );
}

ApiMenuItem.propTypes = propTypes;
ApiMenuItem.contextTypes = contextTypes;


module.exports = ApiMenuItem;
