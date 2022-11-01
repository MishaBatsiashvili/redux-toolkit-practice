import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { PostsList } from "./app/features/posts/PostsList";
import { AddPostForm } from "./app/features/posts/AddPostForm";
import { SinglePostPage } from "./app/features/posts/SinglePostPage";
import { EditPostForm } from "./app/features/posts/EditPostForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />

          <Route exact path="/post/:postId" component={SinglePostPage} />
          <Route exact path="/post/:postId/edit" component={EditPostForm} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
