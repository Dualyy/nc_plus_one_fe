

interface SearchBarProps {
    htmlId?: string;
    changeHandler: (searchInput: string) => void;
    value: string;
}


export default function SearchBar({ htmlId, changeHandler, value }: SearchBarProps) {

    

    return (
        <label htmlFor={htmlId}>
            <input className="searchBar" id={htmlId} type="search" value={value} placeholder="Search Events" onChange={(event)=> changeHandler(event.target.value)}/>
        </label>
    )

}