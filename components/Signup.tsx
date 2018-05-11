import React from 'react';
import { MutationResult } from 'react-apollo';

interface IProps {
  loading: boolean;
  signup: (options: { variables: { username: string } }) => void;
  result: MutationResult;
  // onSuccess: (username: string) => void;
}

interface IState {
  username: string;
}

export default class extends React.Component<IProps, IState> {
  input: HTMLInputElement;

  render() {
    const { loading, signup, result } = this.props;

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
            <form
              onSubmit={e => {
                e.preventDefault();
                signup({ variables: { username: this.input.value } });
                this.input.value = '';
                this.setState({ username: this.input.value });
              }}
            >
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    ref={input => {
                      this.input = input;
                    }}
                    className={'input ' + (result.error && 'is-danger')}
                    type="text"
                    placeholder="input username"
                    disabled={result.loading || loading}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                  <span className="icon is-small is-right">
                    <i
                      className={'fas ' + (result.error ? 'fa-exclamation-triangle' : 'fa-check')}
                    />
                  </span>
                  {result.error && <p className="help is-danger">{result.error.message}</p>}
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button
                    type="submit"
                    className={'button is-primary ' + (loading ? 'is-loading' : '')}
                    disabled={result.loading}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}
