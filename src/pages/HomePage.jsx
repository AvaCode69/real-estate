import { HouseList } from "../components";
const HomePage = () => {
  return (
    <main>
      <section className="header-list ">
        <h2>Houses </h2>
        <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
          <button className="btn">+ Create new </button>
        </Link>
      </section>
      <HouseList />
    </main>
  );
};

export default HomePage;
