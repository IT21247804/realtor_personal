import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, Collapse } from "antd";
import { Link as ScrollLink } from "react-scroll";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setSideMenu(false);
    document.body.style.overflow = "auto"; // Ensure scrolling is enabled again
  };

 const servicesMenu = {
  items: [
    {
      key: '1',
      label: (
        <Link to="/services" onClick={handleLinkClick}>
          Our Services
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link 
          to="/services#concierge-service" 
          onClick={handleLinkClick}
        >
          Concierge Services
        </Link>
      ),
    },
  ],
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
        <Link to={"/"} onClick={handleLinkClick}>
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
            <Link to="/add-listing" onClick={handleLinkClick}>
              list with us
            </Link>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "explore-to-buy" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/explore-to-buy" onClick={handleLinkClick}>
              explore to buy
            </Link>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "browse-rentals" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/browse-rentals" onClick={handleLinkClick}>
              browse rentals
            </Link>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "explore-to-buy" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/about" onClick={handleLinkClick}>
              About Us
            </Link>
          </li>
          <li
  className={`mr-8 uppercase tracking-widest hover:text-[#085585] duration-300 ${
    route === "services" ? "text-[#e53030]" : ""
  }`}
>
  <Dropdown menu={servicesMenu}>
    <Space className="cursor-pointer">
      Services
      <DownOutlined />
    </Space>
  </Dropdown>
</li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "explore-to-buy" ? "text-[#e53030]" : ""
            }`}
          >
            <ScrollLink to="contact-us" smooth={true} duration={500}>
              Contact Us
            </ScrollLink>
          </li>
          <li
            className={`mr-8 uppercase tracking-widest hover:underline hover:text-[#085585] duration-300 ${
              route === "explore-to-buy" ? "text-[#e53030]" : ""
            }`}
          >
            <Link to="/blogspage" onClick={handleLinkClick}>
              Blogs
            </Link>
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
          className={`z-40 bg-slate-50 h-screen w-full lg:w-96 absolute flex flex-col items-center justify-center top-0 bottom-0 transition-all ease-in-out duration-500 ${
            sideMenu ? "right-0" : "-right-full lg:-right-96"
          }`}
        >
          <div className="h-28 flex items-center justify-between absolute top-0 z-20 w-full text-slate-900 cursor-pointer p-4">
            <div>
              <Link to={"/"} onClick={handleLinkClick}>
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
                to="/add-listing"
                className="w-full absolute top-1 left-0 right-0"
                onClick={handleLinkClick}
              >
                list with us
              </Link>
            </Menu.Item>

            <Menu.Item
              key="explore-to-buy"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link
                to="/explore-to-buy"
                className="w-full absolute top-1 left-0 right-0"
                onClick={handleLinkClick}
              >
                explore to buy
              </Link>
            </Menu.Item>

            <Menu.Item
              key="browse-rentals"
              className="border-b-2 w-full text-center uppercase tracking-widest py-6 hover:bg-slate-100 transition-all ease-in-out duration-500"
            >
              <Link
                to="/browse-rentals"
                className="w-full absolute top-1 left-0 right-0"
                onClick={handleLinkClick}
              >
                browse rentals
              </Link>
            </Menu.Item>
          </Menu>

          <ul className="flex w-full flex-col items-center justify-center text-sm list-none text-slate-900">
            <li className="lg:border-t-2 w-full text-center uppercase tracking-widest transition-all ease-in-out duration-500 cursor-pointer">
              <Collapse accordion className="w-full">
                <Panel header="buy" key="1" className="uppercase font-normal">
                  <Link to="/properties/house" onClick={handleLinkClick}>
                    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                      house
                    </div>
                  </Link>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    land
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    apartment
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    commercial property
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    villa / bungalow
                  </div>
                </Panel>

                <Panel header="rent" key="2" className="uppercase font-normal">
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    long term
                  </div>
                  <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    short term
                  </div>
                </Panel>

                <Panel
                  header="Services"
                  key="3"
                  className="uppercase font-normal"
                >
                  {location.pathname === "/about" ? (
    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
      <ScrollLink
        to="our-team"
        smooth={true}
        duration={500}
        onClick={handleLinkClick}
      >
        Our Agents
      </ScrollLink>
    </div>
  ) : (
    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
      <Link
        to="/about#our-team"
        onClick={handleLinkClick}
      >
        Our Agents
      </Link>
    </div>
  )}
                 
 

                  {location.pathname === "/services" ? (
                     <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    <ScrollLink
                      to="concierge-service"
                      smooth={true}
                      duration={500}
                      
                    >
                      Concierge service
                    </ScrollLink>
                    </div>
                  ) : (
                    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
                    <Link
                      to="/services#concierge-service"
                      
                    >
                      Concierge service
                    </Link>
                    </div>
                  )}
                </Panel>
                <Panel header="Blogs" key="4" className="uppercase font-normal">
    <Link to="/blogspage" onClick={handleLinkClick}>
      <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
        View All Blogs
      </div>
    </Link>
  </Panel>

  <Panel header="How to List" key="5" className="uppercase font-normal">
    <Link to="/add-listing" onClick={handleLinkClick}>
      <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
        List Your Property
      </div>
    </Link>
  </Panel>

  <Panel header="Contact Us" key="6" className="uppercase font-normal">
    <div className="hover:bg-slate-200 transition-all duration-500 ease-in-out text-xs px-4 py-2 w-full">
      <ScrollLink
        to="contact-us"
        smooth={true}
        duration={500}
        onClick={handleLinkClick}
      >
        Get in Touch
      </ScrollLink>
    </div>
  </Panel>

                {/* <Panel
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
                </Panel> */}
              </Collapse>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
