import { useListsContext } from "../context/lists_context";

const Modal = () => {
  const { closeModal, removeItem } = useListsContext();

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove an items from list?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              removeItem();
              closeModal();
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              closeModal();
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
