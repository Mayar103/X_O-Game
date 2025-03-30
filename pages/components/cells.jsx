export default function Cells ({id, cells, cell, setCells, go, setGo, message}) {

    const handleCellClick = () => {

        if(message) {
            return;
        }
        
        const notTaken = !cells[id];

        if(notTaken) {   
            if (go === 'circle') {
                handleCellChange('circle')
                setGo('cross')
            }
            else if (go === 'cross') {
                handleCellChange('cross')
                setGo('circle')
            }
        }
    }

   const handleCellChange = (cellChange) => {
     let copyCells = [...cells]
     copyCells[id] = cellChange
     setCells(copyCells)
   }
    
    return (
    <div className="cell" onClick={handleCellClick}>
        <div className={cell}>{cell ? cell === 'cross' ? 'x' : 'o':  ''}</div>
    </div>
    )
}