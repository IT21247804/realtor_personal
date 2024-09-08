import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, Collapse } from "antd";

const Navbar = () => {
  const { Panel } = Collapse;

  const [scrolled, setScrolled] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openSideMenu = () => {
    setSideMenu(true);
  };

  const closeSideMenu = () => {
    setSideMenu(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      if (!menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  };

  const location = useLocation();
  const pathname = location.pathname;
  const route = pathname.split("/")[1];

  return (
    <div
      className={
        "z-40 w-full transition-all duration-500 ease-in-out static top-0 left-0 right-0 flex items-center justify-between p-5 h-28 bg-white text-black shadow-md"
      }
    >
      <div>
        <Link to={"/"}>
          <img
            src={"/images/logo-primary.png"}
            alt={"logo-primary"}
            className={`h-10 w-auto`}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ul className={"hidden lg:flex list-none font-medium"}>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "add-listing" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/add-listing">list with us</Link>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "explore-to-buy" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/explore-to-buy">explore to buy</Link>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "browse-rentals" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/browse-rentals">browse rentals</Link>
          </li>
        </ul>
        <MenuOutlined
          className={"cursor-pointer"}
          onClick={() => {
            openSideMenu();
            toggleMenu();
          }}
        />
      </div>

      {menuOpen && (
        <div
          className={`
                    z-40 bg-slate-50 h-screen w-full lg:w-96 absolute flex flex-col items-center justify-center top-0 bottom-0 transition-all ease-in-out duration-500
                    ${sideMenu ? "right-0" : "-right-full lg:-right-96"}
                `}
        >
          <div className="h-28 flex items-center justify-between absolute top-0 z-20 w-full text-slate-900 cursor-pointer p-4">
            <div>
              <Link to={"/"}>
                <img
                  src={"/images/logo-primary.png"}
                  alt={"logo-primary"}
                  className={`h-10 w-auto`}
                />
              </Link>
            </div>
            <CloseOutlined onClick={closeSideMenu} />
          </div>
          <Menu
            mode="vertical"
            className="flex w-full flex-col items-center justify-center text-sm lg:hidden list-none text-slate-900 bg-slate-50"
          >
            <Menu.Item
              key="list-with-us"
              className="border-b-2 border-t-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link
                href="/add-listing"
                className="w-full absolute top-1 left-0 right-0"
              >
                list with us
              </Link>
            </Menu.Item>

            <Menu.Item
              key="explore-to-buy"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                explore to buy
              </Link>
            </Menu.Item>

            <Menu.Item
              key="browse-rentals"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                browse rentals
              </Link>
            </Menu.Item>

            <Menu.Item
              key="find-your-dream-stay"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                find your dream stay
              </Link>
            </Menu.Item>
          </Menu>

          <ul className="flex w-full flex-col items-center justify-center text-sm list-none text-slate-900">
            <li className="lg:border-t-2 w-full text-center uppercase tracking-widest transition-all ease-in-out duration-500 cursor-pointer">
              <Collapse accordion className="w-full">
                {/* Buy Section */}
                <Panel header="buy" key="1" className="uppercase font-normal">
                  <Link href="/properties/house">
                    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                      {" "}
                      house
                    </div>
                  </Link>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    land
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    apartment
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    commercial property
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    villa / bungalow
                  </div>
                </Panel>

                {/* Rent Section */}
                <Panel header="rent" key="2" className="uppercase font-normal">
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    long term
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    {" "}
                    short term
                  </div>
                </Panel>

                {/* Book / Reserve Section */}
                <Panel
                  header="book / reserve"
                  key="3"
                  className="uppercase font-normal"
                >
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    hotels
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    rooms
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    cabanas
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    villas
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    apartments
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    restaurants
                  </div>
                </Panel>
              </Collapse>
            </li>
          </ul>

          <Menu
            mode="vertical"
            className="w-full text-center text-slate-900 bg-slate-50"
            style={{ border: "none" }}
          >
            <Menu.Item
              key="5"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link
                href="/add-listing"
                className="w-full absolute top-1 left-0 right-0"
              >
                services
              </Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                investor portal
              </Link>
            </Menu.Item>
            <Menu.Item
              key="7"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                why us?
              </Link>
            </Menu.Item>
            <Menu.Item
              key="8"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link href="/" className="w-full absolute top-1 left-0 right-0">
                contact for expert advice
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
