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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { setToken, getToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

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

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    avatarUrl: "",
    _id: "",
  });

  const navigate = useNavigate();

  //const handleRegistration = ({ name, email, avatarUrl, password }) => {
  //auth
  //.signUp({ name, email, password, avatarUrl })
  //.then(() => {
  //setUserData(name, email, password, avatarUrl);
  //setCurrentUser(email, password);
  //setIsLoggedIn(true);
  //e.preventDefault();
  //closeActiveModal();
  // navigate("/profile");
  //})
  //.catch((err) => console.error("Error setting data:", err));
  //};

  //const handleLogin = ({ email, password }) => {
  //if (!email || !password) {
  //return;
  //}

  //auth
  //.signIn({ email, password })
  //.then((data) => {
  //console.log("this is the data", data);
  //if (data.token) {
  //setToken(data.token);
  //setCurrentUser(userData);
  // setIsLoggedIn(true);
  //closeActiveModal();
  //navigate("/profile");
  //}
  //})
  //.catch(console.error);
  //};

  const handleRegistration = ({ name, avatarUrl, email, password }) => {
    return auth
      .signUp({ name, avatarUrl, email, password })
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .signIn({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          setToken(data.token);
          auth.getUserInfo(data.token).then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            localStorage.setItem("jwt", data.token);
            closeActiveModal();
            navigate("/profile");
          });
        }
      })
      .catch((err) => {
        console.error("Login failed", err);
      });
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

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

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    const jwt = getToken();

    return api
      .postItems(item.name, item.imageUrl, item.weather, jwt)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        console.log(setClothingItems([newCard, ...clothingItems]));
        closeActiveModal();
      })
      .catch((err) => console.error("Error submitting:", err));
  };

  const handleDeleteItem = (item) => {
    const jwt = getToken();

    api
      .deleteItems(item, jwt)
      .then((res) => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== item._id
        );
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch((e) => console.error(e));
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
    api
      .getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              onClose={closeActiveModal}
            />
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
                      weatherData={weatherData}
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
          {activeModal === "register" && (
            <RegisterModal
              isOpen={true}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLoginClick={handleLoginClick}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              isOpen={true}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleSignUpClick={handleSignUpClick}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
