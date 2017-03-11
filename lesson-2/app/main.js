//main.js
import React from 'react'
import {render} from 'react-dom'
import App from './component/App'
import {AppContainer} from 'react-hot-loader'


if (module.hot) {
    console.log('hot!!');
    module.hot.accept('./component/App', () => {
        // debugger;
        const NextApp = require('./component/App').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);