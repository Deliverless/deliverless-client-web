import React, { useEffect, useContext, useState } from 'react'
import { options } from "../lib/visjs-helper";
import Graph from "react-graph-vis";
import { getDirections } from "../lib/mapboxapi";
import Cookies from "universal-cookie";
import { UserContext } from "../lib/userContext";
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'

export default function RestaurantExplorer({restaurants}) {
    const [graphData, setGraphData] = useState({ edges: [], nodes: [] });
    const { user, setUser } = useContext(UserContext);
    const [network, setNetwork] = useState();
    const navigate = useNavigate()
    let net;

    useEffect(async () => {
        let nodes = await Promise.all(restaurants.map(async (rest) => {
            let cookies = new Cookies();
            const cookieAddress = cookies.get("Address");
            const directions = await getDirections(
              user.address != null ? user.address : cookieAddress,
              `${rest.address.number} ${rest.address.street} ${rest.address.city}, ${rest.address.province}`
            );
            return {
              id: rest.asset_id,
              shape: "circularImage",
              image: rest.image,
              label: rest.name,
              distance:
                Math.round((directions.routes[0].distance / 1000.0) * 10) / 10,
              delivery_eta:
                Math.round((directions.routes[0].duration / 60.0) * 10) / 10,
            };
          }));

        setGraphData({
            edges: calcEdges(nodes),
            nodes: [
            ...nodes,
            {
                id: "123",
                shape: "icon",
            
                icon: {
                face: "FontAwesome",
                code: "\uf007",
                size: 50,
                color: "#4F95C8"
                },
                shadow: false,
                label: user.firstName
            
            },
            ],
        });

        net.once("stabilized", function () {
            net.focus("123", {
            animation: {
                duration: 2000,
                easingFunction: "linear",
                },
            scale: 1.5,
            })
        });
    }, []);

    const calcEdges = (nodes) => {
        let edges = [];
        nodes.filter((node) => node.id != "123").forEach((node) => {
          edges.push({
            label: node.distance + " km",
            to: node.id,
            from: "123",
            length: 100 + node.distance * 10
          })
        })
        console.log(edges)
        return edges;
    }
    const events = {
        selectNode: async function (event) {
          var { nodes, edges } = event;
          navigate(`/restaurant/home?id=${nodes[0]}`);
          // console.log("nodes", nodes)
          // // setGraphData()
          // setGraphData(current=>{
          //   let node = current.nodes.find(n=>n.id == nodes[0])
          //   node.label="test"
          //   console.log("new data",{
          //     ...current, 
          //     nodes: [
          //       ...current.nodes
          //     ]
          //   })
          //   return {
          //     ...current, 
          //     nodes: [
          //       ...current.nodes
          //     ]
          //   }
          // })
          
          // network.redraw();
        },

    };

    return (
      <Paper elevation={3} className="mx-auto" style={{width:  "fit-content"}}>
        <Graph
            graph={graphData}
            options={options}
            events={events}
            getNetwork={(_network) => {
              net = _network;
              setNetwork(_network);
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
      </Paper>
    )
}