const Card = React.createClass({
  render: function () {
    return (
      <div>Hello</div>
    );
  }
});

const QueueColumn = React.createClass({
  render: function () {
    const queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="QueueColumn">
        {queryNodes}
      </div>
    );
  }
});

const InProgressColumn = React.createClass({
  render: function () {
    const queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="InProgressColumn">
        {queryNodes}
      </div>
    );
  }
});

const DoneColumn = React.createClass({
  render: function () {
    var queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="DoneColumn">
        {queryNodes}
      </div>
    );
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
      })
    const queue = tasksArray
      .filter(function (task) {
        return task.status_id === 1;
      });

    const inProgress = tasksArray
      .filter(function (task) {
        return task.status_id === 2;
      });
    const done = tasksArray
      .filter(function (task) {
        return task.status_id === 3;
      });
    return (
      <div className="Kanban">
        <h2>Kanban</h2>
        <div>
          <QueueColumn
            data={queue}
          />
          <InProgressColumn
            data={inProgress}
          />
          <DoneColumn
            data={done}
          />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Kanban url="api/tasks" />,
  document.getElementById('app')
);