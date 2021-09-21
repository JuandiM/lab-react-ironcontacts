import './App.css';
import { useState } from "react";
import contacts from './contacts.json';

const getFiveActors = contacts.splice(0, 5);

function App(){
  const [actors, setActors] = useState (getFiveActors);
  let actorsArray = [...actors];

  const addRandomActors = () => {
    let randomActors = contacts[Math.floor(Math.random() * contacts.length) + 5];
    let existContact = contacts.indexOf(randomActors);

    if (randomActors) {
      actorsArray.unshift(randomActors);

      if (existContact > -1) {
        contacts.splice(existContact, 1);
      }

      setActors(actorsArray);
    };

    const sortByPopularity = () => {
      actorsArray.sort(function(a,b){
        return b.popularity - a.popularity;
      });

      setActors(actorsArray);
    };

    const sortByName = () => {
      actorsArray.sort((a, b) => a.name.localeCompare(b.name));
      setActors(actors);
    };

    const deleteActor = (actorId) => {

      const actorsNoDeleted = actors.filter((actor) => {
        return actorId.id !== actorId;
      });
      setActors(actorsNoDeleted);
      
    };
    return (
      <div className="App">
        <div className="tableDiv">
          <h1>IronContacts</h1>
          <div>
            <button onClick={addRandomActors} className="btn">
              Add Random Contact
            </button>
            <button onClick={sortByPopularity} className="btn">
              Sort by popularity
            </button>
            <button onClick={sortByName} className="btn btn-danger">
              Sort by name
            </button>
          </div>
				<table className="tableActors">
					<thead>
						<tr>
							<th> Picture </th>
							<th> Name </th>
							<th> Popularity </th>
							<th> Won Oscar</th>
							<th> Won Emmy</th>
						</tr>
					</thead>
					<tbody>
						{actors.map((actor) => {
							return (
								<tr key={actor.id}>
									<td>
										<img src={actor.pictureUrl} width="100px" height="120px" alt="Actor" />
									</td>
									<td> {actor.name} </td>

									<td> {Number(actor.popularity).toFixed(2)}</td>
									<td>{actor.wonOscar ? '🏆' : ''}</td>
									<td>{actor.wonEmmy ? '🏆' : ''}</td>
									<td>
										<button onClick={() => {deleteActor(actor.id)}} className="btn btn-danger"
											id={actor.id}>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
  
  )};
}

export default App;
