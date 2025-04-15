export const MyPanelContent = ({
  minimized,
  children,
}: {
  minimized: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        height: minimized ? "30px" : "100%", // ou toute autre valeur pour simuler une minimisation
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
