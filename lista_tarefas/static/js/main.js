document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('task-list');
    const form = document.getElementById('task-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const statusSelect = document.getElementById('status')
    const submitButton = document.getElementById('submit-button');
    let editingTaskId = null

    const statusMap = {
        P: 'Pendente',
        E: 'Em andamento',
        C: 'Concluído'
    };


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrfToken = getCookie('csrftoken');

    const loadTasks = () => {
        fetch('/api/v1/tasks/')
            .then(res => res.json())
            .then(tasks => {
                list.innerHTML = '';
                tasks.forEach(task => {
                    const item = document.createElement('li');
                    item.className = "task-card"
                    item.innerHTML = `
                        <div class="task-info">
                            <strong>Título: ${task.title}</strong>
                            <p><strong>Descrição</strong>: ${task.description}</p>
                            <p><strong>Status</strong>: ${statusMap[task.status]}</p>
                        </div>
                        <div class="task-actions">
                            <button class="edit-btn" 
                                data-id="${task.id}" 
                                data-title="${task.title}" 
                                data-description="${task.description}" 
                                data-status="${task.status}">
                                Atualizar
                            </button>
                            <button class="delete-btn" data-id="${task.id}">Excluir</button>
                        </div>
                    `;
                    list.appendChild(item);
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        fetch(`/api/v1/tasks/${btn.dataset.id}/`, { method: 'DELETE' , headers: {'X-CSRFToken': csrfToken }})
                            .then(() => loadTasks());
                    });
                });

                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        titleInput.value = btn.dataset.title;
                        descriptionInput.value = btn.dataset.description;
                        statusSelect.value = btn.dataset.status
                        editingTaskId = btn.dataset.id;
                    });
                });
            });
    };


   
    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const status = statusSelect.value

        if (editingTaskId) {
            fetch(`/api/v1/tasks/${editingTaskId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
                body: JSON.stringify({ title, description, status })
            }).then(() => {
                form.reset();
                editingTaskId = null;
                loadTasks();
            });
        } else {

            fetch('/api/v1/tasks/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken},
                body: JSON.stringify({ title, description, status })
            }).then(() => {
                form.reset();
                loadTasks();
            });
        }
    });


    window.deleteTask = (id) => {
        fetch(`/api/v1/tasks/${id}/`, { method: 'DELETE' } )
            .then(() => loadTasks());
    };

    window.editTask = (id, title, description) => {
        titleInput.value = title;
        descriptionInput.value = description;
        editingTaskId = id;
    };

    loadTasks();
    setInterval(loadTasks, 5000);
});
