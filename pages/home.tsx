import { signIn, signOut, useSession } from "next-auth/react";

import AppBar from '../components/ResponsiveAppBar'
import Card from "../components/Card";
import type { GetServerSidePropsContext } from "next"
import Head from "next/head";
import LoginButton from "../components/loginButton";
import StockCardContainer from '../components/StockCardContainer'
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

const stocks = [
    {
        "sId": 4012,
        "sn": "Adani Wilmar Ltd.",
        "sc": "AWL",
        "in": "Personal Products",
        "mc": 5.3286822805E11,
        "cp": 409.94,
        "pchg": -0.98,
        "52h": 841.7,
        "52l": 327.25,
        "lt": {
            "value": "30/06/2023 15:59:17"
        }
    },
    {
        "sId": 88,
        "sn": "Aditya Birla Capital Ltd.",
        "sc": "ABCAPITAL",
        "in": "Finance & Investments",
        "mc": 4.88960240776E11,
        "cp": 196.3,
        "pchg": 1.44,
        "52h": 196.9,
        "52l": 88.0,
        "lt": {
            "value": "30/06/2023 15:59:47"
        }
    },
    {
        "sId": 1913,
        "sn": "Aditya Birla Fashion and Retail Ltd.",
        "sc": "ABFRL",
        "in": "Retailing",
        "mc": 2.02101113547E11,
        "cp": 212.94,
        "pchg": -0.23,
        "52h": 359.5,
        "52l": 184.4,
        "lt": {
            "value": "30/06/2023 15:59:18"
        }
    },
    {
        "sId": 2688,
        "sn": "Aditya Birla Money Ltd.",
        "sc": "BIRLAMONEY",
        "in": "Restaurants & Bars",
        "mc": 3.277533658E9,
        "cp": 57.89,
        "pchg": 1.13,
        "52h": 68.0,
        "52l": 42.64,
        "lt": {
            "value": "30/06/2023 15:52:00"
        }
    },
    {
        "sId": 3898,
        "sn": "Aditya Birla Sun Life AMC Ltd.",
        "sc": "ABSLAMC",
        "in": "Asset Management",
        "mc": 1.07149849188E11,
        "cp": 372.35,
        "pchg": 0.82,
        "52h": 503.0,
        "52l": 307.0,
        "lt": {
            "value": "30/06/2023 15:59:43"
        }
    },
    {
        "sId": 74,
        "sn": "Ador Welding Ltd.",
        "sc": "ADORWELD",
        "in": "Industrial Machinery, Equipment & Goods",
        "mc": 1.4917518299E10,
        "cp": 1096.54,
        "pchg": -0.89,
        "52h": 1270.09,
        "52l": 644.7,
        "lt": {
            "value": "30/06/2023 15:56:53"
        }
    },
    {
        "sId": 3009,
        "sn": "Adroit Infotech Ltd.",
        "sc": "ADROITINFO",
        "in": "Entertainment Production",
        "mc": 3.64812696E8,
        "cp": 17.64,
        "pchg": -4.58,
        "52h": 32.14,
        "52l": 13.3,
        "lt": {
            "value": "30/06/2023 15:42:36"
        }
    },
    {
        "sId": 1407,
        "sn": "Advanced Enzyme Technologies Ltd.",
        "sc": "ADVENZYMES",
        "in": "Speciality Chemicals",
        "mc": 3.1198916925E10,
        "cp": 279.39,
        "pchg": 3.33,
        "52h": 323.75,
        "52l": 225.0,
        "lt": {
            "value": "30/06/2023 15:59:43"
        }
    },
    {
        "sId": 2676,
        "sn": "Advani Hotels & Resorts (India) Ltd.",
        "sc": "ADVANIHOTR",
        "in": "Hotels",
        "mc": 4.11351325E9,
        "cp": 88.95,
        "pchg": 1.25,
        "52h": 97.9,
        "52l": 64.75,
        "lt": {
            "value": "30/06/2023 15:53:46"
        }
    },
    {
        "sId": 1735,
        "sn": "Aegis Logistics Ltd.",
        "sc": "AEGISCHEM",
        "in": "Gas Distribution",
        "mc": 1.12671E11,
        "cp": 321.0,
        "pchg": -1.14,
        "52h": 410.5,
        "52l": 204.55,
        "lt": {
            "value": "30/06/2023 15:56:47"
        }
    },
    {
        "sId": 4103,
        "sn": "Aether Industries Ltd.",
        "sc": "AETHER",
        "in": "Speciality Chemicals",
        "mc": 1.41535141788E11,
        "cp": 1067.9,
        "pchg": -0.41,
        "52h": 1209.0,
        "52l": 760.0,
        "lt": {
            "value": "30/06/2023 15:54:46"
        }
    },
    {
        "sId": 1614,
        "sn": "Affle (India) Ltd.",
        "sc": "AFFLE",
        "in": "Advertising",
        "mc": 1.4604316176E11,
        "cp": 1096.29,
        "pchg": 0.76,
        "52h": 1369.0,
        "52l": 866.5,
        "lt": {
            "value": "30/06/2023 15:59:03"
        }
    },
    {
        "sId": 2264,
        "sn": "Agarwal Industrial Corporation Ltd.",
        "sc": "AGARIND",
        "in": "Petrochemicals",
        "mc": 9.498196015E9,
        "cp": 635.1,
        "pchg": 1.42,
        "52h": 746.2,
        "52l": 424.0,
        "lt": {
            "value": "30/06/2023 15:59:50"
        }
    },
    {
        "sId": 1087,
        "sn": "Agri-Tech (India) Ltd.",
        "sc": "AGRITECH",
        "in": "Agro Products",
        "mc": 5.9994E8,
        "cp": 100.65,
        "pchg": -2.37,
        "52h": 129.19,
        "52l": 64.09,
        "lt": {
            "value": "30/06/2023 15:57:50"
        }
    },
    {
        "sId": 2164,
        "sn": "Agro Phos India Ltd.",
        "sc": "AGROPHOS",
        "in": "Agro Chemicals & Fertilizers",
        "mc": 7.09594025E8,
        "cp": 35.39,
        "pchg": 0.84,
        "52h": 58.14,
        "52l": 28.44,
        "lt": {
            "value": "30/06/2023 15:42:39"
        }
    },
    {
        "sId": 1955,
        "sn": "Agro Tech Foods Ltd.",
        "sc": "ATFL",
        "in": "Edible Oils & Solvent Extraction",
        "mc": 2.0884459248E10,
        "cp": 856.75,
        "pchg": 0.78,
        "52h": 969.79,
        "52l": 707.39,
        "lt": {
            "value": "30/06/2023 15:45:03"
        }
    },
    {
        "sId": 1429,
        "sn": "Ahlada Engineers Ltd.",
        "sc": "AHLADA",
        "in": "Home Furnishing",
        "mc": 1.472994E9,
        "cp": 113.59,
        "pchg": 1.69,
        "52h": 139.55,
        "52l": 79.15,
        "lt": {
            "value": "30/06/2023 15:40:05"
        }
    },
    {
        "sId": 6,
        "sn": "Ahluwalia Contracts (India) Ltd.",
        "sc": "AHLUCONT",
        "in": "Construction & Engineering",
        "mc": 4.066144892E10,
        "cp": 607.1,
        "pchg": -1.01,
        "52h": 644.14,
        "52l": 392.8,
        "lt": {
            "value": "30/06/2023 15:46:03"
        }
    },
    {
        "sId": 674,
        "sn": "Airan Ltd.",
        "sc": "AIRAN",
        "in": "It Services & Consulting",
        "mc": 2.12534E9,
        "cp": 17.44,
        "pchg": 1.75,
        "52h": 21.89,
        "52l": 13.25,
        "lt": {
            "value": "30/06/2023 15:57:40"
        }
    },
    {
        "sId": 3904,
        "sn": "Airo Lam Ltd.",
        "sc": "AIROLAM",
        "in": "Wood Products",
        "mc": 1.35018E9,
        "cp": 90.15,
        "pchg": 9.53,
        "52h": 129.5,
        "52l": 59.5,
        "lt": {
            "value": "30/06/2023 15:59:13"
        }
    },
    {
        "sId": 880,
        "sn": "Ajanta Pharma Ltd.",
        "sc": "AJANTPHARM",
        "in": "Pharmaceuticals",
        "mc": 1.86229253745E11,
        "cp": 1479.15,
        "pchg": 0.04,
        "52h": 1550.0,
        "52l": 1111.59,
        "lt": {
            "value": "30/06/2023 15:54:18"
        }
    },
    {
        "sId": 2614,
        "sn": "Ajmera Realty & Infra India Ltd.",
        "sc": "AJMERA",
        "in": "Real Estate",
        "mc": 1.3342313E10,
        "cp": 375.75,
        "pchg": -1.2,
        "52h": 395.0,
        "52l": 221.94,
        "lt": {
            "value": "30/06/2023 15:55:30"
        }
    },
    {
        "sId": 3087,
        "sn": "Ajooni Biotech Ltd.",
        "sc": "AJOONI",
        "in": "Pharmaceuticals",
        "mc": 3.50454884E8,
        "cp": 4.2,
        "pchg": -2.33,
        "52h": 8.57,
        "52l": 3.04,
        "lt": {
            "value": "30/06/2023 15:46:22"
        }
    },
    {
        "sId": 1086,
        "sn": "Akash Infra-Projects Ltd.",
        "sc": "AKASH",
        "in": "Construction & Engineering",
        "mc": 4.89013486E8,
        "cp": 28.5,
        "pchg": 1.6,
        "52h": 65.29,
        "52l": 22.5,
        "lt": {
            "value": "30/06/2023 15:50:11"
        }
    },
    {
        "sId": 4351,
        "sn": "Aki India Ltd.",
        "sc": "AKI",
        "in": "Footwear",
        "mc": 1.5394015E9,
        "cp": 22.75,
        "pchg": 4.12,
        "52h": 24.51,
        "52l": 12.24,
        "lt": {
            "value": "30/06/2023 15:42:22"
        }
    },
    {
        "sId": 694,
        "sn": "Aksh Optifibre Ltd.",
        "sc": "AKSHOPTFBR",
        "in": "Telecomm Equipment & Infra Services",
        "mc": 1.301583768E9,
        "cp": 8.34,
        "pchg": 0.59,
        "52h": 14.3,
        "52l": 8.09,
        "lt": {
            "value": "30/06/2023 15:55:41"
        }
    },
    {
        "sId": 4105,
        "sn": "Akshar Spintex Ltd.",
        "sc": "AKSHAR",
        "in": "Textiles",
        "mc": 1.624935E9,
        "cp": 65.29,
        "pchg": 0.93,
        "52h": 128.84,
        "52l": 29.64,
        "lt": {
            "value": "30/06/2023 15:41:49"
        }
    },
    {
        "sId": 2242,
        "sn": "AksharChem (India) Ltd.",
        "sc": "AKSHARCHEM",
        "in": "Dyes & Pigments",
        "mc": 1.919910661E9,
        "cp": 238.75,
        "pchg": -2.14,
        "52h": 391.64,
        "52l": 201.05,
        "lt": {
            "value": "30/06/2023 15:42:27"
        }
    },
    {
        "sId": 824,
        "sn": "Akzo Nobel India Ltd.",
        "sc": "AKZOINDIA",
        "in": "Paints/varnishes",
        "mc": 1.10799583962E11,
        "cp": 2432.84,
        "pchg": -0.16,
        "52h": 2548.75,
        "52l": 1772.29,
        "lt": {
            "value": "30/06/2023 15:53:13"
        }
    },
    {
        "sId": 1469,
        "sn": "Alankit Ltd.",
        "sc": "ALANKIT",
        "in": "Finance & Investments",
        "mc": 2.0210229E9,
        "cp": 9.3,
        "pchg": 0.0,
        "52h": 14.19,
        "52l": 7.0,
        "lt": {
            "value": "30/06/2023 15:42:49"
        }
    },
    {
        "sId": 1454,
        "sn": "Albert David Ltd.",
        "sc": "ALBERTDAVD",
        "in": "Pharmaceuticals",
        "mc": 3.39576139E9,
        "cp": 595.45,
        "pchg": 0.4,
        "52h": 642.2,
        "52l": 505.94,
        "lt": {
            "value": "30/06/2023 15:55:08"
        }
    },
    {
        "sId": 682,
        "sn": "Alembic Ltd.",
        "sc": "ALEMBICLTD",
        "in": "Pharmaceuticals",
        "mc": 1.8488291616E10,
        "cp": 72.15,
        "pchg": -0.55,
        "52h": 80.95,
        "52l": 55.2,
        "lt": {
            "value": "30/06/2023 15:59:52"
        }
    },
    {
        "sId": 2382,
        "sn": "Alembic Pharmaceuticals Ltd.",
        "sc": "APLLTD",
        "in": "Pharmaceuticals",
        "mc": 1.25014146864E11,
        "cp": 636.39,
        "pchg": -0.73,
        "52h": 747.64,
        "52l": 462.3,
        "lt": {
            "value": "30/06/2023 15:59:02"
        }
    },
    {
        "sId": 2471,
        "sn": "Alicon Castalloy Ltd.",
        "sc": "ALICON",
        "in": "Auto Ancillaries",
        "mc": 1.31311496E10,
        "cp": 814.89,
        "pchg": 2.87,
        "52h": 1112.9,
        "52l": 620.5,
        "lt": {
            "value": "30/06/2023 15:52:43"
        }
    },
    {
        "sId": 1914,
        "sn": "Alkali Metals Ltd.",
        "sc": "ALKALI",
        "in": "Commodity Chemicals",
        "mc": 1.181170696E9,
        "cp": 115.5,
        "pchg": -2.56,
        "52h": 173.9,
        "52l": 73.59,
        "lt": {
            "value": "30/06/2023 15:47:27"
        }
    },
    {
        "sId": 728,
        "sn": "Alkem Laboratories Ltd.",
        "sc": "ALKEM",
        "in": "Pharmaceuticals",
        "mc": 4.20031845E11,
        "cp": 3512.84,
        "pchg": 1.93,
        "52h": 3625.0,
        "52l": 2855.0,
        "lt": {
            "value": "30/06/2023 15:58:18"
        }
    },
    {
        "sId": 1326,
        "sn": "Alkyl Amines Chemicals Ltd.",
        "sc": "ALKYLAMINE",
        "in": "Speciality Chemicals",
        "mc": 1.392854865E11,
        "cp": 2725.34,
        "pchg": 2.87,
        "52h": 3226.25,
        "52l": 2146.09,
        "lt": {
            "value": "30/06/2023 15:56:26"
        }
    },
    {
        "sId": 2277,
        "sn": "Allcargo Logistics Ltd.",
        "sc": "ALLCARGO",
        "in": "Logistics",
        "mc": 6.9777528816E10,
        "cp": 284.14,
        "pchg": 0.04,
        "52h": 495.0,
        "52l": 247.19,
        "lt": {
            "value": "30/06/2023 15:58:59"
        }
    },
    {
        "sId": 2082,
        "sn": "Allied Digital Services Ltd.",
        "sc": "ADSL",
        "in": "It Services & Consulting",
        "mc": 6.204432014E9,
        "cp": 113.15,
        "pchg": 2.58,
        "52h": 144.8,
        "52l": 71.54,
        "lt": {
            "value": "30/06/2023 15:58:43"
        }
    },
    {
        "sId": 594,
        "sn": "Allsec Technologies Ltd.",
        "sc": "ALLSEC",
        "in": "It Services & Consulting",
        "mc": 8.274411018E9,
        "cp": 543.2,
        "pchg": -2.02,
        "52h": 584.89,
        "52l": 420.0,
        "lt": {
            "value": "30/06/2023 15:48:24"
        }
    },
    {
        "sId": 690,
        "sn": "Almondz Global Securities Ltd.",
        "sc": "ALMONDZ",
        "in": "Investment Banking & Brokerage Services",
        "mc": 2.013547459E9,
        "cp": 77.34,
        "pchg": 0.52,
        "52h": 102.79,
        "52l": 59.0,
        "lt": {
            "value": "30/06/2023 15:51:12"
        }
    },
    {
        "sId": 892,
        "sn": "Alok Industries Ltd.",
        "sc": "ALOKINDS",
        "in": "Textiles",
        "mc": 7.9443846416E10,
        "cp": 16.35,
        "pchg": -3.54,
        "52h": 22.3,
        "52l": 10.09,
        "lt": {
            "value": "30/06/2023 15:58:50"
        }
    },
    {
        "sId": 1129,
        "sn": "Alpa Laboratories Ltd.",
        "sc": "ALPA",
        "in": "Pharmaceuticals",
        "mc": 1.4938826E9,
        "cp": 70.95,
        "pchg": -0.69,
        "52h": 85.9,
        "52l": 49.0,
        "lt": {
            "value": "30/06/2023 15:59:55"
        }
    },
    {
        "sId": 1885,
        "sn": "Alphageo (India) Ltd.",
        "sc": "ALPHAGEO",
        "in": "Oil & Gas - Equipment & Services",
        "mc": 1.794864294E9,
        "cp": 282.35,
        "pchg": -2.89,
        "52h": 346.89,
        "52l": 198.25,
        "lt": {
            "value": "30/06/2023 15:52:52"
        }
    },
    {
        "sId": 2716,
        "sn": "Alps Industries Ltd.",
        "sc": "ALPSINDUS",
        "in": "Textiles",
        "mc": 7.82282E7,
        "cp": 2.29,
        "pchg": 0.0,
        "52h": 5.54,
        "52l": 1.89,
        "lt": {
            "value": "06/01/2023 15:40:29"
        }
    },
    {
        "sId": 2833,
        "sn": "Amara Raja Batteries Ltd.",
        "sc": "AMARAJABAT",
        "in": "Batteries",
        "mc": 1.163233125E11,
        "cp": 681.2,
        "pchg": 3.89,
        "52h": 684.95,
        "52l": 456.05,
        "lt": {
            "value": "30/06/2023 15:59:57"
        }
    },
    {
        "sId": 2367,
        "sn": "Amber Enterprises India Ltd.",
        "sc": "AMBER",
        "in": "Consumer Electronics & Appliances",
        "mc": 7.6013057136E10,
        "cp": 2256.19,
        "pchg": 2.72,
        "52h": 2580.0,
        "52l": 1762.5,
        "lt": {
            "value": "30/06/2023 16:00:00"
        }
    },
    {
        "sId": 2916,
        "sn": "Ambica Agarbathies & Aroma Industries Ltd.",
        "sc": "AMBICAAGAR",
        "in": "Diversified",
        "mc": 6.527412E8,
        "cp": 37.7,
        "pchg": -0.53,
        "52h": 41.95,
        "52l": 19.14,
        "lt": {
            "value": "30/06/2023 15:47:05"
        }
    },
    {
        "sId": 2715,
        "sn": "Ambika Cotton Mills Ltd.",
        "sc": "AMBIKCO",
        "in": "Textiles",
        "mc": 9.268775E9,
        "cp": 1619.25,
        "pchg": -1.57,
        "52h": 1888.0,
        "52l": 1314.2,
        "lt": {
            "value": "30/06/2023 15:59:17"
        }
    }];
