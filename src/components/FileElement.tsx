import React from 'react';

interface FileElementProps {
  fileName: string
}

function FileElement(props: FileElementProps) {
  const { fileName } = props;
  return (
    <li>
      {fileName}
    </li>
  );
}

export default FileElement;
