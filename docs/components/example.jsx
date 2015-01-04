var React = require('react')
  , _ = require('lodash');


module.exports = React.createClass({

  getDefaultProps: function(){
    return {
      language: 'js'
    }
  },

  render: function(){
    return (
      <pre>
        <code className={ this.props.language}>
          {this.props.code || this.props.children}
        </code>
      </pre>
    )
  }
})