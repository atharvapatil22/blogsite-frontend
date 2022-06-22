import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DraftailEditor, serialiseEditorStateToRaw } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  OrderedListButton,
  UnorderedListButton,
  BoldButton,
  ItalicButton,
  UnderlineButton,
} from "@draft-js-plugins/buttons";

import { BaseURL } from "../../environment";
import axios from "axios";
import PageLoader from "../../Components/PageLoader/PageLoader";

// Styles Imports
import "./WriteBlog.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import ToolBar from "../../Components/ToolBar/ToolBar";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

function WriteBlog() {
  /**
   * Component returns a rich text editor with 3 components:
   *  1) DraftailEditor (main)
   *  2) InlineToolbar (plugin)
   *  3) SideToolbar (plugin)
   *
   *  !! Requires styles imports for editor and plugins
   */

  const [blogTitle, setBlogTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [previewVisible, setPreviewVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const showPreview = () => {
    const blogContent = serialiseEditorStateToRaw(editorState);
    if (blogTitle == "") alert("Please add title to your blog!");
    else if (blogContent == null) alert("Please add content to your blog!");
    else setPreviewVisible(true);
  };

  const publishBlog = () => {
    // window.confirm("Are you sure to publish blog?");

    setShowLoader(true);
    axios
      .post(BaseURL + "/blogs", {
        title: blogTitle,
        content: serialiseEditorStateToRaw(editorState),
      })
      .then((res) => {
        console.log("Response: ", res);
        if (res.status === 200) {
          alert(res.data);
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.log("Error :", error);
      })
      .finally(() => {
        setShowLoader(false);
        setPreviewVisible(false);
      });
  };

  const Preview = () => {
    return (
      <div className="preview-container">
        <div>
          Preview{" "}
          <button onClick={publishBlog} type="button">
            Publish Now
          </button>
        </div>
      </div>
    );
  };

  if (showLoader) return <PageLoader />;

  return (
    <div className="write-blog-container">
      {previewVisible && <Preview />}
      <ToolBar showPreview={showPreview} />
      <div>
        <textarea
          placeholder="Title"
          onChange={(e) => setBlogTitle(e.target.value)}
          className="blog-title"
          rows="5"
        />
        <DraftailEditor
          editorState={editorState}
          onChange={(newState) => setEditorState(newState)}
          placeholder="Start writing your blog..."
          plugins={plugins}
        />
        <InlineToolbar>
          {(externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
            </div>
          )}
        </InlineToolbar>
        <SideToolbar>
          {(externalProps) => (
            <div>
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </div>
          )}
        </SideToolbar>
      </div>
    </div>
  );
}

export default WriteBlog;
