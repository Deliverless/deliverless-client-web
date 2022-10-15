import React from 'react';

export default function ItemEdit({item}) {
  return (
    <div>
      <h1>Item</h1>
      <ul>
        <li key={item.id}>{item.name}</li>
      </ul>
    </div>
  );
}