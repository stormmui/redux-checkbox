import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectDatadir,
  fetchPostsIfNeeded,
  invalidateDatadir,
  addDataDir
} from "../actions";
import Picker from "../components/Picker";
import FileSelector from "../components/FileSelector";
import DataDirForm from "../components/DataDirForm";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.processDataDirForm = this.processDataDirForm.bind(this);
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

  processDataDirForm(values) {
    const { dispatch } = this.props;
    dispatch(addDataDir(values));
  }

  render() {
    const {
      datadirs,
      selectedDatadir,
      files,
      isFetching,
      lastUpdated
    } = this.props;
    return (
      <div>
        <Picker
          value={selectedDatadir}
          onChange={this.handleChange}
          options={datadirs}
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
        <div>
          <DataDirForm onSubmit={this.processDataDirForm} />
        </div>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  datadirs: PropTypes.array.isRequired,
  selectedDatadir: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { datadirs, selectedDatadir, filesByDatadir } = state;
  const { isFetching, lastUpdated, items: files } = filesByDatadir[
    selectedDatadir
  ] || {
    isFetching: true,
    items: []
  };

  return {
    datadirs,
    selectedDatadir,
    files,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
