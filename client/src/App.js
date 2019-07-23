import React from 'react';
import axios from 'axios';
import { Row, Col, Input, Spin, Typography } from 'antd';

import Summoner from './Summoner';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      loading: false
    };
  }

  handleSearch = query => {
    this.setState({ loading: true });
    const players = query.split(',').filter(p => p !== '');
    axios
      .all(players.map(player => axios.get(`/api/game/${player}`)))
      .then(responses => {
        const p = responses.map(r => r.data);

        this.setState({ players: p, loading: false });
      });
  };

  render() {
    return (
      <div className='App'>
        <Row type='flex' justify='center' style={{ paddingTop: 25 }}>
          <Typography.Title style={{ color: '#eee' }}>
            Teamfight Tactics
          </Typography.Title>
        </Row>
        <Row type='flex' justify='center' style={{ marginTop: 25 }}>
          <Col span={8}>
            <Input.Search
              placeholder='player1, player2, player3...'
              enterButton='Go'
              size='large'
              onSearch={this.handleSearch}
            />
          </Col>
        </Row>
        <Row type='flex' gutter={16} justify='center' style={{ margin: 50 }}>
          {this.state.players.map((d, i) => (
            <Summoner data={d} key={i} />
          ))}
          {this.state.loading && (
            <Spin size='large' style={{ marginTop: 25 }} />
          )}
        </Row>
      </div>
    );
  }
}
