import {prisma} from "@/api/prisma";
import {Filters} from "@/components/Filters";

export default async function StorePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="mx-auto container py-12 px-4">
                <A/>
                <B/>
                <C/>
            </div>
        </main>
    )
}

async function A() {
    return (
        <div className="flex flex-col w-full">
            <Filters data={{
                colors: [
                    {
                        value: "Graphite",
                        label: "Graphite",
                    },
                    {
                        value: "Green",
                        label: "Green",
                    },
                    {
                        value: "Gold",
                        label: "Gold",
                    },
                ],
            }}/>
            <h1 className="text-4xl font-semibold leading-9 text-gray-800 mt-12">Smartphones</h1>
        </div>
    )
}

async function B() {
    const products = await prisma.product.findMany();

    return (
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {products.map((product) => <button key={product.id}
                                               className="hover:scale-[0.99] transition-transform relative border rounded-2xl pt-16 pb-24 px-16 flex justify-center items-center">
                <img src={product.image}/>
                <button className="cursor-pointer hover:opacity-75 bg-white rounded-full p-3.5 absolute top-4 right-4">
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z"
                            stroke="#6B7280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75"
                            stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className="flex flex-col absolute bottom-4 left-4 w-full pr-8">
                    <p className="text-base leading-none text-gray-600 text-start">{product.name}</p>
                    <div className="flex justify-between mt-2">
                        <div>
                            <p className="text-base font-semibold leading-none text-gray-800">{Intl.NumberFormat("pl-PL", {
                                style: 'currency',
                                currency: 'PLN',
                            }).format(product.price / 100)}</p>
                        </div>
                    </div>
                </div>
            </button>)}
        </div>
    )
}

function C() {
    return (
        <div className="flex justify-end mt-10">
            <div className="flex flex-row items-center justify-center space-x-4">
                <button
                    className="text-base font-medium focus:font-semibold leading-none text-gray-600 focus:text-gray-800">
                    <p>1</p>
                </button>
                <button
                    className="text-base font-medium focus:font-semibold leading-none text-gray-600 focus:text-gray-800">
                    <p>2</p>
                </button>
                <button
                    className="text-base font-medium focus:font-semibold leading-none text-gray-600 focus:text-gray-800">
                    <p>3</p>
                </button>
                <button className="flex justify-center items-center">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}