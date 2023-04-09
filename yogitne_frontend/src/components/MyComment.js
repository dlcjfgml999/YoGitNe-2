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

class MyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: this.props.myPage.kind,
    };
    this.handleChange = this.handleChange.bind(this);
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
    let reqURL = '';
    if (this.state.kind === 'Found') {
      reqURL = `1/1/1/${pageNum}/1/`;
    } else {
      reqURL = `1/1/1/1/${pageNum}/`;
    }
    this.props.MyPageRequest(reqURL);
  }
  handleChange(event, pageInfo) {
    this.setState({ kind: event.target.value });
    this.props.history.push(`${pageInfo[0]}1`);
    this.props.MyPageRequest('1/1/1/1/1/');
  }
  handlePaginateList() {
    console.log(this.props.myPage);
    let keyNum;
    if (this.state.kind === 'Found') {
      keyNum = Math.trunc(this.props.myPage.found_comment_key.total_page_number);
    } else {
      keyNum = Math.trunc(this.props.myPage.lost_comment_key.total_page_number);
    }
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
      let reqURL = '';
      if (this.state.kind === 'Found') {
        reqURL = `1/1/1/${pageInfo[1] - 1}/1/`;
      } else {
        reqURL = `1/1/1/1/${pageInfo[1] - 1}/`;
      }
      this.props.MyPageRequest(reqURL);
    }
  }
  handleNextClick(pageInfo) {
    if (this.state.kind === 'Found') {
      if (pageInfo[1] !== this.props.myPage.found_comment_key.total_page_number) {
        this.props.history.push(`${pageInfo[0]}${pageInfo[1] + 1}`);
        const reqURL = `1/1/1/${pageInfo[1] + 1}/1/`;
        this.props.MyPageRequest(reqURL);
      }
    } else {
      if (pageInfo[1] !== this.props.myPage.lost_comment_key.total_page_number) {
        this.props.history.push(`${pageInfo[0]}${pageInfo[1] + 1}`);
        const reqURL = `1/1/1/1/${pageInfo[1] + 1}/`;
        this.props.MyPageRequest(reqURL);
      }
    }
  }
  FirstPagination(pageInfo) {
    if (pageInfo[1] !== 1) {
      this.props.history.push(`${pageInfo[0]}1`);
      const reqURL = '1/1/1/1/1/';
      this.props.MyPageRequest(reqURL);
    }
  }
  ClickPagination(pageInfo, element) {
    if (pageInfo[1] !== element) {
      this.props.history.push(`${pageInfo[0]}${element}`);
      let reqURL = '';
      if (this.state.kind === 'Found') {
        reqURL = `1/1/1/${element}/1/`;
      } else {
        reqURL = `1/1/1/1/${element}/`;
      }
      this.props.MyPageRequest(reqURL);
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
    const content = this.state.kind === 'Found' ?
      this.props.myPage.found_comments.map((element) => {
        numID += 1;
        return (
          <tr onClick={() => this.props.history.push(`/board/found/${element.found.id}`)} key={numID}>
            <td>{element.order}</td>
            <td>{element.comment.text}</td>
            <td>{element.found.created_date.substring(0, 10)} {element.found.created_date.substring(11, 16)}</td>
            <td>{element.found.title} &nbsp;
              {element.found.image.endsWith('default.jpg') ? null :
              <div style={{ display: 'inline' }}><img src="http://icongal.com/gallery/image/89474/gallery_picture_image_photo_landscape.png" width="13" alt="pic" />
              &nbsp;
              </div>
              }
              <div style={{ display: 'inline', fontSize: 10, color: 'gray' }}>[{element.found.comment_count}]</div>
            </td>
          </tr>
        );
      }) :
      this.props.myPage.lost_comments.map((element) => {
        numID += 1;
        return (
          <tr onClick={() => this.props.history.push(`/board/lost/${element.lost.id}`)} key={numID}>
            <td>{element.order}</td>
            <td>{element.comment.text}</td>
            <td>{element.lost.created_date.substring(0, 10)} {element.lost.created_date.substring(11, 16)}</td>
            <td>{element.lost.title} &nbsp;
              {element.lost.image.endsWith('default.jpg') ? null :
              <div style={{ display: 'inline' }}><img src="http://icongal.com/gallery/image/89474/gallery_picture_image_photo_landscape.png" width="13" alt="pic" />
              &nbsp;
              </div>
              }
              <div style={{ display: 'inline', fontSize: 10, color: 'gray' }}>[{element.lost.comment_count}]</div>
            </td>
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
              <th>글 번호</th>
              <th>댓글 내용</th>
              <th>날짜</th>
              <th>글 제목</th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </Table>
      </div>
    );
    return (
      <div>
        <select style={{ width: '100px', height: '35px', fontSize: '20px' }} value={this.props.kind} onChange={e => this.handleChange(e, pageInfo)}>
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>
        {tableHeader}
        {paginate}
      </div>
    );
  }
}

MyComment.propTypes = propTypes;
MyComment.defaultProps = defaultProps;

const mapStateToProps = state => ({
  myPage: state.root.MyPage.myPage,
});

const mapDispatchToProps = dispatch => ({
  MyPageRequest: url => dispatch(actions.myPageRequest(url)),
  ChangeKind: kind => dispatch(actions.changeKind(kind)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyComment));
