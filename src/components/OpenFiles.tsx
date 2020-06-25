import React, { ChangeEvent } from 'react';

type OpenFilesProps = {
  openFilesHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

function OpenFiles(props: OpenFilesProps) {
  const { openFilesHandler } = props;
  return (
    <div>
      <h2>
        Upload Files
      </h2>
      <form>
        <input
          type="file"
          multiple
          // @ts-ignore
          directory=""
          webkitdirectory=""
          onChange={openFilesHandler}
        />
      </form>
    </div>
  );
}

export default OpenFiles;
