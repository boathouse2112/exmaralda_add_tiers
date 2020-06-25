import React, { ChangeEvent } from 'react';

type OpenFilesProps = {
  openFilesHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

function OpenFiles(props: OpenFilesProps) {
  const { openFilesHandler } = props;
  return (
    <div className="row">
      <div className="openFilesForm stack-small">
        <h2>
          Upload Files
        </h2>
        <form>
          <input
            type="file"
            multiple
            onChange={openFilesHandler}
          />
        </form>
      </div>
      <div className="openFilesForm stack-small">
        <h2>
          Upload Folder
        </h2>
        <form>
          <input
            type="file"
            // @ts-ignore
            directory=""
            webkitdirectory=""
            onChange={openFilesHandler}
          />
        </form>
      </div>
    </div>
  );
}

export default OpenFiles;
