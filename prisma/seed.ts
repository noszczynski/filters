import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function seedCategories() {
    const categories: (Parameters<typeof prisma.category.upsert>[0])[] = [{
        where: {name: 'Elektronika'},
        update: {},
        create: {
            name: 'Elektronika',
            children: {
                create: [
                    {name: 'Fotografia'},
                    {name: 'Komputery'},
                    {name: 'Konsole i automaty'},
                    {name: 'RTV i AGD'},
                    {
                        name: 'Telefony i Akcesoria', children: {
                            create: [
                                {name: "Akcesoria GSM"},
                                {name: "Karty pamięci"},
                                {name: "Powerbanki"},
                                {name: "Pre-paid"},
                                {name: "Radiokomunikacja"},
                                {
                                    name: "Smartfony i telefony komórkowe", children: {
                                        create: [
                                            {name: "Alcatel"},
                                            {name: "Allview"},
                                            {name: "Apple"},
                                            {name: "Archos"},
                                            {name: "Asus"},
                                            {name: "BlackBerry"},
                                            {name: "Blackview"},
                                            {name: "Cat Phones"},
                                            {name: "Cubot"},
                                            {name: "DooGee"},
                                            {name: "Google"},
                                            {name: "Hammer"},
                                            {name: "Honor"},
                                            {name: "HOTWAV"},
                                            {name: "HTC"},
                                            {name: "Huawei"},
                                            {name: "Infinix"},
                                            {name: "Kruger&Matz"},
                                            {name: "Lenovo"},
                                            {name: "LG"},
                                            {name: "Manta"},
                                            {name: "Maxcom"},
                                            {name: "Meizu"},
                                            {name: "Microsoft"},
                                            {name: "Motorola"},
                                            {name: "myPhone"},
                                            {name: "Nokia"},
                                            {name: "Nothing"},
                                            {name: "OnePlus"},
                                            {name: "Oppo"},
                                            {name: "Oukitel"},
                                            {name: "Panasonic"},
                                            {name: "POCO"},
                                            {name: "realme"},
                                            {name: "Samsung"},
                                            {name: "Sony"},
                                            {name: "Sony Ericsson"},
                                            {name: "Tecno"},
                                            {name: "TCL"},
                                            {name: "TP-Link"},
                                            {name: "Ulefone"},
                                            {name: "UMI"},
                                            {name: "Vivo"},
                                            {name: "Wiko"},
                                            {name: "Xiaomi"},
                                            {name: "ZTE"},
                                            {name: "Inne marki"},
                                        ]
                                    }
                                },
                                {name: "Smartwatche i akcesoria"},
                                {name: "Urządzenia stacjonarne"},
                                {name: "Złote numery"},
                                {name: "Pozostałe"},
                            ]
                        }
                    },
                ]
            }
        },
    }];

    for (const category of categories) {
        await prisma.category.upsert(category);
    }

    console.log('Categories seeded ✅');
}

async function seedProducts() {
    // const products: (Parameters<typeof prisma.product.upsert>[0])[] = [{
    //     where: {name: 'iPhone 13'},
    //     update: {},
    //     create: {
    //         name: 'iPhone 13',
    //         children: {
    //             create: [
    //                 {name: 'Fotografia'},
    //                 {name: 'Komputery'},
    //                 {name: 'Konsole i automaty'},
    //                 {name: 'RTV i AGD'},
    //                 {
    //                     name: 'Telefony i Akcesoria', children: {}
    //                 },
    //             ]
    //         }
    //     },
    // }];
    //
    // for (const product of products) {
    //     await prisma.product.upsert(product);
    // }

    console.log('Products seeded ✅');
}

async function main() {
    await seedCategories();
    await seedProducts();
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })