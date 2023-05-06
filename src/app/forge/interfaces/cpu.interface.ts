export interface CpuInterface {
    "boost_clock": string,
    "core_clock": string,
    "core_count": string,
    "integrated_graphics": string | null,
    "name": string,
    "price_usd": number,
    "rating": number,
    "rating_count": number,
    "smt": boolean,
    "tdp": string

}

/*{
    "boost_clock": "4.2 GHz",
    "core_clock": "3.6 GHz",
    "core_count": "6",
    "integrated_graphics": null,
    "name": "AMD Ryzen 5 3600",
    "price_usd": 245.99,
    "rating": 4,
    "rating_count": 1025,
    "smt": true,
    "tdp": "65 W"
  },*/