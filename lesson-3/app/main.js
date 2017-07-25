//main.js
import React from 'react'
import {render} from 'react-dom'
import App from './component/App'
import {AppContainer} from 'react-hot-loader'


// if (module.hot) {
//     module.hot.accept('./component/App', () => {
//         const NextApp = require('./component/App').default;
//         render(
//             <AppContainer>
//                 <NextApp/>
//             </AppContainer>,
//             document.getElementById('app')
//         );
//     });
// }

render(
    <AppContainer>
        <App tipText="abc"/>
    </AppContainer>,
    document.getElementById('app')
);
