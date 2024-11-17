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

// Add Event Listeners to Buttons
document.addEventListener('DOMContentLoaded', () => {
    // Edit and Delete Buttons
    document.querySelectorAll('.edit').forEach(button => 
        button.onclick = () => showModal('editModal')
    );
    document.querySelectorAll('.delete').forEach(button => 
        button.onclick = () => showModal('deleteModal')
    );

    // Close Button for each modal
    document.querySelectorAll('.modal .close').forEach(button =>
        button.onclick = () => closeModal(button.closest('.modal').id)
    );
});

// Close modals when clicking outside modal content
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
};
