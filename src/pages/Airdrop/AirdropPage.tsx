import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@hooks/useIsMobile";

import styles from "./Airdrop.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import close from "@assets/close.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import axios from "axios";

interface MemeCoin {
  coinName: string;
  network: string;
  description: string;
  slug: string;
  hash: string;
  comingSoon: boolean;
  image: string;
  networkImage: string;
  qrCode: string;
}

interface MemeCoinFest {
  name: string;
  subtitle: string;
  airdrops: MemeCoin[];
}

const arr = ["its raining ☔️", "Meme Coin Fest", "L2 Summer Season"];
export const AirdropPage = () => {
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeQR, setActiveQR] = useState("");
  const [copyActiveQR, setCopyActiveQR] = useState("");

  const [coins, setCoins] = useState<MemeCoinFest[] | null>(null);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCopyActiveQR("");
    setActiveQR("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://openwallet.finance/airdrop/airdrop.json")
          .then((response) => {
            setCoins(response.data.sections);
          });
      } catch (err: any) {
        throw Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return "Loading";
  if (!coins) return "Something went wrong";

  return (
    <>
      <div className={styles.airdropWrap}>
        <div className={styles.airdropHeader}>
          <h2>Airdrop</h2>
        </div>
        <div className={styles.airdropTabsWrap}>
          <Swiper
            className="swiper-tabs"
            modules={[Navigation, Scrollbar]}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              750: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            scrollbar={{ draggable: true }}
          >
            {arr.map((item, index) => (
              <SwiperSlide key={index} className="swiper-tabs-item">
                <div
                  className={`${styles.airdropTab} ${
                    activeTab === index && styles.active
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {item}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.tabTitle}>
          <div className={styles.tabTitleText}>
            <h2>{coins[activeTab].name}</h2>
            <p>{coins[activeTab].subtitle}</p>
          </div>
        </div>

        <div className={styles.swiperWrap}>
          <Swiper
            modules={[Navigation, Scrollbar]}
            slidesPerView={1}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              500: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              620: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              750: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              800: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },

              940: {
                slidesPerView: 2.8,
                spaceBetween: 30,
              },

              1024: {
                slidesPerView: 3.2,
                spaceBetween: 30,
              },

              1160: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            scrollbar={{ draggable: true }}
          >
            {coins[activeTab].airdrops.map((coin, index) => (
              <SwiperSlide
                key={index}
                className={styles.swiperSlide}
                style={{ marginRight: "0px!important" }}
                onClick={() => {
                  setActiveQR(!coin.comingSoon ? coin.qrCode : "");
                  setCopyActiveQR(coin.hash);
                  handleOpenModal();
                }}
              >
                <div className={styles.coinCard}>
                  <div className={styles.coinImg}>
                    <img src={coin.image} alt={coin.coinName} />
                  </div>
                  <div className={styles.title}>
                    <h2>{coin.coinName}</h2>
                    <div className={styles.network}>
                      <p>{coin.network}</p>
                      <img src={coin.networkImage} alt={coin.network} />
                    </div>
                  </div>
                  <p className={styles.description}>{coin.description}</p>
                  {coin?.comingSoon && (
                    <div className={styles.coinOverlay}>
                      <p>Coming Soon</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isModalOpen && activeQR && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Scan</h2>
              <img src={close} alt="close" onClick={handleCloseModal} />
            </div>
            <img
              className={styles.qrCode}
              src={activeQR}
              alt="Connect Wallet"
            />
            {isMobile ? (
              <Link
                to={`https://mobile.openwallet.finance/airdrop?claim=${copyActiveQR}`}
                className={styles.buttonCopy}
              >
                Claim
              </Link>
            ) : (
              <button
                className={styles.buttonCopy}
                onClick={() => navigator.clipboard.writeText(copyActiveQR)}
              >
                Copy
              </button>
            )}

            <p className={styles.scan}>Scan QR code with Open Wallet</p>
          </div>
        </div>
      )}
    </>
  );
};
