const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function(arrOfTasks) {
    function arrOfTasksIsEmpty(arrOfTasks) {
        if(arrOfTasks.length === 0) {
            taskListIsEmpty(listContainer);
        }
        return;
    }

    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;

    }, {});

    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
    // Elements UI

    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const btnAllTasks = document.querySelector('.all-tasks');
    const btnUnfinishedTasks = document.querySelector('.unfinished-tasks');

    const form = document.forms['addTask'];
    const inputTitle = form.elements['title'];
    const inputBody = form.elements['body'];
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.value = lastSelectedTheme;

    // Events
    setTheme(lastSelectedTheme);
    renderAllTasks(objOfTasks);
    arrOfTasksIsEmpty(arrOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);
    listContainer.addEventListener('click', completeTask);
    listContainer.addEventListener('click', restoreTask);
    btnAllTasks.addEventListener('click', showAllTasks);
    btnUnfinishedTasks.addEventListener('click', showUnfinishedTasks);
    themeSelect.addEventListener('change', onThemeSelectHandler);
    
    function showAllTasks() {
        const hiddenLi = document.querySelectorAll('.list-group-item');
        Object.values(hiddenLi).forEach(value => {
                value.remove();
        });
        btnAllTasks.dataset.active = 'true';
        btnUnfinishedTasks.dataset.active = 'false';
        renderAllTasks(objOfTasks);
    }

    function showUnfinishedTasks() {
        const hiddenLi = document.querySelectorAll('.list-group-item');
        Object.values(hiddenLi).forEach(value => {
            if(value.style.backgroundColor === 'lightgreen') {
                value.remove();
            }
        });

        btnUnfinishedTasks.dataset.active = 'true';
        btnAllTasks.dataset.active = 'false';
        console.log(hiddenLi);
    }

    function renderAllTasks(tasksList) {
        if(!tasksList) {
            console.error('Передайте список задач!');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
            // fragment.insertAdjacentElement("beforeend", li);
        });
        listContainer.appendChild(fragment);
    }

    function listItemTemplate({_id, completed, title, body} = {}) {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'flex-column',
            'align-items-center',
            'flex-wrap',
            'mt-2'
        );
        li.setAttribute('data-task-id', _id);

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const div = document.createElement('div');
        div.classList.add('w-100', 'd-flex', 'justify-content-between');
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('btn', 'btn-success', 'complete-btn');
        const restoreTaskBtn = document.createElement('button');
        restoreTaskBtn.classList.add('btn', 'btn-info', 'restore-btn', 'd-none');

        if(completed === true) {
            completeBtn.classList.add('d-none');
            li.style.backgroundColor = 'lightgreen';
            restoreTaskBtn.classList.remove('d-none');

        }
        completeBtn.textContent = 'Completed';
        restoreTaskBtn.textContent = 'Restore Task';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100');

        li.appendChild(span);
        div.appendChild(completeBtn);
        div.appendChild(restoreTaskBtn);
        div.appendChild(deleteBtn);
        li.appendChild(div);
        li.appendChild(article);
        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if(!titleValue || !bodyValue) {
            alert('please enter title and body');
            return;
        }

        if(listContainer.children[0].textContent ==='Task list is empty') {
            const liEmptyTaskList = listContainer.querySelector('li');
          listContainer.removeChild(liEmptyTaskList);
        }

        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        listContainer.insertAdjacentElement('afterbegin', listItem);
        form.reset();


    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`,
        };

        btnUnfinishedTasks.classList.remove('d-none');
        btnAllTasks.classList.remove('d-none');

        objOfTasks[newTask._id] = newTask;
        return { ...newTask };
    }


    function deleteTask(id) {
        const { title } = objOfTasks[id];
        const isConfirm = confirm(`Are you sure you want to delete this task: ${title}?`);
        if (!isConfirm) return isConfirm;

        console.log(Object.keys(objOfTasks).length);
        delete objOfTasks[id];
        return isConfirm;
    }
    
    function deleteTaskFromHtml(confirmed, el) {
        if(!confirmed) return;
        el.remove();

    }

    function completeTask({target}) {
        if (target.classList.contains('complete-btn')) {
            const parent = target.closest('[data-task-id]');
            parent.style.backgroundColor = 'lightgreen';
            target.classList.add('d-none');
            listContainer.insertAdjacentElement("beforeend", parent);
            const id = parent.dataset.taskId;
            objOfTasks[id].completed = true;
            const restoreBtn = parent.querySelector('.restore-btn');
            restoreBtn.classList.remove('d-none');
            // btnAllTasks.dataset.active = 'true';
            if(btnUnfinishedTasks.dataset.active === 'true') {
                parent.remove();
            }
        }
    }

    function onDeleteHandler({ target }) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
            taskListIsEmpty(listContainer);
            // alertIsEmpty (listContainer);
        }
    }


    function restoreTask({target}) {
        if (target.classList.contains('restore-btn')) {
            const parent = target.closest('[data-task-id]');
            parent.style.backgroundColor = '#fff';
            target.classList.add('d-none');
            listContainer.insertAdjacentElement("afterbegin", parent);
            const id = parent.dataset.taskId;
            objOfTasks[id].completed = false;
            const completeBtn = parent.querySelector('.complete-btn');
            completeBtn.classList.remove('d-none');
            console.log(completeBtn);
            // btnAllTasks.dataset.active = 'true';
        }

    }


    function taskListIsEmpty(listContainer) {
        const li = document.createElement('li');
        if(Object.keys(objOfTasks).length === 0) {
            li.classList.add(
                'list-group-item',
                'd-flex',
                'align-items-center',
                'flex-wrap',
                'mt-2'
            );
            btnUnfinishedTasks.classList.add('d-none');
            btnAllTasks.classList.add('d-none');
            const span = document.createElement('span');
            span.textContent = 'Task list is empty';
            span.style.fontWeight = 'bold';
            li.appendChild(span);
            listContainer.appendChild(li);
        }
    }


    function onThemeSelectHandler(e) {
        const selectedTheme = themeSelect.value;
        const isConfirmed = confirm(`Действительно ли вы хотите выбрать эту тему: ${selectedTheme} ?`);
        if(!isConfirmed) {
            return themeSelect.value = lastSelectedTheme;
        }
        setTheme(selectedTheme);
        lastSelectedTheme = selectedTheme;
        localStorage.setItem('app_theme', selectedTheme);
    }

    function setTheme(name) {
        const selectedThemObj = themes[name];
        Object.entries(selectedThemObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }

})(tasks);





