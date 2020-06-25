import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import assert from 'assert';
import { TierData } from './App';
import { Directory, DirectoryEntry, FileData, hasPath } from './directory';

export function useDirectory() {
  const [directory, setDirectory] = useState<Directory>(new Directory(''));

  function insertFile(file: FileData, insertDirectory: Directory): Directory {
    function insertWithPathComponents(
      currentDirectory: Directory,
      pathComponents: string[],
    ): Directory {
      console.log(file.name, file.path, pathComponents);

      assert(pathComponents.length > 0);

      if (pathComponents.length === 1) {
        // file.path === "USbi84.exb"
        // Insert file into current directory
        return (
          new Directory(currentDirectory.name, [...currentDirectory.contents, file])
        );
      }

      // file.path === "T4/R1/USbi84.exb"
      // Insert file into sub-directory, or create it.
      const subDirectoryName = pathComponents[0];
      const matchingSubDirectoryIndex = currentDirectory.contents.findIndex(
        (fileOrDirectory) => {
          // If directory, does the name === the first path component?
          if (fileOrDirectory.typeName === 'Directory') {
            return (fileOrDirectory.name === subDirectoryName);
          }
          return false;
        },
      );

      let newDirectoryContents: DirectoryEntry[];

      if (matchingSubDirectoryIndex === -1) {
        // No existing matching sub-directory
        let subDirectory = new Directory(subDirectoryName);
        subDirectory = insertWithPathComponents(subDirectory, pathComponents.slice(1));

        newDirectoryContents = [...currentDirectory.contents, subDirectory];
      } else {
        let subDirectory = currentDirectory.contents[matchingSubDirectoryIndex] as Directory;
        subDirectory = insertWithPathComponents(subDirectory, pathComponents.slice(1));

        newDirectoryContents = [...currentDirectory.contents];
        newDirectoryContents[matchingSubDirectoryIndex] = subDirectory;
      }

      return (
        new Directory(currentDirectory.name, newDirectoryContents)
      );
    }

    const pathComponents = file.path.split('/');
    return insertWithPathComponents(insertDirectory, pathComponents);
  }

  function openFilesHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const openedFiles = e.target.files;

    if (openedFiles != null) {
      const openedFilesArray = Array.from(openedFiles);
      openedFilesArray.forEach((file) => {
        let filePath: string;
        if (hasPath(file)) {
          filePath = file.webkitRelativePath;
        } else {
          filePath = '';
        }

        file.text().then((fileText) => {
          const newFile = FileData({
            id: nanoid(),
            name: file.name,
            path: filePath,
            text: fileText,
          });

          setDirectory(
            (prevDirectory) => insertFile(newFile, prevDirectory),
          );
        });
      });
    }
  }

  function addTiersToFile(file: FileData, tiers: TierData[]): FileData {
    function tierTemplate(tier: TierData, templateTierId: number) {
      return (
        `<tier id="${templateTierId}" speaker="${tier.speaker}" category="${tier.category}" type="${tier.type}">`
        + '</tier>'
      );
    }

    const tiersTemplate = tiers.map(
      (tier, tierIdx) => tierTemplate(tier, 200 + tierIdx),
    )
      .concat(['</basic-body>'])
      .join('\n');

    const newText = file.text.replace('</basic-body>', tiersTemplate);

    return FileData({
      id: file.id,
      name: file.name,
      path: file.path,
      text: newText,
    });
  }

  function addTiersToFiles(inputDirectory: Directory, tiers: TierData[]): Directory {
    return inputDirectory.mapFiles((file) => addTiersToFile(file, tiers));
  }

  function downloadSingleFile(downloadFile: FileData) {
    const downloadFileBlob = new Blob([downloadFile.text], { type: 'text/plain' });
    FileSaver.saveAs(downloadFileBlob, downloadFile.name);
  }

  function downloadDirectory(directoryToDownload: Directory) {
    const zip = new JSZip();

    directoryToDownload.forEachFile(
      (file) => zip.file(file.path, file.text),
    );

    zip.generateAsync({ type: 'blob' })
      .then((content) => FileSaver.saveAs(content, 'exb_files_tiers_added.zip'));
  }

  function addTiersAndDownload(tiers: TierData[]) {
    const filesWithTiers = addTiersToFiles(directory, tiers);

    if (filesWithTiers.hasSingleFile()) {
      downloadSingleFile(filesWithTiers.contents[0] as FileData);
    } else {
      downloadDirectory(filesWithTiers);
    }
  }

  return {
    directory, openFilesHandler, addTiersAndDownload,
  };
}
