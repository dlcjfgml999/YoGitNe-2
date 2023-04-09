import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../stylesheets/Popup.scss';

const propTypes = {
};

const defaultProps = {
};

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      howtocontact: '',
      picture: '',
      imagePreviewUrl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      const upfile = e.target.files[0];

      if (upfile.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        this.setState({
          picture: '',
          imagePreviewUrl: '',
        });
      } else {
        reader.onloadend = () => {
          this.setState({
            picture: upfile,
            imagePreviewUrl: reader.result
          });
        };

        reader.readAsDataURL(upfile);
      }
    } else {
      this.setState({
        picture: '',
        imagePreviewUrl: '',
      });
    }
  }
  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleClick() {
    const picname = this.state.picture.name;
    // console.log(picname);
    if (picname === undefined || picname.endsWith('.jpg') || picname.endsWith('.jpeg') || picname.endsWith('.gif') || picname.endsWith('.png')) {
      const data = {
        title: this.state.title,
        content: this.state.content,
        howtocontact: this.state.howtocontact,
        image: this.state.picture,
      };
      this.props.write(data);
      this.setState({
        title: '',
        content: '',
        howtocontact: '',
        picture: '',
        imagePreviewUrl: '',
      });
    } else {
      alert('Please Only Image file Upload');
    }
  }
  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="Uploading" width="100px" height="100px" />);
    }
    return (
      <div className="popup">
        <div className="popup_inner">
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
              {this.props.Found ?
                <div className="field">
                  <label>How to Contact</label>
                  <input type="text" name="howtocontact" placeholder="Write how to contact you" value={this.state.howtocontact} onChange={this.handleChange} />
                </div>
                :
                null
              }
              <div className="field">
                <label>Image</label>
                <p>
                  <input type="file" id="file" onChange={this.handleImageChange} accept="image/*" />
                </p>
                {$imagePreview}
              </div>
              <br />
              <Button color="secondary" id="OK" onClick={this.handleClick}>Write</Button>
              <Button color="secondary" onClick={this.props.closePopup}>close me</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

export default Popup;
