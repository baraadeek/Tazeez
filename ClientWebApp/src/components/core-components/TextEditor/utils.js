import { EditorState } from "draft-js";
import { ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

export const htmlToDraftJs = (description, editorRef) => {
  if (description) {
    const blocksFromHtml = htmlToDraft(description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorStateData = EditorState.createWithContent(contentState);

    editorRef.current.setValue(editorStateData);
  }
};
