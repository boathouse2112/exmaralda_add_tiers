import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import OpenFiles from '../OpenFiles';
import FileList from '../FileList';
import TierList from '../TierList';
import { useDirectory } from './useDirectory';

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
  const {
    directory, openFilesHandler, addTiersAndDownload,
  } = useDirectory();
  const [tiers, setTiers] = useState<TierData[]>(INITIAL_TIER_DATA);

  return (
    <div>
      <h1>Add Exmaralda Tiers</h1>
      <OpenFiles openFilesHandler={openFilesHandler} />
      <div className="cols">
        <FileList directory={directory} />
        <button
          type="button"
          onClick={() => addTiersAndDownload(tiers)}
        >
          Add Tiers and Download
        </button>
        <TierList tiers={tiers} setTiers={setTiers} />
      </div>
    </div>
  );
}

export default App;
