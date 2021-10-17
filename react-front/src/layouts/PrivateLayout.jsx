import Sidebar from 'components/Sidebar'

const PrivateLayout = ({ children }) => {
  return (
    <>
      <main>
        <Sidebar />
        <div className="b-example-divider"></div>
        <>{children}</>
      </main>
    </>
  );
};

export default PrivateLayout;