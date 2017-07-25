/**
 * @file   BodyStyle
 * @author yucong02
 */
import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import withSideEffect from 'react-side-effect';

class BodyStyle extends Component {
    render() {
        return Children.only(this.props.children);
    }
}

BodyStyle.propTypes = {
    style: PropTypes.object.isRequired
};

function reducePropsToState(propsList) {
    var style = {};
    console.log('propsList', propsList)
    propsList.forEach(function (props) {
        Object.assign(style, props.style);
    });
    return style;
}

function handleStateChangeOnClient(style) {
    Object.assign(document.body.style, style);
}

export default withSideEffect(
    reducePropsToState,
    handleStateChangeOnClient
)(BodyStyle);
