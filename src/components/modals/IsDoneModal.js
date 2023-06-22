import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const IsDoneModal = ({
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
        <Modal.Title>
          {newTask.isDone ? "Incomplete Task" : "Complete Task"}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={(e) => submitHandler(e, action)}>
        <Modal.Body>
          {newTask.isDone ? (
            <>
              <p>Are you sure "{newTask.title}" is INCOMPLETE?</p>
            </>
          ) : (
            <>
              <p>Are you sure "{newTask.title}" is COMPLETE?</p>
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default IsDoneModal;
