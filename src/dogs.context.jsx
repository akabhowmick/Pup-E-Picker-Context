import { useState, useEffect, createContext, useContext } from "react";
import { addDogToDb } from "./fetch/add-dog";
import { updateFavoriteForDog } from "./fetch/update-favorite";
import { deleteDogFromDb } from "./fetch/delete-dog-from-db";

const DogContext = createContext({});

export const DogProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [activeTab, setActiveTab] = useState("Dogs:");
  const [dogsToDisplay, setDogsToDisplay] = useState(dogs);

  const favoriteDogCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogCount = dogs.length - favoriteDogCount;

  const onClickChangeActiveTab = (tabClicked) => {
    if (activeTab === "Dogs:" || activeTab !== tabClicked) {
      setActiveTab(tabClicked);
    } else {
      setActiveTab("Dogs:");
    }
  };

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  useEffect(() => {
    if (activeTab === "Favorited Dogs:") {
      let favDogs = [];
      dogs.forEach((dog) => {
        if (dog.isFavorite) {
          favDogs.push(dog);
        }
      });
      setDogsToDisplay(favDogs);
    } else if (activeTab === "Unfavorited Dogs:") {
      let unFavDogs = [];
      dogs.forEach((dog) => {
        if (!dog.isFavorite) {
          unFavDogs.push(dog);
        }
      });
      setDogsToDisplay(unFavDogs);
    } else if (activeTab === "Dogs:") {
      setDogsToDisplay(dogs);
    }
  }, [activeTab, dogs]);

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
    //setActiveTab("Dogs:");
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const toggleFavoriteDog = (dogId, isFavorite) => {
    updateFavoriteForDog({ dogId, isFavorite: !isFavorite });
    refetchDogs();
  };

  return (
    <DogContext.Provider
      value={{
        dogsToDisplay,
        activeTab,
        favoriteDogCount,
        unfavoriteDogCount,
        onClickChangeActiveTab,
        addDog,
        deleteDog,
        toggleFavoriteDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  const context = useContext(DogContext);
  return {
    dogsToDisplay: context.dogsToDisplay,
    activeTab: context.activeTab,
    favoriteDogCount: context.favoriteDogCount,
    unfavoriteDogCount: context.unfavoriteDogCount,
    onClickChangeActiveTab: context.onClickChangeActiveTab,
    addDog: context.addDog,
    deleteDog: context.deleteDog,
    toggleFavoriteDog: context.toggleFavoriteDog,
  };
};
