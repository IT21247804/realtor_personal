const ContactUs = () => {
  return (
    <div
      className={"bg-[#272c63] text-[#e9ecee] p-4 md:9-8 lg:p-12 "}
      id={"contact"}
    >
      <div className={"grid grid-cols-1 lg:grid-cols-2 mb-6"}>
        <div>
          <h1
            className={
              "uppercase font-medium text-sm md:text-md tracking-widest mb-4"
            }
          >
            contact us
          </h1>
          <p className={"text-xs md:text-sm mb-2"}>
            inquiries - <span>list@therealrealtor.lk</span>
          </p>
          <p className={"text-xs md:text-sm mb-2"}>
            List with us - <span>list@therealrealtor.lk</span>
          </p>
          <p className={"text-xs md:text-sm capitalize mb-2"}>
            18/3, 1st Cross Street
          </p>
          <p className={"text-xs md:text-sm capitalize mb-2"}>Pagoda Rd,</p>
          <p className={"text-xs md:text-sm capitalize mb-2"}>Nugegoda.</p>
          <p className={"text-xs md:text-sm capitalize mb-2"}>
            +94 77 88 18 464
          </p>
          <p className={"text-xs md:text-sm capitalize mb-2"}>
            +94 72 88 18 464
          </p>
        </div>
        <div>
          <h1
            className={
              "uppercase font-medium text-sm md:text-md tracking-widest mb-4"
            }
          >
            site map
          </h1>
          <div className={"flex flex-col md:flex-row items-start gap-16"}>
            <div>
              <a href="/add-listing">
                <p
                  className={
                    "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                  }
                >
                  list with us
                </p>
              </a>
              <a href="/explore-to-buy">
                <p
                  className={
                    "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                  }
                >
                  explore to buy
                </p>
              </a>
              <a href="/browse-rentals">
                <p
                  className={
                    "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                  }
                >
                  browse rentals
                </p>
              </a>
              {/* <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                find your dream stay
              </p> */}
              <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                buy
              </p>
              <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                rent
              </p>
              {/* <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                book / reserve
              </p> */}
            </div>
            <div>
              <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                privacy policy
              </p>
              <p
                className={
                  "text-xs md:text-sm capitalize mb-2 cursor-pointer hover:underline"
                }
              >
                terms of use
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "flex flex-col md:flex-row items-center justify-between border-t-[1px] pt-4"
        }
      >
        <p className={"text-xs md:text-sm"}>
          Website Designed and Developed by <span>Gravity Colombo</span>
        </p>
        <p className={"text-xs md:text-sm"}>
          © Copyright {new Date().getFullYear()} | Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
