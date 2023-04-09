import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import { history } from '../../index'
import PropTypes from 'prop-types';
import { Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../stylesheets/boardcontent.scss';
import * as actions from '../../actions/Board';

const propTypes = {
};

const defaultProps = {
};

class BoardContent extends Component {
  constructor(props) {
    super(props);
    this.handleWrite = this.handleWrite.bind(this);
    this.handlePaginateList = this.handlePaginateList.bind(this);
    this.handlePageNum = this.handlePageNum.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.FirstPagination = this.FirstPagination.bind(this);
    this.ClickPagination = this.ClickPagination.bind(this);
  }
  handleWrite() {
    if (this.props.kind === 'found') {
      this.props.MoveToWrite('Found');
    } else {
      this.props.MoveToWrite('Lost');
    }
    this.props.history.push('/board/write');
  }
  handlePaginateList() {
    let keyNum = Math.trunc(this.props.content.key.total_page_number);
    keyNum -= 1;
    const keyList = [];
    let adding = 2;
    while (keyNum) {
      keyList.push(adding);
      adding += 1;
      keyNum -= 1;
    }
    return keyList;
  }
  handlePageNum() {
    const splitList = this.props.location.pathname.split('/');
    const url = `/${splitList[1]}/${splitList[2]}/${splitList[3]}/`;
    const pageNum = Math.trunc(splitList[splitList.length - 1]);
    const resultList = [];
    resultList.push(url); resultList.push(pageNum);
    return resultList;
  }
  handlePreviousClick(pageInfo) {
    if (pageInfo[1] !== 1) {
      this.props.history.push(`${pageInfo[0]}${pageInfo[1] - 1}`);
      window.location.reload();
    }
  }
  handleNextClick(pageInfo) {
    if (pageInfo[1] !== this.props.content.key.total_page_number) {
      this.props.history.push(`${pageInfo[0]}${pageInfo[1] + 1}`);
      window.location.reload();
    }
  }
  FirstPagination(pageInfo) {
    if (pageInfo[1] !== 1) {
      this.props.history.push(`${pageInfo[0]}1`);
      window.location.reload();
    }
  }
  ClickPagination(pageInfo, element) {
    if (pageInfo[1] !== element) {
      this.props.history.push(`${pageInfo[0]}${element}`);
      window.location.reload();
    }
  }
  render() {
    const pageInfo = this.handlePageNum();
    let numID = (pageInfo[1] - 1) * 10;
    const paginate = (
      <div style={{ float: 'right', position: 'relative', left: '-50%' }}>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink previous onClick={() => this.handlePreviousClick(pageInfo)} />
          </PaginationItem>
          <PaginationItem>
            {pageInfo[1] === 1 ?
              <PaginationLink style={{ backgroundColor: 'skyblue' }} onClick={() => this.FirstPagination(pageInfo)}>
                <b>1</b>
              </PaginationLink>
              :
              <PaginationLink onClick={() => this.FirstPagination(pageInfo)}>
                1
              </PaginationLink>
            }
          </PaginationItem>
          {this.handlePaginateList().map(element => (
            <div key={element}>
              {pageInfo[1] === element ?
                <PaginationItem key={element}>
                  <PaginationLink style={{ backgroundColor: 'skyblue' }} onClick={() => this.ClickPagination(pageInfo, element)}>
                    <b>{element}</b>
                  </PaginationLink>
                </PaginationItem>
                :
                <PaginationItem key={element}>
                  <PaginationLink onClick={() => this.ClickPagination(pageInfo, element)}>
                    {element}
                  </PaginationLink>
                </PaginationItem>
              }
            </div>
          ))}
          <PaginationItem>
            <PaginationLink next onClick={() => this.handleNextClick(pageInfo)} />
          </PaginationItem>
        </Pagination>
      </div>
    );
    const Content = this.props.kind === 'found' ?
      this.props.content.found.map((element) => {
        numID += 1;
        return (
          <tr onClick={() => this.props.history.push(`/board/${this.props.kind}/${element.id}`)} key={element.id}>
            <td>{element.order}</td>
            <td>
              {element.title} &nbsp;
              {element.latitude !== 0 ?
                <div style={{ display: 'inline' }}><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" width="13" alt="pic" />
                </div>
                : null
              }
              {element.image.endsWith('default.jpg') ? null :
              <div style={{ display: 'inline' }}><img src="http://icongal.com/gallery/image/89474/gallery_picture_image_photo_landscape.png" width="13" alt="pic" />
              &nbsp;
              </div>
              }
              <div style={{ display: 'inline', fontSize: 10, color: 'gray' }}>[{element.comment_count}]</div>
            </td>
            <td>{element.username}</td>
            <td>{element.created_date.substring(0, 10)} {element.created_date.substring(11, 16)}</td>
            <td>{element.view_count}</td>
          </tr>
        );
      }) :
      this.props.content.lost.map((element) => {
        numID += 1;
        return (
          <tr onClick={() => this.props.history.push(`/board/${this.props.kind}/${element.id}`)} key={element.id}>
            <td>{element.order}</td>
            <td>{element.title} &nbsp;
              {element.latitude !== 0 ?
                <div style={{ display: 'inline' }}><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" width="13" alt="pic" />
                </div>
                : null
              }
              {element.image.endsWith('default.jpg') ? null :
              <div style={{ display: 'inline' }}><img src="http://icongal.com/gallery/image/89474/gallery_picture_image_photo_landscape.png" width="13" alt="pic" />
              &nbsp;
              </div>
              }
              <div style={{ display: 'inline', fontSize: 10, color: 'gray' }}>[{element.comment_count}]</div>
            </td>
            <td>{element.username}</td>
            <td>{element.created_date.substring(0, 10)} {element.created_date.substring(11, 16)}</td>
            <td>{element.view_count}</td>
          </tr>
        );
      });
    const tableHeader = (
      <div>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {Content}
          </tbody>
        </Table>
      </div>
    );
    return (
      <div>
        <h3 className="ui dividing header"></h3>
        {tableHeader}
        {pageInfo[0][7] === 'f' || pageInfo[0][7] === 'l' ?
          <Button outline id="write" size="lg" float="right" color="primary" onClick={this.handleWrite}>쓰기</Button>
          :
          null
        }
        {paginate}
      </div>
    );
  }
}

Pagination.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  'aria-label': PropTypes.string
};

PaginationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  disabled: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

PaginationLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  next: PropTypes.bool,
  previous: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  'aria-label': PropTypes.string
};

BoardContent.propTypes = propTypes;
BoardContent.defaultProps = defaultProps;

export const mapDispatchToProps = dispatch => ({
  MoveToWrite: kind => dispatch(actions.moveToWritePage(kind)),
  ArticlesRequest: url => dispatch(actions.getArticleRequest(url)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(BoardContent));
