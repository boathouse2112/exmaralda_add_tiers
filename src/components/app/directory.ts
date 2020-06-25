import JSZip from 'jszip';

export type FileData = {
  typeName: 'FileData'
  id: string
  name: string
  path: string
  text: string
}

export class Directory {
  typeName: 'Directory'

  name: string

  contents: DirectoryEntry[]

  constructor(name: string, contents?: DirectoryEntry[]) {
    this.typeName = 'Directory';
    this.name = name;
    this.contents = contents || [];
  }

  mapFiles(callbackfn: (file: FileData) => FileData): Directory {
    const newContents = this.contents.map((entry) => {
      if ('contents' in entry) {
        return entry.mapFiles(callbackfn);
      }
      return callbackfn(entry);
    });

    return (new Directory(this.name, newContents));
  }

  forEach(callbackfn: (entry: DirectoryEntry) => void): void {
    this.contents.forEach((entry) => {
      callbackfn(entry);
      if ('contents' in entry) {
        entry.forEach(callbackfn);
      }
    });
  }

  forEachFile(callbackfn: (file: FileData) => void): void {
    this.forEach((entry) => {
      if (!('contents' in entry)) {
        callbackfn(entry);
      }
    });
  }

  hasSingleFile(): boolean {
    return (this.contents.length === 1)
      && ('id' in this.contents[0]);
  }

  /*
  // Given a subfolder root, zip all files in this directory to that root.
  private zipDirectoryToFolder(folderZip: JSZip): void {
    this.contents.forEach((entry) => {
      if (entry.typeName === 'FileData') {
        folderZip.file()
      }
    });
  }

  zipDirectory(): JSZip {
    const zip = new JSZip();
    this.zipDirectoryToFolder(zip);
  }
   */
}

export type DirectoryEntry = FileData | Directory

interface IHasPath extends File {
  webkitRelativePath: string
}

export function FileData(properties: Omit<FileData, 'typeName'>): FileData {
  return {
    typeName: 'FileData',
    ...properties,
  };
}

export function hasPath(file: File): file is IHasPath {
  return (file as IHasPath).webkitRelativePath !== undefined;
}
