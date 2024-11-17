// Show modal based on the provided modal ID
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close modal based on the provided modal ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to confirm the edit action
function confirmEdit() {
    alert("Item edited successfully!");
    closeModal('editModal');
}

// Function to confirm the delete action
function confirmDelete() {
    alert("Item deleted successfully!");
    closeModal('deleteModal');
}

// Event listeners for specific modals
document.getElementById('editModal').querySelector('.close').onclick = () => closeModal('editModal');
document.getElementById('deleteModal').querySelector('.close').onclick = () => closeModal('deleteModal');

// Event listeners for button actions
document.querySelectorAll('.edit').forEach(button => button.onclick = () => showModal('editModal'));
document.querySelectorAll('.delete').forEach(button => button.onclick = () => showModal('deleteModal'));

// Close modals when clicking outside of them
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    if (event.target === editModal) {
        closeModal('editModal');
    } else if (event.target === deleteModal) {
        closeModal('deleteModal');
    }
}
