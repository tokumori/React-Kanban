
{/*const Queue = React.createClass({

})*/}


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
    console.log('success');
  },

  render: function () {
    return (
      <div className="Kanban">
        {/*
        <Queue
          data={this.state.data}
        />
        <InProgress
          data={this.state.data}
        />
        <Completed
          data={this.state.data}
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