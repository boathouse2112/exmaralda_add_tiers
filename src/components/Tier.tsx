import React, { ChangeEvent } from 'react';
import { TierData } from './app/App';

type TierAttribute = 'speaker' | 'type' | 'category';
const TIER_ATTRIBUTES: TierAttribute[] = ['speaker', 'type', 'category'];

interface TierProps {
  tierData: TierData
  updateTierData: (id:string, attribute: TierAttribute, value: string) => void
  deleteTier: (id: string) => void
}

function Tier({ deleteTier, tierData, updateTierData }: TierProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { labels } = e.target;
    if (labels) {
      const changedTierAttribute = labels[0].innerText as TierAttribute;
      const changedTierValue = e.target.value;
      updateTierData(tierData.id, changedTierAttribute, changedTierValue);
    }
  }

  const tierAttributesHTML = TIER_ATTRIBUTES.map(
    (attribute) => (
      <form key={`${tierData.id}-${attribute}`}>
        <label htmlFor={`${tierData.id}-${attribute}`}>
          {attribute}
          <input
            id={`${tierData.id}-${attribute}`}
            type="text"
            autoComplete="off"
            value={tierData[attribute]}
            onChange={handleChange}
          />
        </label>
      </form>
    ),
  );

  return (
    <li>
      {tierAttributesHTML}
      <button type="button" onClick={() => deleteTier(tierData.id)}>
        delete
      </button>
    </li>
  );
}

export default Tier;
