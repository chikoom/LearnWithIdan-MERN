import React from 'react';

const BriefPreview = (brief) => (
  <div className="BriefPreview">
    <h3 className="className">{brief.className}</h3>
    <h4 className="briefName">{brief.briefName}</h4>
  </div>
);

export default BriefPreview;