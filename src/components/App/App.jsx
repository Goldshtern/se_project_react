import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, postItems, deleteItems } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    postItems(item.name, item.imageUrl, item.weather)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        console.log(setClothingItems([newCard, ...clothingItems]));
        closeActiveModal();
      })
      .catch((err) => console.error("Error submitting:", err));
  };

  const handleDeleteItem = (item) => {
    console.log(item);
    deleteItems(item)
      .then((res) => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== item._id
        );
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch((e) => console.error(e));
  };

  const handleRegistration = ({ name, email, avatarUrl, password }) => {
    auth
      .signUp({ name, email, password, avatarUrl })
      .then(() => {
        setUserData(name, email, password, avatarUrl);
        setCurrentUser(email, password);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth.signIn({ email, password }).then;
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteItem={handleDeleteItem}
        />
        <RegisterModal
          activeModal={RegisterModal}
          onClose={closeActiveModal}
          handleRegistration={handleRegistration}
        />
        <LoginModal activeModal={LoginModal} onClose={closeActiveModal} />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
