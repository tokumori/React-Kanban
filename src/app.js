
const QueueColumn = React.createClass({
  render: function () {
    return (
      <div className="QueueColumn">

      </div>
    )
  }
});


const Kanban = React.createClass({
  loadTasks: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
  },

  getInitialState: function () {
    return {data: [] }
  },

  componentDidMount: function () {
    this.loadTasks();
  },

  render: function () {
    const tasksArray = this.state.data
      .sort(function (taskA, taskB) {
        if (taskA.priority < taskB.priority) {
          return 1;
        }
        if (taskA.priority > taskB.priority) {
          return -1;
        }
        return 0;
      });
    console.log(tasksArray);
    const queue = tasksArray
      .filter(function (tasks) {
        if (tasks.status_id === 1) {
          return true;
        }
        return false;
      })
    console.log(queue);
    const inProgress = tasksArray
      .filter(function (tasks) {
        if (tasks.status_id === 2) {
          return true;
        }
        return false;
    });
    const done = tasksArray
      .filter(function (tasks) {
        if (tasks.status_id === 3) {
          return true;
        }
        return false;
    });
    return (
      <div className="Kanban">
        <QueueColumn
          data={queue}
        />
        {/*
        <InProgressColumn
          data={inProgress}
        />
        <DoneColumn
          data={done}
        />
        */}
      </div>
    );
  }
});

ReactDOM.render(
  <Kanban url="api/tasks" />,
  document.getElementById('app')
);