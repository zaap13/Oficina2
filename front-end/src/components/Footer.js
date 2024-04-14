import Layout from "./Layout.js";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-blue-500 font-medium text-lg text-blue-900 bg-white">
      <Layout className="py-8 flex items-center justify-between">
        <span>{new Date().getFullYear()} &copy; Todos os Direitos Reservados.</span>
      </Layout>
    </footer>
  );
};

export default Footer;
