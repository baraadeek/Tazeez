import React from "react";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";

import "./react-draft-wysiwyg.css";

export default function TextEditor(props) {
  const {
    editorState,
    onEditorStateChange,
    disabled,
    onFocus,
    placeholder,
    editorStyle,
    onBlur,
    onChange,
  } = props;

  return (
    <Editor
      toolbarHidden={disabled}
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={onEditorStateChange}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      editorStyle={editorStyle}
    />
  );
}
TextEditor.propTypes = {
  editorState: PropTypes.object,
  onEditorStateChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  editorStyle: PropTypes.object,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};
