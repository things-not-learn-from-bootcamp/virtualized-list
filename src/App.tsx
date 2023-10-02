import {useEffect, useState} from 'react'
import './App.css'

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
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default App
