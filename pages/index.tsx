import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div
        className="container"
        style={{
          bottom: 0,
          right: 0,
          top: 0,
          left: 0,
          position: 'absolute',
        }}
      >
        <div style={{ height: '30%' }}>&nbsp;</div>
        <div className="columns">
          <div className="column" />
          <div className="column">
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" placeholder="input username" />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button className="button is-primary">Signup</button>
              </div>
            </div>
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}
