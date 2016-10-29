import React from 'react';
import request from 'superagent';
import prefix from 'superagent-prefix';

/* material-ui */
import { AppBar, RaisedButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { lightGreen400 } from 'material-ui/styles/colors';

/* icons */
import UserPage from 'material-ui/svg-icons/action/account-box';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import NewsFeeds from 'material-ui/svg-icons/action/picture-in-picture';
import Person from 'material-ui/svg-icons/social/person';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

/* components */
import LeftNav from './components/LeftNav';
import { NewUserDialog } from './components/NewUser';
import { LoginDialog } from './components/Login';
import { PostBoard, PostList } from './components/Post';

const server = prefix('https://react.junyi.nctu.me');
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreen400,
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonTouchTap = this.onLeftIconButtonTouchTap.bind(this);
    this.loadPosts = this.loadPosts.bind(this);

    this.state = { posts: [] };
    this.loadPosts();
  }
  onLeftIconButtonTouchTap() {
    this.refs.myNav.handleToggle();
  }
  loadPosts(url = '/posts') {
    url = '/api' + url;
    request.get(url)
      .use(server)
      .accept('json')
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({ posts: res.body });
        }
      });
  }
  newUserDialogToggle() {
    this.refs.newUserDialog.onRequestClose(); // toggle
  }
  loginDialogToggle() {
    this.refs.loginDialog.onRequestClose(); // toggle
  }
  postNewUser() {
    this.refs.newUserDialog.onRequestClose(); // toggle
    this.refs.loginDialog.onRequestClose(); // toggle
  }
  postLogin(data) {
    this.setState({ username: data.username });
    this.refs.loginDialog.onRequestClose(); // toggle
  }
  render() {
    const fullSize = {
      width: '100vw',
      height: '100vh',
      position: 'absolute'
    };
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={fullSize}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
            style={{ position: 'fixed' }}
            title={"Hello, " + this.state.username}
          />
          <LeftNav ref="myNav">
            <RaisedButton
              label="New User"
              onTouchTap={this.newUserDialogToggle.bind(this)}
            />
            <RaisedButton
              label="Login"
              onTouchTap={this.loginDialogToggle.bind(this)}
            />
            <RaisedButton label="123" secondary={true} />
          </LeftNav>
          <NewUserDialog
            ref="newUserDialog"
            server={server}
            postNewUser={this.postNewUser.bind(this)} />
          <LoginDialog
            ref="loginDialog"
            server={server}
            postLogin={this.postLogin.bind(this)} />

          <div
            style={{
              position: 'relative',
              height: 'calc(100% - 64px)',
              top: '64px'
            }}
          >
            <PostBoard
              username={this.state.username}
              loadPosts={this.loadPosts}
              server={server} />
            <PostList posts={this.state.posts} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
