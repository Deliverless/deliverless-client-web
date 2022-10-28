import React, { useEffect } from 'react';

import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ControlPointDuplicateIcon
  from '@mui/icons-material/ControlPointDuplicate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Divider } from '@mui/material';

const OptionControls = ({addLabel, removeLabel, useFormik, indexMain, indexSub, indexOption, depth=0}) => {
  const [isAddDisabled, setIsAddDisabled] = React.useState(false);
  const [isRemoveDisabled, setIsRemoveDisabled] = React.useState(false);
  const [isMoveUpDisabled, setIsMoveUpDisabled] = React.useState(false);
  const [isMoveDownDisabled, setIsMoveDownDisabled] = React.useState(false);
  
  const getDepthClassNames = (depth) => {
    switch (depth) {
      case 1:
        return 'col-11 offset-1';
      case 2:
        return 'col-10 offset-2';
      case 3:
        return 'col-9 offset-3';
      case 4:
        return 'col-8 offset-4';
      case 5:
        return 'col-7 offset-5';
      case 6:
        return 'col-6 offset-6';
      default:
        return 'col-12';
    }
  };

  const getDepthDividerLeftPos = (depth) => {
    switch (depth) {
      case 1:
        return '-52px';
      case 2:
        return '-62px';
      default:
        return '-6px';
    }
  };

  const getDepthColor = (depth) => {
    switch (depth) {
      case 1:
        return '#9c9c9c';
      case 2:
        return '#c2c2c2';
      case 3:
        return '#e8e8e8';
      case 4:
        return '#fff';
      default:
        return '#767676';
    }
  };

  const moveArrayElement = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
  };

  const moveOption = (direction) => {
    if (indexMain !== undefined && indexSub !== undefined&& indexOption !== undefined) {
      const optionsCopy = [...useFormik.values.options[indexMain].options[indexSub].options];
      const newOptions = moveArrayElement(optionsCopy, indexOption, indexOption + direction);
      useFormik.setFieldValue(`options[${indexMain}].options[${indexSub}].options`, newOptions);
    } else if (indexMain !== undefined && indexSub !== undefined ) {
      const optionsCopy = [...useFormik.values.options[indexMain].options];
      const newOptions = moveArrayElement(optionsCopy, indexSub, indexSub + direction);
      useFormik.setFieldValue(`options[${indexMain}].options`, newOptions);
    } else if (indexMain !== undefined ) {
      const optionsCopy = [...useFormik.values.options];
      const newOptions = moveArrayElement(optionsCopy, indexMain, indexMain + direction);
      useFormik.setFieldValue('options', newOptions);
    }
  };

  const addMainOption = () => {
    const newOption = {
      name: '',
      options: [{
        isOptional: false,
        limit: 1,
        name: '',
        options: [
          {
            name: '',
            price: 0,
          },
        ],
      }],
    };
    const optionsCopy = [...useFormik.values.options];
    optionsCopy.push(newOption);
    useFormik.setFieldValue('options', optionsCopy);
  };

  const addSubOption = () => {
    const newOption = {
      isOptional: false,
      limit: 1,
      name: '',
      options: [
        {
          name: '',
          price: 0,
        },
      ],
    };
    const optionsCopy = [...useFormik.values.options[indexMain].options];
    optionsCopy.push(newOption);
    useFormik.setFieldValue(`options[${indexMain}].options`, optionsCopy);
  };

  const addOption = () => {
    const newOption = {
      name: '',
      price: 0,
    };
    const optionsCopy = [...useFormik.values.options[indexMain].options[indexSub].options];
    optionsCopy.push(newOption);
    useFormik.setFieldValue(`options[${indexMain}].options[${indexSub}].options`, optionsCopy);
  };

  const removeOption = (indexMain, indexSub, indexOption) => {
    if (indexMain !== undefined && indexSub !== undefined && indexOption !== undefined) {
      const optionsCopy = [...useFormik.values.options[indexMain].options[indexSub].options];
      if (optionsCopy.length > 1) {
        optionsCopy.splice(indexOption, 1);
        useFormik.setFieldValue(`options[${indexMain}].options[${indexSub}].options`, optionsCopy);
      }
    } else if (indexMain !== undefined && indexSub !== undefined) {
      const optionsCopy = [...useFormik.values.options[indexMain].options];
      optionsCopy.splice(indexSub, 1);
      useFormik.setFieldValue(`options[${indexMain}].options`, optionsCopy);
    } else if (indexMain !== undefined) {
      const optionsCopy = [...useFormik.values.options];
      optionsCopy.splice(indexMain, 1);
      useFormik.setFieldValue('options', optionsCopy);
    }
  };

  useEffect(() => {
    if ((indexMain >= 0 && indexSub >= 0 && indexOption === 0) || 
     (indexMain >= 0 && indexSub === 0 && indexOption === undefined) || 
     (indexMain === 0 && indexSub === undefined && indexOption === undefined)) {
      setIsMoveUpDisabled(true);
    } else {
      setIsMoveUpDisabled(false);
    }

    if ((indexMain >= 0 && indexSub >= 0 && indexOption === useFormik.values.options[indexMain].options[indexSub].options.length - 1) || 
     (indexMain >= 0 && indexSub === useFormik.values.options[indexMain].options.length - 1 && indexOption === undefined) || 
     (indexMain === useFormik.values.options.length - 1 && indexSub === undefined && indexOption === undefined)) {
      setIsMoveDownDisabled(true);
    }

    if (indexMain !== undefined && indexSub !== undefined && indexOption !== undefined) {
      if (useFormik.values.options[indexMain].options[indexSub].options.length === 1) {
        setIsRemoveDisabled(true);
      } else {
        setIsRemoveDisabled(false);
      }
    } else if (indexMain !== undefined && indexSub !== undefined) {
      if (useFormik.values.options[indexMain].options.length === 1) {
        setIsRemoveDisabled(true);
      } else {
        setIsRemoveDisabled(false);
      }
    } else if (indexMain !== undefined) {
      if (useFormik.values.options.length === 0) {
        setIsRemoveDisabled(true);
      } else {
        setIsRemoveDisabled(false);
      }
    }

  }, [useFormik.values]);

  return (
    <div 
      className={"option-divider " + (getDepthClassNames(depth))}
    >
      <Divider
        className="mb-3"
        style={{
          position: 'relative',
          left: getDepthDividerLeftPos(depth),
          width: 15 + (depth * 60),
          borderTop: `2px solid ${getDepthColor(depth)}`,
        }}
      />
      <div 
        className="option-divider-icon group"
        style={{ color: "#767676" }}
      >
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-disabled">
              {addLabel ? addLabel : "New Option"}
            </Tooltip>
          }
        >
          <ControlPointDuplicateIcon 
            className="add" 
            onClick={() => {
              if (indexMain !== undefined && indexSub !== undefined && indexOption !== undefined) {
                addOption();
              } else if (indexMain !== undefined && indexSub !== undefined) {
                addSubOption();
              } else {
                addMainOption();
              }
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-disabled">
              {removeLabel ? removeLabel : "Remove Option"}
            </Tooltip>
          }
        >
          <RemoveCircleOutlineIcon 
            className="sub" 
            onClick={() => {
              if (indexMain !== undefined && indexSub !== undefined && indexOption !== undefined) {
                removeOption(indexMain, indexSub, indexOption);
              } else if (indexMain !== undefined && indexSub !== undefined) {
                removeOption(indexMain, indexSub);
              } else {
                removeOption(indexMain);
              }
            }}
            style={{ color: isRemoveDisabled ? '#c2c2c2' : '#767676', cursor: isRemoveDisabled ? "not-allowed" : "pointer" }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-disabled">
              Move Option Up
            </Tooltip>
          }
        >
          <ArrowCircleUpIcon 
            className="up"
            onClick={() => isMoveUpDisabled ? null : moveOption(-1)}
            disabled={isMoveUpDisabled}
            style={{ 
              color: isMoveUpDisabled ? '#c2c2c2' : '#767676',
              cursor: isMoveUpDisabled ? 'not-allowed' : 'pointer', 
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-disabled">
              Move Option Down
            </Tooltip>
          }
        >
          <ArrowCircleDownIcon 
            className="down"
            onClick={() => isMoveDownDisabled ? null : moveOption(1)}
            disabled={isMoveDownDisabled}
            style={{ 
              color: isMoveDownDisabled ? '#c2c2c2' : '#767676',
              cursor: isMoveDownDisabled ? 'not-allowed' : 'pointer',
            }}
          />
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default OptionControls;