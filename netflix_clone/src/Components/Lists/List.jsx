//Importing files, package, firebase, hooks 
import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import './List.css';

//Passing title , param in the list
const List = ({ title, param }) => {
    const [list, setList] = useState([]);
    
    useEffect(() => {
        fetchData(param).then(res => setList(res.data.results))
    }, []);
    console.log(list);

    return (
        <>
            {/*Movies List */}
            <div className="list">
                <div className="row">
                    <h2 className="text-white title">{title}</h2>
                    <div className="col">
                        <div className="row__posters">
                            {
                                list.map(item => <img
                                    className="row__poster row__posterLarge"
                                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                    alt={item.title}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;