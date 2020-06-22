import React from 'react';
import FileElement from './FileElement';

interface FileListProps {
  fileNames: string[]
}

function FileList({ fileNames }: FileListProps) {

  /* Display up to 10 uploaded files */
  function fileList() {
    const FILE_LIST_MAX = 10;
    const filesOverMax = Math.max(0, fileNames.length - FILE_LIST_MAX);
    const displayFiles = fileNames.slice(0, FILE_LIST_MAX);

    const fileElements = displayFiles.map((fileName) => <FileElement fileName={fileName} />);

    if (filesOverMax > 0) {
      fileElements.push(
        <li>
          {filesOverMax}
          {' '}
          more ...
        </li>,
      );
    }

    return fileElements;
  }

  return (
    <div>
      <h2>
        Files:
      </h2>
      <ul>
        {fileList()}
      </ul>
    </div>
  );
}

export default FileList;
