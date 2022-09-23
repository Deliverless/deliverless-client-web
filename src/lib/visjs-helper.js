export const options = {
    autoResize: true,
    layout: {
        hierarchical: false
    },
    edges: {
        shadow: true,
        dashes: true,
        color: "#000000",
        arrows: {
            to: {
                enabled: false
            },
            from: {
                enabled: false
            }
        }
    },
    physics: {
        barnesHut: {
            // theta: 0.5,
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 1,
            springConstant: 0,
            damping: 0.09,
            avoidOverlap: 0.6
        },
        maxVelocity: 10,
    },
    interaction: { keyboard: false, zoomView: false, hover: true },
    manipulation: {
        enabled: false,
        initiallyActive: true
    },
    nodes: {
        font: {
            align: 'left'
        },
        shadow: true,
        brokenImage: "http://www.opentable.com/img/restimages/334.jpg",
    },

};
