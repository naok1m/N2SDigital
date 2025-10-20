import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

const StatCard = ({ number, label, icon, index }) => {
  const cardRef = React.useRef(null);
  const { count } = useCounterAnimation(number, 2.5, cardRef.current);

  return (
    <div ref={cardRef} className="stats-card rounded-2xl p-6 text-center">
      <div className="stats-icon-container w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-lg text-purple-400" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2 counter-number">
        {count}
      </div>
      <div className="text-gray-300 text-xs md:text-sm">{label}</div>
    </div>
  );
};

export default StatCard;
