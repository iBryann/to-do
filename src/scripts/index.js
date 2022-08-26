import '../styles/styles.scss';


'strict mode';

const index = (() => {
    const state = {
        tasks: []
    };

    function saveLocalStorage() {
        const tasksStr = JSON.stringify(state.tasks);

        localStorage.setItem('@todo:list', tasksStr);
    }

    function loadLocalStorage() {
        const tasksStr = localStorage.getItem('@todo:list');
        const loadedTasks = tasksStr ? JSON.parse(tasksStr) : [];
        state.tasks = loadedTasks;

        renderTasks();
    }

    function renderTasks() {
        saveLocalStorage();

        const { tasks } = state;
        const container = document.querySelector('#tasks');
        container.innerHTML = '';
        
        if (tasks.length) {
            tasks.forEach(({ checked, id, text }) => {
                container.insertAdjacentHTML('beforeend', `
                    <li class="task ${checked ? 'checked' : ''}" data-id=${id}>
                        <label>
                            <input type="checkbox" ${checked ? 'checked' : ''}>
                            ${text}
                        </label>
                        <button>
                            <img class="delete" src="/delete.svg" alt="deletar">
                        </button>
                    </li>
                `);
            });
        }
        else {
            container.insertAdjacentHTML('beforeend', `
                <div class="empty">Não há tarefas 😮</div>
            `);
        }
    }

    function createTask(text) {
        const newTask = {
            id: Date.now(),
            checked: false,
            text: text
        };

        state.tasks.push(newTask);
        renderTasks();
    }

    function deleteTask(id) {
        state.tasks = state.tasks.filter(f => f.id !== Number(id));
        renderTasks();
    }

    function updateTask(id, checked) {
        const task = state.tasks.find(f => f.id === Number(id));

        task.checked = checked;
        renderTasks();
    }

    function events() {
        document.forms.task.addEventListener('submit', event => {
            event.preventDefault();
            const { text } = document.forms.task;

            createTask(text.value);
            text.value = '';
        });

        document.querySelector('#tasks').addEventListener('click', event => {
            const element = event.target;

            if (element.classList.contains('delete')) {
                const row = element.closest('li');
                const id = row.dataset.id;
                
                deleteTask(id);
            }
            else if (element.tagName === 'INPUT') {
                const row = element.closest('li');
                const id = row.dataset.id;
                
                updateTask(id, element.checked);
            }
        });
    }

    function init() {
        loadLocalStorage();
        events();
    }

    return {
        init
    }
})();


document.addEventListener('DOMContentLoaded', index.init);