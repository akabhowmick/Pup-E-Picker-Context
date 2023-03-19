import { useDogContext } from "../dogs.context";

export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
  const {
    activeTab,
    onClickChangeActiveTab,
    favoriteDogCount,
    unfavoriteDogCount,
  } = useDogContext();
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "Favorited Dogs:" && "active"}`}
            onClick={() => onClickChangeActiveTab("Favorited Dogs:")}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "Unfavorited Dogs:" && "active"
            }`}
            onClick={() => onClickChangeActiveTab("Unfavorited Dogs:")}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              activeTab === "Create A Dog:" && "active"
            }`}
            onClick={() => onClickChangeActiveTab("Create A Dog:")}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
