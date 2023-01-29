import React from 'react';

function AttachmentComponent({ url }) {
  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button type="button" className="btn btn-primary">Lihat</button>
      </a>

    </div>
  );
}

export default AttachmentComponent;
