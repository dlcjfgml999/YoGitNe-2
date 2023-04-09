import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';
import * as actions from '../../actions/Board';
// import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class OldBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: 'Found',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const splitList = this.props.location.pathname.split('/');
    const pageNum = Math.trunc(splitList[splitList.length - 1]);
    const url = this.state.kind === 'Found' ? `found/old/page/${pageNum}` : `lost/old/page/${pageNum}`;
    this.props.ArticlesRequest(url);
  }
  handleChange(event) {
    const splitList = this.props.location.pathname.split('/');
    // const pageNum = Math.trunc(splitList[splitList.length - 1]);
    this.props.history.push(`/${splitList[1]}/${splitList[2]}/${splitList[3]}/1`);
    this.setState({ kind: event.target.value });
    const url = event.target.value === 'Found' ? 'found/old/page/1' : 'lost/old/page/1';
    this.props.ArticlesRequest(url);
  }
  render() {
    return (
      <div>
        <BoardHeader />
        <select style={{ width: '100px', height: '35px', fontSize: '20px' }} value={this.state.kind} onChange={this.handleChange}>
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>
        <BoardContent content={this.props.Articles} kind={this.state.kind === 'Found' ? 'found' : 'lost'} />
      </div>
    );
  }
}

OldBoard.propTypes = propTypes;
OldBoard.defaultProps = defaultProps;

const mapStateToProps = state => ({
  Articles: state.root.Board.Articles,
});

const mapDispatchToProps = dispatch => ({
  ArticlesRequest: url => dispatch(actions.getArticleRequest(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OldBoard);
