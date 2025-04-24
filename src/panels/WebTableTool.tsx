export const WebTableTool = () => {
  return (
    <div className="w-full h-full">
      <iframe
        id="code-server"
        title="Code Server"
        width="100%"
        height="100%"
        src="http://localhost:8000/react"
      ></iframe>
    </div>
  );
};
