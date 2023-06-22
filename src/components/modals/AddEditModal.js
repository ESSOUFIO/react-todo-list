import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddEditModal = ({
  show,
  handleClose,
  submitHandler,
  action,
  newTask,
  inputHandle,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action.type} Task</Modal.Title>
      </Modal.Header>

      <form onSubmit={(e) => submitHandler(e, action)}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Task:
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={newTask.title}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start_date" className="form-label">
              Start Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              value={newTask.start_date}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              End Date:
            </label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              value={newTask.end_date}
              onChange={inputHandle}
            />
          </div>
          <select
            className="mb-3 form-select"
            onChange={inputHandle}
            name="status"
            value={newTask.status}
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Canceled">Canceled</option>
            <option value="Done">Done</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <button type="submit" className="btn btn-primary">
            {action.type}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddEditModal;
