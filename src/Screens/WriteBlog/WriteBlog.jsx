import React, { useState } from "react";

import { DraftailEditor } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="write-blog-container">
      <DraftailEditor
        editorState={editorState}
        onChange={(newState) => setEditorState(newState)}
        placeholder="Start writing your blog..."
        plugins={plugins}
      />
      <InlineToolbar />
      <SideToolbar />
    </div>
  );
}

export default WriteBlog;
