import React from 'react';
import Card from './Card';

const DoneColumn = React.createClass({
  render: function () {
    var queryNodes = this.props.data.map((card, index) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          priority={card.priority}
          createdBy={card.created_by}
          users={card.users}
        />
      );
    });
    return (
      <div className="doneColumn">
        {queryNodes}
      </div>
    );
  }
});

export default DoneColumn;