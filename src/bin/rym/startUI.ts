import * as express from 'express';
import * as Arena from 'bull-arena';

export default async function () {
  const arenaConfig = {
    queues: [{
      hostId: 'Server',
      name: 'rym',
      redis: {}
    }]
  };
  const arena = Arena(arenaConfig, {
    port: process.env.UI_PORT
  });
}