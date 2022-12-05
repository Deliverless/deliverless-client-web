import React, { useEffect } from 'react';

export default function SyncScreen({ isSyncing }) {
  useEffect(() => {
    if (isSyncing) {
      console.log('Syncing...');
    }
  }, [isSyncing]);

  if (isSyncing) {
    return (
      <div className="sync-screen">
      
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="translate(20 20)">
          <rect x="-15" y="-15" width="30" height="30" fill="#93dbe9">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.4819277108433735s"></animateTransform>
          </rect></g>
        <g transform="translate(50 20)">
          <rect x="-15" y="-15" width="30" height="30" fill="#689cc5">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.36144578313253006s"></animateTransform>
          </rect></g>
        <g transform="translate(80 20)">
          <rect x="-15" y="-15" width="30" height="30" fill="#5e6fa3">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.24096385542168675s"></animateTransform>
          </rect></g>
        <g transform="translate(20 50)">
          <rect x="-15" y="-15" width="30" height="30" fill="#689cc5">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.36144578313253006s"></animateTransform>
          </rect></g>
        <g transform="translate(50 50)">
          <rect x="-15" y="-15" width="30" height="30" fill="#5e6fa3">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.24096385542168675s"></animateTransform>
          </rect></g>
        <g transform="translate(80 50)">
          <rect x="-15" y="-15" width="30" height="30" fill="#3b4368">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.12048192771084337s"></animateTransform>
          </rect></g>
        <g transform="translate(20 80)">
          <rect x="-15" y="-15" width="30" height="30" fill="#5e6fa3">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.24096385542168675s"></animateTransform>
          </rect></g>
        <g transform="translate(50 80)">
          <rect x="-15" y="-15" width="30" height="30" fill="#3b4368">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="-0.12048192771084337s"></animateTransform>
          </rect></g>
        <g transform="translate(80 80)">
          <rect x="-15" y="-15" width="30" height="30" fill="#191d3a">
            <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" calcMode="spline" dur="1.2048192771084336s" values="1;1;0.2;1;1" keyTimes="0;0.2;0.5;0.8;1" keySplines="0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5" begin="0s"></animateTransform>
          </rect></g>
      </svg>

    </div>
    );
  } else {
    return null;
  }
}