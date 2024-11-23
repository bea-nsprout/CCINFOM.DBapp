// Show Modal Function
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close Modal Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Confirm Edit Action
function confirmEdit() {
    alert("Item edited successfully!");
    closeModal('editModal');
}

// Confirm Delete Action
function confirmDelete() {
    alert("Item deleted successfully!");
    closeModal('deleteModal');
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for opening modals
    document.querySelectorAll('.edit').forEach(button => 
        button.onclick = () => showModal('editModal')
    );
    document.querySelectorAll('.delete').forEach(button => 
        button.onclick = () => showModal('deleteModal')
    );

    // Event listeners for closing modals using the 'X' button
    document.querySelectorAll('.modal .close').forEach(closeBtn => 
        closeBtn.onclick = () => closeModal(closeBtn.closest('.modal').id)
    );
});

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
function showEditModal() {
  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function confirmEdit() {
  alert("Item edited successfully!");
  closeEditModal();
}

function showDeleteModal() {
  document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
  document.getElementById("deleteModal").style.display = "none";
}

function confirmDelete() {
  alert("Item deleted successfully!");
  closeDeleteModal();
}

window.onclick = function (event) {
  if (event.target == document.getElementById("editModal")) {
    closeEditModal();
  } else if (event.target == document.getElementById("deleteModal")) {
    closeDeleteModal();
  }
};
