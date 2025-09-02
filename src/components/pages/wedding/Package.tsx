import React from "react";

const datas = [
  {
    title: "BLISFUL WEDDING",
    price: "IDR 68.000.000++",
    guest: "50 guests",
    inclusion: [
      "Preparation Room Bale Kembar Bridal Suite.",
      "Exclusive Wedding Reception Venue at Jendela Bali or Indraloka Garden",
      "Wedding Decor includes: Wedding Back-drop, Bridal Table with Centerpiece for 6 pax, Entrance Gate, 6 Standing Flowers & Photo Gallery Table.",
      "GWK’s Signature Welcome Drink for every Guest.",
      "Choice of buffet menu for 50 guests.",
      "Selection of Indonesian, Asian or International Buffet Menu.",
    ],
  },

  {
    title: "ICONIC WEDDING",
    price: "IDR 168.000.000 ++",
    guest: "100 guests",
    inclusion: [
      "Preparation Room Bale Kembar Bridal Suite.",
      "Exclusive Wedding Reception Venue at Plaza Wisnu",
      "Wedding Decor includes: Wedding Back-drop, Bridal Table with Centerpiece for 6 pax, Entrance Gate, 8 Standing Flowers & Photo Gallery Table, Fairy Light.",
      "GWK's Signature Welcome Drink for every Guest.",
      "Choice of buffet menu for 100 guests.",
      "Selection of Indonesian, Asian or International Buffet Menu.",
    ],
  },

  {
    title: "CEREMONY WEDDING",
    price: "IDR 9.680.000 ++",
    guest: "2 persons",
    inclusion: [
      "Preparation Room Bale Kembar Bridal Suite for 4 hours.",
      "Matrimony with choice of venue for 2 hours: Jendela Bali Sky Deck/Selasar/Bale Kembar Garden.",
      "Ultimate Ticket GWK Cultural Park.",
      "GWK's Signature Welcome Drink (Happy Day’s Secret).",
      "Exclusive Dinner for 2 persons at Jendela Bali 7-10 PM.",
      "Set Menu Deluxe: Indonesian/International/Vegetarian.",
    ],
  },

  {
    title: "cUSTOM WEDDING",
    price: "Start from IDR 300.000 ++",
    guest: "2 persons",
    inclusion: [
      "Entrance Ticket to GWK's Cultural Park.",
      "Minimum starting 30 guests.",
      "Selection of Indonesian, Asian or International Buffet Menu.",
      "Standard set-up Round Table Including Centerpiece with Chairs.",
      "Free Parking VIP Jendela Bali Resto 3 Cars.",
      "Choice of venue Jendela Bali Restaurant, Indraloka Garden or Plaza Wisnu.",
    ],
  },
];

