import React, { useCallback, useState } from 'react';
import flower from '../../assets/flower1.png';

import FlowerCard from '@/components/flowerCard/FlowerCard';
import Link from 'next/link';
const FlowersContainer = ({ flowers }: { flowers: any[] }) => {
  const [hoveredItem, setHoveredItem] = useState(0);
  const onHover = useCallback((i: number) => {
    setHoveredItem(i);
  }, []);

  return (
    <div className='container mx-auto '>
      <div
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${'300px'})`,
          gap: '40px',
        }}
        className=' grid  grid-cols-4 gap-y-8 border-b-2 pb-10'
      >
        {flowers.map((item, index) => (
          <Link key={item.id} href={`/flower/${item.id}`}>
            <FlowerCard
              onHover={onHover}
              isHovered={index + 1 === hoveredItem}
              src={item.images?.[0] || flower}
              id={index + 1}
              key={index + 1}
              flower={item}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlowersContainer;
