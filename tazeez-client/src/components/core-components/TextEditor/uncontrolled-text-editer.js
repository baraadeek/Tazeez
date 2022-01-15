import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Draft Js
import { EditorState } from "draft-js";

//JP component
import TextEditor from "./text-editor";

const Slate = (props) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const componentRef = useRef({
    value: editorState,
    setValue: onEditorStateChange,
  });

  useEffect(didMount, []);

  function didMount() {
    props.forwardRef && props.forwardRef(componentRef.current);
  }

  function onEditorStateChange(data) {
    setEditorState(data);
    componentRef.current.value = data;
  }

  return (
    <React.Fragment>
      <TextEditor
        onChange={props.onChange}
        onEditorStateChange={onEditorStateChange}
        editorState={editorState}
        disabled={Boolean(props.disabled)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        editorStyle={props.editorStyle}
      />
    </React.Fragment>
  );
};

export default Slate;

Slate.defaultProps = {
  disabled: false,
};

Slate.propTypes = {
  forwardRef: PropTypes.func,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  editorStyle: PropTypes.object,
};
