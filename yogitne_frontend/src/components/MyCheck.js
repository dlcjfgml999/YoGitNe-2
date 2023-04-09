import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import * as actions from '../actions/MyPage';
// import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class MyCheck extends Component {
  constructor(props) {
    super(props);
    this.handlePaginateList = this.handlePaginateList.bind(this);
    this.handlePageNum = this.handlePageNum.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.FirstPagination = this.FirstPagination.bind(this);
    this.ClickPagination = this.ClickPagination.bind(this);
  }
  componentDidMount() {
    const splitList = this.props.location.pathname.split('/');
    const pageNum = Math.trunc(splitList[splitList.length - 1]);
    const reqURL = `1/1/${pageNum}/1/1/`;
    this.props.MyPageRequest(reqURL);
  }
  handlePaginateList() {
    console.log(this.props.myPage);
    let keyNum = Math.trunc(this.props.myPage.checking_key.total_page_number);
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
    if (pageInfo[1] !== this.props.myPage.checking_key.total_page_number) {
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
    const checkList = this.props.myPage.checking.map((element) => {
      numID += 1;
      return (
        <tr onClick={() => this.props.history.push(`/board/found/${element.found.id}`)} key={element.found.id}>
          <td>{element.order}</td>
          <td>{element.found.title} &nbsp;
            {element.latitude !== 0 ?
              <div style={{ display: 'inline' }}><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" width="13" alt="pic" />
              </div>
              : null
            }
            {element.found.image.endsWith('default.jpg') ? null :
            <div style={{ display: 'inline' }}><img src="http://icongal.com/gallery/image/89474/gallery_picture_image_photo_landscape.png" width="13" alt="pic" />
            &nbsp;
            </div>
            }
            <div style={{ display: 'inline', fontSize: 10, color: 'gray' }}>[{element.found.comment_count}]</div>
          </td>
          <td>{element.found.username}</td>
          <td>{element.found.created_date.substring(0, 10)} {element.found.created_date.substring(11, 16)}</td>
          <td>{element.found.comment_count}</td>
        </tr>
      );
    });
    const tableHeader = (
      <div>
        <br />
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
            {checkList}
          </tbody>
        </Table>
      </div>
    );
    return (
      <div>
        <h3 className="ui dividing header"></h3>
        {tableHeader}
        {paginate}
      </div>
    );
  }
}

MyCheck.propTypes = propTypes;
MyCheck.defaultProps = defaultProps;

const mapStateToProps = state => ({
  myPage: state.root.MyPage.myPage,
});

const mapDispatchToProps = dispatch => ({
  MyPageRequest: url => dispatch(actions.myPageRequest(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCheck));
