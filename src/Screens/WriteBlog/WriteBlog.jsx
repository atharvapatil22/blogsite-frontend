import React, { useState } from "react";
import { DraftailEditor } from "draftail";
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

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="write-blog-container">
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
  );
}

export default WriteBlog;
