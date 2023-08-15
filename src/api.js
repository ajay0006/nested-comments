export const getPosts = async () => {
    return [
        {
            id: "1111",
            userName: "Takeoff",
            content: "parent comment",
            createdAt: "2023:12:11",
            ParentId: "0"
        },
        {
            id: "2222",
            userName: "Jackson",
            content: "First child comment",
            createdAt: "2023:12:11",
            ParentId: "1111"
        },
        {
            id: "3333",
            userName: "TonyST",
            content: "second child  ipsum",
            createdAt: "2023:12:11",
            ParentId: "2222"
        },
        {
            id: "4444",
            userName: "BigWhopper",
            content: "Third child ipsum",
            createdAt: "2023:12:11",
            ParentId: "3333"
        },
        {
            id: "5555",
            userName: "SausageHumunogo",
            content: "fourth child ipsum",
            createdAt: "2023:12:11",
            ParentId: "4444"
        },
        {
            id: "6666",
            userName: "tinyStick",
            content: "fifth child ipsum",
            createdAt: "2023:12:11",
            ParentId: "5555"
        },
        {
            id: "7777",
            userName: "blowHole",
            content: "sixth child ipsum",
            createdAt: "2023:12:11",
            ParentId: "6666"
        }

    ]
}

export const getInteractions = async () => {
    return [
        {
            id: "1111",
            likes: "43",
            views: "11",
        },
        {
            id: "2222",
            likes: "26",
            views: "20",
        },
        {
            id: "3333",
            likes: "10",
            views: "202",
        },
        {
            id: "4444",
            likes: "205",
            views: "1",
        },
        {
            id: "5555",
            likes: "40",
            views: "34",
        },
        {
            id: "6666",
            likes: "125",
            views: "223",
        },
        {
            id: "7777",
            likes: "205",
            views: "113",
        }

    ]
}

export const createPost = async (text, parentId, userName = null) => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        userName,
        content: text,
        createdAt: new Date().toISOString(),
        parentId
    };
};

export const updatePost = async (text) => {
    return {text};
};

export const deletePost = async () => {
    return {};
};