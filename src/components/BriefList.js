import React from 'react';
import BriefPreview from './BriefPreview';
import propTypes from 'prop-types';

const BriefList = ({briefs, onBriefClick}) => (
  <div className="BriefsList">
    {Object.keys(briefs).map(briefId => 
      <BriefPreview 
        onBriefClick={onBriefClick}
        key={briefId}
        {...briefs[briefId]} />)}
  </div>
);

BriefList.propTypes = {
  briefs: propTypes.object,
  onBriefClick: propTypes.func.isRequired
};

export default BriefList;


