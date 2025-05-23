import Head from "next/head";
import Navbar from "./Navbar";

const Layout = (props) => {
  const {
    title,
    metaKeywords,
    metaDesc,
    url,
    image,
  } = props.metaInfo;

  const siteName = "Catherine's Junkshop"; // Site name for dynamic title
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <>
      <Head>
        {/* Basic Meta */}
        <title>{fullTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={metaKeywords} />

        {/* Open Graph Meta */}
        {url && <meta property="og:url" content={url} />}
        {fullTitle && <meta property="og:title" content={fullTitle} />}
        {metaDesc && <meta property="og:description" content={metaDesc} />}
        {image && <meta property="og:image" content={image} />}

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        {url && <meta property="twitter:url" content={url} />}
        {fullTitle && <meta name="twitter:title" content={fullTitle} />}
        {metaDesc && <meta name="twitter:description" content={metaDesc} />}
        {image && <meta name="twitter:image" content={image} />}
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <div id="content" className="flex-grow w-full shadow rounded bg-white">
          {props.children}
        </div>
        <footer className="w-full text-center border-t bg-blue-700 text-white p-4 pin-b print:hidden">
        <span className="lg:text-xl">&copy; CJSys {new Date().getFullYear()}</span>
        </footer>
      </div>
    </>
  );
};

Layout.defaultProps = {
  metaInfo: {
    title: "CJSys",
    metaKeywords: "Catherines Junkshop Claver, Catherines Junkshop, Claver, Surigao del Norte",
    metaDesc: "Catherines Junkshop (CJSys) is a web-based system designed to streamline the management of vehicles within an organization.",
    url: "https://vmis-production-6cc4.up.railway.app", // Your domain stays
    image: "/public/images/og.png", // <-- only relative path here ✅
  },
};

export default Layout;
