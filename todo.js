/**
 * Initialize the page.
 * 
 * The model is a TaskList.  The view is a TaskListView.
 */
function initialize() {
    // make the Model
    var model = new TaskList();

    // Reload any saved tasks from localStorage
    //localStorage.removeItem('taskList');
    if (localStorage.getItem('taskList')) {
        const storedList = JSON.parse(localStorage.getItem('taskList'));
        // Note that localStorage can only store built-in objects, so it can't
        // store a TaskList *as* a TaskList.  Therefore, just store (and load)
        // the Array of task objects.    
        model.tasks = model.tasks.concat(storedList);
    }

    // make the View
    var listView = new TaskListView(model);
    fillDropdowns();

    // make the controller 
    initializeController(model);
}

// -------------------- Model code --------------------------------------

/**
 * Class to define a TaskList.  A TaskList is basically an Array of task
 * objects, with the additional ability to publish changes.
 */
class TaskList extends Publisher {
    /**
     * Construct an empty TaskList.
     */
    constructor() {
        super();
        this.tasks = [];
    }

    /**
     * Make a new task object, add it to the task list, and publish the update.  
     * The new task initially has task.done === false.
     * 
     * @param {string} description - Task description 
     * @param {string} priority - Task priority (high, medium, or low) 
     * @param {string} context - Task context (home, work, or school) 
     * @param {string} duration - String representing a time value.  This could
     *                            be a Date if there were any advantage to that.
     */
    addTask(description, priority, context, duration) {
        // Make a task object and add it to the task list
        this.tasks.push({'description': description,
                        'priority': priority,
                        'context': context,
                        'duration': duration,
                        'done': false});
        // Publish the update
        this.publish('newitem', this);
    }
}

// -------------------- View code --------------------------------------

function fillDropdowns() {
    fillSelector(document.getElementById('priority'), ['high', 'medium', 'low'], '—Please choose a priority—');
    fillSelector(document.getElementById('context'), ['home', 'work', 'school'], '—Please choose a context—');
}

/**
 * Class to represent the view of a task list.  The primary responsibility
 * of this object is to display/redisplay the table showing the tasks.  As
 * a result, the constructor actually do anything beyond subscribe to the
 * model.
 */
class TaskListView {
    /**
     * This just subscribes to the model and awaits events.  The model
     * issues an initial update, which takes care of displaying the
     * tasks already on the list when the page first loads.
     * 
     * @param {TaskList} model - the to-do list
     */
    constructor(model) {
        model.subscribe((model, msg) => this.redisplay(model, msg));
    }

    /**
     * Respond to model updates by redisplaying the table.  The table is not
     * redisplayed when a task is checked off (msg === "done").  The only
     * change for finishing a task would be checking the checkbox, and the
     * user already did that.
     * 
     * @param {TaskList} model - the to-do list 
     * @param {string} msg - Message indicating the reason for the event.
     */
    redisplay(model, msg) {
        if (msg == "newitem" || msg == "initial") {
            const targetElt = document.getElementById('item_display');
            targetElt.innerHTML = '';
            for (const task of model.tasks) {
                targetElt.appendChild(displayTask(task, model));
            }
        }
    }
}

/**
 * Display a single task, by creating and returning a row for the table.
 * 
 * @param {object} task - the task object being displayed 
 * @param {TaskList} model - the to-do list, needed to publish changes
 *                           when the task is marked as done. 
 * @returns the table row
 */
function displayTask(task, model) {
    // Start by adding all the data cells
    const tr = makeAndFillTableRow('td', 
        [task.description, task.priority, task.context, task.duration]);
    // Create and return the first cell, where the "done" checkbox will be
    const firstCell = tr.insertCell(0);
    // Put a <form> in the first cell, and a checkbox inside the form
    firstCell.appendChild(makeAndFillElt('form', '<input type="checkbox" name="done">'));
    // Set the value of checked and add the event handler
    const checkbox = firstCell.querySelector('input');
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
                                                task.done = checkbox.checked;
                                                model.publish('done', model);
                                              });
    return tr;
}

/**
 * Enable/disable the "Add task" button, depending on whether or not the form
 * is in a valid state.
 */
function enableAddButton() {
    const button = document.getElementById('addTaskButton');
    //console.log(button.form.reportValidity());
    button.disabled = !(button.form.reportValidity());
}

// -------------------- Controller code --------------------------------------

/**
 * Initialize the controller parts of the page.
 * 
 * @param {TaskList} model - the to-do list 
 */
function initializeController(model) {
    // Add a change handler to all the <input> and <select> elements
    document.querySelectorAll('input').forEach((inputElt) => 
        inputElt.addEventListener('change', enableAddButton));
    document.querySelectorAll('select').forEach((inputElt) => 
        inputElt.addEventListener('change', enableAddButton));

    // Make the addTaskButton add a task
    document.getElementById('addTaskButton').addEventListener('click',
        () => model.addTask(document.getElementById('description').value,
                            document.getElementById('priority').value,
                            document.getElementById('context').value,
                            document.getElementById('time').value));

    // Tell the view to display itself the first time.  This should come
    //    *before* the subscription to update the storage, so the storage
    //    doesn't have its current contents immediately written back to it.
    model.publish('initial', model);

    // Subscribe to update local storage on any update to tasks
    model.subscribe(() => {
        localStorage.setItem('taskList', JSON.stringify(model.tasks));
    });
}
