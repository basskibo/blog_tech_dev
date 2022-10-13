import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
   EditorState.createEmpty(),
 );

   const [value, setValue] = useState('');
   const onChange = (evt) => setValue(evt.target.value);
  
    return (
      <Editor editorState={editorState} onChange={onChange} placeholder={"Start writing post"}/>
    );
  
}

export default MyEditor;