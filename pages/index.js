import Image from 'next/image';
import vmis from '/public/images/vmislogin.png';
import Layout from "../components/Layout";

const IndexPage = () => {
  const metaInfo = {
    title: "Catherine's Junkshop",
    description: "A web-based system designed to streamline the management of vehicles within an organization.",
    url: "https://vmis-production-6cc4.up.railway.app",
    image: "../public/images/og.png"
  };

  return (
    <Layout metaInfo={metaInfo}>
      <section className="h-screen w-screen relative bg-[url('/images/bg.gif')] bg-cover bg-center bg-no-repeat overflow-hidden">

        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/90 sm:to-white/25"></div>

        <div className="relative flex items-start justify-start h-full w-full px-8 pt-12">
          <div className="max-w-2xl text-left">
            <div className="mb-6">
              <Image
                src={vmis}
                alt="VMIS Logo"
                width={150}
                height={150}
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight">
              Catherines Junkshop System (CJSys)
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-800">
              Catherines Junkshop System (CJSys) is a web-based system designed to streamline the management of updates within an organization.
            </p>

            {/*<div className="mt-6 flex flex-wrap gap-4 text-center sm:justify-start">
              <a
                href="list_trip_ticket"
                className="block w-full rounded bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="reports"
                className="block w-full rounded bg-white px-8 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              >
                View Reports
              </a>
            </div>*/}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