const Package = () => {
  return (
    <section className="w-full pt-84 md:landscape:px-80 px-20">
      <div className="w-full">
        <div className="w-full flex flex-col items-center">
          <div className="split font-perfectly-vintage text-41 text-[#292524]">
            Packages
          </div>
          <div className="split font-inter text-17d font-light mt-15 md:landscape:w-631 text-center text-[#737373]">
            Discover flexible wedding packages tailored to your needs, offering
            unforgettable moments with exceptional value to suit every style and
            budget.
          </div>
        </div>

        <div className="w-full grid md:landscape:grid-cols-4 gap-x-15 mt-37 gap-y-25">
          {datas.map((data, index) => (
            <div
              className="w-full p-25 border border-[#E2E8F0] rounded-10d min-h-669"
              key={index}
            >
              <div className="split font-inter text-14d text-[#62748E]">
                {data.title}
              </div>

              <div className="split font-inter text-20d mt-36 text-[#1C1917]">
                {data.price}
              </div>

              <div className="split mt-10 font-inter text-14d text-[#1C1917]">
                {data.guest}
              </div>

              <div className="split font-inter text-14d font-medium text-[#1C1917] mt-36">
                Inclusion :
              </div>

              <div className="mt-15">
                {data.inclusion.map((item, index) => (
                  <div
                    className="split text-14d font-inter text-[#1C1917] pb-10 border-b border-[#E2E8F0] mb-10"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="reveal w-full h-37 flex justify-center items-center border border-[#E2E8F0] rounded-10d mt-36">
                SEE DETAILS
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-239 mt-80 flex flex-col items-center justify-center rounded-15d border border-[#E2E8F0]">
        <div className="split font-inter font-light text-21d etxt-[#1C1917]">
          Connect With Us to Get Extraordinary Offer
        </div>

        <div className=" reveal flex items-center gap-x-8 mt-47">
          <div className="font-inter text-14d text-[#1C1917]">
            +62896-1059-5452
          </div>
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9031 3.03437C10.5938 1.72187 8.85 1 6.99687 1C3.17187 1 0.059375 4.1125 0.059375 7.9375C0.059375 9.15938 0.378125 10.3531 0.984375 11.4062L0 15L3.67812 14.0344C4.69063 14.5875 5.83125 14.8781 6.99375 14.8781H6.99687C10.8188 14.8781 14 11.7656 14 7.94063C14 6.0875 13.2125 4.34687 11.9031 3.03437ZM6.99687 13.7094C5.95937 13.7094 4.94375 13.4312 4.05937 12.9062L3.85 12.7812L1.66875 13.3531L2.25 11.225L2.1125 11.0063C1.53437 10.0875 1.23125 9.02812 1.23125 7.9375C1.23125 4.75938 3.81875 2.17188 7 2.17188C8.54062 2.17188 9.9875 2.77187 11.075 3.8625C12.1625 4.95312 12.8313 6.4 12.8281 7.94063C12.8281 11.1219 10.175 13.7094 6.99687 13.7094ZM10.1594 9.39062C9.9875 9.30313 9.13438 8.88438 8.975 8.82812C8.81563 8.76875 8.7 8.74062 8.58438 8.91562C8.46875 9.09062 8.1375 9.47813 8.03438 9.59688C7.93438 9.7125 7.83125 9.72812 7.65938 9.64062C6.64062 9.13125 5.97188 8.73125 5.3 7.57812C5.12188 7.27187 5.47812 7.29375 5.80937 6.63125C5.86562 6.51562 5.8375 6.41563 5.79375 6.32812C5.75 6.24062 5.40313 5.3875 5.25938 5.04063C5.11875 4.70312 4.975 4.75 4.86875 4.74375C4.76875 4.7375 4.65312 4.7375 4.5375 4.7375C4.42188 4.7375 4.23438 4.78125 4.075 4.95312C3.91562 5.12813 3.46875 5.54688 3.46875 6.4C3.46875 7.25313 4.09063 8.07813 4.175 8.19375C4.2625 8.30938 5.39687 10.0594 7.1375 10.8125C8.2375 11.2875 8.66875 11.3281 9.21875 11.2469C9.55313 11.1969 10.2437 10.8281 10.3875 10.4219C10.5312 10.0156 10.5312 9.66875 10.4875 9.59688C10.4469 9.51875 10.3313 9.475 10.1594 9.39062Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="reveal flex items-center gap-x-8 mt-16">
          <div className=" font-inter text-14d text-[#1C1917]">
            bookmywedding@gwkbali.com
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6668 4.00008C14.6668 3.26675 14.0668 2.66675 13.3335 2.66675H2.66683C1.9335 2.66675 1.3335 3.26675 1.3335 4.00008V12.0001C1.3335 12.7334 1.9335 13.3334 2.66683 13.3334H13.3335C14.0668 13.3334 14.6668 12.7334 14.6668 12.0001V4.00008ZM13.3335 4.00008L8.00016 7.33342L2.66683 4.00008H13.3335ZM13.3335 12.0001H2.66683V5.33341L8.00016 8.66675L13.3335 5.33341V12.0001Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Package;
