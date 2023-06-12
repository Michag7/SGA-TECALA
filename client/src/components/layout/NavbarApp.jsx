import React from "react";

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { getImagenP, getUser, logout } from "../../auth/auth";

import { useNavigate } from "react-router";

// profile menu component
const profileMenuItems = [
  {
    label: "Mi Perfil",
    icon: UserCircleIcon,
  },
  {
    label: "Editar Perfil",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

export const NavbarApp = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const imagenPerfil = getImagenP();

  const Logout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className="flex items-center p-1 pl-14 lg:pl-4">
        {/* <h1 className="text-2xl font-bold">ff</h1> */}

        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex  items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5  ml-auto"
          >
            <Avatar
              variant="circular"
              size="md"
              alt="Imagen de perfil"
              className="border border-blue-900 p-0.5 "
              src={`data:image/png;base64,${imagenPerfil}`}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      </div>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={isLastItem ? Logout : closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
