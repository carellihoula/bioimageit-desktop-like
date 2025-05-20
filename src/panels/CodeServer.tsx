import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CodeServer = () => {
  const [isLoading, setIsLoading] = useState(true); // it's temporary.
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "HEAD",
          mode: "no-cors",
        });
        setIsLoading(false);
        clearInterval(intervalId);
      } catch (error) {
        // Serveur pas encore dispo, on attend la prochaine tentative
      }
    };

    // Vérifier tout de suite puis toutes les 2 secondes
    checkServer();
    const intervalId = setInterval(checkServer, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-4">
          <Spinner color="blue.500" size={"lg"} />
          <div className="flex flex-col items-center">
            <p>Setting up your codespace</p>
            <p>Please wait.</p>
          </div>
        </div>
      ) : (
        <iframe
          id="code-server"
          title="Code Server"
          width="100%"
          height="100%"
          src="http://localhost:3000/"
        ></iframe>
      )}
    </div>
  );
};
