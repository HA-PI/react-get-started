import React from 'react'
import classname from 'classname'
import fetch from 'isomorphic-fetch'
import qs from 'querystring'

import BodyStyle from './BodyStyle'


class App extends React.Component {

    shouldComponentUpdate(nextPorps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentWillMount() {

    }

    componentDidMount() {
    }


	constructor(props) {
	    super(props);
	}

	static defaultProps = {
	}
	static propTypes = {
    }
    state = {
	}


    render() {
        return <BodyStyle style={{background: 'yellow'}}>
            <div>
            <h1>Hello Yellow</h1>
            <BodyStyle style={{background: 'red'}}>
                <h1>Hello Red</h1>
            </BodyStyle>
                <BodyStyle style={{background: 'blue'}}>
                    <h1>Hello Blue</h1>
                </BodyStyle>
            </div>
        </BodyStyle>
    }
}


export default App;