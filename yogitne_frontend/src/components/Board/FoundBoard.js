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

class FoundBoard extends Component {
  componentDidMount() {
    const url = this.props.location.pathname.substring(7);
    this.props.ArticlesRequest(url);
  }
  render() {
    return (
      <div>
        <BoardHeader />
        <BoardContent content={this.props.Articles} kind="found" />
      </div>
    );
  }
}

FoundBoard.propTypes = propTypes;
FoundBoard.defaultProps = defaultProps;

const mapStateToProps = state => ({
  Articles: state.root.Board.Articles,
});

const mapDispatchToProps = dispatch => ({
  ArticlesRequest: url => dispatch(actions.getArticleRequest(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoundBoard);
