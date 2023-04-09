import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actions from '../actions/Article';
import * as bactions from '../actions/Board';
import BoardHeader from './Board/BoardHeader';
import '../stylesheets/whitespace.scss';
// import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: [],
      commentModifyNum: 0,
      commentModifyText: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCommentModify = this.handleCommentModify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.ModifyClick = this.ModifyClick.bind(this);
    // this.PushListButton = this.PushListButton.bind(this);
    this.ResolveClick = this.ResolveClick.bind(this);
    this.ShowHowtoContact = this.ShowHowtoContact.bind(this);
    this.ModifyCommentClick = this.ModifyCommentClick.bind(this);
    // this.ModifyCommentCancel = this.ModifyCommentCancel.bind(this);
    this.ModifyPermissionCheck = this.ModifyPermissionCheck.bind(this);
    this.ResolvePermissionCheck = this.ResolvePermissionCheck.bind(this);
    this.MakeCheckerList = this.MakeCheckerList.bind(this);
  }
  componentDidMount() {
    const url = `${this.props.location.pathname.substring(6)}/`;
    this.props.ArticleRequest(url);
  }
  /*
  ModifyCommentCancel() {
    this.setState({
      commentModifyNum: 0,
      commentModifyText: '',
    });
  }
  */
  ModifyCommentClick(commentId, commentText) {
    this.setState({
      commentModifyNum: commentId,
      commentModifyText: commentText,
    });
  }
  ModifyClick() {
    console.log(this.props.Article);
    const url = `${this.props.location.pathname.substring(6)}/`;
    console.log(url);
    if (url[1] === 'l') {
      this.props.MoveToModify(
        this.props.Article.title,
        this.props.Article.text,
        this.props.Article.how_to_contact,
        'Lost',
        url,
        this.props.Article.image,
      );
    } else {
      console.log(this.props.Article.username);
      this.props.MoveToModify(
        this.props.Article.title,
        this.props.Article.text,
        this.props.Article.how_to_contact,
        'Found',
        url,
        this.props.Article.image,
      );
    }
    this.props.history.push('/board/write');
  }
  /*
  PushListButton() {
    if (this.props.location.pathname[7] === 'f') {
      if (this.props.location.pathname[13] === 'o') {
        this.props.history.goBack();
      } else if (this.props.location.pathname[13] === 'r') {
        this.props.history.goBack();
      } else {
        this.props.history.push('/board/found');
      }
    } else if (this.props.location.pathname[7] === 'l') {
      if (this.props.location.pathname[13] === 'o') {
        this.props.history.goBack();
      } else if (this.props.location.pathname[13] === 'r') {
        this.props.history.goBack();
      } else {
        this.props.history.push('/board/lost');
      }
    }
  }
  */
  ResolveClick() {
    const url = `${this.props.location.pathname.substring(6)}/caseclose/`;
    console.log(url);
    this.props.CaseClose(url);
  }
  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClick() {
    const url = `${this.props.location.pathname.substring(6)}/`;
    this.props.CommentPost(this.state.commentText, url);
    this.setState({
      commentText: [],
    });
  }
  handleKeyPress(e) {
    if (e.keyCode === 27) {
      // const url = `${this.props.location.pathname.substring(6)}/`;
      // this.props.CommentPost(this.state.commentText, url);
      // e.target.value = '';
      this.setState({
        commentModifyNum: 0,
        commentModifyText: '',
      });
    }
  }
  handleCommentModify(e, commentId) {
    const url = `${this.props.location.pathname.substring(6)}/${commentId}/`;
    this.props.CommentPut(this.state.commentModifyText, url);
    this.setState({
      commentModifyNum: 0,
      commentModifyText: '',
    });
  }
  ShowHowtoContact() {
    this.MakeCheckerList();
    if (this.props.Article.how_to_contact === undefined) {
      return false;
    }
    // let checker = false;
    /*
    if (this.props.Article.checkers === undefined) {
      return false;
    }
    const username = localStorage.getItem('username');
    this.props.Article.checkers.map((element) => {
      if (element[0] === username) { // (username.substring(0, username.indexOf('@')))) {
        checker = true;
      }
      return false;
    });
    if (this.props.Article.username === localStorage.getItem('username') || checker) {
      return true;
    }
    */
    return true;
  }
  ModifyPermissionCheck() {
    // console.log(this.props.Article);
    if (this.props.Article.isAuthor) {
      return true;
    }
    return false;
  }
  ResolvePermissionCheck() {
    const url = `${this.props.location.pathname.substring(6)}/`;
    if (url[1] === 'l') {
      if (this.ModifyPermissionCheck()) {
        return true;
      }
      return false;
    } else if (this.ShowHowtoContact()) {
      return true;
    }
    return false;
  }
  handleCheck() {
    // console.log(this.props.Article);
    const url = `${this.props.location.pathname.substring(6)}/check/`;
    this.props.CheckInformation(url);
  }
  MakeCheckerList() {
    if (this.props.Article.checkers !== undefined) {
      if (this.props.Article.checkers.length > 0) {
        let checker = '';
        this.props.Article.checkers.map((element) => {
          checker += `${element[0]}, `;
          return checker;
        });
        checker = checker.substring(0, checker.length - 2);
        // console.log(checker);
        return checker;
      }
      return null;
    }
    return null;
  }
  render() {
    const username = localStorage.getItem('username');
    const url = `${this.props.location.pathname.substring(6)}/`;
    const checkerList = this.MakeCheckerList();
    const imgsrc = this.props.Article.image;
    const articleState = (
      // <h1 id="title">Title: {this.props.Article.title}</h1>
      //   <h3 id="content">Content: {this.props.Article.text}</h3>
    //   <h2 className="ui header">{this.props.Article.title}</h2>
    //     <p></p>
    //     <p id="content">{this.props.Article.text}</p>
    // </div>


    <div className="ui two column centered grid">
       <div className="column">
          <h3 className="ui top attached block header">{this.props.Article.title}
            <p style={{ float: 'right', display: 'inline', fontSize: 10, color: 'gray' }}>{this.props.Article.created_date.substring(0, 10)} {this.props.Article.created_date.substring(11, 16)} </p>
          </h3>
          <div className="ui attached segment">
            {this.props.Article.username} <p style={{ float: 'right', display: 'inline', fontSize: 10, color: 'gray' }}> 조회수: {this.props.Article.view_count} </p>
          </div>
          <div className="ui attached segment">
            <div className="whitespace"><p>{this.props.Article.text}</p></div>

            {imgsrc === undefined || imgsrc.endsWith('default.jpg') ? null :
            (
              <div>
                <br/>
                <img className="ui fluid image" src={this.props.Article.image} alt="Things" />
              </div>
            )
            }
          </div>
        <div>
          <br/>
          {url[1] === 'l' ? null :
          <div>
            {this.ShowHowtoContact() ?
              <div>
                <p>Location: {this.props.Article.how_to_contact}</p>
              </div>
              :
              <p>
                <Button id="check" outline color="secondary" onClick={this.handleCheck}>
                <i className="eye slash outline icon"></i>
                Check Location
                </Button>
              </p>
            }
          </div>
          }
          <br />
          {checkerList === null ? null :
          <p>
            Checkers: <i className="eye icon"></i> {checkerList}
          </p>
          }
        </div>

         {this.props.Article.case_closed ? null
          : (
            <div>
              {this.ModifyPermissionCheck() ? <Button outline color="secondary" id="modify" className="float-right" onClick={this.ModifyClick}>Modify</Button> : null}
              {this.ResolvePermissionCheck() ? <Button outline color="secondary" id="close" className="float-right" onClick={this.ResolveClick}>Case Close</Button> : null}
              <br />

            </div>
            )
        }
       </div>
    </div>
    );
    const commentList = this.props.Comment.map(element => (
      <li key={element.id}>
        <div className="ui comments">
          <div className="comment">
            <div className="content">
              <a className="author">{element.username}</a>
              <div className="metadata">
                <span className="date">{element.created_date.substring(0, 10)} {element.created_date.substring(11, 16)}</span>
              </div>
              {
                this.state.commentModifyNum !== element.id ?
                  <div className="text">
                    <div className="whitespace">
                      {element.text}
                      {element.isAuthor ?
                        <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/1054395-200.png" alt="modify" width="20" onClick={() => this.ModifyCommentClick(element.id, element.text)} />
                        :
                        null
                      }
                    </div>
                  </div>
                :
                <div>
                  <div className="ui comments">
                    <div className="ui form">
                      <div className="field">
                        <textarea
                          id="comment"
                          name="commentModifyText"
                          rows= "2"
                          value={this.state.commentModifyText}
                          onKeyDown={this.handleKeyPress}
                          onChange={this.handleChange}
                          placeholder = "취소하려면 Esc 키를 누르십시오."
                        />
                      </div>

                      <Button className="ui primary submit labeled icon button" id="modify" onClick={e => this.handleCommentModify(e, element.id)} >
                        <i className="icon edit"></i>
                        Modify Comment
                      </Button>

                      <p style={{ fontSize: '15px' }}>취소하려면 Esc 키를 누르십시오.</p>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </li>
    ));
    return (
      <div>
        <BoardHeader />
        {this.props.Article.case_closed ?
          <h1 style={{ textAlign: 'center' }}>{this.props.Article.case_closed_by_whom_name}에 의해 닫힌 글입니다.</h1>
          :
          null
        }
        <br />
        {articleState}
        <br />

      <div className="ui two column centered grid">
          <div className="column">
            <h3 className="ui block header">댓글 </h3>
          </div>
      </div>

      <div className="ui two column centered grid">
          <div className="column">
            <ul>
            {commentList}
            </ul>
          </div>
      </div>

      <div className="ui two column centered grid">
          <div className="column">
            {this.state.commentModifyNum !== 0 ? null :
            <div className="ui form">
              <div className="field">
              <label>댓글 쓰기</label>
              <textarea
                id="comment"
                name="commentText"
                rows="2"
                value={this.state.commentText}
                onChange={this.handleChange}
              />
              <br />
            </div>
          <br/>
          <Button className="ui primary submit labeled icon button" id="add" onClick={this.handleClick} >
                <i className="icon edit"></i>
                Add Comment
          </Button>
        </div>
          }
        </div>
      </div>
    </div>
    );
  }
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export const mapStateToProps = state => ({
  Article: state.root.Article.Article,
  Comment: state.root.Article.Comment,
});

export const mapDispatchToProps = dispatch => ({
  ArticleRequest: url => dispatch(actions.getArticleRequest(url)),
  CommentPost: (comment, url) => dispatch(actions.postCommentRequest(comment, url)),
  CommentPut: (comment, url) => dispatch(actions.putCommentRequest(comment, url)),
  CaseClose: url => dispatch(actions.caseCloseRequest(url)),
  MoveToModify: (title, content, howtocontact, kind, url, image) =>
    dispatch(bactions.moveToModifyPage(title, content, howtocontact, kind, url, image)),
  CheckInformation: url => dispatch(actions.checkInformation(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
