import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { this.props.history } from '../../index';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';
import * as actions from '../../actions/Board';
import * as Aactions from '../../actions/Article';
import '../../stylesheets/Popup.scss';


const propTypes = {
};

const defaultProps = {
};

class WriteBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: this.props.kind,
      title: this.props.title,
      content: this.props.content,
      howtocontact: this.props.howtocontact,
      image: undefined,
      imagePreviewUrl: this.props.image,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWrite = this.handleWrite.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props.imagePreviewUrl);
    if (this.props.kind === undefined || this.props.kind === '') {
      window.location.reload();
    }
  }
  handleCancel() {
    this.props.history.goBack();
    /*
    if (this.state.kind === 'Found') {
      this.props.history.push('/board/found');
    } else {
      this.props.history.push('/board/lost');
    }
    */
  }
  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      const upfile = e.target.files[0];

      if (upfile.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        this.setState({
          image: undefined,
          imagePreviewUrl: this.props.image,
        });
      } else {
        reader.onloadend = () => {
          this.setState({
            image: upfile,
            imagePreviewUrl: reader.result
          });
        };

        reader.readAsDataURL(upfile);
      }
    } else {
      this.setState({
        image: undefined,
        imagePreviewUrl: this.props.image,
      });
    }
  }
  handleWrite() {
    if (this.state.kind === 'Found') {
      if (this.state.title === '' || this.state.content === '' || this.state.howtocontact === '') {
        alert('Please Type the Information in the Empty box');
      } else if (this.props.url === '') { // 수정말고 그냥 쓰는 경우
        this.props.WriteMarkerRequest('found/', this.state.title, this.state.content, this.state.howtocontact, 0, 0, this.state.image);
        this.props.history.goBack();
      } else {
        if (this.state.title === this.props.title
          && this.state.content === this.props.content &&
          this.state.howtocontact === this.props.howtocontact
          && this.state.image === undefined) {
          alert('Please modify it and click Modify button');
        } else {
          this.props.ArticleModify(this.props.url, this.state.title, this.state.content, this.state.howtocontact, this.state.image);
          this.props.history.goBack();
        }
      }
    } else {
      if (this.state.title === '' || this.state.content === '') {
        alert('Please Type the Information in the Empty box');
      } else if (this.props.url === '') {
        this.props.WriteMarkerRequest('lost/', this.state.title, this.state.content, this.state.howtocontact, 0, 0, this.state.image);
        this.props.history.goBack();
      } else {
        if (this.state.title === this.props.title && this.state.content === this.props.content &&
        this.state.image === undefined) {
          alert('Please modify it and click Modify button');
        } else {
          console.log(this.props.url);
          this.props.ArticleModify(this.props.url, this.state.title, this.state.content, '', this.state.image);
          this.props.history.goBack();
        }
      }
    }
  }
  handleSelectChange(event) {
    this.setState({ kind: event.target.value });
  }
  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    // console.log(this.state.content);
  }
  render() {
    const selectbox = (
      <div>
        {this.props.title !== '' ? null
        :
        <select value={this.state.kind} onChange={this.handleSelectChange}>
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>
        }
      </div>
    );
    const inputbox = (
      <div className="ui segment">
        <h2 className="ui floated header">Write Information</h2>
        <div className="ui clearing divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Title</label>
            <input type="text" id="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} ref={(ref) => { this.titleInput = ref; }} />
          </div>
          <div className="field">
            <label>Content</label>
            <textarea id="content" name="content" placeholder="Write your situation" value={this.state.content} onChange={this.handleChange} />
          </div>
          {this.state.kind === 'Found' ?
            <p>
              How to Contact
              <input type="text" name="howtocontact" placeholder="Write how to contact you" value={this.state.howtocontact} onChange={this.handleChange} />
            </p>
            :
            null
          }
          <div>
            <p>
              <input type="file" id="file" onChange={this.handleImageChange} accept="image/*" />
            </p>
            {this.state.imagePreviewUrl !== null && this.state.imagePreviewUrl !== undefined ?
              <img src={this.state.imagePreviewUrl} alt="Uploading" width="200px" height="200px" />
              :
              null
            }
          </div>
        </div>
      </div>
    );
    const buttons = (
      <div>
        {this.props.url === '' ?
          <div>
            <Button color="secondary" id="OK" onClick={this.handleWrite}>Write</Button>
            <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
          </div>
          :
          <div>
            <Button color="secondary" id="OK" onClick={this.handleWrite}>Modify</Button>
            <Button color="secondary" className="float-middle" onClick={this.handleCancel}>Cancel</Button>
          </div>
        }
      </div>
    );
    return (
      <div>
        {selectbox}
        {inputbox}
        {buttons}
      </div>
    );
  }
}

WriteBoard.propTypes = propTypes;
WriteBoard.defaultProps = defaultProps;

export const mapStateToProps = state => ({
  title: state.root.Board.title,
  content: state.root.Board.content,
  howtocontact: state.root.Board.howtocontact,
  kind: state.root.Board.kind,
  url: state.root.Board.url,
  image: state.root.Board.image,
});

export const mapDispatchToProps = dispatch => ({
  WriteMarkerRequest: (model, title, content, howtocontact, latitude, longitude, image) =>
    dispatch(actions.writeArticleRequest(model, title, content, howtocontact, latitude, longitude, image)),
  ArticleModify: (url, title, content, howtocontact, image) =>
    dispatch(Aactions.modifyArticleRequst(url, title, content, howtocontact, image)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WriteBoard));
