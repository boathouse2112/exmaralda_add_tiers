import React from 'react';
import { FileData } from './app/directory';

interface FileElementProps {
  file: FileData
}

function FileElement({ file }: FileElementProps) {
  return (
    <li>
      {file.name}
    </li>
  );
}

export default FileElement;
