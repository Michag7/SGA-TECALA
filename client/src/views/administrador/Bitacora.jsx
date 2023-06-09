import React, { Fragment, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Select,
  Option,
} from "@material-tailwind/react";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { LuFileSpreadsheet } from "react-icons/lu";


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export const Bitacora = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
    <NavbarApp></NavbarApp>
    <Titulo titulo={"Bitacoras"} ></Titulo>
      <div className="flex ">
        <div className="w-60 ml-2 mr-1 my-2 sm:w-auto">
          <Select label="Grado">
            <Option>11°1</Option>
            <Option>Febrero</Option>
            <Option>Marzo</Option>
            <Option>Abril</Option>
            <Option>Mayo</Option>
          </Select>
        </div>

        <div className="w-60 ml-1 my-2 mr-2 sm:w-auto">
          <Select label="Mes">
            <Option>Enero</Option>
            <Option>Febrero</Option>
            <Option>Marzo</Option>
            <Option>Abril</Option>
            <Option>Junio</Option>
          </Select>
        </div>
      </div>

      <section className="p-4 lg:m-4 rounded-2xl">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            SEMANA 1 - JUNIO
          </AccordionHeader>
          <AccordionBody>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1  hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1 hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            SEMANA 2 - JUNIO
          </AccordionHeader>
          <AccordionBody>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1  hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1 hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            SEMANA 3 - JUNIO
          </AccordionHeader>
          <AccordionBody>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1  hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1 hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            SEMANA 4 - JUNIO
          </AccordionHeader>
          <AccordionBody>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1  hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
            <div className="flex items-center border-2 border-solid rounded-md bg-white py-3 my-1 hover:bg-blue-500 hover:text-white ">
              <LuFileSpreadsheet size={25} className="mx-3" />
              Bitacora #1
            </div>
          </AccordionBody>
        </Accordion>
      </section>
    </>
  );
};
