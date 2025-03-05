import React from 'react';

function Legend({ isUploaded }) {
  if (!isUploaded) return null;
  
  return (
    <div className="legend">
      <h3>Legend</h3>
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-color normal"></div>
          <span>Numbers unique to your uploaded file</span>
        </div>
        <div className="legend-item">
          <div className="legend-color highlighted"></div>
          <span>Numbers from your uploaded file that also appear in the default file</span>
        </div>
      </div>
    </div>
  );
}

export default Legend; 