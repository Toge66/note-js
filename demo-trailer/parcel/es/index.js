import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import App from './app'

class Container extends PureComponent {
    state = {
        name: "parcel 打包尝试"
    }

    render() {
        const {name} = this.state
        return <App name={name}></App>
    }
}

render(<Container/>,document.getElementById('app'))
