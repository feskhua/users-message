import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import Layout from './components/layout';
import Contact from './pages/Contact';
import Contacts from './pages/Contacts';
import Analytics from './pages/Analytics';
import Conversations from './pages/Conversations';

class App extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Switch>
                <Route path="/contacts/:contactId" component={Contact} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/conversations" component={Conversations} />
                <Redirect exact from="/" to="/contacts" />
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </Layout>
          </Router>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
