export default function Modal(props) {

    useEffect(() => {
        const exitModal = (event) => {
            if (event.target == document.getElementById('editModal')) {
                closeEditModal();
            } else if (event.target == document.getElementById('deleteModal')) {
                closeDeleteModal();
            }
        }
        window.addEventListener('click', exitModal)

        return () => {
            window.removeEventListener('click', exitModal)
        }
    }, [])

    return (
        <>
        <link rel="stylesheet" href="/public/styles/modal.css" type="text/css"></link>
        <div id={props.id} className="modal">
        <div className="modal-content">
            <span className="close" onClick={document.getElementById(props.id).style.display = 'none'}>&times;</span>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={closeDeleteModal}>No</button>
        </div>
    </div>
    </>

    )
}