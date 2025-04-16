// import { Button, Menu, Portal } from "@chakra-ui/react";
// import { useState } from "react";

// type MainMenuItem = {
//   label: string;
//   items: string[];
// };

// const mainMenus: MainMenuItem[] = [
//   { label: "File", items: ["New File", "Open", "Save", "Close"] },
//   { label: "Tools", items: ["Settings", "Extensions"] },
//   { label: "Help", items: ["About", "Documentation"] },
// ];

/**
 * MainMenuBar component to display a menu bar with main menus.
 * Each menu can have multiple items.
 * the user simply hovers over the menu to see the items.
 */

// export const MainMenuBar = () => {
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   let closeTimeout: NodeJS.Timeout;

//   const handleMouseEnter = (label: string) => {
//     clearTimeout(closeTimeout);
//     setOpenMenu(label);
//   };

//   const handleMouseLeave = () => {
//     closeTimeout = setTimeout(() => {
//       setOpenMenu(null);
//     }, 200); // petit délai pour éviter clignotement
//   };

//   return (
//     <div style={{ display: "flex", gap: "8px" }}>
//       {mainMenus.map((menu) => (
//         <div
//           key={menu.label}
//           onMouseEnter={() => handleMouseEnter(menu.label)}
//           onMouseLeave={handleMouseLeave}
//         >
//           <Menu.Root
//             open={openMenu === menu.label}
//             onOpenChange={(isOpen) => {
//               if (!isOpen) setOpenMenu(null);
//             }}
//           >
//             <Menu.Trigger asChild>
//               <Button variant="outline" size="sm">
//                 {menu.label}
//               </Button>
//             </Menu.Trigger>
//             <Portal>
//               <Menu.Positioner>
//                 <Menu.Content>
//                   {menu.items.map((item) => (
//                     <Menu.Item
//                       key={item}
//                       value={item.toLowerCase().replace(/\s+/g, "-")}
//                     >
//                       {item}
//                     </Menu.Item>
//                   ))}
//                 </Menu.Content>
//               </Menu.Positioner>
//             </Portal>
//           </Menu.Root>
//         </div>
//       ))}
//     </div>
//   );
// };

import { Button, Menu, Portal } from "@chakra-ui/react";

type MainMenuItem = {
  label: string;
  items: string[];
};

const mainMenus: MainMenuItem[] = [
  { label: "File", items: ["New File", "Open", "Save", "Close"] },
  { label: "Tools", items: ["Settings", "Extensions"] },
  { label: "Help", items: ["About", "Documentation"] },
];

/**
 * MainMenuBar component to display a menu bar with main menus.
 * Each menu can have multiple items.
 * the user must click on the menu to view the items.
 */

export const MainMenuBar = () => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {mainMenus.map((menu) => (
        <Menu.Root key={menu.label}>
          <Menu.Trigger asChild>
            <Button
              variant="outline"
              size="sm"
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "none" }}
            >
              {menu.label}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {menu.items.map((item) => (
                  <Menu.Item
                    key={item}
                    value={item.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {item}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ))}
    </div>
  );
};
