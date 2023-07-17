import { ItemList, Loading, Error } from "../components";
import { Link } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
const HomePage = () => {
  const { lists_loading: loading, lists_error: error } = useListsContext();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <main>
      <section className="header-list ">
        <h2>Houses </h2>
        <Link to="/addItem" className="cart-btn">
          <button className="btn">+ Create new </button>
        </Link>
      </section>
      <ItemList />
    </main>
  );
};

export default HomePage;
