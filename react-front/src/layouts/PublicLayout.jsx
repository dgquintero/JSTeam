import Sidebar2 from 'components/Sidebar2'

const PublicLayout = ({ children }) => {
  return (
    <>
      <main>
        <Sidebar2 />
        <div className="b-example-divider"></div>
        <>{children}</>
      </main>
    </>
  );
};

export default PublicLayout;