import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import Loading from "./Loading";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };
  getauthors = async () => {
    try {
      const response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = response.data;
      this.setState({
        authors: authors,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  };
  componentDidMount() {
    this.getauthors();
  }

  selectAuthor = async authorID => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${authorID}/`
      );
      const author = response.data;
      this.setState({
        currentAuthor: author,
        loading: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
