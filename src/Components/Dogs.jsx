import { DogCard } from "./DogCard";
import { useDogContext } from "../dogs.context";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogsToDisplay, deleteDog, toggleFavoriteDog } = useDogContext();
  return (
    <>
      {dogsToDisplay?.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => toggleFavoriteDog(dog.id, dog.isFavorite)}
          onEmptyHeartClick={() => toggleFavoriteDog(dog.id, dog.isFavorite)}
        />
      ))}
    </>
  );
};
