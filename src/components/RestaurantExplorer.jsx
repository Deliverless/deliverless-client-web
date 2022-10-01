import React, { useEffect, useContext, useState, useRef } from 'react'
import { options } from "../lib/visjs-helper";
import { getDirections } from "../lib/mapboxapi";
import Cookies from "universal-cookie";
import { UserContext } from "../lib/context/userContext";
import { Paper } from '@material-ui/core';

import {Network, Node, Edge} from "react-vis-network";
import { RestaurantDecorator } from './RestaurantDecorator';

import { useNavigate } from 'react-router-dom'
import { getAutoComplete } from '../lib/addressapi';
import RestaurantCard from './RestaurantCard';

export default function RestaurantExplorer({restaurants}) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    let network = useRef(null);
    const [data, setData] = useState({nodes: [], edges: []});

    useEffect(async () => {
        const cookies = new Cookies();
        const cookieAddress = cookies.get("Address");
        const userAddressObj = user.address != null ? user.address : cookieAddress
        let nodes = await Promise.all(restaurants.map(async (rest) => {
            const directions = await getDirections(userAddressObj, rest.address);
            return {
              address: rest.address,
              id: rest.id,
              shape: "circularImage",
              image: rest.image,
              label: rest.name,
              distance:
                Math.round((directions.routes[0].distance / 1000.0) * 10) / 10,
              delivery_eta:
                Math.round((directions.routes[0].duration / 60.0) * 10) / 10,
            };
          }));

        setData({
          nodes: nodes,
          edges: calcEdges(nodes)
        });


    }, []);

    
    // network?.current?.network?.once("stabilized", function () {
    //   network.current.network.focus("123", {
    //   animation: {
    //       duration: 2000,
    //       easingFunction: "linear",
    //       },
    //   scale: 1.5,
    //   })
    // });

    const handleSelectNode = event =>{
      console.log("event", event)
  
      let selectedNode = data.nodes.find(n=>n.id === (event.nodes ? event.nodes[0] : event.node));
      if(!selectedNode) return;
      selectedNode.font = { face: "Monospace", align: 'left'}
      selectedNode.savedLabel = selectedNode.label && selectedNode.label.length > 0 ? selectedNode.label : selectedNode.savedLabel;
      selectedNode.decorator = (props)=>{ return (RestaurantDecorator(props, selectedNode.savedLabel)) }
      selectedNode.label=""
      setData({
        edges: [...data.edges],
        nodes: [...data.nodes],
      });
    }

    useEffect(()=>{
      network?.current?.network?.on("selectNode", handleSelectNode)
      network?.current?.network?.on("hoverNode", handleSelectNode)
      return ()=>{
        network?.current?.network?.off("selectNode", handleSelectNode)
        network?.current?.network?.off("hoverNode", handleSelectNode)
      }
    }, [handleSelectNode])

    const handleDeselectNode = event =>{
      console.log("event unhover", event)
      let selectedNode = data.nodes.find(n=>n.id === (event.previousSelection?.nodes ? event.previousSelection.nodes[0] : event.node));
      if(!selectedNode) return;
      selectedNode.label = selectedNode.savedLabel
      selectedNode.decorator = (props)=>{ return (<></>) }

      setData({
        edges: [...data.edges],
        nodes: [...data.nodes],
      });
    }

    useEffect(()=>{
      network?.current?.network?.on("deselectNode", handleDeselectNode)
      network?.current?.network?.on("blurNode", handleDeselectNode)
      return ()=>{
        network?.current?.network?.off("deselectNode", handleDeselectNode)
        network?.current?.network?.off("blurNode", handleDeselectNode)
      }
    }, [handleDeselectNode])

    const calcEdges = (nodes) => {
        let edges = [];
        nodes.filter((node) => node.id != "123").forEach((node) => {
          edges.push({
            id: ((edges.length ?? 0) + 1).toString(),
            label: node.distance + " km",
            to: node.id,
            from: "123",
            length: 100 + node.distance * 10
          })
        })
        return edges;
    }

    return (
      <div id="vis-container" style={{
        maxWidth: "1900px", 
        maxHeight:"1000px", 
        margin: "auto", 
        height: "calc(100vh - 295px)",
        boxShadow: "1px 1px 10px grey"
        }}>
        <Network
          ref={network}
            options={options}
            // getNodes={getNodes}
          > 
          <Node id={123} label={user.firstName} shape={"icon"} 
            icon={{
              face: "FontAwesome",
              code: "\uf007",
              size: 50,
              color: "#4F95C8"
              }}
            shadow={false}
          />

          {data.nodes?.map((node)=>{
            return (<Node nodeobj={node} key={node.id} id={node.id} label={node.label} image={node.image} shape={node.shape} decorator={node.decorator} shadow={node.shadow}/>)
            })}
          {data.edges?.map((edge)=>{
            return ( <Edge key={edge.id} label={edge.label} to={edge.to} from={edge.from}/>)
          })}
        </Network>
      </div>
    )
}