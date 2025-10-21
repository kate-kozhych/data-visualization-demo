import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import '../styles/CategoryChart.css';

const CategoryChart = ({ data }) => {
  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const decodeHTML = (html) => { //here I made a decode so that there would be no "&amp;"
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const CustomTooltip = ({ active, payload }) => { //we have a lot of categories here so I made a custom tooltip
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{decodeHTML(payload[0].payload.name)}</p> 
          <p className="tooltip-value">Questions: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const chartHeight = Math.max(400, data.length * 40);

    return (
    <div className="category-chart-container">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ minWidth: 'max(100%, 600px)' }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis 
                type="number" 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
                width={140}
                tickFormatter={decodeHTML}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;