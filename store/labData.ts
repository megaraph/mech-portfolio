export interface LabItem {
    id: string;
    image: string;
    caption: string;
    date: string;
    category: "sketch" | "prototype" | "failure" | "test" | "other";
    aspectRatio: "square" | "portrait" | "landscape";
}

export const labItems: LabItem[] = [
    {
        id: "001",
        image: "/images/lab/001.jpg",
        caption: "Manual lathe work — knurling lever handle",
        date: "2024-12-15", // Adjust dates as needed
        category: "prototype",
        aspectRatio: "portrait", // Vertical composition
    },
    {
        id: "008",
        image: "/images/lab/008.jpg",
        caption: "SRM (Solid Rocket Motor) static fire test",
        date: "2024-11-09",
        category: "test",
        aspectRatio: "portrait", // The smoke plume looks best vertical
    },
    {
        id: "005",
        image: "/images/lab/005.jpg",
        caption: "CNC mill calibration & Z-axis zeroing",
        date: "2024-12-05",
        category: "other", // Fits "maintenance/setup"
        aspectRatio: "portrait",
    },
    {
        id: "006",
        image: "/images/lab/006.jpg",
        caption: "Scotch Yoke mechanism validation",
        date: "2024-10-20",
        category: "failure", // You mentioned you didn't proceed—labeling it "failure" or "sketch" looks humble and authentic
        aspectRatio: "landscape",
    },
    {
        id: "002",
        image: "/images/lab/002.jpg",
        caption: "RFID scanner v1 — wiring harness validation",
        date: "2024-09-15",
        category: "prototype",
        aspectRatio: "portrait",
    },
    {
        id: "007",
        image: "/images/lab/007.jpg",
        caption: "Stress testing 45° unsupported overhangs",
        date: "2024-12-20",
        category: "test",
        aspectRatio: "portrait",
    },
    {
        id: "009",
        image: "/images/lab/009.jpg",
        caption: "Telemetry setup for static fire stand",
        date: "2024-11-09",
        category: "test",
        aspectRatio: "portrait",
    },
    {
        id: "003",
        image: "/images/lab/003.jpg",
        caption: "Nail clipper assembly — CAD modeling",
        date: "2024-12-30",
        category: "sketch", // "Sketch" works well for CAD/Digital work
        aspectRatio: "portrait",
    },
    {
        id: "004",
        image: "/images/lab/004.jpg",
        caption: "Client commission — internal baffle print",
        date: "2024-10-05",
        category: "prototype",
        aspectRatio: "portrait",
    },
];
