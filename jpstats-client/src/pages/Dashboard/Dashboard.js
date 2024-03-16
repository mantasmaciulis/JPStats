import React from 'react';
import Card from '../../components/Card/Card';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Card className='recently-learned' title='Recently Learned Words'></Card>

      <Card className='progress-to-jlpt' title='Progress to JLPT N1'></Card>

      <Card className='words-by-memory' title='Words By Memory Level'></Card>

      <Card className='grammar-progress' title='Grammar Progress'></Card>
    </div>
  );
};

export default Dashboard;
