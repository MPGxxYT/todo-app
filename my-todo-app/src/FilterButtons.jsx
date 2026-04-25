export default function FilterButtons({updateFilterState, filterValue}) {
    return (
        <div className="filter-buttons">
            <button 
                className={filterValue == "All" ? "selected-filter" : "filter"} 
                onClick={() => updateFilterState("All")}
                >All</button>
            <button 
                className={filterValue == "Active" ? "selected-filter" : "filter"} 
                onClick={() => updateFilterState("Active")}
                >Active</button>
            <button 
                className={filterValue == "Completed" ? "selected-filter" : "filter"} 
                onClick={() => updateFilterState("Completed")}
                >Completed</button>
        </div>
    )
}