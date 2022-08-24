import '../styles/styles.scss';


'strict mode';

const index = (() => {
/*
    C = create: OK
    R = read: OK
    U = update
    D = delete
*/
    const state = {
        tasks: [
            { checked: false, text: 'lavar louça' },
            { checked: false, text: 'dar ração ao cachorro' },
            { checked: false, text: 'fazer compras' },
            { checked: false, text: 'varrer a casa' },
        ]
    }

    function renderTasks() {
        const { tasks } = state;
        const container = document.querySelector('#tasks');
        container.innerHTML = '';
        
        tasks.forEach(({ text }, index) => {
            container.insertAdjacentHTML('beforeend', `
                <li class="task">
                    <label><input type="checkbox">${text}</label>
                    <button>
                        <img class="delete" src="/src/assets/delete.svg" alt="deletar">
                    </button>
                </li>
            `);
        });
    }

    function createTask(text) {
        const newTask = {
            checked: false,
            text: text
        };

        state.tasks.push(newTask);
    }

    function events() {
        document.forms.task.addEventListener('submit', event => {
            event.preventDefault();
            const { text } = document.forms.task;

            createTask(text.value);

            renderTasks();
        });

        document.querySelector('#tasks').addEventListener('click', event => {
            const element = event.target;

            if (element.classList.contains('delete')) {
                alert('Deleta');
            }
        });
    }


    function init() {
        renderTasks();

        events();
    }


    return {
        init
    }
})();


document.addEventListener('DOMContentLoaded', index.init);