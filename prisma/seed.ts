import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
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
                    {name: 'Telefony i Akcesoria'},
                ]
            }
        },
    }];

    for (const category of categories) {
        const {update, create, where} = category;

        await prisma.category.upsert(category);
    }

    console.log('Categories seeded ✅');
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