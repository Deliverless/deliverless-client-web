export const foods = [
    {
        id: 1,
        restaurantId: "3",
        title: "Chicken Strip Basket",
        category: "Picked for you",
        description: "All white meat seasoned chicken strips are served with fries and delicious DQ gravy sauce.",
        price: 10.91,
        photoUrl: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8yODI4NmMwNy1hYzBkLTQxY2MtOTQ0Zi0xZmI5MmUwNDYwMzMuanBlZw==",
        isCombo: false,
        isPickupOnly: false,
        options: [
            {
                title: "Size",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Four Pieces",
                        price: 0
                    },
                    {
                        title: "Six Pieces",
                        price: 2.88
                    }
                ]
            },
            {
                title: "Sides",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Fries(Regular)",
                        price: 0,
                    },
                    {
                        title: "Fries(Large)",
                        price: 1.25,
                    },
                    {
                        title: "Onion Rings(Large)",
                        price: 4.39,
                    },
                ]
            },
            {
                title: 'Sauces',
                limit: 1,
                isOptional: true,
                options: [
                    {
                        title: "Gravy",
                        price: 0,
                    },
                    {
                        title: "Buffalo",
                        price: 0,
                    },
                    {
                        title: "BBQ",
                        price: 0,
                    },
                ]
            }
        ]
    },

    {
        id: 2,
        restaurantId: "3",
        title: "Original Cheeseburger",
        category: "Picked for you",
        description: "A signature stack burger with two 100 percent seasoned real beef burger patties, topped with perfectly melted cheese, pickles, ketchup, and mustard on a soft and toasted bun. Precooked weight. Processed cheese product used.",
        price: 5.97,
        photoUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/ede9757cb3500b905bf1f51e43ac8ad8/859baff1d76042a45e319d1de80aec7a.jpeg",
        isCombo: false,
        isPickupOnly: false,
        options: [
            {
                title: "Size",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Single",
                        price: 0
                    },
                    {
                        title: "Double (1/3 lb)",
                        price: 1.15
                    },
                    {
                        title: "Triple (1/2 lb)",
                        price: 2.88
                    }
                ]
            },
            {
                title: 'Add-ons',
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Extra Mayonnaise",
                        price: 0.56,
                    },
                    {
                        title: "Extra Lettuce",
                        price: 0.56,
                    },
                    {
                        title: "Extra Ketchup",
                        price: 0,
                    },
                    {
                        title: "Extra Bacon",
                        price: 1.48,
                    },
                ]
            },
        ]
    },

    {
        id: 3,
        restaurantId: "3",
        title: "Crispy Chicken Sandwich Combo",
        category: "Combos",
        description: "An all white meat marinated crispy chicken fillet topped with crisp lettuce, tomato and mayo on a warm toasted bun. Served with your choice of side and a 21oz. drink.",
        price: 12.64,
        photoUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/9bf9f404e9db63b1d4723c369ea14723/859baff1d76042a45e319d1de80aec7a.jpeg",
        isCombo: true,
        isPickupOnly: true,
        options: [
            {
                title: "Drinks",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Pepsi",
                        price: 0
                    },
                    {
                        title: "7UP",
                        price: 0
                    },
                    {
                        title: "Dr. Pepper",
                        price: 0
                    }
                ]
            },
            {
                title: "Sides",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Fries(Regular)",
                        price: 0,
                    },
                    {
                        title: "Fries(Large)",
                        price: 1.48,
                    },
                    {
                        title: "Onion Rings(Large)",
                        price: 4.37,
                    },
                ]
            },
        ]
    },

    {
        id: 4,
        restaurantId: "3",
        title: "Bacon Avocado Sandwich",
        category: "Signature Specials",
        description: "Cheddar cheese, bacon, avocado, tomato corn salsa, shredded lettuce, and chipotle.",
        price: 11.55,
        photoUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/7c5aa1f82f57911ea01e9e5e0e9c1600/859baff1d76042a45e319d1de80aec7a.jpeg",
        isCombo: false,
        isPickupOnly: true,
        options: [
            {
                title: "Bread Choice",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "White",
                        price: 0
                    },
                    {
                        title: "Multigrain",
                        price: 0
                    },
                    {
                        title: "Sourdough",
                        price: 0
                    },
                ]
            },
            {
                title: "Remove Topping",
                limit: 3,
                isOptional: false,
                options: [
                    {
                        title: "**NO** Lettuce",
                        price: 0
                    },
                    {
                        title: "**NO** Tomato",
                        price: 0
                    },
                    {
                        title: "**NO** Cheese",
                        price: 0
                    }
                ]
            },
            {
                title: "Toppings",
                limit: 1,
                isOptional: false,
                options: [
                    {
                        title: "Add Impossible Meat Patty",
                        price: 5.78
                    },
                    {
                        title: "Add Grilled Onions",
                        price: 1.73
                    },
                    {
                        title: "Add Mushrooms",
                        price: 1.73
                    },
                    {
                        title: "Extra Cheese",
                        price: 2.10
                    },
                ]
            },
        ]
    },
]