interface StockItem {
  sn: string;
  in: string;
  sId: string,
}

interface HomeProps {
  stocks1: StockItem[];
}

const Home = ({ stocks1 }: HomeProps) => {
    const { data: session } = useSession()
    console.log(session)
      return (
        <div>
          <Head>
            <title>Trending Stock</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <AppBar />
          {/* <LoginButton /> */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '10px',
              padding: '0 10px',
              margin: '0 auto',
              maxWidth: '1200px',
            }}
          >
            {stocks?.map(stock => (
              <Card title={stock.sn} subHeader={stock.in} key={stock.sId} />
            ))}
          </div>
    
        </div>
      );
};


// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // const response = await fetch(
//   //   'https://www.etmoney.com/stocks/list-of-stocks',
//   //   {
//   //     headers: {
//   //       authority: 'www.etmoney.com',
//   //       accept: '*/*',
//   //       'accept-language': 'en-US,en;q=0.9',
//   //       'content-type': 'application/x-www-form-urlencoded',
//   //       cookie: 'JSESSIONID=44F42C088D0A21FDD009CDD13BE6C5E5; _gcl_au=1.1.1467857358.1688161423; _gid=GA1.2.1516209701.1688161424; _gat_UA-61175757-1=1; _clck=lfqgvh|2|fcw|0|1276; ln_or=eyIyODM5NTMwIjoiZCJ9; g_state={"i_p":1688168627094,"i_l":1}; _clsk=1o3g3d3|1688161438415|2|1|r.clarity.ms/collect; _ga=GA1.2.2015280424.1688161424; _ga_4SS2NEWG4N=GS1.1.1688161424.1.1.1688161441.43.0.0',
//   //       newrelic: 'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjMyNDc5NTAiLCJhcCI6IjE4MzM0NjExNzMiLCJpZCI6IjAwZDE1MDdhOTJjZjVjYTIiLCJ0ciI6IjBjZDhmYWNlMjE1MGE4YTBkMTMxY2U0YWE1NzIxMDAwIiwidGkiOjE2ODgxNjE0NTAzMzAsInRrIjoiMjIyMzM2MSJ9fQ==',
//   //       origin: 'https://www.etmoney.com',
//   //       referer: 'https://www.etmoney.com/stocks/list-of-stocks',
//   //       'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
//   //       'sec-ch-ua-mobile': '?0',
//   //       'sec-ch-ua-platform': '"macOS"',
//   //       'sec-fetch-dest': 'empty',
//   //       'sec-fetch-mode': 'cors',
//   //       'sec-fetch-site': 'same-origin',
//   //       traceparent: '00-0cd8face2150a8a0d131ce4aa5721000-00d1507a92cf5ca2-01',
//   //       tracestate: '2223361@nr=0-1-3247950-1833461173-00d1507a92cf5ca2----1688161450330',
//   //       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
//   //     }
//   //   }
//   // );
//   // console.log(response);

//   // const data = await response.json();
  
    
//   return {
//     props: {
//       stocks,
//       session: await getServerSession(context.req, context.res, authOptions),
//     },
//   };
// }


export default Home;