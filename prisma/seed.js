import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const components = [
    {
        type: 'cpu',
        name: 'AMD Ryzen 5 5600',
        price: 499,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=AMD+Ryzen+5+5600',
        description: { rdzenie: 6, watki: 12, taktowanie: '3.5GHz', cache: '32MB' },
        specs: { socket: 'AM4' }
    },
    {
        type: 'cpu',
        name: 'Intel Core i5-12400F',
        price: 599,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Intel+i5-12400F',
        description: { rdzenie: 6, watki: 12, taktowanie: '2.5GHz', cache: '18MB' },
        specs: { socket: 'LGA1700' }
    },
    {
        type: 'cpu',
        name: 'AMD Ryzen 7 5800X',
        price: 799,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=AMD+Ryzen+7+5800X',
        description: { rdzenie: 8, watki: 16, taktowanie: '3.8GHz', cache: '36MB' },
        specs: { socket: 'AM4' }
    },
    {
        type: 'gpu',
        name: 'NVIDIA RTX 4060 Ti 8GB',
        price: 1599,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=RTX+4060+Ti',
        description: { vram: '8GB', taktowanie: '2.4GHz', tdp: '160W' },
        specs: { lengthMm: 242, tdp: 160 }
    },
    {
        type: 'gpu',
        name: 'AMD Radeon RX 6700 XT',
        price: 1499,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=RX+6700+XT',
        description: { vram: '12GB', taktowanie: '2.3GHz', tdp: '230W' },
        specs: { lengthMm: 267, tdp: 230 }
    },
    {
        type: 'gpu',
        name: 'NVIDIA RTX 4070 12GB',
        price: 2199,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=RTX+4070',
        description: { vram: '12GB', taktowanie: '2.5GHz', tdp: '220W' },
        specs: { lengthMm: 242, tdp: 220 }
    },
    {
        type: 'ram',
        name: 'Kingston Fury 16GB DDR4 3200MHz',
        price: 219,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Kingston+16GB',
        description: { pojemnosc: '16GB', typ: 'DDR4', taktowanie: '3200MHz' },
        specs: { type: 'DDR4' }
    },
    {
        type: 'ram',
        name: 'Corsair Vengeance 32GB DDR5 6000MHz',
        price: 499,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Corsair+32GB',
        description: { pojemnosc: '32GB', typ: 'DDR5', taktowanie: '6000MHz' },
        specs: { type: 'DDR5' }
    },
    {
        type: 'ram',
        name: 'G.Skill Ripjaws 16GB DDR4 3600MHz',
        price: 249,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=GSkill+16GB',
        description: { pojemnosc: '16GB', typ: 'DDR4', taktowanie: '3600MHz' },
        specs: { type: 'DDR4' }
    },
    {
        type: 'motherboard',
        name: 'MSI B550 Tomahawk',
        price: 589,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=MSI+B550',
        description: { chipset: 'B550', socket: 'AM4', format: 'ATX' },
        specs: { socket: 'AM4', formFactor: 'ATX', memoryType: 'DDR4' }
    },
    {
        type: 'motherboard',
        name: 'ASUS TUF Gaming Z690',
        price: 849,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=ASUS+Z690',
        description: { chipset: 'Z690', socket: 'LGA1700', format: 'ATX' },
        specs: { socket: 'LGA1700', formFactor: 'ATX', memoryType: 'DDR5' }
    },
    {
        type: 'motherboard',
        name: 'Gigabyte B660M DS3H',
        price: 449,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Gigabyte+B660M',
        description: { chipset: 'B660', socket: 'LGA1700', format: 'mATX' },
        specs: { socket: 'LGA1700', formFactor: 'mATX', memoryType: 'DDR5' }
    },
    {
        type: 'psu',
        name: 'SilentiumPC Vero L3 600W 80+ Bronze',
        price: 239,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=PSU+600W',
        description: { moc: '600W', certyfikat: '80+ Bronze' },
        specs: { wattage: 600 }
    },
    {
        type: 'psu',
        name: 'Corsair RM750x 750W 80+ Gold',
        price: 599,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=PSU+750W',
        description: { moc: '750W', certyfikat: '80+ Gold' },
        specs: { wattage: 750 }
    },
    {
        type: 'psu',
        name: 'Seasonic Focus GX-650 80+ Gold',
        price: 569,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=PSU+650W',
        description: { moc: '650W', certyfikat: '80+ Gold' },
        specs: { wattage: 650 }
    },
    {
        type: 'case',
        name: 'NZXT H510',
        price: 349,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=NZXT+H510',
        description: { typ: 'Mid Tower', material: 'Stal/Plastik' },
        specs: { formFactor: 'ATX' }
    },
    {
        type: 'case',
        name: 'Fractal Design Meshify C',
        price: 399,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Meshify+C',
        description: { typ: 'Mid Tower', material: 'Stal/Plastik' },
        specs: { formFactor: 'ATX' }
    },
    {
        type: 'case',
        name: 'Corsair 4000D Airflow',
        price: 449,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Corsair+4000D',
        description: { typ: 'Mid Tower', material: 'Stal/Plastik' },
        specs: { formFactor: 'ATX' }
    },
    {
        type: 'storage',
        name: 'Samsung 970 Evo Plus 1TB NVMe',
        price: 399,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Samsung+1TB',
        description: { pojemnosc: '1TB', typ: 'NVMe', interfejs: 'M.2' },
        specs: { interface: 'M.2' }
    },
    {
        type: 'storage',
        name: 'WD Blue 2TB SATA',
        price: 349,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=WD+2TB',
        description: { pojemnosc: '2TB', typ: 'SATA', interfejs: 'SATA III' },
        specs: { interface: 'SATA' }
    },
    {
        type: 'storage',
        name: 'Crucial P3 1TB NVMe',
        price: 289,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Crucial+1TB',
        description: { pojemnosc: '1TB', typ: 'NVMe', interfejs: 'M.2' },
        specs: { interface: 'M.2' }
    },
    {
        type: 'cpuCooler',
        name: 'be quiet! Pure Rock 2',
        price: 159,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=Pure+Rock+2',
        description: { typ: 'Powietrzny', poziomHałasu: '25dB', kompatybilnosc: 'AM4, LGA1200' },
        specs: { compatibleSockets: ['AM4', 'LGA1200'] }
    },
    {
        type: 'cpuCooler',
        name: 'Noctua NH-U12S',
        price: 239,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=NH-U12S',
        description: { typ: 'Powietrzny', poziomHałasu: '22dB', kompatybilnosc: 'AM4, LGA1200' },
        specs: { compatibleSockets: ['AM4', 'LGA1200'] }
    },
    {
        type: 'cpuCooler',
        name: 'Corsair iCUE H100i',
        price: 599,
        imageUrl: 'https://dummyimage.com/150x150/000/fff&text=iCUE+H100i',
        description: { typ: 'Wodne', poziomHałasu: '20dB', kompatybilnosc: 'AM4, LGA1700' },
        specs: { compatibleSockets: ['AM4', 'LGA1700'] }
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