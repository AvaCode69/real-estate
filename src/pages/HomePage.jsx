import { HouseList } from "../components";
const HomePage = () => {
  return (
    <main>
      <section className="header-list ">
        <h2>Houses </h2>
        <button className="btn">+ Create new </button>
      </section>
      <HouseList />
    </main>
  );
};

export default HomePage;
