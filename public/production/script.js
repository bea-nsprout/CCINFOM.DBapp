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
