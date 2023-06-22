import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({
  show,
  action,
  task,
  submitHandler,
  setShowDeleteModal,
}) => {
  return (
    <Modal show={show} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>

      <form
        onSubmit={(e) =>
          submitHandler(e, {
            type: "Delete",
            index: action.index,
          })
        }
      >
        <Modal.Body>
          <p>Are you sure to DELETE the task: "{task?.title}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <button type="submit" className="btn btn-primary">
            Yes
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DeleteModal;
