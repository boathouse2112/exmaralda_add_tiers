import React, { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import OpenFiles from './OpenFiles';
import Tier from './Tier';
import FileList from './FileList';
import TierList from './TierList';

export class TierData {
  id: string

  speaker: string = ''

  type: string = ''

  category: string = ''

  constructor() {
    this.id = `tier-${nanoid()}`;
  }
}

function defaultTierData(category: string) {
  return {
    ...new TierData(),
    speaker: 'norm',
    type: 'a',
    category,
  };
}

const INITIAL_TIER_DATA: TierData[] = [
  defaultTierData(''),
];

export const REFERENT_ANNOTATION_TIER_DATA: TierData[] = [
  defaultTierData('referent'),
  defaultTierData('r-type'),
  defaultTierData('conj_referent'),
];

export const LEFT_DISLOCATION_TIER_DATA: TierData[] = [
  defaultTierData('ld_referent'),
  defaultTierData('ld_direction'),
  defaultTierData('ld_np'),
  defaultTierData('ld_pronoun'),
  defaultTierData('ld_intervening'),
];

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [tiers, setTiers] = useState<TierData[]>(INITIAL_TIER_DATA);

  function openFilesHandler(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const openedFiles = e.target.files;

    if (openedFiles != null) {
      const openedFilesArray = Array.from(openedFiles);
      setFiles([...files, ...openedFilesArray]);
    }
  }

  function addTiersToFile(file: File, tier: TierData) {
    alert(file.text());
    return null;
  }

  return (
    <div>
      <h1>Add Exmaralda Tiers</h1>
      <OpenFiles openFilesHandler={openFilesHandler} />
      <FileList fileNames={files.map((file) => file.name)} />
      <TierList tiers={tiers} setTiers={setTiers} />
    </div>
  );
}

export default App;
