import { Toaster } from "react-hot-toast";
const ToasterProvider = ({ children }) => {
  return (
    <>
      <Toaster position={"bottom-right"} reverseOrder={false} />
      {children}
    </>
  );
};

export default ToasterProvider;
