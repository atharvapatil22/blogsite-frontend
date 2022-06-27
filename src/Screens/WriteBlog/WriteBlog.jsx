import React, { useState } from "react";
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
// Styles Imports
import "./WriteBlog.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import ToolBar from "../../Components/ToolBar/ToolBar";
import ImgDropAndCrop from "../../Components/ImgDropAndCrop/ImgDropAndCrop";
import BlogPreview from "../../Components/BlogPreview/BlogPreview";

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
  const [blogImageObj, setBlogImageObj] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [previewVisible, setPreviewVisible] = useState(false);

  const showPreview = () => {
    const blogContent = serialiseEditorStateToRaw(editorState);
    if (blogTitle == "") alert("Please add title to your blog!");
    else if (blogContent == null) alert("Please add content to your blog!");
    else if (blogImageObj == null) alert("Please add a featured image");
    else setPreviewVisible(true);
  };

  return (
    <div className="write-blog-container">
      {previewVisible && (
        <BlogPreview
          setPreviewVisible={setPreviewVisible}
          blogTitle={blogTitle}
          setBlogTitle={setBlogTitle}
          blogImageObj={blogImageObj}
          editorState={editorState}
        />
      )}
      <ToolBar showPreview={showPreview} />
      <div className="draftail-parent write-blog-body">
        <textarea
          value={blogTitle}
          placeholder="Title"
          onChange={(e) => setBlogTitle(e.target.value)}
          className="blog-title"
          rows="2"
        />

        {!!blogImageObj ? (
          <>
            <div
              className="wb-img-container"
              onClick={() => {
                setBlogImageObj(null);
              }}
            >
              <img
                className="write-blog-image"
                src={URL.createObjectURL(blogImageObj)}
              />
              <p className="update-blog-img-text">Update Featured Image</p>
            </div>
            <p
              onClick={() => {
                setBlogImageObj(null);
              }}
              className="update-blog-mobile-text"
            >
              Update Featured Image
            </p>
          </>
        ) : (
          <div className="blog-image-upload">
            <ImgDropAndCrop
              placeholder="Add Featured Image [1:3]"
              styles={{
                borderColor: "black",
                borderRadius: "10px",
                maxWidth: "600px",
                margin: "auto",
              }}
              afterImageLoaded={setBlogImageObj}
            />
          </div>
        )}

        <DraftailEditor
          className="draftail-editor-write-blogs"
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
