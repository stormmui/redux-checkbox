import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectDatadir,
  fetchPostsIfNeeded,
  invalidateDatadir
} from "../actions";
import Picker from "../components/Picker";
import FileSelector from "../components/FileSelector";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedDatadir } = this.props;
    dispatch(fetchPostsIfNeeded(selectedDatadir));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDatadir !== prevProps.selectedDatadir) {
      const { dispatch, selectedDatadir } = this.props;
      dispatch(fetchPostsIfNeeded(selectedDatadir));
    }
  }

  handleChange(nextDatadir) {
    this.props.dispatch(selectDatadir(nextDatadir));
    this.props.dispatch(fetchPostsIfNeeded(nextDatadir));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedDatadir } = this.props;
    dispatch(invalidateDatadir(selectedDatadir));
    dispatch(fetchPostsIfNeeded(selectedDatadir));
  }

  render() {
    const { selectedDatadir, files, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedDatadir}
          onChange={this.handleChange}
          options={["data2", "data3"]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && files.length === 0 && <h2>Loading...</h2>}
        {!isFetching && files.length === 0 && <h2>Empty.</h2>}

        {files.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <FileSelector repo={selectedDatadir} files={files} />
          </div>
        )}
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedDatadir: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedDatadir, filesByDatadir } = state;
  const { isFetching, lastUpdated, items: files } = filesByDatadir[
    selectedDatadir
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedDatadir,
    files,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
