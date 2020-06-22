import React from 'react';
import { LEFT_DISLOCATION_TIER_DATA, REFERENT_ANNOTATION_TIER_DATA, TierData } from './App';
import Tier from './Tier';

interface TierListProps {
  tiers: TierData[],
  setTiers: (tiers: TierData[]) => void,
}

function TierList({ tiers, setTiers }: TierListProps) {

  function addTier() {
    setTiers([...tiers, new TierData()]);
  }

  function updateTierData(id: string, attribute: string, value: string) {
    const tiersCopy = [...tiers];
    const matchingTierIdx = tiers.findIndex((tier) => tier.id === id);
    const matchingTier = tiersCopy[matchingTierIdx];

    if (matchingTierIdx != null) {
      tiersCopy[matchingTierIdx] = { ...matchingTier, [attribute]: value };
      setTiers(tiersCopy);
    }
  }

  function deleteTier(id: string) {
    setTiers(tiers.filter((tier) => tier.id !== id));
  }

  const tierElements = tiers.map(
    (tierData) => (
      <Tier
        key={tierData.id}
        tierData={tierData}
        updateTierData={updateTierData}
        deleteTier={deleteTier}
      />
    ),
  );

  return (
    <div>
      <h2>Tiers to Add</h2>
      <button
        type="button"
        onClick={() => setTiers(REFERENT_ANNOTATION_TIER_DATA)}
      >
        referent annotation default
      </button>
      <button
        type="button"
        onClick={() => setTiers(LEFT_DISLOCATION_TIER_DATA)}
      >
        left dislocation default
      </button>
      <button
        type="button"
        onClick={addTier}
      >
        add new tier
      </button>
      <ul>
        {tierElements}
      </ul>
    </div>
  );
}

export default TierList;
