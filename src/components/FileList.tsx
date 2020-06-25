import React, { ReactElement } from 'react';
import FileElement from './FileElement';
import { Directory, FileData } from './app/directory';

interface FileListProps {
  directory: Directory
}

function FileList({ directory }: FileListProps) {

  const fileList = () => {
    const files: ReactElement[] = [];
    directory.forEachFile(
      (file) => files.push(
        <li>
          {file.path}
        </li>,
      ),
    );
    return files;
  };

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
