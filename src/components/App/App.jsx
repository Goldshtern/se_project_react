import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { setToken, getToken } from "../../utils/token";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatarUrl: "",
    email: "",
    _id: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

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

  const handleEditUser = ({ name, avatarUrl }) => {
    const jwt = getToken();

    auth.updateCurrentUser({ name, avatarUrl }, jwt).then((res) => {
      setCurrentUser(res);
      closeActiveModal();
    });
  };

  const handleSignOut = ({ _id, token }) => {
    localStorage.removeItem(token);
    setIsLoggedIn(false);
    setCurrentUser({ email: "", password: "" });
    navigate("/");
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

  const handleCardLike = ({ _id, isLiked }) => {
    const jwt = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(_id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(_id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

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

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

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
        setClothingItems(data.clothingItems);
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
                    onCardLike={handleCardLike}
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
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleSignOut={handleSignOut}
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
          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={true}
              handleEditUser={handleEditUser}
              onClose={closeActiveModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
