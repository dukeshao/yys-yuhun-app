import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';


import './App.scss';
import './assets/css/menu.scss';

// import Prehome from './pages/prehome';
import Home from './pages/home/home';
import List from './pages/list/list';
import Test from './pages/test/test'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAlert: false,
            style: "-30px"
        }
        this.move = this.move.bind(this)

    }

    move() {
        let target = 0;
        if (this.state.style === 0) {
            target = "-30px";
        } else {
            target = 0;
        }
        this.setState({
            style: target
        })
        // console.log(this.refs.menu)
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/list' component={List} />
                    <Route path='/test' component={Test} />
                    {/* <Route path='/detail/:id' component={Detail} /> */}
                    <Redirect from="/" to="/home" />
                </Switch>
                <div className="menu" ref="menu" onClick={this.move.bind(this)} style={{ left: this.state.style }}></div>
            </div>
        );
    }
}
App = withRouter(App);
export default App;
