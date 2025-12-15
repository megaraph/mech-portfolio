export interface LabItem {
    id: string;
    image: string; // Path to actual image
    caption: string;
    date: string;
    category: "sketch" | "prototype" | "failure" | "test" | "other";
    aspectRatio: "square" | "portrait" | "landscape";
}

export const labItems: LabItem[] = [
    {
        id: "001",
        image: "/lab/failed-bearing.jpg", // Your actual images
        caption: "Failed bearing race — tolerance too tight",
        date: "2024-11-23",
        category: "failure",
        aspectRatio: "square",
    },
    // Add more items...
];
