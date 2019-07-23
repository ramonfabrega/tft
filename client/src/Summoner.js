import React from 'react';
import { Col, Card } from 'antd';

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

export default Summoner;
