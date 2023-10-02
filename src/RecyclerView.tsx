import React, { useState, useEffect, useRef } from 'react';

interface Base {
    id?: string | number;
}

interface Props<T> {
    itemCount: number;
    items: (T & Base)[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor?: (item: T) => string;
    itemSize: number;
}

function RecyclerView<T>({ itemCount, items, renderItem, keyExtractor, itemSize }: Props<T>) {
    const [visibleStartIdx, setVisibleStartIdx] = useState(0);
    const [visibleEndIdx, setVisibleEndIdx] = useState(10); // For initial render, rendering 10 items.
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop } = containerRef.current;

            const newStartIdx = Math.floor(scrollTop / itemSize);
            const visibleItemsCount = Math.ceil(window.innerHeight / itemSize) + 2; // Adding 2 for buffer

            setVisibleStartIdx(newStartIdx);
            setVisibleEndIdx(newStartIdx + visibleItemsCount);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);

            return () => {
                if (containerRef.current) {
                    containerRef.current.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, []);

    return (
        <div ref={containerRef} style={{ overflowY: 'auto', height: '100vh', position: 'relative' }}>
            <div style={{ width: '500px', height: itemCount * itemSize + 'px', position: 'relative' }}> {/* Container to hold actual height */}
                {items.slice(visibleStartIdx, visibleEndIdx).map((item, index) => (
                    <div key={keyExtractor ? keyExtractor(item) : item.id} style={{ top: (visibleStartIdx + index) * itemSize, position: 'absolute', width: '100%' }}>
                        {renderItem(item, visibleStartIdx + index)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecyclerView;
