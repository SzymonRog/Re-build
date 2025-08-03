import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const components = [
    {
        type: "cpu",
        name: "AMD Ryzen 5 5600",
        price: 629.99,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=Ryzen+5+5600",
        description: {
            socket: "AM4",
            cores: 6,
            threads: 12,
            tdp: 65
        }
    },
    {
        type: "cpuCooler",
        name: "Noctua NH‑D15 chromax.black",
        price: 299.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=NH-D15+cooler",
        description: {
            socketSupported: ["AM4","AM5","LGA1700","LGA1200"],
            fans: 2,
            noiseDb: 24.8
        }
    },
    {
        type: "motherboard",
        name: "MSI MAG B550 TOMAHAWK",
        price: 599.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=B550+Tomahawk",
        description: {
            socket: "AM4",
            formFactor: "ATX",
            ramType: "DDR4"
        }
    },
    {
        type: "ram",
        name: "Corsair Vengeance LPX 16GB DDR4‑3200",
        price: 289.99,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=Corsair+16GB+DDR4",
        description: {
            capacity: "16GB",
            speed: "3200MHz",
            type: "DDR4"
        }
    },
    {
        type: "storage",
        name: "Samsung 970 EVO Plus 1TB",
        price: 479.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=970+EVO+Plus",
        description: {
            capacity: "1TB",
            interface: "NVMe M.2",
            model: "970 EVO Plus"
        }
    },
    {
        type: "gpu",
        name: "NVIDIA GeForce RTX 4060 Ti",
        price: 1899.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=RTX+4060+Ti",
        description: {
            vram: "8GB",
            powerDraw: 160
        }
    },
    {
        type: "psu",
        name: "Seasonic Focus GX‑650W 80+ Gold",
        price: 449.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=Seasonic+650W",
        description: {
            wattage: 650,
            efficiency: "80+ Gold"
        }
    },
    {
        type: "case",
        name: "NZXT H510",
        price: 349.00,
        imageUrl: "https://dummyimage.com/600x400/000/fff&text=NZXT+H510",
        description: {
            formFactor: "ATX",
            color: "Black"
        }
    }
];

async function main() {
    for (const component of components) {
        await prisma.component.create({ data: component });
    }
    console.log("✅ Seed complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());