export interface Weapon {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    themeMode: 'dark' | 'light';
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    forgeSection: { title: string; description: string };
    unlockSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}

export const weapons: Weapon[] = [
    {
        id: "original",
        name: "The Shard Blade",
        subName: "Unleash the Beast.",
        price: "Unlock",
        description: "Matte Black Alloy - Neon Green Core - High-Octane Energy",
        folderPath: "/monster frames",
        themeColor: "#00FF00",
        themeMode: 'dark',
        gradient: "linear-gradient(135deg, #00FF00 0%, #008800 100%)",
        features: ["Matte Black Alloy", "Neon Green Core", "High-Octane Energy"],
        stats: [{ label: "Energy", val: "160mg" }, { label: "Form", val: "Greatsword" }, { label: "Impact", val: "Maximum" }],
        section1: { title: "The Shard Blade.", subtitle: "Unleash the Beast." },
        section2: { title: "Dynamic transformation.", subtitle: "Jagged shards of black aluminum coalesce mid-air, bound by glowing neon green liquid energy." },
        section3: { title: "Mechanized perfection.", subtitle: "A heavy, mechanical hilt forged from compressed can tops and ring pulls." },
        section4: { title: "Tear through the ordinary.", subtitle: "" },
        detailsSection: {
            title: "Forged in the Void",
            description: "The Shard Blade represents the raw, unbridled power of original Monster Energy. Suspended in an obsidian void, the blade is held together by a pulsing, high-contrast neon green energy core. It balances sharp, hyper-realistic metallic textures with vibrant fluid dynamics.",
            imageAlt: "Shard Blade Details"
        },
        forgeSection: {
            title: "Cinematic Assembly",
            description: "Captured with extreme precision. The lighting transitions from deep shadows to dramatic studio edge lighting, illuminating the iconic silver M-Claw logo fragments as they magnetically lock into a balanced, suspended composition."
        },
        unlockSection: {
            price: "Free Unlock",
            unit: "with code underneath tab",
            processingParams: ["Liquid Core", "Magnetic Assembly", "Neon Glow"],
            deliveryPromise: "Instantly drops into your digital armory upon code redemption.",
            returnPolicy: "Once unleashed, the Beast cannot be caged."
        }
    },
    {
        id: "ultra",
        name: "The Zero Edge",
        subName: "Zero Sugar. Pure Power.",
        price: "Unlock",
        description: "Frosted White Shell - Crystalline Cyan Core - Zero Sugar",
        folderPath: "/monster cyan",
        themeColor: "#00FFFF",
        themeMode: 'light',
        gradient: "linear-gradient(135deg, #E0FFFF 0%, #00FFFF 100%)",
        features: ["Frosted White Shell", "Crystalline Cyan Core", "Zero Sugar"],
        stats: [{ label: "Sugar", val: "0g" }, { label: "Form", val: "Katana" }, { label: "Agility", val: "Maximized" }],
        section1: { title: "The Zero Edge.", subtitle: "Lighter. Faster. Deadly." },
        section2: { title: "A blizzard of shards.", subtitle: "Textured silver and white fragments form a sleek, razor-thin blade." },
        section3: { title: "Crystalline energy.", subtitle: "Powered by a sub-zero, blindingly bright cyan energy core." },
        section4: { title: "Strike without warning.", subtitle: "" },
        detailsSection: {
            title: "Precision Crafted",
            description: "Stripped of all excess. The Zero Edge takes the textured, frosted aluminum of Monster Ultra and weaponizes it. The resulting blade is terrifyingly fast, leaving a trail of icy, high-definition condensation droplets in its wake.",
            imageAlt: "Zero Edge Details"
        },
        forgeSection: {
            title: "Sub-Zero Rendering",
            description: "Rendered against a deep, infinite charcoal background, the electric white edge lighting outlines every microscopic scratch and frosty droplet, contrasting with the piercing cyan glow of the inner energy matrix."
        },
        unlockSection: {
            price: "Free Unlock",
            unit: "with code underneath tab",
            processingParams: ["Zero Sugar", "Ultralight", "Cyan Core"],
            deliveryPromise: "Instantly drops into your digital armory upon code redemption.",
            returnPolicy: "Once unleashed, the Beast cannot be caged."
        }
    }
];
