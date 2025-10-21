import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import '../styles/DifficultyChart.css'

const DifficultyChart = ({ data }) => {
  const filteredData = data.filter(item => item.count > 0); //filtering data to not display info if count = 0
  const COLORS = {
    easy: '#10b981',    
    medium: '#6366f1',  
    hard: '#3b82f6'     
  };

 const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = filteredData.reduce((sum, entry) => sum + entry.count, 0);
      const percentage = total > 0 ? ((payload[0].value / total) * 100).toFixed(1) : 0;//calculating the percentage of each question difficulty for the category
      
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">
            {payload[0].payload.difficulty.charAt(0).toUpperCase() + 
             payload[0].payload.difficulty.slice(1)}
          </p>
          <p className="tooltip-value">Questions: {payload[0].value}</p>
          <p className="tooltip-value">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (entry) => {
    const total = filteredData.reduce((sum, item) => sum + item.count, 0);
    const percentage = total > 0 ? ((entry.count / total) * 100).toFixed(0) : 0; //perentage calculation for the label
    return `${entry.count} (${percentage}%)`;
  };

  if (filteredData.length === 0) {
    return (
      <div className="difficulty-chart-container">
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--text-muted)', 
          padding: 'var(--spacing-xl)' 
        }}>
          No questions available for this category
        </div>
      </div>
    );
  }

  return (
    <div className="difficulty-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            cornerRadius="50%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
            label={renderLabel}
            labelLine={false}
            isAnimationActive={true}
          >
            {filteredData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.difficulty]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={(value, entry) => 
              `${entry.payload.difficulty.charAt(0).toUpperCase() + 
                entry.payload.difficulty.slice(1)}`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;