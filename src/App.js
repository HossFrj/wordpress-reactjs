import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/main";
import axios from "axios";
import clientConfig from "./clientConfig";
import Post from "./components/client/post/post";
import Login from "./components/client/Pages/Login_Page/login";
import Dashboard from "./components/admin/dashboard";
import Page404 from "./components/page404";
import PostsPage from "./components/client/Pages/PostsTable_Page/PostsPage";
import UsersPage from "./components/client/Pages/Users_Page/UsersPage";
import User from "./components/client/user/user";
import CatPage from "./components/client/Pages/Categorie_Page/catPage";

class App extends Component {
  state = {
    posts: [],
    users : []
  };
  componentDidMount() {
    axios
      .get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts?per_page=100`)
      .then((res) => {
        this.setState({ posts: res.data });
        // console.log(res.data, "is response");
      })
      .catch((err) => console.error(err, "is error!"));
    axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/users`).then(users =>{
      this.setState({users:users.data})
    })
  }
  render() {
    const renderPosts = (routerProps) => {
      console.log(routerProps, "is routerProps");
      let postId = parseInt(routerProps.match.params.id);
      let foundPost = this.state.posts.find((postObj) => postObj.id === postId);
      return foundPost ? <Post post={foundPost} /> : "";
    };
    const renderUser = (routerProps) => {
      let userId = parseInt(routerProps.match.params.id);
      let foundUser = this.state.users.find(user => user.id === userId);
      return foundUser ? <User getUser={foundUser} /> : "";
    }

    return (
      <HashRouter>
        <Switch>
          <Route
            path="/posts/:id"
            render={(routerProps) => renderPosts(routerProps)}
          />
          <Route 
          path="/users/:id"
          render={(routerProps) => renderUser(routerProps)}
          />
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/posts" component={PostsPage} />
          <Route path="/categories" component={CatPage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/404" component={Page404}/>
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
