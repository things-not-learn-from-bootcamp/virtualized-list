import React, { useState, useEffect, useRef } from 'react';

const VirtualizedListWithIntersectionObserver = () => {
    const [visibleItems, setVisibleItems] = useState([0]); // Initial state with the first item visible
    const sentinelRef = useRef(null);

    useEffect(() => {
        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && visibleItems[visibleItems.length - 1] < 29) {
                    setVisibleItems(prev => {
                        const lastItem = prev[prev.length - 1];
                        // Add the next item to the visible list, but not beyond 29
                        return [...prev, Math.min(lastItem + 1, 29)];
                    });
                }
            });
        };

        const options = {
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handleIntersect, options);

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
            return () => observer.unobserve(sentinelRef.current);
        }
    }, [visibleItems]);

    return (
        <div style={{ height: '400px', overflowY: 'auto', width: '300px', border: '1px solid black' }}>
            {visibleItems.map(index => (
                <div className="item" key={index} data-index={index}>
                    Item {index}
                </div>
            ))}
            <div ref={sentinelRef} style={{ height: '1px', marginBottom: '-1px' }}></div>
        </div>
    );
};

export default VirtualizedListWithIntersectionObserver;
