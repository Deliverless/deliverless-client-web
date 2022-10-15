import React, {
  useEffect,
  useState,
} from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Skeleton } from '@mui/material';

export default function Item({item, onClick}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (item.images) {
      const imageObj = item.images.length > 0 ? item.images.find((image) => image.alt === 'main') : null;
      setImage(imageObj)
    }
  }, [item]);

  return (
    item && item.id ? (
      image ? (
        <a 
          className="menu-item col-sm-6 col-md-4 col-lg-3 m-4"
          style={{ maxWidth: "200px", textDecoration: "none", color: "black", maxWidth: "200px", maxHeight: "150px" }} 
          href="#"
          onClick={onClick}
        >
          <img src={image.url} alt={image.alt} style={{ width: "100%", height: "100%", minHeight: "150px", objectFit: "cover" }} />
          <div className="menuwork-item-title row">
            <span style={{ fontSize: "0.8rem" }}>{item.name}</span>
            <span 
              style={{ fontSize: "0.7rem", color: "grey" }}
            >
              {item.price && `$${item.price.toFixed(2)}`}
            </span>
          </div>
        </a>
      ) : (
        <div className="col-md-12 pt-5">
          <div className="row">
            <div className="col-md-4">
              <Skeleton variant="rectangular" sx={{ maxWidth: "200px", maxHeight: "150px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%", marginTop: "5px" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%", marginTop: "5px" }} />
            </div>
          </div>
        </div>
      )
    ) : (
      <div className="add-item-container">
        <div className="add-item col-md-4 m-4" onClick={onClick}>
          <AddCircleOutlineIcon className="add-item-icon" style={{ fontSize: "3rem" }} />
        </div>
      </div>
    )
  );
}
