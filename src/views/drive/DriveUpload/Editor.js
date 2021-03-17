import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {

  constructor(props) {
    super(props);        
      const html = this.props.jd;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        };
      }
    }        

  state = {
    editorState: EditorState.createEmpty(),
    defaultEditorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setJd(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };x

  render() {
    const { editorState } = this.state;
    if(this.props){
    return (
      <div>       
        <Editor       
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}          
          toolbarClassName="toolbarClassName"
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
    }
    return ''
  }
}

export default EditorConvertToHTML; 