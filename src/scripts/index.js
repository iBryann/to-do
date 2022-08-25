import '../styles/styles.scss';


'strict mode';

const index = (() => {
    const state = {
        tasks: []
    };

    function saveLocalStorage() {
        const tasksStr = JSON.stringify(state.tasks);

        localStorage.setItem('lista', tasksStr);
    }

    function loadLocalStorage() {
        const tasksStr = localStorage.getItem('lista');
        const loadedTasks = JSON.parse(tasksStr);

        state.tasks = loadedTasks;
    }

    function renderTasks() {
        saveLocalStorage();

        const { tasks } = state;
        const container = document.querySelector('#tasks');
        container.innerHTML = '';
        
        tasks.forEach(({ checked, id, text }) => {
            container.insertAdjacentHTML('beforeend', `
                <li class="task ${checked ? 'checked' : ''}" data-id=${id}>
                    <label>
                        <input type="checkbox" ${checked ? 'checked' : ''}>
                        ${text}
                    </label>
                    <button>
                        <img class="delete" src="/src/assets/delete.svg" alt="deletar">
                    </button>
                </li>
            `);
        });
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
        renderTasks();
        events();
    }

    return {
        init
    }
})();


document.addEventListener('DOMContentLoaded', index.init);