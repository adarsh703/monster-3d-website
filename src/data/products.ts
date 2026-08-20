export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
 }
 
 export const products: Product[] = [
    {
        id: "monster-sword",
        name: "Monster Energy",
        subName: "Unleash the Beast.",
        price: "$3.99",
        description: "The meanest energy supplement on the planet.",
        folderPath: "/monster frames",
        themeColor: "#90EE90", // Monster green
        gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        features: ["Taurine", "Ginseng", "L-Carnitine", "B Vitamins"],
        stats: [{ label: "Energy", val: "100%" }, { label: "Sugar", val: "0g" }, { label: "Focus", val: "Max" }],
        section1: { title: "Unleash.", subtitle: "The energy you need to conquer." },
        section2: { title: "Transform.", subtitle: "From a mere can into an absolute weapon." },
        section3: { title: "Strike True.", subtitle: "Precision focus and sustained power." },
        section4: { title: "The Beast.", subtitle: "Forged in the fires of extreme performance." },
        detailsSection: {
            title: "Forged for Battle",
            description: "Tear into a can of the meanest energy drink on the planet. We went down to the lab and cooked up a double shot of our killer energy brew. It's a wicked mega hit that delivers twice the buzz of a regular energy drink.",
            imageAlt: "Monster Energy Can"
        },
        freshnessSection: {
            title: "Zero Sugar, Pure Power",
            description: "Experience the smooth, refreshing flavor without the sugar crash. Our advanced formula gives you the edge you need, transforming your potential into a razor-sharp reality."
        },
        buyNowSection: {
            price: "$3.99",
            unit: "per 16 fl oz can",
            processingParams: ["Zero Sugar", "B-Vitamins", "Taurine Blend"],
            deliveryPromise: "Same-day delivery available.",
            returnPolicy: "If you can't handle the beast, we'll take it back."
        }
    }
 ];
