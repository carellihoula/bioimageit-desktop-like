import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CodeServer = () => {
  const [status, setStatus] = useState("idle");
  console.log("status: ", status);
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.pywebview?.api?.getStatus) {
        window.pywebview.api.getStatus().then(setStatus);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      {status === "starting" ? (
        <div className="flex flex-col h-full items-center justify-center gap-4">
          <Spinner color="blue.500" size={"lg"} />
          <div className="flex flex-col items-center">
            <p>Setting up your codespace</p>
            <p>Please wait.</p>
          </div>
        </div>
      ) : status === "ready" ? (
        <iframe
          id="code-server"
          title="Code Server"
          width="100%"
          height="100%"
          src="http://localhost:3000/"
        ></iframe>
      ) : (
        <p style={{ color: "red" }}>{status}</p>
      )}
    </div>
  );
};
