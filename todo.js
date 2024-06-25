function makeOpt(text, value) {
    const optElt = document.createElement('option');
    if (value !== undefined) {
        optElt.value = value;
    }
    optElt.innerText = text;
    return optElt;
}

function fillSelector(selectElt, options, startText) {
    selectElt.appendChild(makeOpt(startText, ""));
    for (const option of options) {
        selectElt.appendChild(makeOpt(option));
    }
}

function initialize() {
    // make the Model
    var tasks = new TaskList();

    // make the View
    var listView = new TaskListView(tasks);

    // make the controller 
    fillSelector(document.getElementById('priority'), ['high', 'medium', 'low'], '—Please choose a priority—');
    fillSelector(document.getElementById('context'), ['home', 'work', 'school'], '—Please choose a context—');

    // Function closure, so the function knows what the value of "tasks" is
    function addNewTask() {
        tasks.addTask(document.getElementById('description').value,
                      document.getElementById('priority').value,
                      document.getElementById('context').value,
                      document.getElementById('time').value);
                      // Would convert duration to Date if Date offered useful facilities.  It doesn't.
    }
    document.getElementById('addTaskButton').addEventListener('click', addNewTask);
}


class Task {
    constructor(description, priority, context, duration) {
        this.description = description;
        this.priority = priority;
        this.context = context;
        this.duration = duration;
        this.done = false;
    }

};

class Publisher { // Miller calls this Subject, which seems vague to me
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
            this.handlers.push(fn);
        }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}

class TaskList extends Publisher {
    constructor() {
        super();
        this.tasks = [];
    }

    addTask(description, priority, context, duration) {
        const task = new Task(description, priority, context, duration);
        this.tasks.push(task);
        this.publish('newitem', this);
    }
}

function makeAndFillElt(tag, contents) {
    const elt = document.createElement(tag);
    elt.innerHTML = contents;
    return elt;
}

function displayTask(task) {
    const tr = document.createElement('tr');
    // A little bit of controller code sneaking into the view...
    const firstCell = document.createElement('td');
    const form = document.createElement('form');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.name = 'done';
    checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
    });
    form.appendChild(checkbox);
    firstCell.appendChild(form);
    tr.appendChild(firstCell);

    for (const val of [task.description, task.priority, task.context, task.duration]) {
        tr.appendChild(makeAndFillElt('td', val));
    }
    return tr;
}

class TaskListView {
    constructor(taskModel) {
        this.targetElt = document.getElementById('item_display');

        // Closure to define "this".  Not immediately clear why it's necessary, but...
        taskModel.subscribe((taskModel) => {
            this.targetElt.innerHTML = "";
            for (const task of taskModel.tasks) {
                this.targetElt.appendChild(displayTask(task));
            }
        });
    }
}