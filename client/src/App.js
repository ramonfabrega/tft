import React from 'react';
import axios from 'axios';
import { Row, Col, Input, Card, Spin, Typography } from 'antd';

import './App.css';

const Summoner = ({ data }) => {
  const cleanup = league => {
    const { queueType, tier, rank, leaguePoints, wins, losses } = league;
    const res = { wins, losses, leaguePoints };
    res.rank = `${tier} ${rank}`;
    res.winrate = ((wins * 100) / (wins + losses)).toFixed(0);
    res.games = wins + losses;

    switch (queueType) {
      case 'RANKED_SOLO_5x5':
        res.queue = 'Solo';
        break;
      case 'RANKED_TFT':
        res.queue = 'TFT';
        break;
      default:
        res.queue = queueType;
    }
    return res;
  };

  if (data.length > 0) {
    return (
      <Col type='flex' span={6} justify='center' style={{ marginBottom: 15 }}>
        <Card title={data[0].summonerName} style={{ height: '100%' }}>
          {data.map(league => {
            const d = cleanup(league);
            return (
              <React.Fragment>
                <p>
                  <strong>{`${d.queue}: ${d.rank}`}</strong>
                  <br />
                  {`${d.winrate}% (${d.wins}W - ${d.losses}L)`}
                </p>
              </React.Fragment>
            );
          })}
        </Card>
      </Col>
    );
  } else {
    return <div />;
  }
};

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
        <Row type='flex' justify='center' style={{ marginTop: 25 }}>
          <Typography.Title>Teamfight Tactics</Typography.Title>
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
