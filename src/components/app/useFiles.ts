import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { TierData } from './App';
import { FileData, hasPath } from './directory';

function useFiles() {
  const [files, setFiles] = useState<FileData[]>([]);

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

          setFiles(
            (prev) => [...prev, newFile],
          );
        });
      });
    }
  }

  function addTiersToFile(file: FileData, tiers: TierData[]): FileData {
    // Only add tiers to .exb files
    if (file.name.indexOf('.exb') === -1) {
      return file;
    }

    function tierTemplate(tier: TierData, templateTierId: number) {
      return (
        `<tier id="${templateTierId}" speaker="${tier.speaker}" category="${tier.category}" type="${tier.type}">`
        + '</tier>'
      );
    }

    const tiersTemplate = tiers.map(
      (tier, tierIdx) => tierTemplate(tier, 300 + tierIdx),
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

  function addTiersToFiles(tiers: TierData[]): FileData[] {
    console.log(files);
    return files.map((file) => addTiersToFile(file, tiers));
  }

  function downloadFile(fileToDownload: FileData) {
    const fileBlob = new Blob([fileToDownload.text], { type: 'text/plain' });
    FileSaver.saveAs(fileBlob, fileToDownload.name);
  }

  function downloadFiles(filesToDownload: FileData[]) {
    const zip = new JSZip();

    filesToDownload.forEach((file) => {
      if (file.path === '') {
        zip.file(file.name, file.text);
      } else {
        zip.file(file.path, file.text);
      }
    });

    console.log(zip);
    zip.generateAsync({ type: 'blob' })
      .then((content) => FileSaver.saveAs(content, 'exb_files_tiers_added.zip'));
  }

  function addTiersAndDownload(tiers: TierData[]) {
    const filesWithTiers = addTiersToFiles(tiers);

    console.log(filesWithTiers);

    if (filesWithTiers.length === 1) {
      downloadFile(filesWithTiers[0]);
    } else {
      downloadFiles(filesWithTiers);
    }
  }

  function deleteFiles() {
    setFiles([]);
  }

  return {
    files, openFilesHandler, addTiersAndDownload, deleteFiles,
  };
}

export default useFiles;
