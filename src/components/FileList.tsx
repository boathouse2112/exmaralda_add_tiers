import React, { ReactElement } from 'react';
import { nanoid } from 'nanoid';
import { FileData } from './app/directory';

interface FileListProps {
  files: FileData[]
  addTiersAndDownload: () => void
  deleteFiles: () => void
}

function FileList({ files, addTiersAndDownload, deleteFiles }: FileListProps) {

  const MAX_FILES = 5;

  const fileList = () => {
    const fileElements: ReactElement[] = files.slice(0, MAX_FILES).map((file) => (
      <li key={file.id}>
        {`${file.path}/${file.name}`}
      </li>
    ));

    if (files.length > MAX_FILES) {
      fileElements.push(<li key={nanoid()}>...</li>);
    }

    return fileElements;
  };

  return (
    <div className="">
      <h2>
        Files:
      </h2>
      <button
        type="button"
        className="btn full"
        onClick={addTiersAndDownload}
      >
        Add Tiers and Download
      </button>
      <button
        type="button"
        className="btn btn__danger full"
        onClick={deleteFiles}
      >
        Reset Files
      </button>
      <ul>
        {fileList()}
      </ul>
    </div>
  );
}

export default FileList;
