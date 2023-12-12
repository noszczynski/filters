import Link from "next/link";

import { prisma } from "@/api/prisma";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function SingleSKUPage({
  params,
}: {
  params: { sku: number };
}) {
  const product = await prisma.product.findFirst({
    where: {
      sku: Number(params.sku),
    },
  });

  const productFeatures = await prisma.productFeature.findMany({
    where: {
      productId: product?.id,
    },
    select: {
      id: true,
      feature: true,
      ProductFeatureValue: {
        select: {
          value: true,
          productFeature: true,
        },
      },
    },
  });

  console.log({ product });

  if (!product) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto container py-12 px-4">
        <div>
          <div className="px-4 2xl:container 2xl:mx-auto flex-col md:flex-row  md:px-6 2xl:px-20 flex justify-center items-stretch ">
            <div className=" flex xl:justify-between items-stretch flex-col md:w-2/3 lg:w-full ">
              <img
                alt="jacket"
                className="md:border-r lg:border-r-0 md:border-b lg:border-b-0 border-gray-200"
                src={product.image}
              />
              <div className="flex pb-12 md:flex lg:hidden justify-start items-start flex-col w-full">
                <div className="mt-8 xl:mt-10 flex jusitfy-start items-center space-x-4">
                  <p className="text-lg font-medium leading-none text-gray-800">
                    Share :{" "}
                  </p>
                  <button
                    aria-label="facebook"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="facebook"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg3.svg"
                    />
                  </button>
                  <button
                    aria-label="twitter"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="twitter"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg4.svg"
                    />
                  </button>
                  <button
                    aria-label="instagram"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="instagram"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg5.svg"
                    />
                  </button>
                </div>
                <div className="mt-8 md:mt-10 xl:mt-12 w-full flex justify-between pb-4 border-b border-gray-200 items-center">
                  <p className="text-base font-medium leading-none text-gray-800">
                    Details
                  </p>
                  <button>
                    <img
                      alt="add"
                      className="w-6"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg2.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:border-l border-gray-200 md:w-2/3 mt-7 md:mt-0 flex  md:px-6 xl:px-8  2xl:justify-between items-start flex-col md:py-12">
              <div className="flex w-full justify-between items-center">
                <p className="text-xl xl:text-2xl font-medium leading-5 xl:leading-normal text-gray-800">
                  {product.name}
                </p>
                <div className="w-20 h-9 text-base flex items-center justify-center leading-none text-gray-800 bg-yellow-100 rounded-full text-center">
                  Sale
                </div>
              </div>
              <div className="flex w-full justify-between items-center mt-6 xl:mt-8">
                <div className="flex justify-start items-center space-x-6">
                  <p className="text-xl leading-5 text-center text-gray-800">
                    {Intl.NumberFormat("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    }).format(product.price / 100)}
                  </p>
                  {/*<p className="text-xl leading-5 line-through text-center text-gray-400">$500.00</p>*/}
                </div>
              </div>
              <div className="xl:mt-10 mt-6 flex justify-center items-center w-full xl:flex-row flex-col space-y-4 xl:space-y-0 xl:space-x-8">
                <button className="w-full flex text-base leading-none bg-gray-800 transition duration-400 ease-in-out text-white hover:bg-gray-700 focus:text-gray-900 py-3 xl:py-4 justify-center items-center border rounded-full border-gray-800">
                  Add to cart
                </button>
              </div>
              <p className="text-base leading-normal text-gray-600 mt-6 xl:mt-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab id
                ipsam labore rem? Ab, consequatur dolores ea quasi recusandae
                reprehenderit!
              </p>
              <div className=" lg:flex pb-12 md:hidden justify-start items-start flex-col w-full">
                <div className="mt-8 xl:mt-10 flex jusitfy-start items-center space-x-4">
                  <p className="text-lg font-medium leading-none text-gray-800">
                    Share :{" "}
                  </p>
                  <button
                    aria-label="facebook"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="facebook"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg3.svg"
                    />
                  </button>
                  <button
                    aria-label="twitter"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="twitter"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg4.svg"
                    />
                  </button>
                  <button
                    aria-label="instagram"
                    className="w-6 hover:-translate-y-0.5 transition duration-400 ease-in-out "
                  >
                    <img
                      alt="instagram"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/product_detail_svg5.svg"
                    />
                  </button>
                </div>
                <div className="mt-8">
                  <Table>
                    <TableCaption>A list of features.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nazwa</TableHead>
                        <TableHead>Wartość</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productFeatures.map((feature, _) => (
                        <TableRow key={feature.id}>
                          <TableCell className="font-medium">
                            <Link href={`/features/${feature.id}`}>
                              {feature.feature.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <ul>
                              {feature.ProductFeatureValue.map(
                                (productFeatureValue) => (
                                  <li
                                    key={`${feature.id}-${productFeatureValue.value}`}
                                  >
                                    {productFeatureValue.value}
                                  </li>
                                ),
                              )}
                            </ul>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
