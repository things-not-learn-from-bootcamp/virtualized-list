import {useEffect, useState} from 'react'
import './App.css'
import RecyclerView from "./RecyclerView.tsx";

function App() {
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        const newItems = [];
        for (let i = 0; i < 100000; i++) {
            newItems.push(`Item ${i}`);
        }
        setItems(newItems);
    }, []);

    return (
        <div className="App">
            <RecyclerView
                itemCount={items.length}
                items={items}
                renderItem={(item) => (<div>{item}</div>)}
                itemSize={100}
            />
        </div>
    );
}

export default App
