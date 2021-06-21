import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import OpenFiles from '../OpenFiles';
import FileList from '../FileList';
import TierList from '../TierList';
import useFiles from './useFiles';

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

export const REFERENT_FORM_TIER_DATA: TierData[] = [
  defaultTierData('ref-form'),
  defaultTierData('ref-mod'),
  defaultTierData('ref-form2'),
  defaultTierData('ref-mod2'),
  defaultTierData('ref-form3'),
  defaultTierData('ref-mod3'),
  defaultTierData('ref-tracking'),
  defaultTierData('ref-tracking2'),
  defaultTierData('ref-tracking3'),
];

function App() {
  const {
    files, openFilesHandler, addTiersAndDownload, deleteFiles,
  } = useFiles();
  const [tiers, setTiers] = useState<TierData[]>(INITIAL_TIER_DATA);

  return (
    <div className="col stack-small">
      <h1>Add Exmaralda Tiers</h1>
      <OpenFiles openFilesHandler={openFilesHandler} />
      <div className="row filesTiers">
        <div className="col">
          <FileList
            files={files}
            addTiersAndDownload={() => addTiersAndDownload(tiers)}
            deleteFiles={deleteFiles}
          />
        </div>
        <TierList tiers={tiers} setTiers={setTiers} />
      </div>
    </div>
  );
}

export default App;
